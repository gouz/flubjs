class Flub
  constructor: (selector, @options = {}) ->
    flubber = document.querySelector selector
    @element = flubber.querySelector flubber.getAttribute 'data-launcher'
    @init()
    @makeFilter()
    flubber.style.filter = 'url(#flub-shadow)'
    flubber.style.webkitFilter = 'url(#flub-shadow)'
    @bind()
    @
  makeFilter: ->
    svg = '
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="flub-shadow">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + @button.radius / 4 + '" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0 0" result="shadow" />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feBlend in2="shadow" in="goo" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
        </filter>
        <filter id="flub-goo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="' + @button.radius / 4 + '" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
        </filter>
      </defs>
    </svg>
    '
    document.write svg
  init: ->
    @wrapper = document.querySelector @element.getAttribute 'href'
    rect = @element.getBoundingClientRect()
    @wrapper.style.display = 'none'
    radius = (rect.right - rect.left) / 2
    @button = {
      top: rect.top + document.body.scrollTop + radius
      left: rect.left + document.body.scrollLeft + radius
      radius: radius
    }
    @wrapper.style.display = 'block'
  bind: ->
    @options.min ?= 0
    @options.max ?= 360
    @options.speed ?= 200
    items = []
    @element.style.position = 'relative'
    @element.style.zIndex = 2
    for i in @wrapper.children
      if i.nodeType isnt 8
        i.style.position = 'absolute'
        items.push i
    rect = items[0].getBoundingClientRect()
    radius = (rect.right - rect.left) / 2
    c = 0
    for i in items
      i.style.left = (@button.left - radius) + 'px'
      i.style.top = (@button.top - radius) + 'px'
      i.style.transition = 'all ease-out ' + (@options.speed * (++c/items.length)) + 'ms'
    cnst = Math.PI / 180
    @element
    @element.addEventListener 'click', (e) =>
      e.preventDefault()
      if @wrapper.classList.contains 'open'
        @wrapper.classList.remove 'open'
        for i in items
          i.style.marginLeft = 0
          i.style.marginTop = 0
      else
        @wrapper.classList.add 'open'
        l = items.length
        D = 2.5 * @button.radius
        N = f = 0
        ang = @options.max-@options.min
        calc = () =>
          N = ~~((ang / 60) * (D / (radius * 2)))
          N = l if N > l
          f = ang / N
        calc()
        c = 0
        m = 0
        for i in items
          if c is N
            c = 0
            m++
            D += 2 * @button.radius
            l -= N
            calc()
          a = cnst * (@options.min + f * c++)
          i.style.marginLeft = (D * Math.cos a) + 'px'
          i.style.marginTop = -(D * Math.sin a) + 'px'


@Flub = Flub
