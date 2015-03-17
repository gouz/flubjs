(function() {
  var Flub;

  Flub = (function() {
    function Flub(selector, opts) {
      var base, base1, base2, button, c, cnst, flubber, i, items, j, k, len, len1, radius, rect, ref, wrapper;
      this.opts = opts != null ? opts : {};
      flubber = document.querySelector(selector);
      flubber.style.position = 'relative';
      this.launcher = flubber.querySelector(flubber.getAttribute('data-launcher'));
      wrapper = document.querySelector(this.launcher.getAttribute('href'));
      rect = this.launcher.getBoundingClientRect();
      radius = rect.width / 2;
      button = {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft,
        radius: radius
      };
      document.write('<svg xmlns="http://www.w3.org/2000/svg" version="1.1"> <defs> <filter id="flub-shadow"> <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + button.radius / 4 + '" /> <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /> <feGaussianBlur in="goo" stdDeviation="3" result="shadow" /> <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="shadow" /> <feOffset in="shadow" dx="1" dy="1" result="shadow" /> <feBlend in2="shadow" in="goo" result="goo" /> <feBlend in2="goo" in="SourceGraphic" result="mix" /> </filter> <filter id="flub-goo"> <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + button.radius / 4 + '" /> <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /> <feBlend in2="goo" in="SourceGraphic" result="mix" /> </filter> </defs> </svg>');
      flubber.style.filter = 'url(#flub-shadow)';
      flubber.style.webkitFilter = 'url(#flub-shadow)';
      if ((base = this.opts).min == null) {
        base.min = 0;
      }
      if ((base1 = this.opts).max == null) {
        base1.max = 360;
      }
      if ((base2 = this.opts).speed == null) {
        base2.speed = 200;
      }
      items = [];
      this.launcher.style.zIndex = 2;
      this.launcher.style.position = 'absolute';
      wrapper.style.position = 'absolute';
      ref = wrapper.children;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (i.nodeType !== 8) {
          items.push(i);
        }
      }
      rect = items[0].getBoundingClientRect();
      radius = rect.width / 2;
      c = 0;
      for (k = 0, len1 = items.length; k < len1; k++) {
        i = items[k];
        i.style.position = 'absolute';
        i.style.top = 0;
        i.style.left = 0;
        i.style.transition = 'all ease-out ' + (this.opts.speed * (++c / items.length)) + 'ms';
        i.style.transitionTimingFunction = "cubic-bezier(0.66,-0.07, 0.06, 1.55)";
      }
      cnst = Math.PI / 180;
      this.launcher.addEventListener('click', (function(_this) {
        return function(e) {
          var D, N, a, ang, calc, f, l, len2, len3, m, n, o, results, results1;
          e.preventDefault();
          if (wrapper.classList.contains('open')) {
            wrapper.classList.remove('open');
            results = [];
            for (n = 0, len2 = items.length; n < len2; n++) {
              i = items[n];
              i.style.left = 0;
              results.push(i.style.top = 0);
            }
            return results;
          } else {
            wrapper.classList.add('open');
            l = items.length;
            D = 2.5 * button.radius;
            N = f = 0;
            ang = _this.opts.max - _this.opts.min;
            calc = function() {
              N = ~~((ang / 60) * (D / (radius * 2)));
              if (N > l) {
                N = l;
              }
              return f = ang / N;
            };
            calc();
            c = 0;
            m = 0;
            results1 = [];
            for (o = 0, len3 = items.length; o < len3; o++) {
              i = items[o];
              if (c === N) {
                c = 0;
                m++;
                D += 2 * button.radius;
                l -= N;
                calc();
              }
              a = cnst * (_this.opts.min + f * c++);
              i.style.left = (D * Math.cos(a)) + 'px';
              results1.push(i.style.top = -(D * Math.sin(a)) + 'px');
            }
            return results1;
          }
        };
      })(this));
      this;
    }

    Flub.prototype.toggle = function() {
      var event;
      event = document.createEvent('HTMLEvents');
      event.initEvent('click', true, false);
      return this.launcher.dispatchEvent(event);
    };

    return Flub;

  })();

  this.Flub = Flub;

}).call(this);
