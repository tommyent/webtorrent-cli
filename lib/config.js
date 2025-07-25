import fs from 'fs'
import path from 'path'
import os from 'os'

const CONFIG_DIR = path.join(os.homedir(), '.webtorrent')
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json')
const PROJECT_CONFIG_FILE = '.webtorrent/config.json'

const DEFAULT_CONFIG = {
  downloadLocations: {
    default: process.cwd(),
    downloads: path.join(os.homedir(), 'Downloads'),
    movies: path.join(os.homedir(), 'Movies'),
    music: path.join(os.homedir(), 'Music'),
    documents: path.join(os.homedir(), 'Documents')
  },
  defaultLocation: 'default',
  players: {
    preferred: null,
    vlc: {
      enabled: true,
      args: ['--play-and-exit', '--quiet']
    },
    mpv: {
      enabled: true,
      args: ['--really-quiet', '--loop=no']
    }
  },
  session: {
    history: [],
    maxHistorySize: 100
  },
  ui: {
    quiet: false,
    colors: true,
    progressBar: true
  }
}

class Config {
  constructor() {
    this.globalConfig = null
    this.projectConfig = null
    this.merged = null
    this.load()
  }

  load() {
    // Load global config
    this.globalConfig = this.loadGlobalConfig()
    
    // Load project config if it exists
    this.projectConfig = this.loadProjectConfig()
    
    // Merge configurations (project overrides global)
    this.merged = this.mergeConfigs(this.globalConfig, this.projectConfig)
  }

  loadGlobalConfig() {
    try {
      if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR, { recursive: true })
      }

      if (fs.existsSync(CONFIG_FILE)) {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'))
        return this.mergeConfigs(DEFAULT_CONFIG, config)
      }
    } catch (err) {
      console.warn('Warning: Could not load global config, using defaults')
    }

    return { ...DEFAULT_CONFIG }
  }

  loadProjectConfig() {
    try {
      if (fs.existsSync(PROJECT_CONFIG_FILE)) {
        return JSON.parse(fs.readFileSync(PROJECT_CONFIG_FILE, 'utf8'))
      }
    } catch (err) {
      // Project config is optional
    }
    return {}
  }

  mergeConfigs(base, override) {
    const result = JSON.parse(JSON.stringify(base))
    
    for (const key in override) {
      if (typeof override[key] === 'object' && !Array.isArray(override[key])) {
        result[key] = this.mergeConfigs(result[key] || {}, override[key])
      } else {
        result[key] = override[key]
      }
    }
    
    return result
  }

  save(scope = 'global') {
    try {
      const configToSave = scope === 'global' ? this.globalConfig : this.projectConfig
      const filePath = scope === 'global' ? CONFIG_FILE : PROJECT_CONFIG_FILE

      if (scope === 'project') {
        const dir = path.dirname(PROJECT_CONFIG_FILE)
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true })
        }
      }

      fs.writeFileSync(filePath, JSON.stringify(configToSave, null, 2))
      this.load() // Reload to update merged config
      return true
    } catch (err) {
      console.error(`Error saving ${scope} config:`, err.message)
      return false
    }
  }

  get(key) {
    const keys = key.split('.')
    let value = this.merged
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return undefined
      }
    }
    
    return value
  }

  set(key, value, scope = 'global') {
    const keys = key.split('.')
    const config = scope === 'global' ? this.globalConfig : this.projectConfig
    
    let current = config
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
        current[keys[i]] = {}
      }
      current = current[keys[i]]
    }
    
    current[keys[keys.length - 1]] = value
    return this.save(scope)
  }

  // Download location management
  addDownloadLocation(name, path) {
    const locations = this.get('downloadLocations') || {}
    locations[name] = path
    return this.set('downloadLocations', locations)
  }

  removeDownloadLocation(name) {
    const locations = this.get('downloadLocations') || {}
    delete locations[name]
    return this.set('downloadLocations', locations)
  }

  getDownloadLocation(name) {
    const locations = this.get('downloadLocations') || {}
    return locations[name] || locations.default
  }

  listDownloadLocations() {
    return this.get('downloadLocations') || {}
  }

  setDefaultLocation(name) {
    return this.set('defaultLocation', name)
  }

  getDefaultLocation() {
    const defaultName = this.get('defaultLocation') || 'default'
    return this.getDownloadLocation(defaultName)
  }

  // History management
  addToHistory(entry) {
    const history = this.get('session.history') || []
    const maxSize = this.get('session.maxHistorySize') || 100
    
    history.unshift({
      ...entry,
      timestamp: new Date().toISOString()
    })
    
    if (history.length > maxSize) {
      history.splice(maxSize)
    }
    
    return this.set('session.history', history)
  }

  getHistory() {
    return this.get('session.history') || []
  }

  clearHistory() {
    return this.set('session.history', [])
  }
}

export default Config