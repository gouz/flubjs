var flub = new Flub('#sandbox-wheel', {
  min: 0,
  max: 360,
  speed: 800,
  dispatch: true,
  sync: false,
  elastic: true
});
var a = document.querySelector('#add'),
  ul = document.querySelector('#menu');
a.addEventListener('click', function(e) {
  var li = document.createElement('li');
  li.innerHTML = '<a href="#">O</a>';
  ul.appendChild(li);
  flub.populate().position();
  return false;
}, false);
