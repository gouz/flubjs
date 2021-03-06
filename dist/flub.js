(function() {
  var Flub;

  Flub = (function() {
    function Flub(selector, opts) {
      var base, base1, base2, base3, base4, base5, base6, blur, flubber, radius, rect;
      this.opts = opts != null ? opts : {};
      if ((base = this.opts).min == null) {
        base.min = 0;
      }
      if ((base1 = this.opts).max == null) {
        base1.max = 360;
      }
      if ((base2 = this.opts).speed == null) {
        base2.speed = 200;
      }
      if ((base3 = this.opts).dispatch == null) {
        base3.dispatch = true;
      }
      if ((base4 = this.opts).sync == null) {
        base4.sync = false;
      }
      if ((base5 = this.opts).elastic == null) {
        base5.elastic = false;
      }
      if ((base6 = this.opts).blur == null) {
        base6.blur = true;
      }
      flubber = document.querySelector(selector);
      flubber.style.position = 'relative';
      this.launcher = flubber.querySelector(flubber.getAttribute('data-launcher'));
      this.wrapper = document.querySelector(this.launcher.getAttribute('href'));
      rect = this.launcher.getBoundingClientRect();
      radius = rect.width / 2;
      this.button = {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft,
        radius: radius
      };
      blur = this.opts.blur ? '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7' : '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 0';
      blur = '<feColorMatrix in="blur" mode="matrix" values="' + blur + '" result="goo" />';
      document.write('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"> <defs> <filter id="flub-shadow"> <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + this.button.radius / 4 + '" />' + blur + '<feGaussianBlur in="goo" stdDeviation="3" result="shadow" /> <feOffset in="shadow" dx="1" dy="1" result="shadow" /> <feBlend in2="shadow" in="goo" result="goo" /> <feBlend in2="goo" in="SourceGraphic" result="mix" /> </filter> <filter id="flub-goo"> <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + this.button.radius / 4 + '" />' + blur + '<feBlend in2="goo" in="SourceGraphic" result="mix" /> </filter> </defs> </svg>');
      flubber.style.filter = 'url(#flub-shadow)';
      flubber.style.webkitFilter = 'url(#flub-shadow)';
      this.launcher.style.zIndex = 2;
      this.launcher.style.position = 'absolute';
      this.wrapper.style.position = 'absolute';
      this.populate();
      rect = this.items[0].getBoundingClientRect();
      this.radius = rect.width / 2;
      this.cnst = Math.PI / 180;
      this.launcher.addEventListener('click', (function(_this) {
        return function(e) {
          var i, j, len, ref;
          e.preventDefault();
          if (_this.wrapper.classList.contains('open')) {
            _this.wrapper.classList.remove('open');
            ref = _this.items;
            for (j = 0, len = ref.length; j < len; j++) {
              i = ref[j];
              i.style.left = 0;
              i.style.top = 0;
            }
          } else {
            _this.position();
          }
          return false;
        };
      })(this), false);
      this;
    }

    Flub.prototype.position = function() {
      var D, N, a, ang, c, calc, f, i, j, l, len, m, ref;
      this.wrapper.classList.add('open');
      l = this.items.length;
      D = 2.5 * this.button.radius;
      N = f = 0;
      ang = this.opts.max - this.opts.min;
      calc = (function(_this) {
        return function() {
          N = ~~((ang / 60) * (D / (_this.radius * 2)));
          if (N > l && _this.opts.dispatch) {
            N = l;
          }
          return f = ang / N;
        };
      })(this);
      calc();
      c = 0;
      m = 0;
      ref = this.items;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (c === N) {
          c = 0;
          m++;
          D += 2 * this.button.radius;
          l -= N;
          calc();
        }
        a = this.cnst * (this.opts.min + f * c++);
        i.style.left = (D * Math.cos(a)) + 'px';
        i.style.top = -(D * Math.sin(a)) + 'px';
      }
      return this;
    };

    Flub.prototype.populate = function() {
      var c, i, j, k, len, len1, r, ref, ref1;
      this.items = [];
      ref = this.wrapper.children;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (i.nodeType !== 8) {
          this.items.push(i);
          i.style.position = 'absolute';
          i.style.top = 0;
          i.style.left = 0;
        }
      }
      c = 0;
      ref1 = this.wrapper.children;
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        i = ref1[k];
        r = this.opts.sync ? 1 : ++c / this.items.length;
        i.style.transition = 'all ease-out ' + (this.opts.speed * r) + 'ms';
        if (this.opts.elastic) {
          i.style.transitionTimingFunction = "cubic-bezier(0.66,-0.07, 0.06, 1.55)";
        }
      }
      return this;
    };

    Flub.prototype.toggle = function() {
      var event;
      event = document.createEvent('HTMLEvents');
      event.initEvent('click', false, false);
      this.launcher.dispatchEvent(event);
      return this;
    };

    return Flub;

  })();

  this.Flub = Flub;

}).call(this);
