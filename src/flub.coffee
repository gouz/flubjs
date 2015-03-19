class Flub
  constructor: (selector, @opts = {}) ->
    @opts.min ?= 0
    @opts.max ?= 360
    @opts.speed ?= 200
    @opts.dispatch ?= true
    @opts.sync ?= false
    @opts.elastic ?= false
    @opts.blur ?= true
    flubber = document.querySelector selector
    flubber.style.position = 'relative'
    @launcher = flubber.querySelector flubber.getAttribute 'data-launcher'
    @wrapper = document.querySelector @launcher.getAttribute 'href'
    rect = @launcher.getBoundingClientRect()
    radius = rect.width / 2
    @button = {
      top: rect.top + document.body.scrollTop
      left: rect.left + document.body.scrollLeft
      radius: radius
    }
    blur = if @opts.blur then '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7' else '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 0'
    blur = '<feColorMatrix in="blur" mode="matrix" values="' + blur + '" result="goo" />'
    document.write '
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="flub-shadow">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + @button.radius / 4 + '" />
        ' + blur + '
        <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
        <feOffset in="shadow" dx="1" dy="1" result="shadow" />
        <feBlend in2="shadow" in="goo" result="goo" />
        <feBlend in2="goo" in="SourceGraphic" result="mix" />
    </filter>
    <filter id="flub-goo">
        <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + @button.radius / 4 + '" />
        ' + blur + '
        <feBlend in2="goo" in="SourceGraphic" result="mix" />
    </filter>
  </defs>
</svg>
    '
    flubber.style.filter = 'url(#flub-shadow)'
    flubber.style.webkitFilter = 'url(#flub-shadow)'
    @launcher.style.zIndex = 2
    @launcher.style.position = 'absolute'
    @wrapper.style.position = 'absolute'
    @populate()
    rect = @items[0].getBoundingClientRect()
    @radius = rect.width / 2
    @cnst = Math.PI / 180
    @launcher.addEventListener 'click', (e) =>
      e.preventDefault()
      if @wrapper.classList.contains 'open'
        @wrapper.classList.remove 'open'
        for i in @items
          i.style.left = 0
          i.style.top = 0
      else
        @position()
      false
    , false
    @
  position: ->
    @wrapper.classList.add 'open'
    l = @items.length
    D = 2.5 * @button.radius
    N = f = 0
    ang = @opts.max-@opts.min
    calc = () =>
      N = ~~((ang / 60) * (D / (@radius * 2)))
      N = l if N > l and @opts.dispatch
      f = ang / N
    calc()
    c = 0
    m = 0
    for i in @items
      if c is N
        c = 0
        m++
        D += 2 * @button.radius
        l -= N
        calc()
      a = @cnst * (@opts.min + f * c++)
      i.style.left = (D * Math.cos a) + 'px'
      i.style.top = -(D * Math.sin a) + 'px'
    @
  populate: ->
    @items = []
    for i in @wrapper.children
      if i.nodeType isnt 8
        @items.push i
        i.style.position = 'absolute'
        i.style.top = 0
        i.style.left = 0
    c = 0
    for i in @wrapper.children
      r = if @opts.sync then 1 else (++c/@items.length)
      i.style.transition = 'all ease-out ' + (@opts.speed * r) + 'ms'
      i.style.transitionTimingFunction = "cubic-bezier(0.66,-0.07, 0.06, 1.55)" if @opts.elastic
    @
  toggle: ->
    event = document.createEvent 'HTMLEvents'
    event.initEvent 'click', false, false
    @launcher.dispatchEvent event
    @
@Flub = Flub
