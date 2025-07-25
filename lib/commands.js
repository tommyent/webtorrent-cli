import WebTorrent from 'webtorrent'
import createTorrent from 'create-torrent'
import parseTorrent from 'parse-torrent'
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import prettierBytes from 'prettier-bytes'
import moment from 'moment'

let client = null

function getClient() {
  if (!client) {
    client = new WebTorrent()
    client.on('error', (err) => {
      console.error(chalk.red(`WebTorrent error: ${err.message}`))
    })
  }
  return client
}

export async function downloadTorrent(torrentId, options = {}) {
  const client = getClient()
  const downloadPath = options.path || process.cwd()
  const quiet = options.quiet || false
  
  return new Promise((resolve, reject) => {
    if (!quiet) {
      console.log(chalk.blue(`🌊 Adding torrent: ${torrentId.slice(0, 50)}...`))
      console.log(chalk.gray(`📁 Download path: ${downloadPath}`))
    }
    
    const torrent = client.add(torrentId, {
      path: downloadPath,
      announce: options.announce
    })

    torrent.on('error', (err) => {
      console.error(chalk.red(`Torrent error: ${err.message}`))
      reject(err)
    })

    torrent.on('infoHash', () => {
      if (!quiet) {
        console.log(chalk.green(`📋 Info hash: ${torrent.infoHash}`))
      }
      
      let metadataSpinner = 0
      const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
      let metadataInterval
      
      if (!quiet) {
        const updateMetadata = () => {
          process.stdout.write(`\r${spinnerChars[metadataSpinner++ % spinnerChars.length]} ${chalk.blue('Fetching metadata from')} ${chalk.bold(torrent.numPeers)} ${chalk.blue('peers...')}`)
        }
        
        updateMetadata()
        metadataInterval = setInterval(updateMetadata, 100)
      }

      torrent.on('metadata', () => {
        if (metadataInterval) clearInterval(metadataInterval)
        
        if (!quiet) {
          console.log(`\r${chalk.green('✅ Metadata received!')}                    `)
          console.log(chalk.green(`📦 Name: ${torrent.name}`))
          console.log(chalk.green(`📏 Size: ${prettierBytes(torrent.length)}`))
          console.log(chalk.green(`📄 Files: ${torrent.files.length}`))
          
          // Show initial peer count (seeds will be shown in progress)
          console.log(chalk.blue(`👥 Connected peers: ${torrent.numPeers}`))
          
          // Show files if there are multiple
          if (torrent.files.length > 1 && torrent.files.length <= 5) {
            console.log(chalk.blue('\n📋 Files:'))
            torrent.files.forEach((file, i) => {
              console.log(`  ${i + 1}. ${file.name} (${prettierBytes(file.length)})`)
            })
          } else if (torrent.files.length > 5) {
            console.log(chalk.blue(`\n📋 ${torrent.files.length} files in torrent`))
          }
          console.log('')
        }
        
        // Start progress display after a brief delay to avoid conflicts
        setTimeout(() => {
          startProgressDisplay(torrent, false, quiet)
        }, 500)
      })
    })

    torrent.on('done', () => {
      console.log(chalk.green(`\\n🎉 Download completed: ${torrent.name}`))
      console.log(chalk.green(`📁 Saved to: ${downloadPath}`))
      resolve(torrent)
    })

    torrent.on('download', () => {
      // Progress is handled by startProgressDisplay
    })
  })
}

export async function seedFile(input, options = {}) {
  const client = getClient()
  
  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`🌱 Seeding: ${input}`))
    
    client.seed(input, {
      announce: options.announce
    }, (torrent) => {
      console.log(chalk.green(`✅ Seeding started!`))
      console.log(chalk.green(`📦 Name: ${torrent.name}`))
      console.log(chalk.green(`🧲 Magnet: ${torrent.magnetURI}`))
      console.log(chalk.green(`📏 Size: ${prettierBytes(torrent.length)}`))
      
      // Show initial peer information
      setTimeout(() => {
        const peersCount = torrent.numPeers
        console.log(chalk.blue(`👥 Connected peers: ${peersCount}`))
      }, 2000)
      
      startProgressDisplay(torrent, true, options.quiet)
      resolve(torrent)
    })
  })
}

export async function createTorrentFile(input, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(chalk.blue(`🔨 Creating torrent for: ${input}`))
    
    const createOptions = {
      createdBy: 'WebTorrent CLI',
      ...options
    }
    
    createTorrent(input, createOptions, (err, torrent) => {
      if (err) {
        reject(err)
        return
      }
      
      const outputPath = options.output || `${path.basename(input)}.torrent`
      
      if (options.output) {
        fs.writeFileSync(outputPath, torrent)
        console.log(chalk.green(`✅ Torrent file created: ${outputPath}`))
      } else {
        process.stdout.write(torrent)
      }
      
      resolve(torrent)
    })
  })
}

