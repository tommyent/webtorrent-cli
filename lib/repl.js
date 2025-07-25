import readline from 'readline'
import chalk from 'chalk'
import Config from './config.js'
import { downloadTorrent as downloadTorrentCmd, seedFile as seedFileCmd, getTorrentInfo } from './commands.js'

class WebTorrentREPL {
  constructor() {
    this.config = new Config()
    this.rl = null
    this.isRunning = false
    this.history = []
  }

  start() {
    this.isRunning = true
    this.showWelcome()
    this.setupReadline()
  }

  showWelcome() {
    console.log(chalk.red(`
  __        __   _   _____                         _   
  \\ \\      / /__| |_|_   _|__  _ __ _ __ ___ _ __ | |_ 
   \\ \\ /\\ / / _ \\ '_ \\| |/ _ \\| '__| '__/ _ \\ '_ \\| __|
    \\ V  V /  __/ |_) | | (_) | |  | | |  __/ | | | |_ 
     \\_/\\_/ \\___|_.__/|_|\\___/|_|  |_|  \\___|_| |_|\\__|
    `))
    
    console.log(chalk.green('🌊 WebTorrent Interactive CLI'))
    console.log(chalk.gray('Type /help for available commands, or describe what you want to do in natural language'))
    console.log(chalk.gray('Press Ctrl+C to exit'))
    
    const defaultLocation = this.config.getDefaultLocation()
    console.log(chalk.blue(`📁 Default download location: ${defaultLocation}`))
    console.log('') // Empty line before prompt
  }

