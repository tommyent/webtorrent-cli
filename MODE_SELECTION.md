# WebTorrent CLI - Enhanced by Default

When you run `webtorrent` without any arguments, it now **defaults to the Enhanced Interactive Mode** with option to access other modes.

## 🚀 Usage Options

### **1. Enhanced Interactive Mode (Default)**
```bash
node bin/cmd.js
```

You'll see:
```
🌊 Starting Enhanced Interactive Mode...
Tip: Use --classic for original CLI or --mode-select for mode selection

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

### **2. Alternative Access Methods**

#### **Mode Selection Menu**
```bash
node bin/cmd.js --mode-select
```

#### **Original CLI Mode**
```bash
node bin/cmd.js --classic
```

#### **Enhanced Interactive Mode (explicit)**
```bash
node bin/cmd.js --interactive
# or
node bin/cmd.js --repl
```

#### **Traditional Commands (bypass selection)**
```bash
node bin/cmd.js download "magnet:..." --out ~/Downloads
node bin/cmd.js seed file.txt
node bin/cmd.js info "magnet:..."
```

## 🎯 Mode Descriptions

### **🆕 Enhanced Interactive Mode**
- **Claude Code-inspired REPL interface**
- **Natural language commands**: "download this torrent to movies"
- **Persistent configuration**: Save download locations and settings
- **Slash commands**: `/download`, `/seed`, `/locations`, etc.
- **Command history**: View and repeat previous commands
- **Clean progress display**: Minimal, non-cluttered output

**Example session:**
```bash
webtorrent> /locations add movies ~/Movies
✅ Added location "movies": /Users/you/Movies

webtorrent> download magnet:... to movies
🌊 Starting download...
📁 Location: /Users/you/Movies

⬇️ Downloading: ████████████░░░░░░░░░░░░░ 60.1% | 1.2 GB/2.0 GB | 3.2 MB/s | ETA: 4 minutes

✅ Download completed successfully!

webtorrent> /history
📜 Recent Commands:
  3:30 PM 💬 download magnet:... to movies
  3:25 PM / /locations add movies ~/Movies
```

### **📜 Original CLI Mode**
- **Traditional command-line interface**
- **Flag-based arguments**: `--out`, `--vlc`, `--port`, etc.
- **Single-shot execution**: Run command and exit
- **All existing functionality preserved**

**Example usage:**
```bash
webtorrent download "magnet:..." --vlc --out ~/Downloads
webtorrent seed ~/Movies/film.mp4
webtorrent info "magnet:..." --out info.json
```

### **❓ Help Mode**
Shows complete help documentation with all available commands and options.

## 🔧 Configuration

### **Quick Access Aliases**
Add these to your shell profile for quick access:

```bash
# ~/.bashrc or ~/.zshrc
alias wt='node /path/to/webtorrent-cli/bin/cmd.js'
alias wti='node /path/to/webtorrent-cli/bin/cmd.js --interactive'
alias wtc='node /path/to/webtorrent-cli/bin/cmd.js --classic'
```

### **Global Installation**
```bash
cd /path/to/webtorrent-cli
npm link

# Now you can use:
webtorrent              # Mode selection
webtorrent --interactive # Enhanced mode
webtorrent --classic     # Original mode
```

## 🎨 Mode Selection Features

### **Smart Defaults**
- **Enhanced Interactive Mode** is the default selection
- **Arrow keys** to navigate options
- **Enter** to select
- **Ctrl+C** to cancel

### **Visual Indicators**
- **🆕** Enhanced Interactive Mode (recommended)
- **📜** Original CLI Mode (classic)
- **❓** Help & Documentation

### **Contextual Help**
Each mode provides appropriate guidance:
- **Enhanced**: Shows welcome screen with natural language examples
- **Original**: Shows traditional help with flags and options
- **Help**: Complete documentation

## 🚀 Getting Started

1. **First time**: Run `node bin/cmd.js` and select **Enhanced Interactive Mode**
2. **Set up locations**: `/locations add movies ~/Movies`
3. **Download torrents**: `download magnet:... to movies`
4. **Explore**: Try `/help` to see all available commands

## 📋 Command Reference

| Command | Enhanced Mode | Original Mode |
|---------|---------------|---------------|
| Download | `download magnet:... to movies` | `webtorrent download "magnet:..." --out ~/Movies` |
| Seed | `/seed file.txt` | `webtorrent seed file.txt` |
| Info | `/info magnet:...` | `webtorrent info "magnet:..."` |
| Help | `/help` | `webtorrent --help` |

The mode selection makes WebTorrent CLI accessible to both new users who prefer modern interfaces and power users who want traditional command-line control!