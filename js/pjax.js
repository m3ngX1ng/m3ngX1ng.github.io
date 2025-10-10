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
    },
    flink: {
      enabled: true,
      selector: '.flink',
      options: {
        lazyLoad: true,
        animation: true,
        clickTracking: true
      }
    },
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
function initComments() {
  const config = window.PJAX_CONFIG?.comments || {};
  const logger = window.PJAX_LOGGER || console;
  if (config.twikoo?.enabled && typeof twikoo !== 'undefined') {
    const tcommentEl = document.querySelector(config.twikoo.selector);
    if (tcommentEl) {
      try {
        tcommentEl.innerHTML = '';
        const initOptions = {
          envId: config.twikoo.envId,
          el: tcommentEl,
          ...config.twikoo.options
        };
        twikoo.init(initOptions);
        logger.info('Twikoo 评论系统已重新初始化');
      } catch (error) {
        logger.error('Twikoo 初始化失败: ' + error.message);
      }
    }
  }
}
function initMusic() {
  const config = window.PJAX_CONFIG?.music || {};
  const logger = window.PJAX_LOGGER || console;
  if (config.aplayer?.enabled) {
    try {
      let currentState = null;
      if (config.aplayer.preserveState && window.aplayers && window.aplayers.length > 0) {
        const currentPlayer = window.aplayers[0];
        if (currentPlayer && !currentPlayer.audio.paused) {
          currentState = {
            currentTime: currentPlayer.audio.currentTime,
            paused: currentPlayer.audio.paused,
            volume: currentPlayer.audio.volume
          };
        }
      }
      if (window.aplayers && window.aplayers.length > 0) {
        window.aplayers.forEach(player => {
          if (player && typeof player.destroy === 'function') {
            player.destroy();
          }
        });
        window.aplayers = [];
      }
      if (typeof loadMeting === 'function') {
        loadMeting();
        if (currentState && config.aplayer.preserveState) {
          setTimeout(() => {
            if (window.aplayers && window.aplayers.length > 0) {
              const newPlayer = window.aplayers[0];
              if (newPlayer) {
                newPlayer.audio.currentTime = currentState.currentTime;
                newPlayer.audio.volume = currentState.volume;
                if (!currentState.paused) {
                  newPlayer.play();
                }
              }
            }
          }, 1000);
        }
      } else {
        const aplayerElements = document.querySelectorAll(config.aplayer.selector);
        aplayerElements.forEach(element => {
          if (!element.classList.contains('aplayer-initialized')) {
            element.classList.add('aplayer-initialized');
          }
        });
      } 
      logger.info('APlayer 音乐播放器已重新初始化');
    } catch (error) {
      logger.error('APlayer 初始化失败: ' + error.message);
    }
  }
}
function initHighlight() {
  const config = window.PJAX_CONFIG?.highlight || {};
  const logger = window.PJAX_LOGGER || console;
  if (!config.enabled) return; 
  try {
    if (typeof btf !== 'undefined' && typeof GLOBAL_CONFIG !== 'undefined') {
      const addHighlightTool = function () {
        const highLight = GLOBAL_CONFIG.highlight;
        if (!highLight) return;
        const isHighlightCopy = highLight.highlightCopy && config.features.copy;
        const isHighlightLang = highLight.highlightLang && config.features.lang;
        const isHighlightShrink = GLOBAL_CONFIG_SITE?.isHighlightShrink && config.features.shrink;
        const highlightHeightLimit = highLight.highlightHeightLimit;
        const isShowTool = isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined;
        const $figureHighlight = highLight.plugin === 'highlighjs' ? 
          document.querySelectorAll('figure.highlight') : 
          document.querySelectorAll('pre[class*="language-"]');
        if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length)) return;
        $figureHighlight.forEach(item => {
          if (!item.querySelector('.highlight-tools')) {
            const hlTools = document.createElement('div');
            hlTools.className = 'highlight-tools';
            if (isHighlightCopy) {
              const copyBtn = document.createElement('i');
              copyBtn.className = 'fas fa-paste copy-button';
              copyBtn.title = '复制代码';
              hlTools.appendChild(copyBtn);
            }
            if (isHighlightLang) {
              const langDiv = document.createElement('div');
              langDiv.className = 'code-lang';
              const lang = item.className.match(/language-(\w+)/)?.[1] || 'text';
              langDiv.textContent = lang;
              hlTools.appendChild(langDiv);
            }
            if (isHighlightShrink !== undefined) {
              const expandBtn = document.createElement('i');
              expandBtn.className = 'fas fa-angle-down expand';
              hlTools.appendChild(expandBtn);
            }
            item.appendChild(hlTools);
          }
        });
      };
      addHighlightTool();
    }
    if (config.plugins.includes('prismjs') && typeof Prism !== 'undefined') {
      Prism.highlightAll();
      logger.debug('Prism.js 代码高亮已重新应用');
    }
    if (config.plugins.includes('highlightjs') && typeof hljs !== 'undefined') {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
      logger.debug('highlight.js 代码高亮已重新应用');
    }
    logger.info('代码高亮已重新初始化');
  } catch (error) {
    logger.error('代码高亮初始化失败: ' + error.message);
  }
}
function initOtherFeatures() {
  const config = window.PJAX_CONFIG?.features || {};
  const logger = window.PJAX_LOGGER || console;
  try {
    if (config.tooltip?.enabled && typeof tippy !== 'undefined') {
      const existingInstances = document.querySelectorAll('[data-tippy-content]');
      existingInstances.forEach(el => {
        if (el._tippy) {
          el._tippy.destroy();
        }
      });
      tippy(config.tooltip.selector);
      logger.debug('工具提示已重新初始化');
    }
    if (config.fancybox?.enabled && typeof Fancybox !== 'undefined') {
      Fancybox.destroy();
      Fancybox.bind(config.fancybox.selector);
      logger.debug('Fancybox 已重新初始化');
    }
    if (config.mediumZoom?.enabled && typeof mediumZoom !== 'undefined') {
      if (window.mediumZoomInstance) {
        window.mediumZoomInstance.detach();
      }
      window.mediumZoomInstance = mediumZoom(
        config.mediumZoom.selector, 
        config.mediumZoom.options
      );
      logger.debug('Medium Zoom 已重新初始化');
    }
    if (config.search?.enabled) {
      if (config.search.type === 'local' && typeof localSearch !== 'undefined') {
        localSearch.init();
        logger.debug('本地搜索已重新初始化');
      } else if (config.search.type === 'algolia' && typeof algoliaSearch !== 'undefined') {
        algoliaSearch.init();
        logger.debug('Algolia 搜索已重新初始化');
      }
    }
    logger.info('其他功能已重新初始化');
  } catch (error) {
    logger.error('其他功能初始化失败: ' + error.message);
  }
}
function pjaxReload() {
  const logger = window.PJAX_LOGGER || console;
  logger.info('开始 pjax 重新初始化...');
  setTimeout(() => {
    const startTime = performance.now();
    try {
      initComments();
      initMusic();
      initHighlight();
      initOtherFeatures();
      const endTime = performance.now();
      logger.info(`pjax 重新初始化完成，耗时: ${(endTime - startTime).toFixed(2)}ms`);
      const event = new CustomEvent('pjax:init:complete', {
        detail: {
          timestamp: Date.now(),
          duration: endTime - startTime
        }
      });
      document.dispatchEvent(event);   
    } catch (error) {
      logger.error('pjax 重新初始化过程中发生错误: ' + error.message);
    }
  }, 100);
}
function initialLoad() {
  const logger = window.PJAX_LOGGER || console;
  logger.info('页面首次加载，开始初始化...');
  pjaxReload();
}
document.addEventListener('pjax:complete', pjaxReload);
document.addEventListener('DOMContentLoaded', initialLoad);
document.addEventListener('pjax:success', pjaxReload);
(function() {
  'use strict';
  const FLINK_CONFIG = {
    selectors: {
      container: '.flink',
      listItem: '.flink-list-item',
      itemIcon: '.flink-item-icon',
      itemImage: '.flink-item-icon img',
      itemName: '.flink-item-name',
      itemDesc: '.flink-item-desc',
      itemLink: '.flink-list-item a'
    },
    animation: {
      duration: 300,
      easing: 'ease-in-out'
    },
    lazyLoad: {
      threshold: 0.1,
      rootMargin: '50px'
    },
    errorImage: '/gulp/friend_404.gif'
  };
  const FlinkManager = {
    initialized: false,
    observers: new Map(),
    init() {
      if (this.initialized) {
        this.cleanup();
      }
      const container = document.querySelector(FLINK_CONFIG.selectors.container);
      if (!container) {
        console.debug('[Flink] 友链容器未找到，跳过初始化');
        return;
      }
      console.debug('[Flink] 开始初始化友链功能');
      this.initImageLazyLoad();
      this.initImageErrorHandler();
      this.initHoverEffects();
      this.initAnimations();
      this.initialized = true;
      console.debug('[Flink] 友链功能初始化完成');
    },
    cleanup() {
      console.debug('[Flink] 清理友链资源');
      this.observers.forEach(observer => {
        if (observer && typeof observer.disconnect === 'function') {
          observer.disconnect();
        }
      });
      this.observers.clear();
      const items = document.querySelectorAll(FLINK_CONFIG.selectors.listItem);
      items.forEach(item => {
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
      });
      this.initialized = false;
    },
    initImageLazyLoad() {
      if (!('IntersectionObserver' in window)) {
        console.debug('[Flink] 浏览器不支持 IntersectionObserver，跳过懒加载');
        return;
      }
      const images = document.querySelectorAll(FLINK_CONFIG.selectors.itemImage);
      if (images.length === 0) return;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src') || img.src;
            if (src && !img.classList.contains('loaded')) {
              this.loadImage(img, src);
              observer.unobserve(img);
            }
          }
        });
      }, FLINK_CONFIG.lazyLoad);
      images.forEach(img => {
        if (!img.complete || img.naturalHeight === 0) {
          observer.observe(img);
        }
      });
      this.observers.set('lazyLoad', observer);
    },
    loadImage(img, src) {
      return new Promise((resolve, reject) => {
        const tempImg = new Image();
        tempImg.onload = () => {
          img.src = src;
          img.classList.add('loaded');
          this.addImageLoadAnimation(img);
          resolve();
        };
        tempImg.onerror = () => {
          this.handleImageError(img);
          reject();
        };
        tempImg.src = src;
      });
    },
    initImageErrorHandler() {
      const images = document.querySelectorAll(FLINK_CONFIG.selectors.itemImage);
      images.forEach(img => {
        img.onerror = null;
        img.addEventListener('error', (e) => {
          this.handleImageError(e.target);
        }, { once: true });
      });
    },
    handleImageError(img) {
      if (img.classList.contains('error-handled')) return;
      img.classList.add('error-handled');
      const errorImg = window.theme?.error_img?.flink || FLINK_CONFIG.errorImage;
      if (img.src !== errorImg) {
        img.src = errorImg;
      } else {
        img.style.display = 'none';
        const placeholder = this.createImagePlaceholder();
        img.parentNode.appendChild(placeholder);
      }
    },
    createImagePlaceholder() {
      const placeholder = document.createElement('div');
      placeholder.className = 'flink-image-placeholder';
      placeholder.innerHTML = '<i class="fas fa-user-circle"></i>';
      placeholder.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--card-bg);
        color: var(--font-color);
        font-size: 2rem;
        border-radius: 50%;
      `;
      return placeholder;
    },
    addImageLoadAnimation(img) {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.8)';
      img.style.transition = `opacity ${FLINK_CONFIG.animation.duration}ms ${FLINK_CONFIG.animation.easing}, transform ${FLINK_CONFIG.animation.duration}ms ${FLINK_CONFIG.animation.easing}`;
      img.offsetHeight;
      img.style.opacity = '1';
      img.style.transform = 'scale(1)';
    },
    initHoverEffects() {
      const items = document.querySelectorAll(FLINK_CONFIG.selectors.listItem);
      items.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
          this.handleItemHover(e.currentTarget, true);
        });
        item.addEventListener('mouseleave', (e) => {
          this.handleItemHover(e.currentTarget, false);
        });
      });
    },
    handleItemHover(item, isEnter) {
      const icon = item.querySelector(FLINK_CONFIG.selectors.itemIcon);
      const name = item.querySelector(FLINK_CONFIG.selectors.itemName);
      const desc = item.querySelector(FLINK_CONFIG.selectors.itemDesc);
      if (isEnter) {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
        if (icon) {
          icon.style.transform = 'scale(1.1) rotate(5deg)';
        }
        if (name) {
          name.style.color = 'var(--theme-color)';
        }
        if (desc) {
          desc.style.opacity = '0.8';
        }
      } else {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '';
        if (icon) {
          icon.style.transform = 'scale(1) rotate(0deg)';
        }
        if (name) {
          name.style.color = '';
        }
        if (desc) {
          desc.style.opacity = '';
        }
      }
    },
    addClickFeedback(element) {
      element.style.transform = 'scale(0.95)';
      element.style.transition = 'transform 150ms ease-out';
      setTimeout(() => {
        element.style.transform = '';
      }, 150);
    },
    initAnimations() {
      const items = document.querySelectorAll(FLINK_CONFIG.selectors.listItem);
      items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity ${FLINK_CONFIG.animation.duration}ms ${FLINK_CONFIG.animation.easing} ${index * 100}ms, transform ${FLINK_CONFIG.animation.duration}ms ${FLINK_CONFIG.animation.easing} ${index * 100}ms`;
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }, 50);
      });
    },
    refresh() {
      console.debug('[Flink] 刷新友链功能');
      this.init();
    }
  };
  const initFlinkPjax = () => {
    document.addEventListener('DOMContentLoaded', () => {
      FlinkManager.init();
    });
    document.addEventListener('pjax:complete', () => {
      setTimeout(() => {
        FlinkManager.init();
      }, 100);
    });
    document.addEventListener('pjax:send', () => {
      FlinkManager.cleanup();
    });
    window.addEventListener('beforeunload', () => {
      FlinkManager.cleanup();
    });
  };
  window.FlinkManager = FlinkManager;
  if (document.readyState === 'loading') {
    initFlinkPjax();
  } else {
    FlinkManager.init();
    initFlinkPjax();
  }
  console.debug('[Flink] 友链 PJAX 适配模块已加载');
})();