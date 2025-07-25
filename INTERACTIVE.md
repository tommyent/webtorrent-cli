# WebTorrent Interactive CLI

This enhanced version of WebTorrent CLI features a Claude Code-inspired interactive interface with persistent configuration and natural language commands.

## Features

### 🌊 Interactive REPL Mode
- Start `webtorrent` without arguments to enter interactive mode
- Natural language command interpretation
- Persistent session with command history
- Tab completion and command suggestions

### 📁 Download Location Management
- Save multiple named download locations
- Quick switching between locations
- Auto-categorization by file type
- Project-specific and global configuration

### ⚡ Slash Commands
- `/download <torrent>` - Download with saved preferences
- `/seed <file>` - Seed file or folder  
- `/config` - View/edit configuration
- `/locations` - Manage download locations
- `/info <torrent>` - Show torrent information
- `/history` - Show command history
- `/help` - Show all commands

### 💬 Natural Language Interface
- "download magnet:... to movies folder"
- "seed this file" 
- "set default location to downloads"
- "show info for this torrent"

## Getting Started

### Traditional CLI Mode (unchanged)
```bash
webtorrent download "magnet:..." --out ~/Downloads
webtorrent seed file.txt
```

### New Interactive Mode
```bash
# Start interactive mode
webtorrent

# Or explicitly
webtorrent --interactive
webtorrent --repl
```

## Configuration

### Global Configuration
Configuration is stored in `~/.webtorrent/config.json`:

```json
{
  "downloadLocations": {
    "default": "/Users/you",
    "downloads": "/Users/you/Downloads", 
    "movies": "/Users/you/Movies",
    "music": "/Users/you/Music"
  },
  "defaultLocation": "downloads",
  "players": {
    "preferred": "vlc"
  }
}
```

### Project Configuration
Create `.webtorrent/config.json` in any directory for project-specific settings.

## Interactive Commands

### Download Management
```
webtorrent> download magnet:... to movies
webtorrent> /download magnet:...
webtorrent> /download magnet:... --player vlc
```

### Location Management
```  
webtorrent> /locations
webtorrent> /locations add music ~/Music
webtorrent> /locations default music
webtorrent> set default location to downloads
```

### Configuration
```
webtorrent> /config
webtorrent> /config set player vlc
```

### History and Info
```
webtorrent> /history
webtorrent> /info magnet:...
webtorrent> show info for this.torrent
```

## File Structure

```
lib/
├── config.js    # Configuration management
├── repl.js      # Interactive REPL interface  
└── commands.js  # Torrent operations
```

## Key Differences from Standard CLI

1. **Persistent State**: Configuration and history are saved between sessions
2. **Natural Language**: Commands can be expressed conversationally  
3. **Interactive**: REPL environment vs single-shot commands
4. **Location Management**: Named download locations with quick switching
5. **Session Memory**: Command history and context awareness

## Backward Compatibility

All existing WebTorrent CLI commands continue to work unchanged. The interactive mode is an addition, not a replacement.

## Examples

### Setting up download locations
```
webtorrent> /locations add movies ~/Movies
webtorrent> /locations add music ~/Music  
webtorrent> /locations add software ~/Downloads/Software
webtorrent> /locations default movies
```

### Natural language downloads
```
webtorrent> download magnet:?xt=urn:btih:... to music folder
webtorrent> download this.torrent to software
webtorrent> download magnet:... to ~/Desktop
```

### Seeding and info
```
webtorrent> seed ~/Movies/film.mp4
webtorrent> show info for magnet:...
webtorrent> /info ~/Downloads/file.torrent
```

This enhanced interface brings the conversational, context-aware experience of Claude Code to torrent management, making it more intuitive and powerful for daily use.