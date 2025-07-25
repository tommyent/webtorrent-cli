# Installation Guide

## Quick Start

### 1. Clone and Install
```bash
# Clone the enhanced WebTorrent CLI
git clone /Users/mba2022/Downloads/webtorrent-cli
cd webtorrent-cli

# Install dependencies
npm install

# Make it globally available (optional)
npm link
```

### 2. Run Interactive Mode
```bash
# Start interactive mode
node bin/cmd.js

# Or with npm link installed globally:
webtorrent

# Explicitly start interactive mode
node bin/cmd.js --interactive
```

### 3. Traditional CLI Mode (unchanged)
```bash
# Traditional commands still work
node bin/cmd.js download "magnet:..." --out ~/Downloads
node bin/cmd.js info "magnet:..."
node bin/cmd.js seed file.txt
```

## Installation Options

### Option 1: Local Development
```bash
cd /path/to/webtorrent-cli
npm install
node bin/cmd.js  # Run locally
```

### Option 2: Global Installation
```bash
cd /path/to/webtorrent-cli
npm install
npm link  # Makes 'webtorrent' available globally
webtorrent  # Run from anywhere
```

### Option 3: Package Installation (future)
```bash
# When published to npm
npm install -g webtorrent-cli-enhanced
webtorrent
```

## First Run

When you first run the interactive mode:

```bash
$ node bin/cmd.js

  __        __   _   _____                         _   
  \ \      / /__| |_|_   _|__  _ __ _ __ ___ _ __ | |_ 
   \ \ /\ / / _ \ '_ \| |/ _ \| '__| '__/ _ \ '_ \| __|
    \ V  V /  __/ |_) | | (_) | |  | | |  __/ | | | |_ 
     \_/\_/ \___|_.__/|_|\___/|_|  |_|  \___|_| |_|\__|

🌊 WebTorrent Interactive CLI
Type /help for available commands, or describe what you want to do in natural language
Press Ctrl+C to exit

📁 Default download location: /current/directory

webtorrent> /help
```

## Configuration Setup

### Set up download locations:
```bash
webtorrent> /locations add movies ~/Movies
webtorrent> /locations add music ~/Music
webtorrent> /locations add downloads ~/Downloads
webtorrent> /locations default downloads
```

### View configuration:
```bash
webtorrent> /config
```

## Usage Examples

### Download torrents:
```bash
webtorrent> download magnet:?xt=urn:btih:... to movies
webtorrent> /download "magnet:..." 
webtorrent> download this.torrent to ~/Desktop
```

### Seed files:
```bash
webtorrent> seed ~/Movies/film.mp4
webtorrent> /seed file.txt
```

### Get torrent info:
```bash
webtorrent> /info magnet:...
webtorrent> show info for file.torrent
```

## Troubleshooting

### Common Issues:

**1. Module not found errors:**
```bash
# Make sure you're in the right directory
cd /path/to/webtorrent-cli
npm install
```

**2. Permission errors:**
```bash
# For global installation
sudo npm link
```

**3. Node.js version:**
```bash
# Requires Node.js 16+
node --version
```

### Debug Mode:
```bash
DEBUG=webtorrent* node bin/cmd.js
```

## File Structure

After installation, you'll have:
```
webtorrent-cli/
├── bin/cmd.js           # Main executable
├── lib/
│   ├── config.js        # Configuration management
│   ├── repl.js          # Interactive interface
│   └── commands.js      # Torrent operations
├── ~/.webtorrent/       # User configuration directory
│   └── config.json      # Global settings
└── .webtorrent/         # Project-specific config (per directory)
    └── config.json
```

## Next Steps

1. Start the interactive mode: `node bin/cmd.js`
2. Set up your download locations: `/locations add movies ~/Movies`
3. Try downloading a torrent: `download magnet:... to movies`
4. Explore natural language commands
5. Check your command history: `/history`

For more detailed usage, see `INTERACTIVE.md`.