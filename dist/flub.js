(function() {
  var Flub;

  Flub = (function() {
    function Flub(selector, options) {
      this.options = options != null ? options : {};
      this.element = document.querySelector(selector);
      this.init();
      this;
    }

    Flub.prototype.init = function() {
      var base, base1, button, cnst, i, items, j, k, len, len1, radius, rect, ref, wrapper;
      if ((base = this.options).angle_max == null) {
        base.angle_max = 360;
      }
      if ((base1 = this.options).angle_min == null) {
        base1.angle_min = 0;
      }
      wrapper = document.querySelector(this.element.getAttribute('href'));
      rect = this.element.getBoundingClientRect();
      radius = (rect.right - rect.left) / 2;
      button = {
        top: rect.top + document.body.scrollTop + radius,
        left: rect.left + document.body.scrollLeft + radius,
        radius: radius
      };
      items = [];
      this.element.style.position = 'relative';
      this.element.style.zIndex = 2;
      ref = wrapper.children;
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
        i.style.left = (button.left - radius) + 'px';
        i.style.top = (button.top - radius) + 'px';
      }
      cnst = Math.PI / 180;
      return this.element.addEventListener('click', (function(_this) {
        return function(e) {
          var D, N, a, c, calc, f, l, len2, len3, m, n, o, results, results1;
          e.preventDefault();
          if (wrapper.classList.contains('open')) {
            wrapper.classList.remove('open');
            results = [];
            for (n = 0, len2 = items.length; n < len2; n++) {
              i = items[n];
              i.style.marginLeft = 0;
              results.push(i.style.marginTop = 0);
            }
            return results;
          } else {
            wrapper.classList.add('open');
            l = items.length;
            D = 2 * button.radius;
            N = f = 0;
            calc = function() {
              N = ~~(6 * ((_this.options.angle_max - _this.options.angle_min) / 360) * (1 + D / button.radius));
              if (N > l) {
                N = l;
              }
              return f = (_this.options.angle_max - _this.options.angle_min) / N;
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
              a = cnst * (_this.options.angle_min + f * c++);
              i.style.marginLeft = -(D * Math.cos(a)) + 'px';
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
