# WebTorrent CLI - Enhanced Usage Guide

## 🚀 Getting Started

### Installation & Setup
```bash
# Navigate to the enhanced WebTorrent CLI
cd /Users/mba2022/Downloads/webtorrent-cli

# Install dependencies
npm install

# Start interactive mode
node bin/cmd.js
```

## 🎯 Interactive Mode Features

### **Welcome Screen**
When you start the interactive mode, you'll see:
```
  __        __   _   _____                         _   
  \ \      / /__| |_|_   _|__  _ __ _ __ ___ _ __ | |_ 
   \ \ /\ / / _ \ '_ \| |/ _ \| '__| '__/ _ \ '_ \| __|
    \ V  V /  __/ |_) | | (_) | |  | | |  __/ | | | |_ 
     \_/\_/ \___|_.__/|_|\___/|_|  |_|  \___|_| |_|\__|

🌊 WebTorrent Interactive CLI
Type /help for available commands, or describe what you want to do in natural language
Press Ctrl+C to exit

📁 Default download location: /current/directory

webtorrent> 
```

### **Clean Progress Display**
The enhanced interface now shows clean, minimal progress:
```
⠋ Fetching metadata from 5 peers...
✅ Metadata received!
📦 Name: Example.Movie.2025.1080p.WEB
📏 Size: 2.0 GB
📄 Files: 1

⬇️ Downloading: ████████████░░░░░░░░░░░░░ 45.2% | 900 MB/2.0 GB | 2.3 MB/s | ETA: 8 minutes

✅ Download completed successfully!
```

## 📋 Command Reference

### **Slash Commands**
| Command | Description | Example |
|---------|-------------|---------|
| `/help` | Show all commands | `/help` |
| `/download <torrent>` | Download torrent | `/download magnet:...` |
| `/seed <file>` | Seed file/folder | `/seed ~/Movies/film.mp4` |
| `/info <torrent>` | Show torrent info | `/info file.torrent` |
| `/locations` | Manage locations | `/locations add movies ~/Movies` |
| `/config` | View configuration | `/config` |
| `/history` | Show command history | `/history` |
| `/clear` | Clear screen | `/clear` |
| `/exit` | Exit CLI | `/exit` |

### **Natural Language Commands**
```bash
webtorrent> download magnet:... to movies
webtorrent> seed this file
webtorrent> set default location to downloads  
webtorrent> show info for this.torrent
```

## 📁 Location Management

### **Setup Download Locations**
```bash
webtorrent> /locations add movies ~/Movies
✅ Added location "movies": /Users/you/Movies

webtorrent> /locations add music ~/Music
✅ Added location "music": /Users/you/Music

webtorrent> /locations add plex /Volumes/PlexFiles1/Downloads/
✅ Added location "plex": /Volumes/PlexFiles1/Downloads/

webtorrent> /locations default movies
✅ Set default location to "movies"
```

### **View Available Locations**
```bash
webtorrent> /locations
📁 Download Locations:
  ★ movies: /Users/you/Movies
    music: /Users/you/Music
    plex: /Volumes/PlexFiles1/Downloads/
    downloads: /Users/you/Downloads
    default: /Users/you
```

## 🌊 Download Examples

### **Basic Downloads**
```bash
# Download to default location
webtorrent> /download magnet:?xt=urn:btih:...

# Download to specific location
webtorrent> download magnet:... to movies

# Download using natural language
webtorrent> download this torrent to plex folder
```

### **Expected Output**
```bash
webtorrent> download magnet:... to movies

🌊 Starting download...
📁 Location: /Users/you/Movies
Press Ctrl+C to cancel

⠋ Fetching metadata from 12 peers...
✅ Metadata received!
📦 Name: Happy.Gilmore.2.2025.1080p.WEBRip.DDP5.1.x265-NeoNoir
📏 Size: 2.0 GB
📄 Files: 1

⬇️ Downloading: ████████████░░░░░░░░░░░░░ 60.1% | 1.2 GB/2.0 GB | 3.2 MB/s | ETA: 4 minutes

✅ Download completed successfully!
```

## 🌱 Seeding Examples

```bash
# Seed a file
webtorrent> /seed ~/Movies/film.mp4

# Seed using natural language
webtorrent> seed this file

# Expected output:
🌱 Starting to seed: /Users/you/Movies/film.mp4
✅ Seeding started!
📦 Name: film.mp4
🧲 Magnet: magnet:?xt=urn:btih:...
📏 Size: 1.5 GB

🌱 Seeding: ████████████████████████████ 100.0% | ⬆️ 500 MB | 1.2 MB/s | 8 peers
```

## ℹ️ Torrent Information

```bash
webtorrent> /info magnet:...

📋 Torrent Information:

Name: Example.Movie.2025.1080p.WEB
Info Hash: bb4900e286223e54d716f662010aa1c29e4f252e
Size: 2.0 GB
Files: 1

📄 File List:
   1. Example.Movie.2025.1080p.WEB.mkv (2.0 GB)

Trackers:
  • udp://tracker.opentrackr.org:1337/announce
  • udp://open.demonii.com:1337/announce
  • http://open.tracker.cl:1337/announce
  ... and 15 more trackers

Created: 12/25/2024, 3:30:15 PM
```

## 📜 Command History

```bash
webtorrent> /history
📜 Recent Commands:
  3:30 PM 💬 download magnet:... to movies
  3:25 PM / /locations add plex /Volumes/PlexFiles1/Downloads/
  3:20 PM / /locations default movies
  3:15 PM 💬 set default location to movies
```

## ⚙️ Configuration

### **View Current Config**
```bash
webtorrent> /config
⚙️ Configuration:

Download Locations:
  ★ movies: /Users/you/Movies
    music: /Users/you/Music
    plex: /Volumes/PlexFiles1/Downloads/
    downloads: /Users/you/Downloads
    default: /Users/you

Players:
  Preferred: none
```

## 🔧 Traditional CLI Mode

All existing commands still work:
```bash
# Traditional download
node bin/cmd.js download "magnet:..." --out ~/Downloads

# With player
node bin/cmd.js download "magnet:..." --vlc

# Seed file
node bin/cmd.js seed file.txt

# Get info
node bin/cmd.js info "magnet:..."
```

## 🚨 Error Handling

The enhanced CLI provides better error messages:
```bash
webtorrent> download invalid-magnet

❌ Download failed: Invalid torrent identifier

webtorrent> /locations add invalid-name
Usage: /locations add <name> <path>

webtorrent> 🤔 I didn't understand that. Try:
  • "download magnet:... to movies"
  • "seed file.txt"
  • "set default location to downloads"
  • Or use slash commands like /help
```

## 📂 Configuration Files

- **Global Config**: `~/.webtorrent/config.json`
- **Project Config**: `.webtorrent/config.json` (per directory)

Example configuration:
```json
{
  "downloadLocations": {
    "default": "/Users/you",
    "downloads": "/Users/you/Downloads",
    "movies": "/Users/you/Movies",
    "music": "/Users/you/Music",
    "plex": "/Volumes/PlexFiles1/Downloads/"
  },
  "defaultLocation": "movies",
  "session": {
    "history": [
      {
        "command": "download magnet:... to movies",
        "type": "natural",
        "timestamp": "2025-01-25T20:30:00.000Z"
      }
    ]
  }
}
```

This enhanced WebTorrent CLI provides a modern, Claude Code-inspired interface that makes torrent management intuitive and efficient!