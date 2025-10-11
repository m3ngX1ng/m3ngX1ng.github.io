function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}
const throttledPercent = throttle(percent, 100);
document.addEventListener('pjax:complete', function () {
  window.onscroll = throttledPercent;
});
document.addEventListener('DOMContentLoaded', function () {
  window.onscroll = throttledPercent;
});
function percent() {
  try {
    if (typeof rmf !== 'undefined' && rmf.showRightMenu) {
      rmf.showRightMenu(false);
    }
    if (typeof $ !== 'undefined') {
      $('.rmMask').attr('style', 'display: none');
    }
  } catch (err) {
    console.warn('Failed to hide right menu:', err.message);
  }
  let a = document.documentElement.scrollTop,
    b = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round(a / b * 100),
    btn = document.querySelector("#go-up"); 
  if (btn && btn.childNodes.length >= 2) {
    if (result < 95) {
      btn.childNodes[0].style.display = 'none';
      btn.childNodes[1].style.display = 'block';
      btn.childNodes[1].innerHTML = result + '<span>%</span>';
    } else {
      btn.childNodes[1].style.display = 'none';
      btn.childNodes[0].style.display = 'block';
    }
  }
}
document.addEventListener('pjax:complete', tonav);
document.addEventListener('DOMContentLoaded', tonav);
function tonav() {
  const nameContainer = document.getElementById("name-container");
  const menuItems = document.getElementsByClassName("menus_items")[1];
  const pageName = document.getElementById("page-name");
  if (!nameContainer || !menuItems || !pageName) return;
  nameContainer.style.display = "none";
  $(window).off('scroll.tonav');
  var position = $(window).scrollTop();
  $(window).on('scroll.tonav', function () {
    var scroll = $(window).scrollTop();
    if (scroll > position) {
      nameContainer.style.display = "";
      menuItems.style.display = "none";
    } else {
      menuItems.style.display = "";
      nameContainer.style.display = "none";
    }
    position = scroll;
  });
  pageName.innerText = document.title.split(" | 梦~醒🍇")[0];
}
function scrollToTop() {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}
$.ajax({
  type: 'get',
  url: 'https://apis.map.qq.com/ws/location/v1/ip',
  data: {
    key: '3IPBZ-CIUWM-E5O6O-6Z6RI-TZGWV-6SBG5',
    output: 'jsonp',
  },
  dataType: 'jsonp',
  success: function (res) {
    ipLocation = res;
  },
  error: function(xhr, status, error) {
    console.error('Map API request failed:', status, error);
    ipLocation = {
      result: {
        location: { lng: 114.335981, lat: 30.583783 },
        ad_info: { nation: '中国', province: '湖北省', city: '武汉市' }
      }
    };
  }
});
function getDistance(e1, n1, e2, n2) {
  const R = 6371
  const { sin, cos, asin, PI, hypot } = Math
  let getPoint = (e, n) => {
    e *= PI / 180
    n *= PI / 180
    return { x: cos(n) * cos(e), y: cos(n) * sin(e), z: sin(n) }
  }
  let a = getPoint(e1, n1)
  let b = getPoint(e2, n2)
  let c = hypot(a.x - b.x, a.y - b.y, a.z - b.z)
  let r = asin(c / 2) * 2 * R
  return Math.round(r);
}
function showWelcome() {
  let dist = getDistance(114.335981, 30.583783, ipLocation.result.location.lng, ipLocation.result.location.lat);
  let pos = ipLocation.result.ad_info.nation;
  let ip;
  let posdesc;
  switch (ipLocation.result.ad_info.nation) {
    case "日本":
      posdesc = "よろしく，一起去看樱花吗";
      break;
    case "美国":
      posdesc = "Let us live in peace!";
      break;
    case "英国":
      posdesc = "想同你一起夜乘伦敦眼";
      break;
    case "俄罗斯":
      posdesc = "干了这瓶伏特加！";
      break;
    case "法国":
      posdesc = "C'est La Vie";
      break;
    case "德国":
      posdesc = "Die Zeit verging im Fluge.";
      break;
    case "澳大利亚":
      posdesc = "一起去大堡礁吧！";
      break;
    case "加拿大":
      posdesc = "拾起一片枫叶赠予你";
      break;
    case "中国":
      pos = ipLocation.result.ad_info.province + " " + ipLocation.result.ad_info.city + " " + ipLocation.result.ad_info.district;
      ip = ipLocation.result.ip;
      switch (ipLocation.result.ad_info.province) {
        case "北京市":
          posdesc = "北——京——欢迎你~~~";
          break;
        case "天津市":
          posdesc = "讲段相声吧。";
          break;
        case "河北省":
          posdesc = "山势巍巍成壁垒，天下雄关。铁马金戈由此向，无限江山。";
          break;
        case "山西省":
          posdesc = "展开坐具长三尺，已占山河五百余。";
          break;
        case "内蒙古自治区":
          posdesc = "天苍苍，野茫茫，风吹草低见牛羊。";
          break;
        case "辽宁省":
          posdesc = "我想吃烤鸡架！";
          break;
        case "吉林省":
          posdesc = "状元阁就是东北烧烤之王。";
          break;
        case "黑龙江省":
          posdesc = "很喜欢哈尔滨大剧院。";
          break;
        case "上海市":
          posdesc = "众所周知，中国只有两个城市。";
          break;
        case "江苏省":
          switch (ipLocation.result.ad_info.city) {
            case "南京市":
              posdesc = "这是我挺想去的城市啦。";
              break;
            case "苏州市":
              posdesc = "上有天堂，下有苏杭。";
              break;
            default:
              posdesc = "散装是必须要散装的。";
              break;
          }
          break;
        case "浙江省":
          posdesc = "东风渐绿西湖柳，雁已还人未南归。";
          break;
        case "河南省":
          switch (ipLocation.result.ad_info.city) {
            case "郑州市":
              posdesc = "豫州之域，天地之中。";
              break;
            case "南阳市":
              posdesc = "臣本布衣，躬耕于南阳。此南阳非彼南阳！";
              break;
            case "驻马店市":
              posdesc = "峰峰有奇石，石石挟仙气。嵖岈山的花很美哦！";
              break;
            case "开封市":
              posdesc = "刚正不阿包青天。";
              break;
            case "洛阳市":
              posdesc = "洛阳牡丹甲天下。";
              break;
            default:
              posdesc = "可否带我品尝河南烩面啦？";
              break;
          }
          break;
        case "安徽省":
          posdesc = "蚌埠住了，芜湖起飞。";
          break;
        case "福建省":
          posdesc = "井邑白云间，岩城远带山。";
          break;
        case "江西省":
          posdesc = "落霞与孤鹜齐飞，秋水共长天一色。";
          break;
        case "山东省":
          posdesc = "遥望齐州九点烟，一泓海水杯中泻。";
          break;
        case "湖北省":
          posdesc = "来碗热干面！";
          break;
        case "湖南省":
          posdesc = "74751，长沙斯塔克。";
          break;
        case "广东省":
          posdesc = "老板来两斤福建人。";
          break;
        case "广西壮族自治区":
          posdesc = "桂林山水甲天下。";
          break;
        case "海南省":
          posdesc = "朝观日出逐白浪，夕看云起收霞光。";
          break;
        case "四川省":
          posdesc = "康康川妹子。";
          break;
        case "贵州省":
          posdesc = "茅台，学生，再塞200。";
          break;
        case "云南省":
          posdesc = "玉龙飞舞云缠绕，万仞冰川直耸天。";
          break;
        case "西藏自治区":
          posdesc = "躺在茫茫草原上，仰望蓝天。";
          break;
        case "陕西省":
          posdesc = "来份臊子面加馍。";
          break;
        case "甘肃省":
          posdesc = "羌笛何须怨杨柳，春风不度玉门关。";
          break;
        case "青海省":
          posdesc = "牛肉干和老酸奶都好好吃。";
          break;
        case "宁夏回族自治区":
          posdesc = "大漠孤烟直，长河落日圆。";
          break;
        case "新疆维吾尔自治区":
          posdesc = "驼铃古道丝绸路，胡马犹闻唐汉风。";
          break;
        case "台湾省":
          posdesc = "我在这头，大陆在那头。";
          break;
        case "香港特别行政区":
          posdesc = "永定贼有残留地鬼嚎，迎击光非岁玉。";
          break;
        case "澳门特别行政区":
          posdesc = "性感荷官，在线发牌。";
          break;
        default:
          posdesc = "带我去你的城市逛逛吧！";
          break;
      }
      break;
    default:
      posdesc = "带我去你的国家逛逛吧。";
      break;
  }
  let timeChange;
  let date = new Date();
  if (date.getHours() >= 5 && date.getHours() < 11) timeChange = "<span>上午好</span>，一日之计在于晨！";
  else if (date.getHours() >= 11 && date.getHours() < 13) timeChange = "<span>中午好</span>，该摸鱼吃午饭了。";
  else if (date.getHours() >= 13 && date.getHours() < 15) timeChange = "<span>下午好</span>，懒懒地睡个午觉吧！";
  else if (date.getHours() >= 15 && date.getHours() < 16) timeChange = "<span>三点几啦</span>，一起饮茶呀！";
  else if (date.getHours() >= 16 && date.getHours() < 19) timeChange = "<span>夕阳无限好！</span>";
  else if (date.getHours() >= 19 && date.getHours() < 24) timeChange = "<span>晚上好</span>，夜生活嗨起来！";
  else timeChange = "夜深了，早点休息，少熬夜。";
  try {
    document.getElementById("welcome-info").innerHTML =
      `<b><center>🎉 欢迎信息 🎉</center>&emsp;&emsp;欢迎来自 <span style="color:var(--theme-color)">${pos}</span> 的小伙伴，${timeChange}您现在距离站长约 <span style="color:var(--theme-color)">${dist}</span> 公里，当前的IP地址为： <span style="color:var(--theme-color)">${ip}</span>， ${posdesc}</b>`;
  } catch (err) {
    console.log("虽然不知道你是哪里人，但同在一个地球，欢迎欢迎🎉🎉🎉")
  }
}
window.onload = showWelcome;
document.addEventListener('pjax:complete', showWelcome);
let TT = null;  
function debounce(fn, time) {
  if (TT !== null) clearTimeout(TT);
  TT = setTimeout(fn, time);
}
document.addEventListener("copy", function () {
  debounce(function () {
    new Vue({
      data: function () {
        return {};
      },
      mounted: function () {
        this.$notify({
          title: "哎嘿！复制成功🍬",
          message: "若要转载最好保留原文链接哦，给你一个大大的赞！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }, 300);
})
document.onkeydown = function (e) {
  if (123 == e.key || (e.ctrlKey && e.shiftKey && (74 === e.key || 73 === e.key || 67 === e.key)) || (e.ctrlKey && 85 === e.key)) {
    debounce(function () {
      new Vue({
        data: function () {
          return {};
        },
        mounted: function () {
          this.$notify({
            title: "你已被发现😜",
            message: "小伙子，扒源记住要遵循GPL协议！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "warning",
            duration: 5000
          });
        }
      })
    }, 300);
  }
};
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {

} else {
  // document.write('<canvas id="snow" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:-2;pointer-events:none"></canvas>');
  window && (() => {
    let e = {
      flakeCount: 50, 
      minDist: 150,  
      color: "255, 255, 255", 
      size: 1.5,  
      speed: .5, 
      opacity: .7,  
      stepsize: .5 
    };
    const t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
      window.setTimeout(e, 1e3 / 60)
    }
      ;
    window.requestAnimationFrame = t;
    const i = document.getElementById("snow"),
      n = i.getContext("2d"),
      o = e.flakeCount;
    let a = -100,
      d = -100,
      s = [];
    i.width = window.innerWidth,
      i.height = window.innerHeight;
    const h = () => {
      n.clearRect(0, 0, i.width, i.height);
      const r = e.minDist;
      for (let t = 0; t < o; t++) {
        let o = s[t];
        const h = a,
          w = d,
          m = o.x,
          c = o.y,
          p = Math.sqrt((h - m) * (h - m) + (w - c) * (w - c));
        if (p < r) {
          const e = (h - m) / p,
            t = (w - c) / p,
            i = r / (p * p) / 2;
          o.velX -= i * e,
            o.velY -= i * t
        } else
          o.velX *= .98,
            o.velY < o.speed && o.speed - o.velY > .01 && (o.velY += .01 * (o.speed - o.velY)),
            o.velX += Math.cos(o.step += .05) * o.stepSize;
        n.fillStyle = "rgba(" + e.color + ", " + o.opacity + ")",
          o.y += o.velY,
          o.x += o.velX,
          (o.y >= i.height || o.y <= 0) && l(o),
          (o.x >= i.width || o.x <= 0) && l(o),
          n.beginPath(),
          n.arc(o.x, o.y, o.size, 0, 2 * Math.PI),
          n.fill()
      }
      t(h)
    }
      , l = e => {
        e.x = Math.floor(Math.random() * i.width),
          e.y = 0,
          e.size = 3 * Math.random() + 2,
          e.speed = 1 * Math.random() + .5,
          e.velY = e.speed,
          e.velX = 0,
          e.opacity = .5 * Math.random() + .3
      }
      ;
    document.addEventListener("mousemove", (e => {
      a = e.clientX,
        d = e.clientY
    }
    )),
      window.addEventListener("resize", (() => {
        i.width = window.innerWidth,
          i.height = window.innerHeight
      }
      )),
      (() => {
        for (let t = 0; t < o; t++) {
          const t = Math.floor(Math.random() * i.width)
            , n = Math.floor(Math.random() * i.height)
            , o = 3 * Math.random() + e.size
            , a = 1 * Math.random() + e.speed
            , d = .5 * Math.random() + e.opacity;
          s.push({
            speed: a,
            velX: 0,
            velY: a,
            x: t,
            y: n,
            size: o,
            stepSize: Math.random() / 30 * e.stepsize,
            step: 0,
            angle: 180,
            opacity: d
          })
        }
        h()
      }
      )()
  }
  )();
}
function dark() {
  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  var n, e, i, h, t = .05,
    s = document.getElementById("universe"),
    o = !0,
    a = "180,184,240",
    r = "226,225,142",
    d = "226,225,224",
    c = [];
  function f() {
    n = window.innerWidth, e = window.innerHeight, i = .216 * n, s.setAttribute("width", n), s.setAttribute("height", e)
  }
  function u() {
    h.clearRect(0, 0, n, e);
    for (var t = c.length, i = 0; i < t; i++) {
      var s = c[i];
      s.move(), s.fadeIn(), s.fadeOut(), s.draw()
    }
  }
  function y() {
    this.reset = function () {
      this.giant = m(3), this.comet = !this.giant && !o && m(10), this.x = l(0, n - 10), this.y = l(0, e), this.r = l(1.1, 2.6), this.dx = l(t, 6 * t) + (this.comet + 1 - 1) * t * l(50, 120) + 2 * t, this.dy = -l(t, 6 * t) - (this.comet + 1 - 1) * t * l(50, 120), this.fadingOut = null, this.fadingIn = !0, this.opacity = 0, this.opacityTresh = l(.2, 1 - .4 * (this.comet + 1 - 1)), this.do = l(5e-4, .002) + .001 * (this.comet + 1 - 1)
    }, this.fadeIn = function () {
      this.fadingIn && (this.fadingIn = !(this.opacity > this.opacityTresh), this.opacity += this.do)
    }, this.fadeOut = function () {
      this.fadingOut && (this.fadingOut = !(this.opacity < 0), this.opacity -= this.do / 2, (this.x > n || this.y < 0) && (this.fadingOut = !1, this.reset()))
    }, this.draw = function () {
      if (h.beginPath(), this.giant) h.fillStyle = "rgba(" + a + "," + this.opacity + ")", h.arc(this.x, this.y, 2, 0, 2 * Math.PI, !1); else if (this.comet) {
        h.fillStyle = "rgba(" + d + "," + this.opacity + ")", h.arc(this.x, this.y, 1.5, 0, 2 * Math.PI, !1); for (var t = 0; t < 30; t++)h.fillStyle = "rgba(" + d + "," + (this.opacity - this.opacity / 20 * t) + ")", h.rect(this.x - this.dx / 4 * t, this.y - this.dy / 4 * t - 2, 2, 2), h.fill()
      } else h.fillStyle = "rgba(" + r + "," + this.opacity + ")", h.rect(this.x, this.y, this.r, this.r);
      h.closePath(), h.fill()
    }, this.move = function () {
      this.x += this.dx, this.y += this.dy, !1 === this.fadingOut && this.reset(), (this.x > n - n / 4 || this.y < 0) && (this.fadingOut = !0)
    }, setTimeout(function () {
      o = !1
    }, 50)
  }
  function m(t) {
    return Math.floor(1e3 * Math.random()) + 1 < 10 * t
  }
  function l(t, i) {
    return Math.random() * (i - t) + t
  }
  f(), window.addEventListener("resize", f, !1), function () {
    h = s.getContext("2d");
    for (var t = 0; t < i; t++) c[t] = new y, c[t].reset();
    u()
  }(), function t() {
    document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark' && u(), window.requestAnimationFrame(t)
  }()
};
dark()
document.addEventListener('pjax:complete', function () {
  if (document.getElementById('post-comment')) owoBig();
});
document.addEventListener('DOMContentLoaded', function () {
  if (document.getElementById('post-comment')) owoBig();
});
function owoBig() {
  let flag = 1, 
    owo_time = '',
    m = 3;
  let div = document.createElement('div'),
    body = document.querySelector('body');
  div.id = 'owo-big';
  body.appendChild(div)
  let observer = new MutationObserver(mutations => {
    for (let i = 0; i < mutations.length; i++) {
      let dom = mutations[i].addedNodes,
        owo_body = '';
      if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
      // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
      else continue;
      if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
      owo_body.onmouseover = (e) => {
        if (flag && e.target.tagName == 'IMG') {
          flag = 0;
          owo_time = setTimeout(() => {
            let height = e.path[0].clientHeight * m,
              width = e.path[0].clientWidth * m,
              left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2,
              top = e.y - e.offsetY;

            if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10);
            if (left < 0) left = 10; 
            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
            div.innerHTML = `<img src="${e.target.src}">`
          }, 300);
        }
      };
      owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
    }
  })
  observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true })
}
function randomPost() {
  fetch('/baidusitemap.xml').then(res => res.text()).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then(data => {
    let ls = data.querySelectorAll('url loc');
    while (true) {
      let url = ls[Math.floor(Math.random() * ls.length)].innerHTML;
      if (location.href == url) continue;
      location.href = url;
      return;
    }
  })
}
if (document.body.clientWidth > 992) {
  function getBasicInfo() {
    var ViewH = $(window).height();
    var DocH = $("body")[0].scrollHeight;
    var ScrollTop = $(window).scrollTop();
    var S_V = DocH - ViewH;
    var Band_H = ScrollTop / (DocH - ViewH) * 100;
    return {
      ViewH: ViewH,
      DocH: DocH,
      ScrollTop: ScrollTop,
      Band_H: Band_H,
      S_V: S_V
    }
  };
  function show(basicInfo) {
    if (basicInfo.ScrollTop > 0.001) {
      $(".neko").css('display', 'block');
    } else {
      $(".neko").css('display', 'none');
    }
  }
  (function ($) {
    $.fn.nekoScroll = function (option) {
      var defaultSetting = {
        top: '0',
        scroWidth: 6 + 'px',
        z_index: 9999,
        zoom: 0.9,
        borderRadius: 5 + 'px',
        right: 55.6 + 'px',
        nekoImg: "https://bu.dusays.com/2022/07/20/62d812db74be9.png",
        hoverMsg: "喵呜~",
        color: "var(--theme-color)",
        during: 500,
        blog_body: "body",
      };
      var setting = $.extend(defaultSetting, option);
      var getThis = this.prop("className") !== "" ? "." + this.prop("className") : this.prop("id") !== "" ? "#" +
        this.prop("id") : this.prop("nodeName");
      if ($(".neko").length == 0) {
        this.after("<div class=\"neko\" id=" + setting.nekoname + " data-msg=\"" + setting.hoverMsg + "\"></div>");
      }
      let basicInfo = getBasicInfo();
      $(getThis)
        .css({
          'position': 'fixed',
          'width': setting.scroWidth,
          'top': setting.top,
          'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
          'z-index': setting.z_index,
          'background-color': setting.bgcolor,
          "border-radius": setting.borderRadius,
          'right': setting.right,
          'background-image': 'url(' + setting.scImg + ')',
          'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
          'background-size': 'contain'
        });
      $("#" + setting.nekoname)
        .css({
          'position': 'fixed',
          'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
          'z-index': setting.z_index * 10,
          'right': setting.right,
          'background-image': 'url(' + setting.nekoImg + ')',
        });
      show(getBasicInfo());
      $(window)
        .scroll(function () {
          let basicInfo = getBasicInfo();
          show(basicInfo);
          $(getThis)
            .css({
              'position': 'fixed',
              'width': setting.scroWidth,
              'top': setting.top,
              'height': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 + 'px',
              'z-index': setting.z_index,
              'background-color': setting.bgcolor,
              "border-radius": setting.borderRadius,
              'right': setting.right,
              'background-image': 'url(' + setting.scImg + ')',
              'background-image': '-webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.1) 75%, transparent 75%, transparent)', 'border-radius': '2em',
              'background-size': 'contain'
            });
          $("#" + setting.nekoname)
            .css({
              'position': 'fixed',
              'top': basicInfo.Band_H * setting.zoom * basicInfo.ViewH * 0.01 - 50 + 'px',
              'z-index': setting.z_index * 10,
              'right': setting.right,
              'background-image': 'url(' + setting.nekoImg + ')',
            });
          if (basicInfo.ScrollTop == basicInfo.S_V) {
            $("#" + setting.nekoname)
              .addClass("showMsg")
          } else {
            $("#" + setting.nekoname)
              .removeClass("showMsg");
            $("#" + setting.nekoname)
              .attr("data-msg", setting.hoverMsg);
          }
        });
      this.click(function (e) {
        btf.scrollToDest(0, 500)
      });
      $("#" + setting.nekoname)
        .click(function () {
          btf.scrollToDest(0, 500)
        });
      return this;
    }
  })(jQuery);
  $(document).ready(function () {
    $("#myscoll").nekoScroll({
      bgcolor: 'rgb(0 0 0 / .5)',
      borderRadius: '2em',
      zoom: 0.9
    }
    );

  })
}
function setMask() {
  if (document.getElementsByClassName("rmMask")[0] != undefined)
    return document.getElementsByClassName("rmMask")[0];
  mask = document.createElement('div');
  mask.className = "rmMask";
  mask.style.width = window.innerWidth + 'px';
  mask.style.height = window.innerHeight + 'px';
  mask.style.background = '#fff';
  mask.style.opacity = '.0';
  mask.style.position = 'fixed';
  mask.style.top = '0';
  mask.style.left = '0';
  mask.style.zIndex = 998;
  document.body.appendChild(mask);
  document.getElementById("rightMenu").style.zIndex = 19198;
  return mask;
}
function insertAtCursor(myField, myValue) {
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
    sel.select();
  }
  else if (myField.selectionStart || myField.selectionStart == '0') {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    var restoreTop = myField.scrollTop;
    myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
    if (restoreTop > 0) {
      myField.scrollTop = restoreTop;
    }
    myField.focus();
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
    myField.focus();
  }
}
let rmf = {};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $('#rightMenu');
  $rightMenu.css('top', x + 'px').css('left', y + 'px');
  if (isTrue) {
    $rightMenu.show();
  } else {
    $rightMenu.hide();
  }
}
rmf.copyWordsLink = function () {
  let url = window.location.href
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa)
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
}
rmf.switchReadMode = function () {
  const $body = document.body
  $body.classList.add('read-mode')
  const newEle = document.createElement('button')
  newEle.type = 'button'
  newEle.className = 'fas fa-sign-out-alt exit-readmode'
  $body.appendChild(newEle)
  function clickFn() {
    $body.classList.remove('read-mode')
    newEle.remove()
    newEle.removeEventListener('click', clickFn)
  }
  newEle.addEventListener('click', clickFn)
}
rmf.copySelect = function () {
  document.execCommand('Copy', false, null);
}
rmf.scrollToTop = function () {
  document.getElementsByClassName("menus_items")[1].setAttribute("style", "");
  document.getElementById("name-container").setAttribute("style", "display:none");
  btf.scrollToDest(0, 500);
}
document.body.addEventListener('touchmove', function () {
}, { passive: false });
function popupMenu() {
  window.oncontextmenu = function (event) {
    // if (event.ctrlKey) return true;
    if (mouseMode == "off") return true;
    $('.rightMenu-group.hide').hide();
    if (document.getSelection().toString()) {
      $('#menu-text').show();
    }
    if (document.getElementById('post')) {
      $('#menu-post').show();
    } else {
      if (document.getElementById('page')) {
        $('#menu-post').show();
      }
    }
    var el = window.document.body;
    el = event.target;
    var a = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/
    if (a.test(window.getSelection().toString()) && el.tagName != "A") {
      $('#menu-too').show()
    }
    if (el.tagName == 'A') {
      $('#menu-to').show()
      rmf.open = function () {
        if (el.href.indexOf("http://") == -1 && el.href.indexOf("https://") == -1 || el.href.indexOf("yisous.xyz") != -1) {
          pjax.loadUrl(el.href)
        }
        else {
          location.href = el.href
        }
      }
      rmf.openWithNewTab = function () {
        window.open(el.href);
        // window.location.reload();
      }
      rmf.copyLink = function () {
        let url = el.href
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa)
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      }
    } else if (el.tagName == 'IMG') {
      $('#menu-img').show()
      rmf.openWithNewTab = function () {
        window.open(el.src);
        // window.location.reload();
      }
      rmf.click = function () {
        el.click()
      }
      rmf.copyLink = function () {
        let url = el.src
        let txa = document.createElement("textarea");
        txa.value = url;
        document.body.appendChild(txa)
        txa.select();
        document.execCommand("Copy");
        document.body.removeChild(txa);
      }
      rmf.saveAs = function () {
        var a = document.createElement('a');
        var url = el.src;
        var filename = url.split("/")[-1];
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
      $('#menu-paste').show();
      rmf.paste = function () {
        navigator.permissions
          .query({
            name: 'clipboard-read'
          })
          .then(result => {
            if (result.state == 'granted' || result.state == 'prompt') {
              navigator.clipboard.readText().then(text => {
                console.log(text)
                insertAtCursor(el, text)
              })
            } else {
              Snackbar.show({
                text: '请允许读取剪贴板！',
                pos: 'top-center',
                showAction: false,
              })
            }
          })
      }
    }
    let pageX = event.clientX + 10;
    let pageY = event.clientY;
    let rmWidth = $('#rightMenu').width();
    let rmHeight = $('#rightMenu').height();
    if (pageX + rmWidth > window.innerWidth) {
      pageX -= rmWidth + 10;
    }
    if (pageY + rmHeight > window.innerHeight) {
      pageY -= pageY + rmHeight - window.innerHeight;
    }
    mask = setMask();
    $(".rightMenu-item").click(() => {
      $('.rmMask').attr('style', 'display: none');
    })
    $(window).resize(() => {
      rmf.showRightMenu(false);
      $('.rmMask').attr('style', 'display: none');
    })
    mask.onclick = () => {
      $('.rmMask').attr('style', 'display: none');
    }
    rmf.showRightMenu(true, pageY, pageX);
    $('.rmMask').attr('style', 'display: flex');
    return false;
  };
  window.addEventListener('click', function () {
    rmf.showRightMenu(false);
  });
}
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  popupMenu()
}
const box = document.documentElement
function addLongtabListener(target, callback) {
  let timer = 0
  target.ontouchstart = () => {
    timer = 0 
    timer = setTimeout(() => {
      callback();
      timer = 0
    }, 380)
  }
  target.ontouchmove = () => {
    clearTimeout(timer) 
    timer = 0
  }
  target.ontouchend = () => { 
    if (timer) {
      clearTimeout(timer)
    }
  }
}
addLongtabListener(box, popupMenu)
rmf.fullScreen = function () {
  if (document.fullscreenElement) document.exitFullscreen();
  else document.documentElement.requestFullscreen();
}
if (localStorage.getItem("mouse") == undefined) {
  localStorage.setItem("mouse", "on");
}
var mouseMode = localStorage.getItem("mouse");
function changeMouseMode() {
  if (localStorage.getItem("mouse") == "on") {
    mouseMode = "off";
    localStorage.setItem("mouse", "off");
    debounce(function () {
      new Vue({
        data: function () {
          return {};
        },
        mounted: function () {
          this.$notify({
            title: "切换右键模式成功🍔",
            message: "当前鼠标右键已恢复为系统默认！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 300);
  } else {
    mouseMode = "on";
    localStorage.setItem("mouse", "on");
    debounce(function () {
      new Vue({
        data: function () {
          return {};
        },
        mounted: function () {
          this.$notify({
            title: "切换右键模式成功🍔",
            message: "当前鼠标右键已更换为网站指定样式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 300);
  }
}
var now1 = new Date();
function createtime1() {
  var grt = new Date("11/29/2024 00:00:00");
  now1.setTime(now1.getTime() + 250);
  var days = (now1 - grt) / 1000 / 60 / 60 / 24;
  var dnum = Math.floor(days);
  var ascll = [
    `欢迎来到 梦~醒🍇の小家!`,
    `Future is now 🍭🍭🍭`,
//     `
        
// ███████  ██████  ███    ███  █████  ██      ██   ██  █████  ██    ██ ████████ 
// ██      ██    ██ ████  ████ ██   ██ ██      ██   ██ ██   ██ ██    ██    ██    
// █████   ██    ██ ██ ████ ██ ███████ ██      ███████ ███████ ██    ██    ██    
// ██      ██    ██ ██  ██  ██ ██   ██ ██      ██   ██ ██   ██ ██    ██    ██    
// ██       ██████  ██      ██ ██   ██ ███████ ██   ██ ██   ██  ██████     ██   
                                              
// `,
    "小站已经苟活",
    dnum,
    "天啦!",
    "©2024 By 梦~醒🍇",
  ];
  setTimeout(
    console.log.bind(
      console,
      `\n%c${ascll[0]} %c ${ascll[1]} %c ${ascll[2]} %c${ascll[3]}%c ${ascll[4]}%c ${ascll[5]}\n\n%c ${ascll[6]}\n`,
      "color:#39c5bb",
      "",
      "color:#39c5bb",
      "color:#39c5bb",
      "",
      "color:#39c5bb",
      ""
    )
  );
}
createtime1();
function createtime2() {
  var ascll2 = [`NCC2-036`, `调用前置摄像头拍照成功，识别为「大聪明」`, `Photo captured: `, ` 🤪 `];
  setTimeout(
    console.log.bind(
      console,
      `%c ${ascll2[0]} %c ${ascll2[1]} %c \n${ascll2[2]} %c\n${ascll2[3]}`,
      "color:white; background-color:#10bcc0",
      "",
      "",
      'background:url("https://unpkg.zhimg.com/anzhiyu-assets@latest/image/common/tinggge.gif") no-repeat;font-size:450%'
    )
  );
  setTimeout(console.log.bind(console, "%c WELCOME %c 欢迎光临，大聪明", "color:white; background-color:#23c682", ""));
  setTimeout(
    console.warn.bind(
      console,
      "%c ⚡ Powered by 梦~醒🍇 %c 你正在访问 梦~醒🍇の小家",
      "color:white; background-color:#f0ad4e",
      ""
    )
  );
  setTimeout(console.log.bind(console, "%c W23-12 %c 系统监测到你已打开控制台", "color:white; background-color:#4f90d9", ""));
  setTimeout(
    console.warn.bind(console, "%c S013-782 %c 你现在正处于监控中", "color:white; background-color:#d9534f", "")
  );
}
createtime2();
console.log = function () { };
console.error = function () { };
console.warn = function () { };
function switchNightMode() {
  document.querySelector('body').insertAdjacentHTML('beforeend', '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>'),
    setTimeout(function () {
      document.querySelector('body').classList.contains('DarkMode') ? (document.querySelector('body').classList.remove('DarkMode'), localStorage.setItem('isDark', '0'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')) : (document.querySelector('body').classList.add('DarkMode'), localStorage.setItem('isDark', '1'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')),
        setTimeout(function () {
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.transition = 'opacity 3s';
          document.getElementsByClassName('Cuteen_DarkSky')[0].style.opacity = '0';
          setTimeout(function () {
            document.getElementsByClassName('Cuteen_DarkSky')[0].remove();
          }, 1e3);
        }, 2e3)
    })
  const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
  if (nowMode === 'light') {
    document.getElementById("sun").style.opacity = "1";
    document.getElementById("moon").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "0";
      document.getElementById("moon").style.opacity = "1";
    }, 1000);
    activateDarkMode()
    saveToLocal.set('theme', 'dark', 2)
    // GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    document.getElementById('modeicon').setAttribute('xlink:href', '#icon-sun')
    setTimeout(() => {
      new Vue({
        data: function () {
          return {};
        },
        mounted: function () {
          this.$notify({
            title: "关灯啦🌙",
            message: "当前已成功切换至夜间模式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 2000)
  } else {
    document.getElementById("sun").style.opacity = "0";
    document.getElementById("moon").style.opacity = "1";
    setTimeout(function () {
      document.getElementById("sun").style.opacity = "1";
      document.getElementById("moon").style.opacity = "0";
    }, 1000);
    activateLightMode()
    saveToLocal.set('theme', 'light', 2)
    document.querySelector('body').classList.add('DarkMode'), document.getElementById('modeicon').setAttribute('xlink:href', '#icon-moon')
    setTimeout(() => {
      new Vue({
        data: function () {
          return {};
        },
        mounted: function () {
          this.$notify({
            title: "开灯啦🌞",
            message: "当前已成功切换至白天模式！",
            position: 'top-left',
            offset: 50,
            showClose: true,
            type: "success",
            duration: 5000
          });
        }
      })
    }, 2000)
  }
  typeof utterancesTheme === 'function' && utterancesTheme()
  typeof FB === 'object' && window.loadFBComment()
  window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
}
function share_() {
  let url = window.location.origin + window.location.pathname
  try {
    var title = document.title;
    var subTitle = title.endsWith("| 梦~醒🍇") ? title.substring(0, title.length - 14) : title;
    navigator.clipboard.writeText('梦~醒🍇的站内分享\n标题：' + subTitle + '\n链接：' + url + '\n欢迎来访！🍭🍭🍭');
    new Vue({
      data: function () {
        return {};
      },
      mounted: function () {
        this.$notify({
          title: "成功复制分享信息🎉",
          message: "您现在可以通过粘贴直接跟小伙伴分享了！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  } catch (err) {
    console.error('复制失败！', err);
  }
  // new ClipboardJS(".share", { text: function () { return '标题：' + document.title + '\n链接：' + url } });
  // btf.snackbarShow("本页链接已复制到剪切板，快去分享吧~")
}
function share() {
  debounce(share_, 300);
}
var OriginTitile = document.title;
var titleTime;
document.addEventListener('visibilitychange', function () {
  if (document.hidden) {
    document.title = '👀跑哪里去了~';
    clearTimeout(titleTime);
  } else {
    document.title = '🐖抓到你啦～';
    titleTime = setTimeout(function () {
      document.title = OriginTitile;
    }, 2000);
  }
});

var CURSOR;
Math.lerp = (a, b, n) => (1 - n) * a + n * b;
const getStyle2 = (el, attr) => {
  try {
    return window.getComputedStyle
      ? window.getComputedStyle(el)[attr]
      : el.currentStyle[attr];
  } catch (e) { }
  return "";
};
const map = new Map();
map.set('red', "rgb(241, 71, 71)");
map.set('orange', "rgb(241, 162, 71)");
map.set('yellow', "rgb(241, 238, 71)")
map.set('purple', "rgb(179, 71, 241)");
map.set('blue', "rgb(102, 204, 255)");
map.set('gray', "rgb(226, 226, 226)");
map.set('green', "rgb(57, 197, 187)");
map.set('whitegray', "rgb(241, 241, 241)");
map.set('pink', "rgb(237, 112, 155)");
map.set('black', "rgb(0, 0, 0)");
map.set('darkblue', "rgb(97, 100, 159)");
map.set('heoblue', "rgb(66, 90, 239)");
class Cursor {
  constructor() {
    this.pos = { curr: null, prev: null };
    this.pt = [];
    this.create();
    this.init();
    this.render();
  }
  move(left, top) {
    this.cursor.style["left"] = `${left}px`;
    this.cursor.style["top"] = `${top}px`;
  }
  create() {
    if (!this.cursor) {
      this.cursor = document.createElement("div");
      this.cursor.id = "cursor";
      this.cursor.classList.add("hidden");
      document.body.append(this.cursor);
    }
    var el = document.getElementsByTagName('*');
    for (let i = 0; i < el.length; i++)
      if (getStyle2(el[i], "cursor") == "pointer")
        this.pt.push(el[i].outerHTML);
    var colorVal = map.get(localStorage.getItem("themeColor"));
    document.body.appendChild((this.scr = document.createElement("style")));
    this.scr.innerHTML = `* {cursor: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8' width='8px' height='8px'><circle cx='4' cy='4' r='4' opacity='1.0' fill='` + colorVal + `'/></svg>") 4 4, auto}`;
  }
  refresh() {
    this.scr.remove();
    this.cursor.classList.remove("hover");
    this.cursor.classList.remove("active");
    this.pos = { curr: null, prev: null };
    this.pt = [];
    this.create();
    this.init();
    this.render();
  }
  init() {
    document.onmouseover = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.add("hover");
    document.onmouseout = e => this.pt.includes(e.target.outerHTML) && this.cursor.classList.remove("hover");
    document.onmousemove = e => { (this.pos.curr == null) && this.move(e.clientX - 8, e.clientY - 8); this.pos.curr = { x: e.clientX - 8, y: e.clientY - 8 }; this.cursor.classList.remove("hidden"); };
    document.onmouseenter = e => this.cursor.classList.remove("hidden");
    document.onmouseleave = e => this.cursor.classList.add("hidden");
    document.onmousedown = e => this.cursor.classList.add("active");
    document.onmouseup = e => this.cursor.classList.remove("active");
  }
  render() {
    if (this.pos.prev) {
      this.pos.prev.x = Math.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
      this.pos.prev.y = Math.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);
      this.move(this.pos.prev.x, this.pos.prev.y);
    } else {
      this.pos.prev = this.pos.curr;
    }
    requestAnimationFrame(() => this.render());
  }
}
(() => {
  CURSOR = new Cursor();
})();
var now = new Date();
function createtime() {
  now.setTime(now.getTime() + 1000);
  var start = new Date("08/01/2022 00:00:00"); 
  var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17);
  var unit = (dis / 149600000).toFixed(6); 
  var grt = new Date("11/29/2024 00:00:00");
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  1 == String(hnum).length && (hnum = "0" + hnum);
  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  1 == String(mnum).length && (mnum = "0" + mnum);
  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  1 == String(snum).length && (snum = "0" + snum);
  let currentTimeHtml = "";
  currentTimeHtml =
    hnum < 21 && hnum >= 8
      ? `<img class='boardsign' src='/assets/糖果屋-营业中.svg' title='距离百年老店也就差不到一百年~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> <b>旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</b> <br> <b><font size=2px>少年有他的山海，有他的重重山影，有他的万里波涛。如果可以，风给他，沙漠给他，天空也给他。是无拘无束的风，会下大雨的沙漠，和铺满星辰的天空。万物给他，让他自由✨</font></b></div>`
      : `<img class='boardsign' src='/assets/糖果屋-打烊了.svg' title='这个点了应该去睡觉啦，熬夜对身体不好哦'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</b> <br> <b><font size=2px>少年有他的山海，有他的重重山影，有他的万里波涛。如果可以，风给他，沙漠给他，天空也给他。是无拘无束的风，会下大雨的沙漠，和铺满星辰的天空。万物给他，让他自由✨</font></b></div>`,
  document.getElementById("workboard")
  document.getElementById("workboard").innerHTML = currentTimeHtml
}
setInterval(() => {
  createtime();
}, 1000);
if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
  var rAF = function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  }();
  var frame = 0;
  var allFrameCount = 0;
  var lastTime = Date.now();
  var lastFameTime = Date.now();
  var loop = function () {
    var now = Date.now();
    var fs = (now - lastFameTime);
    var fps = Math.round(1000 / fs);
    lastFameTime = now;
    allFrameCount++;
    frame++;
    if (now > 1000 + lastTime) {
      var fps = Math.round((frame * 1000) / (now - lastTime));
      if (fps <= 5) {
        var kd = `<span style="color:#bd0000">卡成ppt🤢</span>`
      } else if (fps <= 15) {
        var kd = `<span style="color:red">电竞级帧率😖</span>`
      } else if (fps <= 25) {
        var kd = `<span style="color:orange">有点难受😨</span>`
      } else if (fps < 35) {
        var kd = `<span style="color:#9338e6">不太流畅😐</span>`
      } else if (fps <= 45) {
        var kd = `<span style="color:#08b7e4">还不错哦😁</span>`
      } else {
        var kd = `<span style="color:#39c5bb">十分流畅🤩</span>`
      }
      document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
      frame = 0;
      lastTime = now;
    };
    rAF(loop);
  }
  loop();
} else {
  document.getElementById("fps").style = "display:none!important"
}
if (localStorage.getItem("reset_4") == undefined) {
  localStorage.setItem("reset_4", "1");
  for (var i = 1; i <= 3; i++) {
    localStorage.removeItem("reset_" + i);
  }
  clearItem();
  setTimeout(function () {
    new Vue({
      data: function () {
        return {};
      },
      mounted: function () {
        this.$notify({
          title: "提示🍒",
          message: " (｡･∀･)ﾉﾞ由于网站部分设置项更新，当前已为您重置所有设置，祝您愉快！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 8000
        });
      }
    })
  }, 1500);
}
function clearItem() {
  localStorage.removeItem('blogbg')
  localStorage.removeItem('universe')
  localStorage.removeItem('blur')
  localStorage.removeItem('fpson')
  localStorage.removeItem('transNum')
  localStorage.removeItem('blurRad')
  localStorage.removeItem('font')
  localStorage.removeItem('themeColor')
  localStorage.removeItem('rs')
  localStorage.removeItem('mouse')
  localStorage.removeItem('light')
  localStorage.removeItem('snow')
}
if (localStorage.getItem("font") == undefined) {
  localStorage.setItem("font", "LXGW");
}
setFont(localStorage.getItem("font"));
function setFont(n) {
  localStorage.setItem("font", n)
  if (n == "default") {
    document.documentElement.style.setProperty('--global-font', '-apple-system');
    document.body.style.fontFamily = "-apple-system, Consolas_1, BlinkMacSystemFont, 'Segoe UI' , 'Helvetica Neue' , Lato, Roboto, 'PingFang SC' , 'Microsoft JhengHei' , 'Microsoft YaHei' , sans-serif";
  }
  else {
    document.documentElement.style.setProperty('--global-font', n);
    document.body.style.fontFamily = "var(--global-font),-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif";
  }
  try { setFontBorder(); } catch (err) { };
}
function setFontBorder() {
  var curFont = localStorage.getItem("font");
  var swfId = "swf_" + curFont;
  document.getElementById(swfId).style.border = "2px solid var(--theme-color)";
  Array.prototype.forEach.call(document.getElementsByClassName("swf"), function (ee) {
    if (ee.id != swfId) ee.style.border = "2px solid var(--border-color)";
  });
}
if (localStorage.getItem("themeColor") == undefined) {
  localStorage.setItem("themeColor", "green");
}
setColor(localStorage.getItem("themeColor"));
function setColor(c) {
  document.getElementById("themeColor").innerText = `:root{--theme-color:` + map.get(c) + ` !important}`;
  localStorage.setItem("themeColor", c);
  CURSOR.refresh();
  var theme_color = map.get(c);
  var trans_theme_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.7)";
  var high_trans_color = "rgba" + theme_color.substring(3, theme_color.length - 1) + ", 0.5)";
  document.documentElement.style.setProperty("--text-bg-hover", trans_theme_color);
  document.documentElement.style.setProperty("--high-trans-color", high_trans_color);
}
if (localStorage.getItem("universe") == undefined) {
  localStorage.setItem("universe", "block");
}
setUniverse2(localStorage.getItem("universe"));
function setUniverse2(c) {
  document.getElementById("universe").style.display = c;
  localStorage.setItem("universe", c);
}
function setUniverse() {
  if (document.getElementById("universeSet").checked) {
    setUniverse2("block");
  } else {
    setUniverse2("none");
  }
}
if (localStorage.getItem("snow") == undefined) {
  localStorage.setItem("snow", "block");
}
document.getElementById("snow").style.display = localStorage.getItem("snow");
function setSnow() {
  if (document.getElementById("snowSet").checked) {
    document.getElementById("snow").style.display = "block";
    localStorage.setItem("snow", "block");
  } else {
    document.getElementById("snow").style.display = "none";
    localStorage.setItem("snow", "none");
  }
}
if (localStorage.getItem("fpson") == undefined) {
  localStorage.setItem("fpson", "1");
}
function fpssw() {
  if (document.getElementById("fpson").checked) {
    localStorage.setItem("fpson", "1");
  } else {
    localStorage.setItem("fpson", "0");
  }
  setTimeout(reload, 600);
}
function reload() {
  window.location.reload();
}
if (localStorage.getItem("rs") == undefined) {
  localStorage.setItem("rs", "block");
}
if (localStorage.getItem("rs") == "block") {
  document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
} else {
  document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
}
function toggleRightside() {
  if (document.getElementById("rightSideSet").checked) {
    localStorage.setItem("rs", "block");
    document.getElementById("rightSide").innerText = `:root{--rightside-display: block}`;
  } else {
    localStorage.setItem("rs", "none");
    document.getElementById("rightSide").innerText = `:root{--rightside-display: none}`;
  }
}
if (localStorage.getItem("transNum") == undefined) {
  localStorage.setItem("transNum", 50);
}
var curTransNum = localStorage.getItem("transNum");
var curTransMini = curTransNum * 0.95;
document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${curTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${curTransNum}%) !important} `;
function setTrans() {
  var elem = document.getElementById("transSet");
  var newTransNum = elem.value;
  var target = document.querySelector('.transValue');
  target.innerHTML = "透明度 (0%-100%): " + newTransNum + "%";
  localStorage.setItem("transNum", newTransNum);
  curTransMini = newTransNum * 0.95;
  curTransNum = newTransNum;
  document.querySelector('#rang_trans').style.width = curTransMini + "%";
  document.getElementById("transPercent").innerText = `:root{--trans-light: rgba(253, 253, 253, ${newTransNum}%) !important; --trans-dark: rgba(25, 25, 25, ${newTransNum}%) !important} `;
};
if (localStorage.getItem("blurRad") == undefined) {
  localStorage.setItem("blurRad", 20);
}
var curBlur = localStorage.getItem("blurRad");
var miniBlur = curBlur * 0.95;
document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
function setBlurNum() {
  var elem = document.getElementById("blurSet");
  var newBlur = elem.value;
  var target = document.querySelector('.blurValue');
  target.innerHTML = "模糊半径 (开启模糊生效 0px-100px): " + newBlur + "px";
  localStorage.setItem("blurRad", newBlur);
  curBlur = newBlur;
  miniBlur = curBlur * 0.95;
  // var max = elem.getAttribute("max");
  document.querySelector('#rang_blur').style.width = miniBlur + "%";
  document.getElementById("blurNum").innerText = `:root{--blur-num: blur(${curBlur}px) saturate(120%) !important`;
};
if (localStorage.getItem("blur") == undefined) {
  localStorage.setItem("blur", 1);
}
if (localStorage.getItem("blur") == 0) {
  document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
} else {
  document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
}
function setBlur() {
  if (document.getElementById("blur").checked) {
    localStorage.setItem("blur", 1);
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: var(--blur-num)}`;
  } else {
    localStorage.setItem("blur", 0);
    document.getElementById("settingStyle").innerText = `:root{--backdrop-filter: none}`;
  }
}
var defineColor = localStorage.getItem("blogbg") && localStorage.getItem("blogbg").charAt(0) == '#' ? localStorage.getItem("blogbg") : '#F4D88A';
function changeBgColor() {
  changeBg(document.querySelector("#define_colors").value);
}
let bingDayBg = screen.width <= 768 ? "url(https://bing.img.run/m.php)" : "url(https://bing.img.run/1920x1080.php)";
let bingHistoryBg = screen.width <= 768 ? "url(https://bing.img.run/rand_m.php)" : "url(https://bing.img.run/rand.php)";
let EEEDog = "url(https://api.yimian.xyz/img?type=moe&size=1920x1080)";
let seovx = "url(https://cdn.seovx.com/?mom=302)";
let picsum = "url(https://picsum.photos/1920/1080.webp)";
let waiBizhi = "url(https://api.ixiaowai.cn/gqapi/gqapi.php)";
let btstu = "url(http://api.btstu.cn/sjbz/?lx=suiji)";
let unsplash = "url(https://source.unsplash.com/random/1920x1080/)";
if (localStorage.getItem("blogbg") != undefined) {
  setBg(localStorage.getItem("blogbg"));
} else {
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: url(/assets/cover/homecover1.png);
    --darkmode-bg: url(/assets/cover/darkcover2.jpg);
    --mobileday-bg: url(/assets/cover/phone-cover7.jpg);
    --mobilenight-bg: url(/assets/cover/phone-cover1.jpg);
  }`;
}
function changeBg(s) {
  defineColor = s.charAt(0) == "#" ? s : '#F4D88A';
  setBg(s);
  localStorage.setItem("blogbg", s);
}
function setBg(s) {
  document.getElementById("defineBg").innerText = `:root{
    --default-bg: ${s};
    --darkmode-bg: ${s};
    --mobileday-bg: ${s};
    --mobilenight-bg: ${s};
  }`;
}
function getPicture() {
  debounce(getPicture_, 300);
}
function getPicture_() {
  checkImgExists(document.getElementById("pic-link").value).then(() => {
    var link = "url(" + document.getElementById("pic-link").value + ")";
    changeBg(link);
    new Vue({
      data: function () {
        return {};
      },
      mounted: function () {
        this.$notify({
          title: "可以啦🍨",
          message: "切换自定义背景成功！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "success",
          duration: 5000
        });
      }
    })
  }).catch(() => {
    new Vue({
      data: function () {
        return {};
      },
      mounted: function () {
        this.$notify({
          title: "链接不对🤣",
          message: "请输入有效的图片链接！",
          position: 'top-left',
          offset: 50,
          showClose: true,
          type: "warning",
          duration: 5000
        });
      }
    })
  })
}
function checkImgExists(imgurl) {
  return new Promise(function (resolve, reject) {
    var ImgObj = new Image();
    ImgObj.src = imgurl;
    ImgObj.onload = function (res) {
      resolve(res);
    }
    ImgObj.onerror = function (err) {
      reject(err);
    }
  })
}
if (localStorage.getItem("light") == undefined) {
  localStorage.setItem("light", "true");
}
document.addEventListener('pjax:complete', function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false)
});
document.addEventListener('DOMContentLoaded', function () {
  changeLight(localStorage.getItem("light") == "true" ? true : false)
});
function setLight() {
  if (document.getElementById("lightSet").checked) {
    changeLight(true);
    localStorage.setItem("light", "true");
  } else {
    changeLight(false);
    localStorage.setItem("light", "false");
  }
}
function changeLight(flag) {
  if (document.getElementById("site-name"))
    document.getElementById("site-name").style.animation = flag ? "light_15px 10s linear infinite" : "none";
  if (document.getElementById("site-title"))
    document.getElementById("site-title").style.animation = flag ? "light_15px 10s linear infinite" : "none";
  if (document.getElementById("site-subtitle"))
    document.getElementById("site-subtitle").style.animation = flag ? "light_10px 10s linear infinite" : "none";
  if (document.getElementById("post-info"))
    document.getElementById("post-info").style.animation = flag ? "light_5px 10s linear infinite" : "none";
  document.getElementById("menu_shadow").innerText = flag ? `:root{--menu-shadow: 0 0 1px var(--theme-color);}` : `:root{--menu-shadow: none;}`;
}
var winbox = "";
function createWinbox() {
  let div = document.createElement("div");
  document.body.appendChild(div);
  winbox = WinBox({
    id: "meihuaBox",
    index: 99,
    title: "美化设置",
    x: "left",
    y: "center",
    minwidth: "300px",
    height: "60%",
    // "#76c8f1"
    background: 'var(--theme-color)',
    onmaximize: () => {
      div.innerHTML = `<style>body::-webkit-scrollbar {display: none;} div#meihuaBox {width: 100% !important;}</style>`;
    },
    onrestore: () => {
      div.innerHTML = "";
    },
  });
  winResize();
  window.addEventListener("resize", winResize);
/*   背景设置中的一些其他标签：
<h3>1. 二次元</h3>
<details class="folding-tag" cyan><summary> 查看二次元背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/home_bg.webp)" class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/home_bg.webp)')"></a></div>
              </div>
            </details>

<h3>2. 风景</h3>

<details class="folding-tag" cyan><summary> 查看风景背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/fj1.webp)" class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/fj1.webp)')"></a></div>
              </div>
            </details>

<h3>3. 萌宠</h3>

<details class="folding-tag" cyan><summary> 查看萌宠背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://lskypro.acozycotage.net/Fomalhaut/img/mc1.webp)" class="imgbox" onclick="changeBg('url(https://lskypro.acozycotage.net/Fomalhaut/img/mc1.webp)')"></a></div>
              </div>
            </details>
*/
  winbox.body.innerHTML = `
<div class="settings" style="display: block;">
<div id="article-container" style="padding:12px;">
<br>
<center><p><button onclick="reset()" style="background:linear-gradient(to right, #fc354c, #0abfbc);display:block;width:40%;padding:15px 0;border-radius:30px;color:white;font-size:1.1em;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认设置</button></p></center>
<h2>一、显示偏好</h2>
<div class="transValue" style="font-weight:bold;padding-left:10px">透明度 (0%-100%): ${curTransNum}%</div>
<div class="range">
  <input id="transSet" type="range" min="0" max="100" step="1" value=${curTransNum} oninput="setTrans()">
  <p class="rang_width" id="rang_trans" style="width:${curTransMini}%"></p>
</div>
<div class="blurValue" style="font-weight:bold;padding-left:10px">模糊半径 (开启模糊生效 0px-100px): ${curBlur} px</div>
<div class="range">
  <input id="blurSet" type="range" min="0" max="100" step="1" value="${curBlur}" oninput="setBlurNum()">
  <p class="rang_width" id="rang_blur" style="width:${miniBlur}%"></p>
</div>
<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 星空特效 (夜间模式) </div><input type="checkbox" id="universeSet" onclick="setUniverse()">
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 霓虹灯 (夜间模式) </div><input type="checkbox" id="lightSet" onclick="setLight()">
</div>
<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 模糊效果 (消耗性能) </div><input type="checkbox" id="blur" onclick="setBlur()">
  <div class="content-text" style="font-weight:bold; padding-left:20px"> 侧边栏 (默认开) </div><input type="checkbox" id="rightSideSet" onclick="toggleRightside()">
</div>
<div class="content" style="display:flex">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 帧率监测 (刷新生效) </div><input type="checkbox" id="fpson" onclick="fpssw()">
  <div class="content-text" style="font-weight:bold; padding-left:10px"> 雪花特效 (白天模式) </div><input type="checkbox" id="snowSet" onclick="setSnow()">
</div>
<h2>二、字体设置</h2>
<div class="note warning modern"><p>非商免字体未经授权只能个人使用。本站为完全非商业、非盈利性质的网站，平时用于个人学习交流，如有侵权请联系站长删除，谢谢！ —— 致版权方</p>
</div>
<p id="swfs">
<a class="swf" id="swf_ZhuZiAWan" href="javascript:;" rel="noopener external nofollow" style="font-family:'ZhuZiAWan'!important;color:black" onclick="setFont('ZhuZiAWan')">筑紫A丸标准体2.0</a>
<a class="swf" id="swf_HYTMR" href="javascript:;" rel="noopener external nofollow" style="font-family:'HYTMR'!important;color:black" onclick="setFont('HYTMR')">汉仪唐美人</a>
<a class="swf" id="swf_LXGW" href="javascript:;" rel="noopener external nofollow" style="font-family:'LXGW'!important;color:black" onclick="setFont('LXGW')">霞鹜文楷</a>
<a class="swf" id="swf_TTQHB" href="javascript:;" rel="noopener external nofollow" style="font-family:'TTQHB'!important;color:black" onclick="setFont('TTQHB')">甜甜圈海报</a>
<a class="swf" id="swf_YSHST" href="javascript:;" rel="noopener external nofollow" style="font-family:'YSHST'!important;color:black" onclick="setFont('YSHST')">优设好身体</a>
<a class="swf" id="swf_MiSans" href="javascript:;" rel="noopener external nofollow" style="font-family:'MiSans'!important;color:black" onclick="setFont('MiSans')">MiSans</a>
<a class="swf" id="swf_default" href="javascript:;" rel="noopener external nofollow" style="font-family:-apple-system, IBM Plex Mono ,monosapce,'微软雅黑', sans-serif;!important;color:black" onclick="setFont('default')">系统默认</a>
</p>
<h2>三、主题色设置</h2>
<div class="content" style="display:flex"><input type="radio" id="red" name="colors" value=" "
        onclick="setColor('red')"><input type="radio" id="orange" name="colors" value=" "
        onclick="setColor('orange')"><input type="radio" id="yellow" name="colors" value=" "
        onclick="setColor('yellow')"><input type="radio" id="green" name="colors" value=" "
        onclick="setColor('green')"><input type="radio" id="blue" name="colors" value=" "
        onclick="setColor('blue')"><input type="radio" id="heoblue" name="colors" value=" "
        onclick="setColor('heoblue')"><input type="radio" id="darkblue" name="colors" value=" "
        onclick="setColor('darkblue')"><input type="radio" id="purple" name="colors" value=" "
        onclick="setColor('purple')"><input type="radio" id="pink" name="colors" value=" "
        onclick="setColor('pink')" checked="checked"><input type="radio" id="black" name="colors" value=" "
        onclick="setColor('black')"><input type="radio" id="blackgray" name="colors" value=" "
        onclick="setColor('blackgray')"></div>
<h2>四、背景设置</h2>
<center><button onclick="resetBg()" style="background:var(--theme-color);display:block;width:35%;padding:15px 0;border-radius:30px;color:white;"><i class="fa-solid fa-arrows-rotate"></i>&nbsp;恢复默认背景</button></center>
<h3>1. 渐变色</h3>
<details class="folding-tag" cyan><summary> 查看渐变色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to right, #544a7d, #ffd452)" onclick="changeBg('linear-gradient(to right, #544a7d, #ffd452)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)" onclick="changeBg('linear-gradient(to bottom, #7f7fd5, #86a8e7, #91eae4)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to left, #654ea3, #eaafc8)" onclick="changeBg('linear-gradient(to left, #654ea3, #eaafc8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)" onclick="changeBg('linear-gradient(to top, #feac5e, #c779d0, #4bc0c8)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #d3959b, #bfe6ba)" onclick="changeBg('linear-gradient(to top, #d3959b, #bfe6ba)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #8360c3, #2ebf91)" onclick="changeBg('linear-gradient(to top, #8360c3, #2ebf91)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #108dc7, #ef8e38)" onclick="changeBg('linear-gradient(to top, #108dc7, #ef8e38)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)" onclick="changeBg('linear-gradient(to top, #355c7d, #6c5b7b, #c06c84)')"></a></div>
              </div>
            </details>
<h3>2. 纯色</h3>
<details class="folding-tag" cyan><summary> 查看纯色背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ecb1b1" onclick="changeBg('#ecb1b1')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #d3ebac" onclick="changeBg('#d3ebac')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #ace9ce" onclick="changeBg('#ace9ce')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #c1ebea" onclick="changeBg('#c1ebea')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #dee7f1" onclick="changeBg('#dee7f1')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #e9e3f2" onclick="changeBg('#e9e3f2')"></a> <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: #f7eff5" onclick="changeBg('#f7eff5')"></a>  <input type="color" id="define_colors" href="javascript:;" rel="noopener external nofollow" class="box" autocomplete="on" value="${defineColor}" oninput="changeBgColor()"></input></div>
              </div>
            </details>
<h3>3. 适配手机</h3>
<details class="folding-tag" cyan><summary> 查看适配手机的背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/assets/cover/phone-cover1.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/phone-cover1.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/assets/cover/phone-cover2.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/phone-cover2.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/assets/cover/phone-cover3.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/phone-cover3.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/assets/cover/phone-cover4.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/phone-cover4.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/assets/cover/phone-cover5.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/phone-cover5.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/assets/cover/phone-cover6.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/phone-cover6.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/assets/cover/phone-cover7.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/phone-cover7.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/assets/cover/phone-cover8.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/phone-cover8.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" style="background-image:url(/assets/cover/phone-cover9.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/phone-cover9.jpg)')"></a></div>
              </div>
            </details>
<h3>4. 壁纸API</h3>
<details class="folding-tag" cyan><summary> 查看壁纸API系列背景 </summary>
              <div class='content'>
              <div class="bgbox"><a id="bingDayBox" rel="noopener external nofollow" style="background-image: ${bingDayBg}" class="box apiBox" onclick="changeBg('${bingDayBg}')"></a><a id="bingHistoryBox" rel="noopener external nofollow" style="background-image: ${bingHistoryBg}" class="box apiBox" onclick="changeBg('${bingHistoryBg}')"></a><a id="EEEDogBox" rel="noopener external nofollow" style="background-image: ${EEEDog}" class="box apiBox" onclick="changeBg('${EEEDog}')"></a><a id="seovxBox" rel="noopener external nofollow" style="background-image: ${seovx}" class="box apiBox" onclick="changeBg('${seovx}')"></a><a id="picsumBox" rel="noopener external nofollow" style="background-image: ${picsum}" class="box apiBox" onclick="changeBg('${picsum}')"></a><a id="waiBizhiBox" rel="noopener external nofollow" style="background-image: ${waiBizhi}" class="box apiBox" onclick="changeBg('${waiBizhi}')"></a><a id="btstuBox" rel="noopener external nofollow" style="background-image: ${btstu}" class="box apiBox" onclick="changeBg('${btstu}')"></a><a id="unsplashBox" rel="noopener external nofollow" style="background-image: ${unsplash}" class="box apiBox" onclick="changeBg('${unsplash}')"></a></div>
              </div>
            </details>
<h3>5. 自定义背景</h3>
<details class="folding-tag" cyan><summary> 设置自定义背景 </summary>
              <div class='content'>
              <p><center><input type="text" id="pic-link" size="70%" maxlength="1000" placeholder="请输入有效的图片链接，如 https://gitee.com/star3119391396/cloudimage/raw/master/img/phone-cover2.jpg"></center></p><p><center><button type="button" onclick="getPicture()" style="background:var(--theme-color);width:35%;padding: 5px 0px 7px 0px;border-radius:30px;color:white;line-height:2;">🌈切换背景🌈</button></center></p>
              </div>
            </details>
<h3>6. 作者推荐</h3>
<details class="folding-tag" cyan><summary> 查看作者推荐背景 </summary>
              <div class='content'>
              <div class="bgbox"><a href="javascript:;" rel="noopener external nofollow" class="box" style="background-image:url(/assets/cover/homecover2.png)" class="pimgbox" onclick="changeBg('url(/assets/cover/homecover2.png)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background-image:url(/assets/cover/homecover3.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/homecover3.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background-image:url(/assets/cover/darkcover2.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/darkcover2.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background-image:url(/assets/cover/darkcover1.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/darkcover1.jpg)')"></a><a href="javascript:;" rel="noopener external nofollow" class="box" style="background-image:url(/assets/cover/darkcover3.jpg)" class="pimgbox" onclick="changeBg('url(/assets/cover/darkcover3.jpg)')"></a></div>
              </div>
            </details>
<br>
<center><div style="font-size:1.2em;color:var(--theme-color);font-weight:bold;">------ ( •̀ ω •́ )y 到底啦 ------</div></center>
<br>
</div>
</div>
`;
  $("#" + localStorage.getItem("themeColor")).attr("checked", true);
  if (localStorage.getItem("blur") == 1) {
    document.getElementById("blur").checked = true;
  } else {
    document.getElementById("blur").checked = false;
  }
  if (localStorage.getItem("universe") == "block") {
    document.getElementById("universeSet").checked = true;
  } else if (localStorage.getItem("universe") == "none") {
    document.getElementById("universeSet").checked = false;
  }
  if (localStorage.getItem("fpson") == "1") {
    document.getElementById("fpson").checked = true;
  } else {
    document.getElementById("fpson").checked = false;
  }
  if (localStorage.getItem("rs") == "block") {
    document.getElementById("rightSideSet").checked = true;
  } else if (localStorage.getItem("rs") == "none") {
    document.getElementById("rightSideSet").checked = false;
  }
  if (localStorage.getItem("light") == "true") {
    document.getElementById("lightSet").checked = true;
  } else {
    document.getElementById("lightSet").checked = false;
  }
  setFontBorder();
  if (localStorage.getItem("snow") == "block") {
    document.getElementById("snowSet").checked = true;
  } else if (localStorage.getItem("snow") == "none") {
    document.getElementById("snowSet").checked = false;
  }
}
function resetBg() {
  localStorage.removeItem('blogbg');
  reload();
}
function reset() {
  clearItem();
  reload();
}
function winResize() {
  try {
    var offsetWid = document.documentElement.clientWidth;
    if (offsetWid <= 768) {
      winbox.resize(offsetWid * 0.95 + "px", "90%").move("center", "center");
    } else {
      winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
    }
  } catch (err) {
    // console.log("Pjax毒瘤抽风运行winResize方法🙄🙄🙄");
  }
}
function toggleWinbox() {
  if (document.querySelector("#meihuaBox")) {
    winbox.toggleClass("hide");
  } else {
    createWinbox();
  };
}
let newYearTimer = null;
var newYear = () => {
  clearTimeout(newYearTimer);
  if (!document.querySelector('#newYear')) return;
  let newYear = new Date('2026-02-17 00:00:00').getTime() / 1000,
    week = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' }
  time();
  function nol(h) { return h > 9 ? h : '0' + h; };
  function time() {
    let now = new Date();
    document.querySelector('#newYear .today').innerHTML = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + week[now.getDay()]
    let second = newYear - Math.round(now.getTime() / 1000);
    if (second < 0) {
      document.querySelector('#newYear .title').innerHTML = 'Happy New Year!';
      document.querySelector('#newYear .newYear-time').innerHTML = '<span class="happyNewYear">新年快乐</span>';
    } else {
      document.querySelector('#newYear .title').innerHTML = '距离2026年春节：'
      if (second > 86400) {
        document.querySelector('#newYear .newYear-time').innerHTML = `<span class="day">${Math.ceil(second / 86400)}<span class="unit">天</span></span>`
      } else {
        let h = nol(parseInt(second / 3600));
        second %= 3600;
        let m = nol(parseInt(second / 60));
        second %= 60;
        let s = nol(second);
        document.querySelector('#newYear .newYear-time').innerHTML = `<span class="time">${h}:${m}:${s}</span></span>`;
        newYearTimer = setTimeout(time, 1000);
      }
    }
  }
  jQuery(document).ready(function ($) {
    if ($.fn && $.fn.wpSuperSnow) {
      $('#newYear').wpSuperSnow({
        flakes: ['https://tuchuang.voooe.cn/images/2023/01/02/yb1.webp', 'https://tuchuang.voooe.cn/images/2023/01/02/yb2.webp', 'https://tuchuang.voooe.cn/images/2023/01/02/yb3.webp'],
        totalFlakes: '100',
        zIndex: '999999',
        maxSize: '30',
        maxDuration: '20',
        useFlakeTrans: false
      });
    }
  });
}
document.addEventListener('pjax:complete', newYear);
document.addEventListener('DOMContentLoaded', newYear);