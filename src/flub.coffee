class Flub
  constructor: (selector, @options = {}) ->
    @element = document.querySelector selector
    @init()
    @
  init: ->
    @options.angle_max ?= 360
    @options.angle_min ?= 0
    wrapper = document.querySelector @element.getAttribute 'href'
    rect = @element.getBoundingClientRect()
    radius = (rect.right - rect.left) / 2
    button = {
      top: rect.top + document.body.scrollTop + radius
      left: rect.left + document.body.scrollLeft + radius
      radius: radius
    }
    items = []
    @element.style.position = 'relative'
    @element.style.zIndex = 2
    for i in wrapper.children
      if i.nodeType isnt 8
        i.style.position = 'absolute'
        items.push i
    rect = items[0].getBoundingClientRect()
    radius = (rect.right - rect.left) / 2
    for i in items
      i.style.left = (button.left - radius) + 'px'
      i.style.top = (button.top - radius) + 'px'
    cnst = (Math.PI / 180)
    @element.addEventListener 'click', (e) =>
      e.preventDefault()
      if wrapper.classList.contains 'open'
        wrapper.classList.remove 'open'
        for i in items
          i.style.marginLeft = 0
          i.style.marginTop = 0
      else
        wrapper.classList.add 'open'
        l = items.length
        D = 2 * button.radius
        N = f = 0
        calc = () =>
          N = ~~(6 * ((@options.angle_max-@options.angle_min)/360) * (1 + D / button.radius))
          N = l if N > l
          f = (@options.angle_max - @options.angle_min) / N
        calc()
        c = 0
        m = 0
        for i in items
          if c is N
            c = 0
            m++
            D += 2 * button.radius
            l -= N
            calc()
          a = cnst * (@options.angle_min + f * c++)
          i.style.marginLeft = -(D * Math.cos a) + 'px'
          i.style.marginTop = -(D * Math.sin a) + 'px'


@Flub = Flub
