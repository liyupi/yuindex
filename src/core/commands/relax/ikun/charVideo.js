// 视频转字符画类

// 默认配置
const defaultConfig = {
  space: 7, // 空间
  canvasElement: $("charVideoCanvas"), // 字符画画布
  width: 800,
  height: 450,
};

// constructor
function CharVideo(config = defaultConfig) {
  this.space = config.space || defaultConfig.space;
  this.width = Math.ceil(
    (defaultConfig.width ?? window.innerWidth) / this.space
  );
  this.height = Math.ceil(
    (defaultConfig.height ?? window.innerHeight) / this.space
  );
  this.data = {};
  this.cav = {};
  this.ctx = {};
  this.charVedio = config.canvasElement;
  this.charVedio.width = defaultConfig.width ?? window.innerWidth;
  this.charVedio.height = defaultConfig.height ?? window.innerHeight;
  this.textCtx = this.charVedio.getContext("2d");
  this.init();
}

// 初始化
CharVideo.prototype.init = function () {
  this.initVideo();
  this.initCanvas();
};

CharVideo.prototype.initVideo = function (src) {
  if (!this.video) {
    this.video = document.createElement("video");
  }
  if (src) {
    this.video.src = src;
  }
};

CharVideo.prototype.initCanvas = function () {
  this.cav = document.createElement("canvas");
  this.ctx = this.cav.getContext("2d");
  this.cav.width = this.width;
  this.cav.height = this.height;
};

CharVideo.prototype.loadData = function () {
  return this.ctx.getImageData(0, 0, this.width, this.height);
};

CharVideo.prototype.reDraw = function (data) {
  for (var i = 0, len = data.data.length; i < len; i += 4) {
    var r = data.data[i],
      g = data.data[i + 1],
      b = data.data[i + 2];
    data.data[i] =
      data.data[i + 1] =
      data.data[i + 2] =
        (255 - (r + g + b) / 3) | 0;
  }
  this.data = data;
  this.ctx.putImageData(data, 0, 0, 0, 0, this.width, this.height);
};

CharVideo.prototype.drawText = function () {
  this.textCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  var data = this.data.data;
  var points = ' .,`"^:!?o+*wU$HB%@&#M'.split("");
  for (var i = 0, len = data.length; i < len; i += 4) {
    this.textCtx.fillStyle = "#333";
    var xl = ((i / 4) | 0) % this.width;
    var yl = Math.ceil(i / 4 / this.width);
    var x = xl * this.space;
    var y = yl * this.space;
    var newData = data[i] | 0;
    var plen = Math.ceil(255 / points.length);
    var point = points[(newData / plen) | 0];
    this.textCtx.font = "12px courier";
    this.textCtx.fillText(point, x, y);
  }
};

CharVideo.prototype.interval = function () {
  var that = this;
  requestAnimationFrame(function () {
    if (!that.video.paused) {
      that.ctx.drawImage(that.video, 0, 0, that.width, that.height);
      var data = that.loadData();
      that.reDraw(data);
      that.drawText();
    }
    that.interval();
  });
};

CharVideo.prototype.playFile = function (blob) {
  this.src = URL.createObjectURL(blob);
  this.initVideo(this.src);
  this.interval();
  this.video.play();
};

function $(id) {
  return document.getElementById(id);
}

export default CharVideo;
