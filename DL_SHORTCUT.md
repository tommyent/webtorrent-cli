# ⚡ Added: `dl` Shortcut for Download

## 🎯 New Shortcut Available

You can now use `/dl` as a quick shortcut for `/download`!

## 🚀 Usage Examples

### **Slash Commands:**
```bash
webtorrent> /dl magnet:?xt=urn:btih:...
# Same as: /download magnet:?xt=urn:btih:...

webtorrent> /dl magnet:... to movies
# Same as: /download magnet:... to movies
```

### **Natural Language:**
```bash
webtorrent> dl magnet:... to music folder
# Same as: download magnet:... to music folder
```

## 📋 Complete Command Reference

| Command | Shortcut | Description |
|---------|----------|-------------|
| `/download <torrent>` | `/dl <torrent>` | Download a torrent |
| `/seed <file>` | - | Seed a file or folder |
| `/info <torrent>` | - | Show torrent information |
| `/locations` | - | Manage download locations |
| `/config` | - | View/edit configuration |
| `/history` | - | Show command history |
| `/clear` | - | Clear screen |
| `/exit` | - | Exit WebTorrent CLI |

## 💡 Why Add This Shortcut?

✅ **Faster Typing** - `dl` is 62% shorter than `download`  
✅ **Common Convention** - Many CLI tools use `dl` for download  
✅ **Better UX** - Quick commands for frequent actions  
✅ **Muscle Memory** - Familiar to users of other torrent clients  

## 🧪 Test It Out

```bash
webtorrent

webtorrent> /help
# Shows: /download <torrent> (or /dl) - Download a torrent

webtorrent> /dl magnet:... to downloads
🌊 Starting download...
📁 Location: /Users/you/Downloads

webtorrent> dl magnet:... to movies
# Works with natural language too!
```

## ✨ Help Updated

The `/help` command now shows:
```
📖 Available Commands:

/download <torrent> (or /dl) - Download a torrent
/seed <file> - Seed a file or folder
/info <torrent> - Show torrent information
...

💬 Natural Language:
  • "download magnet:... to downloads"
  • "dl magnet:... to movies"  ← NEW!
  • "seed this file"
  • "set default location to movies"
```

**Now downloading is even faster with `/dl`!** ⚡