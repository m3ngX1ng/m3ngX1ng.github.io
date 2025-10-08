window.PJAX_CONFIG = {
  comments: {
    twikoo: {
      enabled: true,
      envId: 'https://twikoo.m3x1.cn',
      selector: '#tcomment, .twikoo',
      options: {
        lang: 'zh-CN',
        region: '',
        visitor: false
      }
    },
  },
  music: {
    aplayer: {
      enabled: true,
      selector: '.aplayer',
      preserveState: true
    }
  },
  highlight: {
    enabled: true,
    plugins: ['highlightjs', 'prismjs'],
    features: {
      copy: true,
      lang: true,
      shrink: true
    }
  },
  features: {
    tooltip: {
      enabled: true,
      selector: '[data-tippy-content]'
    },
    fancybox: {
      enabled: true,
      selector: '[data-fancybox]'
    },
    mediumZoom: {
      enabled: true,
      selector: 'img:not(.no-zoom)',
      options: {
        background: 'rgba(0, 0, 0, 0.8)'
      }
    },
    search: {
      enabled: true,
      type: 'local'
    }
  },
  debug: {
    enabled: true,
    logLevel: 'info'
  }
};
window.PJAX_LOGGER = {
  log: function(message, level = 'info') {
    if (!window.PJAX_CONFIG.debug.enabled) return;
    const logLevels = { error: 0, warn: 1, info: 2, debug: 3 };
    const currentLevel = logLevels[window.PJAX_CONFIG.debug.logLevel] || 2;
    const messageLevel = logLevels[level] || 2;
    if (messageLevel <= currentLevel) {
      const timestamp = new Date().toLocaleTimeString();
      console.log(`[PJAX ${timestamp}] ${message}`);
    }
  },
  error: function(message) {
    this.log(message, 'error');
  },
  
  warn: function(message) {
    this.log(message, 'warn');
  },
  info: function(message) {
    this.log(message, 'info');
  },
  debug: function(message) {
    this.log(message, 'debug');
  }
};