export async function getTorrentInfo(torrentId) {
  let parsedTorrent

  try {
    parsedTorrent = parseTorrent(torrentId)
  } catch (err) {
    // If torrent fails to parse, it could be a filesystem path
    try {
      parsedTorrent = parseTorrent(fs.readFileSync(torrentId))
    } catch (err2) {
      throw new Error(`Could not parse torrent: ${err2.message}`)
    }
  }

  console.log(chalk.bold('📋 Torrent Information:'))
  console.log('')
  console.log(chalk.blue('Name:'), parsedTorrent.name || 'Unknown')
  console.log(chalk.blue('Info Hash:'), parsedTorrent.infoHash)
  console.log(chalk.blue('Size:'), prettierBytes(parsedTorrent.length || 0))
  
  if (parsedTorrent.files && parsedTorrent.files.length > 0) {
    console.log(chalk.blue('Files:'), parsedTorrent.files.length)
    console.log('')
    console.log(chalk.bold('📄 File List:'))
    parsedTorrent.files.slice(0, 20).forEach((file, i) => {
      console.log(`  ${(i + 1).toString().padStart(2)}. ${file.name} (${prettierBytes(file.length)})`)
    })
    if (parsedTorrent.files.length > 20) {
      console.log(`  ... and ${parsedTorrent.files.length - 20} more files`)
    }
  }
  
  if (parsedTorrent.announce && parsedTorrent.announce.length > 0) {
    console.log('')
    console.log(chalk.blue('Trackers:'))
    parsedTorrent.announce.slice(0, 5).forEach(tracker => {
      console.log(`  • ${tracker}`)
    })
    if (parsedTorrent.announce.length > 5) {
      console.log(`  ... and ${parsedTorrent.announce.length - 5} more trackers`)
    }
  }
  
  if (parsedTorrent.created) {
    console.log('')
    console.log(chalk.blue('Created:'), new Date(parsedTorrent.created).toLocaleString())
  }
  
  if (parsedTorrent.createdBy) {
    console.log(chalk.blue('Created By:'), parsedTorrent.createdBy)
  }

  return parsedTorrent
}

function startProgressDisplay(torrent, isSeeding = false, quiet = false) {
  if (quiet) return null
  
  // Prevent multiple progress displays on the same torrent
  if (torrent._progressInterval) {
    clearInterval(torrent._progressInterval)
  }
  
  let lastUpdate = { time: 0, progress: 0 }
  torrent._progressInterval = setInterval(() => {
    const now = Date.now()
    const progress = torrent.progress * 100
    const speed = isSeeding ? torrent.uploadSpeed : torrent.downloadSpeed
    
    // Only update every 2 seconds and if there's significant change
    if (now - lastUpdate.time < 2000 && Math.abs(progress - lastUpdate.progress) < 1) {
      return
    }
    lastUpdate.time = now
    lastUpdate.progress = progress
    
    // Clear the current line thoroughly
    process.stdout.write('\r\x1b[K')
    
    const progressBar = createProgressBar(progress, 25)
    const status = isSeeding ? '🌱 Seeding' : '⬇️ Downloading'
    
    let line = `${chalk.blue(status)}: ${progressBar} ${progress.toFixed(1)}%`
    
    if (!isSeeding && torrent.length > 0) {
      const downloaded = prettierBytes(torrent.downloaded)
      const total = prettierBytes(torrent.length)
      const speedStr = prettierBytes(speed) + '/s'
      const seeds = torrent.wires.filter(wire => !wire.peerChoking && wire.downloaded > 0).length
      
      line += ` | ${downloaded}/${total} | ${speedStr}`
      
      if (torrent.timeRemaining) {
        const eta = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
        line += ` | ETA: ${eta}`
      }
      
      line += ` | 🌱${seeds}/👥${torrent.numPeers}`
    } else if (isSeeding) {
      const uploaded = prettierBytes(torrent.uploaded)
      const speedStr = prettierBytes(speed) + '/s'
      line += ` | ⬆️ ${uploaded} | ${speedStr} | 👥 ${torrent.numPeers} peers`
    }
    
    process.stdout.write(line)
    
    if (torrent.done && !isSeeding) {
      clearInterval(torrent._progressInterval)
      console.log('\n')
    }
  }, 1000)
  
  return torrent._progressInterval
}

function createProgressBar(progress, width = 30) {
  const filled = Math.round((progress / 100) * width)
  const empty = width - filled
  
  const filledBar = '█'.repeat(filled)
  const emptyBar = '░'.repeat(empty)
  
  return chalk.green(filledBar) + chalk.gray(emptyBar)
}

export function parseCommand(input) {
  // Simple command parsing - can be expanded
  const parts = input.trim().split(/\\s+/)
  const command = parts[0].toLowerCase()
  const args = parts.slice(1)
  
  return { command, args }
}

export async function executeCommand(command, args, options = {}) {
  switch (command) {
    case 'download':
      return await downloadTorrent(args[0], options)
    case 'seed':
      return await seedFile(args[0], options)
    case 'create':
      return await createTorrentFile(args[0], options)
    case 'info':
      return await getTorrentInfo(args[0])
    default:
      throw new Error(`Unknown command: ${command}`)
  }
}