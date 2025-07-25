# 🌍 Global Installation Guide

Now you can use `webtorrent` from anywhere on your system!

## ✅ Method 1: npm link (Recommended - Already Done!)

This has been completed for you:

```bash
cd /Users/mba2022/Downloads/webtorrent-cli
npm link
```

**Test it works:**
```bash
webtorrent --version
# Should show: 5.1.3 (2.6.10)

webtorrent
# Starts Enhanced Interactive Mode directly!
```

## 🎯 Usage Examples

### **Enhanced Mode (Default)**
```bash
# From anywhere on your system:
webtorrent
```

### **Quick Access to Other Modes**
```bash
webtorrent --classic        # Original CLI mode
webtorrent --mode-select    # Mode selection menu
webtorrent --interactive    # Enhanced mode (explicit)
```

### **Traditional Commands**
```bash
webtorrent download "magnet:..." --out ~/Downloads
webtorrent seed ~/Movies/film.mp4
webtorrent info "magnet:..."
```

## 🔧 Alternative Installation Methods

### **Method 2: Add to PATH**
```bash
# Add this to your ~/.bashrc or ~/.zshrc
export PATH="/Users/mba2022/Downloads/webtorrent-cli/bin:$PATH"

# Then restart your terminal or run:
source ~/.bashrc  # or ~/.zshrc
```

### **Method 3: Create Alias**
```bash
# Add to your ~/.bashrc or ~/.zshrc
alias webtorrent='node /Users/mba2022/Downloads/webtorrent-cli/bin/cmd.js'
alias wt='node /Users/mba2022/Downloads/webtorrent-cli/bin/cmd.js'

# For quick access to different modes:
alias wtc='webtorrent --classic'
alias wts='webtorrent --mode-select'
```

### **Method 4: Copy to System Location**
```bash
# Make executable
chmod +x /Users/mba2022/Downloads/webtorrent-cli/bin/cmd.js

# Copy to system location (requires sudo)
sudo cp /Users/mba2022/Downloads/webtorrent-cli/bin/cmd.js /usr/local/bin/webtorrent
```

## 🚀 Ready to Use!

Now you can simply type:
```bash
webtorrent
```

And get the enhanced Claude Code-inspired interface immediately:

```
🌊 Starting Enhanced Interactive Mode...
Tip: Use --classic for original CLI or --mode-select for mode selection

🌊 WebTorrent Interactive CLI
Type /help for available commands, or describe what you want to do in natural language
Press Ctrl+C to exit

📁 Default download location: /current/directory

webtorrent> /locations add movies ~/Movies
✅ Added location "movies": /Users/you/Movies

webtorrent> download magnet:... to movies
🌊 Starting download...
```

## 🔄 Uninstalling

If you ever want to remove the global installation:

```bash
npm unlink webtorrent-cli
```

## ✨ You're All Set!

Your enhanced WebTorrent CLI is now globally available with:
- 🌊 **Enhanced mode by default**
- 📁 **Download location management** 
- 💬 **Natural language commands**
- 📜 **Persistent command history**
- 🎯 **Clean, professional interface**

**Just type `webtorrent` from anywhere!** 🎉