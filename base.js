(function() {
    var Base = function() {
        var _this = this;
        _this.$window = $(window);
        _this.$document = $(document);
        _this.$thmlBody = $('html, body');
        _this.$body = $('body');
        _this.initScrollTo('.scroll-to, [href*="#"], [data-toggle="scroll-to"]');
        _this.$fancybox = $('.fancybox').fancybox({
            buttons: ['close']
        });
        if (document.readyState === 'complete') {
            if (window.location.hash) window.scrollTo(0, 0);
            _this.onLoad();
        } else
            window.addEventListener('load', function() {
                if (window.location.hash) window.scrollTo(0, 0);
                _this.onLoad();
            });
    };
    Base.prototype.initScrollTo = function(elements, offset, time) {
        var _this = this;
        if (_this.$scrollTo) _this.$scrollTo.off('click');
        if (typeof elements === 'string') _this.$scrollTo = $(elements);
        else
            _this.$scrollTo = elements;
        if (window.location.hash) window.scrollTo(0, 0);
        _this.$scrollTo.on('click', function(e) {
            var $this = $(this),
                url = _this.parseUrl($this.data('target') || $this.attr('href'));
            if (url.pathname === window.location.pathname) {
                e.preventDefault();
                if (url.hash) _this.scrollTo(url.hash, offset, time);
            }
        });
    };
    Base.prototype.scrollTo = function(target, offset, time) {
        var _this = this,
            $target = target;
        if (typeof $target === 'string') $target = $((target.indexOf('#') === -1 ? '#' : '') + target);
        else if ($target instanceof HTMLElement) $target = $($target);
        time = parseInt(time || 1500);
        offset = parseInt(offset || 0);
        if ($target && $target.length > 0) _this.$thmlBody.animate({
            scrollTop: $target.offset().top - offset
        }, time);
    };
    Base.prototype.onLoad = function() {
        var _this = this;
        _this.$body.addClass('loaded');
        if (window.location.hash) setTimeout(function() {
            _this.scrollTo(window.location.hash);
        }, 1000);
    };
    Base.prototype.parseUrl = function(url) {
        var link = document.createElement('a');
        link.href = url;
        return {
            protocol: link.protocol,
            hostname: link.hostname,
            port: link.port,
            pathname: link.pathname,
            search: link.search,
            hash: link.hash,
            host: link.host
        };
    };
    var Video = function(videoElement, playButtonElement, autoPlay) {
        var _this = this;
        _this.video = _this.getElement(videoElement);
        if (!_this.video) return;
        _this.playButton = _this.getElement(playButtonElement);
        _this.video.onclick = function() {
            _this.toggle()
        };
        _this.video.onplay = function() {
            _this.toggleClass();
        };
        _this.video.onpause = function() {
            _this.toggleClass();
        };
        if (_this.playButton) _this.playButton.onclick = function() {
            _this.toggle();
        };
        _this.toggleClass();
        if (autoPlay) {
            window.addEventListener('load', function() {
                _this.play();
            });
        }
    };
    Video.prototype.play = function() {
        if (this.video) this.video.play();
    };
    Video.prototype.pause = function() {
        if (this.video) this.video.pause();
    };
    Video.prototype.toggle = function() {
        var _this = this;
        if (_this.video) {
            if (_this.video.paused) _this.video.play();
            else
                _this.video.pause();
        }
    };
    Video.prototype.toggleClass = function() {
        var _this = this;
        if (_this.video) {
            if (_this.video.paused) {
                _this.video.classList.add('paused');
                _this.video.classList.remove('play');
                if (_this.playButton) {
                    _this.playButton.classList.add('paused');
                    _this.playButton.classList.remove('play');
                }
            } else {
                _this.video.classList.add('play');
                _this.video.classList.remove('paused');
                if (_this.playButton) {
                    _this.playButton.classList.add('play');
                    _this.playButton.classList.remove('paused');
                }
            }
        }
    };
    Video.prototype.getElement = function(element) {
        var e = null;
        if (typeof element === 'string') e = document.querySelector(element);
        else if (element instanceof HTMLElement) e = element;
        return e;
    };
    window['Base'] = Base;
    window['Video'] = Video;
})();