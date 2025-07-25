#!/usr/bin/env node

// Demo script to showcase the enhanced WebTorrent CLI
import chalk from 'chalk'
import Config from './lib/config.js'

console.log(chalk.bold.blue('🌊 WebTorrent Enhanced CLI Demo\n'))

// Test configuration
console.log(chalk.yellow('📋 Testing Configuration System:'))
const config = new Config()

console.log('Default download location:', chalk.green(config.getDefaultLocation()))
console.log('Available locations:', chalk.cyan(JSON.stringify(config.listDownloadLocations(), null, 2)))

// Add a demo location
config.addDownloadLocation('demo', '/tmp/webtorrent-demo')
console.log('Added demo location:', chalk.green('/tmp/webtorrent-demo'))

// Test history
config.addToHistory({
  command: '/download magnet:... to movies',
  type: 'slash'
})

config.addToHistory({
  command: 'download this torrent to music folder',
  type: 'natural'
})

console.log('\n' + chalk.yellow('📜 Command History:'))
const history = config.getHistory()
history.forEach(entry => {
  const icon = entry.type === 'slash' ? '/' : '💬'
  console.log(`  ${icon} ${entry.command}`)
})

console.log('\n' + chalk.yellow('🚀 Ready to start interactive mode!'))
console.log(chalk.gray('Run: node bin/cmd.js'))
console.log(chalk.gray('Or:  node bin/cmd.js --interactive'))

console.log('\n' + chalk.bold.green('✅ Demo completed successfully!'))