  setupReadline() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: chalk.cyan('webtorrent> '),
      history: this.config.getHistory().map(h => h.command).slice(0, 50)
    })

    this.rl.on('line', (input) => {
      this.handleInput(input.trim())
    })

    this.rl.on('SIGINT', () => {
      console.log(chalk.yellow('\n👋 Goodbye!'))
      this.stop()
    })

    // Show prompt immediately - like Claude Code
    setImmediate(() => {
      if (this.isRunning) {
        this.prompt()
      }
    })
  }

  async handleInput(input) {
    if (!input) {
      this.prompt()
      return
    }

    // Add to history
    this.config.addToHistory({
      command: input,
      type: input.startsWith('/') ? 'slash' : 'natural'
    })

    try {
      if (input.startsWith('/')) {
        await this.handleSlashCommand(input)
      } else {
        await this.handleNaturalLanguage(input)
      }
    } catch (error) {
      console.error(chalk.red(`Error: ${error.message}`))
    }

    this.prompt()
  }

  async handleSlashCommand(input) {
    const parts = input.slice(1).split(' ')
    const command = parts[0]
    const args = parts.slice(1)

    switch (command) {
      case 'help':
        this.showHelp()
        break
      case 'config':
        this.showConfig(args)
        break
      case 'locations':
        this.manageLocations(args)
        break
      case 'download':
      case 'dl':
        await this.downloadTorrent(args.join(' '))
        break
      case 'seed':
        await this.seedFile(args.join(' '))
        break
      case 'info':
        await this.showTorrentInfo(args.join(' '))
        break
      case 'history':
        this.showHistory()
        break
      case 'clear':
        console.clear()
        this.showWelcome()
        break
      case 'exit':
      case 'quit':
        this.stop()
        break
      default:
        console.log(chalk.red(`Unknown command: /${command}`))
        console.log(chalk.gray('Type /help for available commands'))
    }
  }

  async handleNaturalLanguage(input) {
    // Simple natural language parsing
    const lowerInput = input.toLowerCase()
    
    if ((lowerInput.includes('download') || lowerInput.includes('dl ')) && (lowerInput.includes('magnet:') || lowerInput.includes('.torrent') || lowerInput.includes('http'))) {
      // Extract torrent URL/path
      const torrentMatch = input.match(/(magnet:[^\\s]+|https?:[^\\s]+\\.torrent|[^\\s]+\\.torrent)/)
      if (torrentMatch) {
        let location = null
        
        // Check for location hints
        if (lowerInput.includes(' to ')) {
          const locationMatch = input.match(/to ([^\\s]+(?:\\s+[^\\s]+)*?)(?:\\s|$)/)
          if (locationMatch) {
            location = locationMatch[1]
          }
        }
        
        await this.downloadTorrent(torrentMatch[1], location)
        return
      }
    }
    
    if (lowerInput.includes('seed') && lowerInput.includes('file')) {
      // Extract file path
      const fileMatch = input.match(/seed\\s+(?:file\\s+)?([^\\s]+(?:\\s+[^\\s]+)*?)(?:\\s|$)/)
      if (fileMatch) {
        await this.seedFile(fileMatch[1])
        return
      }
    }
    
    if (lowerInput.includes('set') && lowerInput.includes('location')) {
      // Handle setting download location
      const locationMatch = input.match(/set.*?location.*?to ([^\\s]+(?:\\s+[^\\s]+)*?)(?:\\s|$)/)
      if (locationMatch) {
        this.config.setDefaultLocation(locationMatch[1])
        console.log(chalk.green(`✅ Default location set to: ${locationMatch[1]}`))
        return
      }
    }
    
    // If we can't parse it, show suggestions
    console.log(chalk.yellow('🤔 I didn\'t understand that. Try:'))
    console.log(chalk.gray('  • "download magnet:... to movies"'))
    console.log(chalk.gray('  • "seed file.txt"'))
    console.log(chalk.gray('  • "set default location to downloads"'))
    console.log(chalk.gray('  • Or use slash commands like /help'))
  }

  showHelp() {
    console.log(chalk.bold('📖 Available Commands:'))
    console.log('')
    console.log(chalk.cyan('/download <torrent>') + ' (or ' + chalk.cyan('/dl') + ') - Download a torrent')
    console.log(chalk.cyan('/seed <file>') + ' - Seed a file or folder')
    console.log(chalk.cyan('/info <torrent>') + ' - Show torrent information')
    console.log(chalk.cyan('/locations') + ' - Manage download locations')
    console.log(chalk.cyan('/config') + ' - View/edit configuration')
    console.log(chalk.cyan('/history') + ' - Show command history')
    console.log(chalk.cyan('/clear') + ' - Clear screen')
    console.log(chalk.cyan('/exit') + ' - Exit WebTorrent CLI')
    console.log('')
    console.log(chalk.bold('💬 Natural Language:'))
    console.log(chalk.gray('  • "download magnet:... to downloads"'))
    console.log(chalk.gray('  • "dl magnet:... to movies"'))
    console.log(chalk.gray('  • "seed this file"'))
    console.log(chalk.gray('  • "set default location to movies"'))
  }

  showConfig(args) {
    if (args.length === 0) {
      console.log(chalk.bold('⚙️  Configuration:'))
      console.log('')
      console.log(chalk.blue('Download Locations:'))
      const locations = this.config.listDownloadLocations()
      for (const [name, path] of Object.entries(locations)) {
        const isDefault = name === this.config.get('defaultLocation')
        const marker = isDefault ? chalk.green('★') : ' '
        console.log(`  ${marker} ${chalk.cyan(name)}: ${path}`)
      }
      console.log('')
      console.log(chalk.blue('Players:'))
      const players = this.config.get('players') || {}
      console.log(`  Preferred: ${players.preferred || 'none'}`)
    }
  }

  manageLocations(args) {
    if (args.length === 0) {
      console.log(chalk.bold('📁 Download Locations:'))
      const locations = this.config.listDownloadLocations()
      for (const [name, path] of Object.entries(locations)) {
        const isDefault = name === this.config.get('defaultLocation')
        const marker = isDefault ? chalk.green('★') : ' '
        console.log(`  ${marker} ${chalk.cyan(name)}: ${path}`)
      }
      console.log('')
      console.log(chalk.gray('Usage:'))
      console.log(chalk.gray('  /locations add <name> <path>'))
      console.log(chalk.gray('  /locations remove <name>'))
      console.log(chalk.gray('  /locations default <name>'))
      return
    }

    const [action, name, ...pathParts] = args
    const path = pathParts.join(' ')

    switch (action) {
      case 'add':
        if (name && path) {
          this.config.addDownloadLocation(name, path)
          console.log(chalk.green(`✅ Added location "${name}": ${path}`))
        } else {
          console.log(chalk.red('Usage: /locations add <name> <path>'))
        }
        break
      case 'remove':
        if (name) {
          this.config.removeDownloadLocation(name)
          console.log(chalk.green(`✅ Removed location "${name}"`))
        } else {
          console.log(chalk.red('Usage: /locations remove <name>'))
        }
        break
      case 'default':
        if (name) {
          this.config.setDefaultLocation(name)
          console.log(chalk.green(`✅ Set default location to "${name}"`))
        } else {
          console.log(chalk.red('Usage: /locations default <name>'))
        }
        break
      default:
        console.log(chalk.red('Unknown action. Use: add, remove, or default'))
    }
  }

  async downloadTorrent(torrent, location = null) {
    const downloadPath = location ? 
      this.config.getDownloadLocation(location) || location :
      this.config.getDefaultLocation()
    
    console.log(chalk.blue(`\n🌊 Starting download...`))
    console.log(chalk.gray(`📁 Location: ${downloadPath}`))
    console.log(chalk.gray('Press Ctrl+C to cancel\n'))
    
    try {
      await downloadTorrentCmd(torrent, { path: downloadPath })
      console.log(chalk.green(`\n✅ Download completed successfully!`))
    } catch (error) {
      console.error(chalk.red(`\n❌ Download failed: ${error.message}`))
    }
  }

  async seedFile(file) {
    try {
      await seedFileCmd(file)
    } catch (error) {
      console.error(chalk.red(`Seeding failed: ${error.message}`))
    }
  }

  async showTorrentInfo(torrent) {
    try {
      await getTorrentInfo(torrent)
    } catch (error) {
      console.error(chalk.red(`Info failed: ${error.message}`))
    }
  }

  showHistory() {
    const history = this.config.getHistory().slice(0, 20)
    if (history.length === 0) {
      console.log(chalk.gray('No command history'))
      return
    }

    console.log(chalk.bold('📜 Recent Commands:'))
    history.forEach((entry, i) => {
      const time = new Date(entry.timestamp).toLocaleTimeString()
      const icon = entry.type === 'slash' ? '/' : '💬'
      console.log(`  ${chalk.gray(time)} ${icon} ${entry.command}`)
    })
  }

  prompt() {
    if (this.isRunning && this.rl) {
      // Ensure we're ready and show prompt immediately
      this.rl.prompt(true)
    }
  }

  stop() {
    this.isRunning = false
    if (this.rl) {
      this.rl.close()
    }
    process.exit(0)
  }
}

export default WebTorrentREPL