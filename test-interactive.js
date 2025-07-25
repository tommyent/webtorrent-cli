#!/usr/bin/env node

// Simple test script to verify the interactive interface works
import WebTorrentREPL from './lib/repl.js'

console.log('Testing WebTorrent Interactive CLI...')

const repl = new WebTorrentREPL()

// Test configuration
console.log('Testing config...')
console.log('Default location:', repl.config.getDefaultLocation())
console.log('Download locations:', repl.config.listDownloadLocations())

// Start REPL in test mode (if running directly)
if (import.meta.url === `file://${process.argv[1]}`) {
  repl.start()
}