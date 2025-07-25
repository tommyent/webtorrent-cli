# 🌱 Enhanced Torrent Health Information

Now WebTorrent CLI shows detailed seed and peer information to help you assess torrent health and download viability!

## 🎯 What's New

### **Metadata Display Enhancement**
When you download a torrent, you'll now see:

```
🌊 Adding torrent: magnet:?xt=urn:btih:BB4900E286223E54D716F662010AA1...
📁 Download path: /Volumes/PlexFiles1/Downloads/
📋 Info hash: bb4900e286223e54d716f662010aa1c29e4f252e
⠋ Fetching metadata from 12 peers...
✅ Metadata received!
📦 Name: Happy.Gilmore.2.2025.1080p.WEBRip.DDP5.1.x265-NeoNoir.mkv
📏 Size: 2.0 GB
📄 Files: 1
🌱 Seeds: 8 | 👥 Peers: 15
```

### **Real-time Progress with Health Info**
During download, the progress bar now shows live seed/peer counts:

```
⬇️ Downloading: ████████████░░░░░░░░░░░░░ 60.1% | 1.2 GB/2.0 GB | 3.2 MB/s | ETA: 4 minutes | 🌱8/👥15
```

### **Seeding Information**
When seeding, you'll see connected peer information:

```
✅ Seeding started!
📦 Name: Happy.Gilmore.2.2025.1080p.WEBRip.DDP5.1.x265-NeoNoir.mkv
🧲 Magnet: magnet:?xt=urn:btih:...
📏 Size: 2.0 GB
👥 Connected peers: 12

🌱 Seeding: ████████████████████████████ 100.0% | ⬆️ 500 MB | 1.2 MB/s | 👥 12 peers
```

## 🎨 Visual Health Indicators

### **Color-coded Seed Health**
- 🟢 **Green**: 10+ seeds (Excellent health)
- 🟡 **Yellow**: 5-10 seeds (Good health)  
- 🔴 **Red**: <5 seeds (Poor health)

### **Icon Legend**
- 🌱 **Seeds**: Peers who have the complete file
- 👥 **Peers**: Total connected peers (including seeds)
- ⬇️ **Downloading**: Active download in progress
- ⬆️ **Seeding**: Uploading to other peers

## 📊 Benefits

### **Better Download Decisions**
```bash
webtorrent> download magnet:... to movies

📦 Name: Movie.2025.1080p.WEB.mkv
📏 Size: 2.0 GB
📄 Files: 1
🌱 Seeds: 2 | 👥 Peers: 3  # ⚠️ Low health - might be slow
```

vs.

```bash
webtorrent> download magnet:... to movies

📦 Name: Movie.2025.1080p.WEB.mkv  
📏 Size: 2.0 GB
📄 Files: 1
🌱 Seeds: 25 | 👥 Peers: 47  # ✅ Great health - fast download expected
```

### **Real-time Health Monitoring**
Watch seed/peer counts change during download:
```
⬇️ Downloading: ██████░░░░░░░░░░░░░░░░░░░ 30.1% | 600 MB/2.0 GB | 2.1 MB/s | ETA: 8 minutes | 🌱12/👥18
⬇️ Downloading: ████████░░░░░░░░░░░░░░░░░ 40.1% | 800 MB/2.0 GB | 3.2 MB/s | ETA: 6 minutes | 🌱15/👥22
⬇️ Downloading: ██████████░░░░░░░░░░░░░░░ 50.1% | 1.0 GB/2.0 GB | 4.1 MB/s | ETA: 4 minutes | 🌱18/👥25
```

### **Seeding Impact Visibility**
See how many peers you're helping:
```
🌱 Seeding: ████████████████████████████ 100.0% | ⬆️ 1.2 GB | 800 kB/s | 👥 8 peers
🌱 Seeding: ████████████████████████████ 100.0% | ⬆️ 1.5 GB | 1.1 MB/s | 👥 12 peers
🌱 Seeding: ████████████████████████████ 100.0% | ⬆️ 2.1 GB | 950 kB/s | 👥 15 peers
```

## 🚀 Usage Examples

### **Check Torrent Health Before Download**
```bash
webtorrent> /info magnet:...
📦 Name: Linux.Distribution.iso
📏 Size: 4.2 GB
🌱 Seeds: 45 | 👥 Peers: 78  # Excellent health!
```

### **Monitor Download Progress**
```bash
webtorrent> download magnet:... to software
⬇️ Downloading: ███████████████░░░░░░░░░ 75.3% | 3.2 GB/4.2 GB | 5.1 MB/s | ETA: 3 minutes | 🌱45/👥78
```

### **Track Seeding Impact**
```bash
webtorrent> seed ~/Downloads/Linux.Distribution.iso
🌱 Seeding: ████████████████████████████ 100.0% | ⬆️ 8.4 GB | 2.1 MB/s | 👥 23 peers
# You've shared 8.4 GB with 23 peers!
```

## ✨ Smart Features

- **Delayed Accuracy**: Seed/peer counts wait 2 seconds for accurate connection data
- **Real-time Updates**: Live counts during progress display
- **Health Assessment**: Color-coded indicators for torrent viability
- **Seeding Insights**: See your contribution to the torrent ecosystem

**Now you can make informed decisions about downloads and track your seeding impact!** 🎉