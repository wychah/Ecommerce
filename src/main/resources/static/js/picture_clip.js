(function (_) {
    //插入样式
    var cssText = '#picture_clip {display:none;}.picture-clip{position:fixed;top:0;left:0;z-index:1000;width:100%;height:100%;background:rgba(0,0,0,.5);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.picture-clip-box{position:relative;width:600px;background:#fff;border-radius:6px;color:#333;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.picture-clip a{color:inherit;text-decoration:none}.picture-clip .title{height:55px;line-height:55px;padding:0 5px 0 15px;border-bottom:1px solid #ccc}.picture-clip .title span{font-size:17px}.picture-clip .title a{float:right;font-size:26px;font-weight:bold;padding:0 10px;color:#666}.picture-clip .button{height:55px;line-height:55px;padding:0 15px;border-top:1px solid #ccc;text-align:right}.picture-clip .button a{padding:4px 10px;border-radius:4px;font-size:16px;margin:0 3px 0 10px;border:1px solid #ccc;background:#fff;color:#333}.picture-clip .button a:hover{background:#f3f3f3}.picture-clip .button a.continue{border:1px solid #f40;background:#f40;color:#fff}.picture-clip .button a.continue:hover{background:#d63900}.picture-clip .zoom{text-align:center;height:60px;line-height:60px}.picture-clip .zoom a{display:inline-block;vertical-align:top;font-size:44px;color:#666;cursor:pointer}.picture-clip .zoom .horizontal{display:inline-block;vertical-align:top;position:relative;top:29px}.picture-clip .zoom .horizontal .line{height:5px;width:300px;background:#d9d9d9;border-radius:2px;cursor:pointer}.picture-clip .zoom .horizontal .thumb{height:14px;width:14px;background:#9f9f9f;border-radius:7px;position:absolute;left:0;top:-5px;cursor:pointer}.picture-clip .box{width:260px;height:260px;margin:20px auto 0 auto;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQkVGRjg5MTU4QkIxMUU4ODk1RkE2RUFEQ0FCMDFFNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQkVGRjg5MjU4QkIxMUU4ODk1RkE2RUFEQ0FCMDFFNCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJCRUZGODhGNThCQjExRTg4OTVGQTZFQURDQUIwMUU0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJCRUZGODkwNThCQjExRTg4OTVGQTZFQURDQUIwMUU0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+VxH1nAAAACpJREFUeNpi+f//PwM2cPbsWaziTAwkglENxAAWXOFtbGw8Gkr00wAQYAADAwiJ05pkSgAAAABJRU5ErkJggg==");overflow:hidden;position:relative}.picture-clip .box .shade{position:absolute;top:0;left:0;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;height:100%;border:30px solid rgba(255,255,255,.6);-webkit-box-shadow:0 0 15px rgba(0,0,0,.6) inset;box-shadow:0 0 15px rgba(0,0,0,.6) inset;cursor:move}.picture-clip .box img{position:absolute;top:30px;left:30px}';
    var styleEl = document.createElement("style");
    document.getElementsByTagName("head")[0].appendChild(styleEl);
    if (styleEl.styleSheet) {
        if (!styleEl.styleSheet.disabled) {
            styleEl.styleSheet.cssText = cssText;
        }
    } else {
        try {
            styleEl.innerHTML = cssText;
        } catch (e) {
            styleEl.innerText = cssText;
        }
    }
    //插入DOM
    var domText = '<div id="picture_clip"><div class="picture-clip"><div class="picture-clip-box"><div class="title"><span>&#32534;&#36753;&#22270;&#29255;</span><a href="javascript:;" class="cancel">&#215;</a></div><div class="box"><img src=""><div class="shade" title="&#25302;&#21160;&#22270;&#29255;"></div></div><div class="zoom"><a href="javascript:;" class="zoomOut" title="&#32553;&#23567;">&#65123;</a><div class="horizontal"><div class="line"></div><div class="thumb"></div></div><a href="javascript:;" class="zoomIn" title="&#25918;&#22823;">&#65122;</a></div><div class="button"><a href="javascript:;" class="continue">&#30830;&#23450;</a><a href="javascript:;" class="cancel">&#21462;&#28040;</a></div></div></div></div>';
    var divEl = document.createElement("div");
    document.getElementsByTagName("body")[0].appendChild(divEl);
    divEl.innerHTML = domText;
    //添加全局方法
    _.picture_clip = {
        boxGap: 30, //编辑框的间隙
        boxMin: 240, //编辑框最小长度
        boxMax: 400, //编辑框最大长度
        init: function (el, wantW, wantH, cb) {
            if (el == undefined || wantW == undefined || wantH == undefined || cb == undefined) {
                return;
            }
            if (!el.files) {
                alert('仅支持IE10及以上浏览器, 推荐使用最新Chrome浏览器');
                return;
            }
            this.el = el;
            this.cb = cb;
            this.wantW = wantW;
            this.wantH = wantH;
            this.saved = 0;

            //根据想要图像的大小计算裁剪框的大小!
            var boxMin = this.boxMin,
                boxMax = this.boxMax,
                boxGapLen = this.boxGap * 2;
            if (wantW >= boxMin - boxGapLen && wantW <= boxMax - boxGapLen && wantH >= boxMin - boxGapLen && wantH <= boxMax - boxGapLen) {
                this.boxW = wantW + boxGapLen;
                this.boxH = wantH + boxGapLen;
            } else {
                var wantAR = wantW / wantH;
                //想要横图
                if (wantAR > 1) {
                    if (wantW < boxMin - boxGapLen) {
                        this.boxW = boxMin;
                        this.boxH = (boxMin - boxGapLen) * wantH / wantW + boxGapLen;
                    } else if (wantW > boxMax - boxGapLen) {
                        this.boxW = boxMax;
                        this.boxH = (boxMax - boxGapLen) * wantH / wantW + boxGapLen;
                    }
                }
                //想要竖图
                else if (wantAR < 1) {
                    if (wantH < boxMin - boxGapLen) {
                        this.boxH = boxMin;
                        this.boxW = (boxMin - boxGapLen) * wantW / wantH + boxGapLen;
                    } else if (wantH > boxMax - boxGapLen) {
                        this.boxH = boxMax;
                        this.boxW = (boxMax - boxGapLen) * wantW / wantH + boxGapLen;
                    }
                }
                //想要方图
                else {
                    if (wantH < boxMin - boxGapLen) {
                        this.boxH = boxMin;
                        this.boxW = boxMin;
                    } else if (wantH > boxMax - boxGapLen) {
                        this.boxH = boxMax;
                        this.boxW = boxMax;
                    }
                }
            }
            this.run();
        },
        run: function () {
            var self = this;
            var imgFile = this.el.files[0];
            this.getImgBase64(imgFile, function (base64) {
                //初始化编辑的图片
                var img = new Image();
                img.onload = function () {
                    self.originW = img.width;
                    self.originH = img.height;
                    //比较裁剪窗口与源图片的横纵比
                    var boxAR = self.boxW / self.boxH;
                    var originAR = self.originW / self.originH;
                    var width, height, zoom, top, left;
                    if (boxAR > originAR) {
                        width = self.boxW - self.boxGap * 2;
                        zoom = width / self.originW;
                        height = self.originH * zoom;
                        top = ((self.boxH - height) / 2).toFixed(3);
                        left = '30';
                    } else if (boxAR <= originAR) {
                        height = self.boxH - self.boxGap * 2;
                        zoom = height / self.originH;
                        width = self.originW * zoom;
                        top = '30';
                        left = ((self.boxW - width) / 2).toFixed(3);
                    }
                    self.initZoom = zoom;
                    self.zoom = zoom;
                    img.style.width = width + 'px';
                    img.style.height = height + 'px';
                    img.style.top = top + 'px';
                    img.style.left = left + 'px';

                    //把新图片放入编辑框
                    var _box = document.querySelector('.picture-clip .box');
                    var _img = document.querySelector('.picture-clip .box img');
                    var _thumb = document.querySelector('.picture-clip .zoom .thumb');
                    //移除编辑框的图片
                    _img.parentNode.removeChild(_img);
                    //设置编辑框大小 并重新加入新图片
                    _box.style.width = self.boxW + 'px';
                    _box.style.height = self.boxH + 'px';
                    _box.insertBefore(img, _box.childNodes[0]);
                    //拖动按钮归零
                    _thumb.style.left = 0;
                    // //显示编辑框
                    document.querySelector('#picture_clip').style.display = 'block';
                };
                img.src = base64;
                // console.log(base64);
                /**
                 * 页面事件handle
                 */
                    //点击放大按钮
                var zoomIn = function () {
                        if (self.initZoom > 1) return;
                        //滑块位置变化
                        var _line = document.querySelector('.picture-clip .zoom .line');
                        var _thumb = document.querySelector('.picture-clip .zoom .thumb');
                        var max = _line.clientWidth - _thumb.clientWidth;
                        var left = parseFloat(_thumb.style.left);
                        var newLeft = left + max / 10 >= max
                            ? max
                            : left + max / 10;
                        _thumb.style.left = newLeft + 'px';
                        //图片缩放
                        var newZoom = self.zoom + ((1 - self.initZoom) / 10);
                        if (newZoom >= 1) {
                            self.zoom = 1;
                        } else {
                            self.zoom = newZoom;
                        }
                        self.zoomFun();
                    };
                //点击缩小按钮
                var zoomOut = function () {
                    if (self.initZoom > 1) return;
                    //滑块位置变化
                    var _line = document.querySelector('.picture-clip .zoom .line');
                    var _thumb = document.querySelector('.picture-clip .zoom .thumb');
                    var max = _line.clientWidth - _thumb.clientWidth;
                    var left = parseFloat(_thumb.style.left);
                    var newLeft = left - max / 10 < 0
                        ? 0
                        : left - max / 10;
                    _thumb.style.left = newLeft + 'px';
                    //图片缩放
                    var newZoom = self.zoom - ((1 - self.initZoom) / 10);
                    if (newZoom <= self.initZoom) {
                        self.zoom = self.initZoom;
                    } else {
                        self.zoom = newZoom;
                    }
                    self.zoomFun();
                };
                //点击滑动条
                var zoomInOut = function (e) {
                    if (self.initZoom > 1) return;
                    //滑块位置变化
                    var _thumb = document.querySelector('.picture-clip .zoom .thumb');
                    var max = this.clientWidth - _thumb.clientWidth;
                    var left = e.offsetX;
                    var newLeft = left - _thumb.clientWidth / 2;
                    if (left >= max) {
                        newLeft = max;
                    } else if (left <= _thumb.clientWidth / 2) {
                        newLeft = 0;
                    }
                    _thumb.style.left = newLeft + 'px';
                    //图片缩放
                    self.zoom = self.initZoom + (1 - self.initZoom) * (newLeft / max);
                    self.zoomFun();
                };
                //鼠标按下滑块时 添加滑块移动标识
                var thumbMoveing = function () {
                    self.thumbMoveing = 1;
                };
                //鼠标按下图片位置时 添加图片移动标识
                var imgMoveing = function () {
                    self.imgMoveing = 1;
                };
                //鼠标按住移动时 移动滑块或图片
                var bindMoveing = function (e) {
                    //滑块拖动
                    if (self.thumbMoveing && self.lastPosition && self.initZoom <= 1) {
                        //滑块位置变化
                        var _line = document.querySelector('.picture-clip .zoom .line');
                        var _thumb = document.querySelector('.picture-clip .zoom .thumb');
                        var max = _line.clientWidth - _thumb.clientWidth;
                        var left = parseFloat(_thumb.style.left);
                        var newLeft = left + (e.pageX - self.lastPosition.x); //加上偏移量
                        if (newLeft >= max) {
                            newLeft = max;
                        } else if (newLeft <= 0) {
                            newLeft = 0;
                        }
                        _thumb.style.left = newLeft + 'px';
                        //图片缩放
                        self.zoom = self.initZoom + (1 - self.initZoom) * (newLeft / max);
                        self.zoomFun();
                    }

                    //图片拖动
                    if (self.imgMoveing && self.lastPosition) {
                        //图片位置变化
                        var _img = document.querySelector('.picture-clip .box img');
                        var img_left_min = -(parseFloat(_img.clientWidth) - (self.boxW - self.boxGap));  //水平偏移的最小值 为负数; 最大为self.boxGap;
                        var img_top_min = -(parseFloat(_img.clientHeight) - (self.boxH - self.boxGap));  //垂直偏移的最小值 为负数; 最大为self.boxGap;
                        var img_left = parseFloat(_img.style.left);
                        var img_top = parseFloat(_img.style.top);
                        var img_newLeft = img_left + (e.pageX - self.lastPosition.x); //加上偏移量
                        var img_newTop = img_top + (e.pageY - self.lastPosition.y); //加上偏移量
                        if (img_newLeft >= self.boxGap) {
                            img_newLeft = self.boxGap;
                        } else if (img_newLeft <= img_left_min) {
                            img_newLeft = img_left_min;
                        }
                        if (img_newTop >= self.boxGap) {
                            img_newTop = self.boxGap;
                        } else if (img_newTop <= img_top_min) {
                            img_newTop = img_top_min;
                        }
                        _img.style.left = img_newLeft.toFixed(3) + 'px';
                        _img.style.top = img_newTop.toFixed(3) + 'px';
                    }

                    //记录上一次位置
                    self.lastPosition = {
                        x: e.pageX,
                        y: e.pageY
                    };
                };
                //鼠标弹起 移除所有移动标识
                var removeMoveing = function () {
                    self.thumbMoveing = 0;
                    self.imgMoveing = 0;
                };
                //移除事件
                var removeEvent = function () {
                    document.querySelector('.picture-clip .zoomIn').removeEventListener('click', zoomIn);
                    document.querySelector('.picture-clip .zoomOut').removeEventListener('click', zoomOut);
                    document.querySelector('.picture-clip .line').removeEventListener('click', zoomInOut);
                    document.querySelector('.picture-clip .thumb').removeEventListener('mousedown', thumbMoveing);
                    document.querySelector('.picture-clip .shade').removeEventListener('mousedown', imgMoveing);
                    document.querySelector('.picture-clip').removeEventListener('mousemove', bindMoveing);
                    document.documentElement.removeEventListener('mouseup', removeMoveing);
                    document.querySelector('.picture-clip .button .continue').removeEventListener('click', save);
                    document.querySelector('.picture-clip .button .cancel').removeEventListener('click', colse);
                    document.querySelector('.picture-clip .title .cancel').removeEventListener('click', colse);
                };
                //保存按钮
                var save = function () {
                    if (!self.saved) {
                        self.cb(self.saveFun());
                        self.saved = 1;  //事件已经移除~ 但是这里依旧检测是否已保存! 以防止特殊情况!
                    }
                    document.querySelector('#picture_clip').style.display = 'none';
                    console.log(base64);
                    $.ajax({
                        url:"http://localhost:8080/user/changeUserAvatar",
                        type:"post",
                        data:{"userId":$.cookie("userId"),"userAvatar":base64}
                    });
                    removeEvent();
                };
                //关闭按钮
                var colse = function () {
                    document.querySelector('#picture_clip').style.display = 'none';
                    removeEvent();
                };
                //绑定事件
                document.querySelector('.picture-clip .zoomIn').addEventListener('click', zoomIn);
                document.querySelector('.picture-clip .zoomOut').addEventListener('click', zoomOut);
                document.querySelector('.picture-clip .line').addEventListener('click', zoomInOut);
                document.querySelector('.picture-clip .thumb').addEventListener('mousedown', thumbMoveing);
                document.querySelector('.picture-clip .shade').addEventListener('mousedown', imgMoveing);
                document.querySelector('.picture-clip').addEventListener('mousemove', bindMoveing);
                document.documentElement.addEventListener('mouseup', removeMoveing);
                document.querySelector('.picture-clip .button .continue').addEventListener('click', save);
                document.querySelector('.picture-clip .button .cancel').addEventListener('click', colse);
                document.querySelector('.picture-clip .title .cancel').addEventListener('click', colse);
            });
        },
        getImgBase64: function (imgFile, cb) {
            if (window.FileReader) {
                var reader = new FileReader();
                reader.onload = function () {
                    if (cb) {
                        cb(reader.result);
                    }
                };
                reader.readAsDataURL(imgFile);
            }
        },
        zoomFun: function () {
            var _img = document.querySelector('.picture-clip .box img');
            var oldW = parseFloat(_img.clientWidth);
            var oldH = parseFloat(_img.clientHeight);
            var oldL = parseFloat(_img.style.left);
            var oldT = parseFloat(_img.style.top);

            //计算新的 图片大小
            var newW = (this.originW * this.zoom).toFixed(3);
            var newH = (this.originH * this.zoom).toFixed(3);

            //计算新的 偏移量
            var newL = (oldL - (newW - oldW) / 2).toFixed(3);
            var newT = (oldT - (newH - oldH) / 2).toFixed(3);

            //偏移量的极限值
            var maxLeft = this.boxGap;
            var minLeft = -(newW - (this.boxW - this.boxGap));
            var maxTop = this.boxGap;
            var minTop = -(newH - (this.boxH - this.boxGap));

            if (newL >= maxLeft) {
                newL = maxLeft;
            } else if (newL <= minLeft) {
                newL = minLeft;
            }
            if (newT >= maxTop) {
                newT = maxTop;
            } else if (newT <= minTop) {
                newT = minTop;
            }
            //设置图片
            _img.style.width = newW + 'px';
            _img.style.height = newH + 'px';
            _img.style.left = newL + 'px';
            _img.style.top = newT + 'px';
        },
        saveFun: function () {
            //设置画板
            var canvas = document.createElement('canvas');
            canvas.width = this.wantW;
            canvas.height = this.wantH;

            //绘图所需参数
            var _img = document.querySelector('.picture-clip .box img');
            var sx = Math.abs((this.boxGap - parseFloat(_img.style.left)) / this.zoom);
            var sy = Math.abs((this.boxGap - parseFloat(_img.style.top)) / this.zoom);
            var sWidth = (this.boxW - this.boxGap * 2) / this.zoom;
            var sHeight = (this.boxH - this.boxGap * 2) / this.zoom;
            var dx = 0;
            var dy = 0;
            var dWidth = this.wantW;
            var dHeight = this.wantH;
            //console.log(this);
            //console.log(sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

            //https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
            //绘图
            var ctx = canvas.getContext('2d');
            ctx.drawImage(_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            return canvas.toDataURL(_img.src.match(/data:(.+);base64/)[1]);
        }
    };
})(this);
