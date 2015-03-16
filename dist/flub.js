(function() {
  var Flub;

  Flub = (function() {
    function Flub(selector, options) {
      var flubber;
      this.options = options != null ? options : {};
      flubber = document.querySelector(selector);
      this.element = flubber.querySelector(flubber.getAttribute('data-launcher'));
      this.init();
      this.makeFilter();
      flubber.style.filter = 'url(#flub-shadow)';
      flubber.style.webkitFilter = 'url(#flub-shadow)';
      this.bind();
      this;
    }

    Flub.prototype.makeFilter = function() {
      var svg;
      svg = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"> <defs> <filter id="flub-shadow"> <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + this.button.radius / 2 + '" /> <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /> <feGaussianBlur in="goo" stdDeviation="3" result="shadow" /> <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 0" result="shadow" /> <feOffset in="shadow" dx="1" dy="1" result="shadow" /> <feBlend in2="shadow" in="goo" result="goo" /> <feBlend in2="goo" in="SourceGraphic" result="mix" /> </filter> <filter id="flub-goo"> <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + this.button.radius / 2 + '" /> <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" /> <feBlend in2="goo" in="SourceGraphic" result="mix" /> </filter> </defs> </svg>';
      return document.write(svg);
    };

    Flub.prototype.init = function() {
      var radius, rect;
      this.wrapper = document.querySelector(this.element.getAttribute('href'));
      rect = this.element.getBoundingClientRect();
      this.wrapper.style.display = 'none';
      radius = (rect.right - rect.left) / 2;
      this.button = {
        top: rect.top + document.body.scrollTop + radius,
        left: rect.left + document.body.scrollLeft + radius,
        radius: radius
      };
      return this.wrapper.style.display = 'block';
    };

    Flub.prototype.bind = function() {
      var base, base1, cnst, i, items, j, k, len, len1, radius, rect, ref;
      if ((base = this.options).min == null) {
        base.min = 0;
      }
      if ((base1 = this.options).max == null) {
        base1.max = 360;
      }
      this.options.speed = 200;
      items = [];
      this.element.style.position = 'relative';
      this.element.style.zIndex = 2;
      ref = this.wrapper.children;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (i.nodeType !== 8) {
          i.style.position = 'absolute';
          items.push(i);
        }
      }
      rect = items[0].getBoundingClientRect();
      radius = (rect.right - rect.left) / 2;
      for (k = 0, len1 = items.length; k < len1; k++) {
        i = items[k];
        i.style.left = (this.button.left - radius) + 'px';
        i.style.top = (this.button.top - radius) + 'px';
        i.style.transition = 'all ease-out ' + this.options.speed + 'ms';
      }
      cnst = Math.PI / 180;
      this.element;
      return this.element.addEventListener('click', (function(_this) {
        return function(e) {
          var D, N, a, ang, c, calc, f, l, len2, len3, m, n, o, results, results1;
          e.preventDefault();
          if (_this.wrapper.classList.contains('open')) {
            _this.wrapper.classList.remove('open');
            results = [];
            for (n = 0, len2 = items.length; n < len2; n++) {
              i = items[n];
              i.style.marginLeft = 0;
              results.push(i.style.marginTop = 0);
            }
            return results;
          } else {
            _this.wrapper.classList.add('open');
            l = items.length;
            D = 2 * _this.button.radius;
            N = f = 0;
            ang = _this.options.max - _this.options.min;
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
                D += 2 * _this.button.radius;
                l -= N;
                calc();
              }
              a = cnst * (_this.options.min + f * c++);
              i.style.marginLeft = (D * Math.cos(a)) + 'px';
              results1.push(i.style.marginTop = -(D * Math.sin(a)) + 'px');
            }
            return results1;
          }
        };
      })(this));
    };

    return Flub;

  })();

  this.Flub = Flub;

}).call(this);
