const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Fix for Windows watcher issues
config.watcher = {
  ...config.watcher,
  watchman: {
    deferStates: ['hg.update'],
  },
};

// Add support for .mjs and .cjs extensions (required by lucide-react-native and others)
config.resolver.sourceExts.push('mjs', 'cjs');

module.exports = config;
