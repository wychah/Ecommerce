(function (_) {
    //������ʽ
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
    //����DOM
    var domText = '<div id="picture_clip"><div class="picture-clip"><div class="picture-clip-box"><div class="title"><span>&#32534;&#36753;&#22270;&#29255;</span><a href="javascript:;" class="cancel">&#215;</a></div><div class="box"><img src=""><div class="shade" title="&#25302;&#21160;&#22270;&#29255;"></div></div><div class="zoom"><a href="javascript:;" class="zoomOut" title="&#32553;&#23567;">&#65123;</a><div class="horizontal"><div class="line"></div><div class="thumb"></div></div><a href="javascript:;" class="zoomIn" title="&#25918;&#22823;">&#65122;</a></div><div class="button"><a href="javascript:;" class="continue">&#30830;&#23450;</a><a href="javascript:;" class="cancel">&#21462;&#28040;</a></div></div></div></div>';
    var divEl = document.createElement("div");
    document.getElementsByTagName("body")[0].appendChild(divEl);
    divEl.innerHTML = domText;
    //���ȫ�ַ���
    _.picture_clip = {
        boxGap: 30, //�༭��ļ�϶
        boxMin: 240, //�༭����С����
        boxMax: 400, //�༭����󳤶�
        init: function (el, wantW, wantH, cb) {
            if (el == undefined || wantW == undefined || wantH == undefined || cb == undefined) {
                return;
            }
            if (!el.files) {
                alert('��֧��IE10�����������, �Ƽ�ʹ������Chrome�����');
                return;
            }
            this.el = el;
            this.cb = cb;
            this.wantW = wantW;
            this.wantH = wantH;
            this.saved = 0;

            //������Ҫͼ��Ĵ�С����ü���Ĵ�С!
            var boxMin = this.boxMin,
                boxMax = this.boxMax,
                boxGapLen = this.boxGap * 2;
            if (wantW >= boxMin - boxGapLen && wantW <= boxMax - boxGapLen && wantH >= boxMin - boxGapLen && wantH <= boxMax - boxGapLen) {
                this.boxW = wantW + boxGapLen;
                this.boxH = wantH + boxGapLen;
            } else {
                var wantAR = wantW / wantH;
                //��Ҫ��ͼ
                if (wantAR > 1) {
                    if (wantW < boxMin - boxGapLen) {
                        this.boxW = boxMin;
                        this.boxH = (boxMin - boxGapLen) * wantH / wantW + boxGapLen;
                    } else if (wantW > boxMax - boxGapLen) {
                        this.boxW = boxMax;
                        this.boxH = (boxMax - boxGapLen) * wantH / wantW + boxGapLen;
                    }
                }
                //��Ҫ��ͼ
                else if (wantAR < 1) {
                    if (wantH < boxMin - boxGapLen) {
                        this.boxH = boxMin;
                        this.boxW = (boxMin - boxGapLen) * wantW / wantH + boxGapLen;
                    } else if (wantH > boxMax - boxGapLen) {
                        this.boxH = boxMax;
                        this.boxW = (boxMax - boxGapLen) * wantW / wantH + boxGapLen;
                    }
                }
                //��Ҫ��ͼ
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
                //��ʼ���༭��ͼƬ
                var img = new Image();
                img.onload = function () {
                    self.originW = img.width;
                    self.originH = img.height;
                    //�Ƚϲü�������ԴͼƬ�ĺ��ݱ�
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

                    //����ͼƬ����༭��
                    var _box = document.querySelector('.picture-clip .box');
                    var _img = document.querySelector('.picture-clip .box img');
                    var _thumb = document.querySelector('.picture-clip .zoom .thumb');
                    //�Ƴ��༭���ͼƬ
                    _img.parentNode.removeChild(_img);
                    //���ñ༭���С �����¼�����ͼƬ
                    _box.style.width = self.boxW + 'px';
                    _box.style.height = self.boxH + 'px';
                    _box.insertBefore(img, _box.childNodes[0]);
                    //�϶���ť����
                    _thumb.style.left = 0;
                    // //��ʾ�༭��
                    document.querySelector('#picture_clip').style.display = 'block';
                };
                img.src = base64;
                // console.log(base64);
                /**
                 * ҳ���¼�handle
                 */
                    //����Ŵ�ť
                var zoomIn = function () {
                        if (self.initZoom > 1) return;
                        //����λ�ñ仯
                        var _line = document.querySelector('.picture-clip .zoom .line');
                        var _thumb = document.querySelector('.picture-clip .zoom .thumb');
                        var max = _line.clientWidth - _thumb.clientWidth;
                        var left = parseFloat(_thumb.style.left);
                        var newLeft = left + max / 10 >= max
                            ? max
                            : left + max / 10;
                        _thumb.style.left = newLeft + 'px';
                        //ͼƬ����
                        var newZoom = self.zoom + ((1 - self.initZoom) / 10);
                        if (newZoom >= 1) {
                            self.zoom = 1;
                        } else {
                            self.zoom = newZoom;
                        }
                        self.zoomFun();
                    };
                //�����С��ť
                var zoomOut = function () {
                    if (self.initZoom > 1) return;
                    //����λ�ñ仯
                    var _line = document.querySelector('.picture-clip .zoom .line');
                    var _thumb = document.querySelector('.picture-clip .zoom .thumb');
                    var max = _line.clientWidth - _thumb.clientWidth;
                    var left = parseFloat(_thumb.style.left);
                    var newLeft = left - max / 10 < 0
                        ? 0
                        : left - max / 10;
                    _thumb.style.left = newLeft + 'px';
                    //ͼƬ����
                    var newZoom = self.zoom - ((1 - self.initZoom) / 10);
                    if (newZoom <= self.initZoom) {
                        self.zoom = self.initZoom;
                    } else {
                        self.zoom = newZoom;
                    }
                    self.zoomFun();
                };
                //���������
                var zoomInOut = function (e) {
                    if (self.initZoom > 1) return;
                    //����λ�ñ仯
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
                    //ͼƬ����
                    self.zoom = self.initZoom + (1 - self.initZoom) * (newLeft / max);
                    self.zoomFun();
                };
                //��갴�»���ʱ ��ӻ����ƶ���ʶ
                var thumbMoveing = function () {
                    self.thumbMoveing = 1;
                };
                //��갴��ͼƬλ��ʱ ���ͼƬ�ƶ���ʶ
                var imgMoveing = function () {
                    self.imgMoveing = 1;
                };
                //��갴ס�ƶ�ʱ �ƶ������ͼƬ
                var bindMoveing = function (e) {
                    //�����϶�
                    if (self.thumbMoveing && self.lastPosition && self.initZoom <= 1) {
                        //����λ�ñ仯
                        var _line = document.querySelector('.picture-clip .zoom .line');
                        var _thumb = document.querySelector('.picture-clip .zoom .thumb');
                        var max = _line.clientWidth - _thumb.clientWidth;
                        var left = parseFloat(_thumb.style.left);
                        var newLeft = left + (e.pageX - self.lastPosition.x); //����ƫ����
                        if (newLeft >= max) {
                            newLeft = max;
                        } else if (newLeft <= 0) {
                            newLeft = 0;
                        }
                        _thumb.style.left = newLeft + 'px';
                        //ͼƬ����
                        self.zoom = self.initZoom + (1 - self.initZoom) * (newLeft / max);
                        self.zoomFun();
                    }

                    //ͼƬ�϶�
                    if (self.imgMoveing && self.lastPosition) {
                        //ͼƬλ�ñ仯
                        var _img = document.querySelector('.picture-clip .box img');
                        var img_left_min = -(parseFloat(_img.clientWidth) - (self.boxW - self.boxGap));  //ˮƽƫ�Ƶ���Сֵ Ϊ����; ���Ϊself.boxGap;
                        var img_top_min = -(parseFloat(_img.clientHeight) - (self.boxH - self.boxGap));  //��ֱƫ�Ƶ���Сֵ Ϊ����; ���Ϊself.boxGap;
                        var img_left = parseFloat(_img.style.left);
                        var img_top = parseFloat(_img.style.top);
                        var img_newLeft = img_left + (e.pageX - self.lastPosition.x); //����ƫ����
                        var img_newTop = img_top + (e.pageY - self.lastPosition.y); //����ƫ����
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

                    //��¼��һ��λ��
                    self.lastPosition = {
                        x: e.pageX,
                        y: e.pageY
                    };
                };
                //��굯�� �Ƴ������ƶ���ʶ
                var removeMoveing = function () {
                    self.thumbMoveing = 0;
                    self.imgMoveing = 0;
                };
                //�Ƴ��¼�
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
                //���水ť
                var save = function () {
                    if (!self.saved) {
                        self.cb(self.saveFun());
                        self.saved = 1;  //�¼��Ѿ��Ƴ�~ �����������ɼ���Ƿ��ѱ���! �Է�ֹ�������!
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
                //�رհ�ť
                var colse = function () {
                    document.querySelector('#picture_clip').style.display = 'none';
                    removeEvent();
                };
                //���¼�
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

            //�����µ� ͼƬ��С
            var newW = (this.originW * this.zoom).toFixed(3);
            var newH = (this.originH * this.zoom).toFixed(3);

            //�����µ� ƫ����
            var newL = (oldL - (newW - oldW) / 2).toFixed(3);
            var newT = (oldT - (newH - oldH) / 2).toFixed(3);

            //ƫ�����ļ���ֵ
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
            //����ͼƬ
            _img.style.width = newW + 'px';
            _img.style.height = newH + 'px';
            _img.style.left = newL + 'px';
            _img.style.top = newT + 'px';
        },
        saveFun: function () {
            //���û���
            var canvas = document.createElement('canvas');
            canvas.width = this.wantW;
            canvas.height = this.wantH;

            //��ͼ�������
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
            //��ͼ
            var ctx = canvas.getContext('2d');
            ctx.drawImage(_img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            return canvas.toDataURL(_img.src.match(/data:(.+);base64/)[1]);
        }
    };
})(this);
