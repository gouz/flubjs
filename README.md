# FlubJS

Based on the sublime work of [Lucas Bebber] and his article on [Chris Coyier CSS-tricks], FlubJS allows to create some dynamic menu with goo effect.

Demonstration : http://gouz.github.io/flubjs/

### Installation

You need Gulp installed globally if you want to compile it. Else you can use the dist files.

```sh
$ npm i -g gulp
```

```sh
$ git clone git@github.com:gouz/flubjs.git
$ cd flubjs
$ npm i -d
$ gulp
```

### How to use it

```js
var flub = new Flub('#selector', options);
```
Default options values :

- *min* : 0 ; angle start ( from 0 to 360 )
- *max* : 360 ; angle end ( from 0 to 360 )
- *speed* : 200 ; time in ms of animation complete
- *dispatch* : true ; dispatch elements on the perimeter or arc
- *sync* : false ; sync animation of elements
- *elastic* : false ; elastic animation
- *blur* : true ; blur on items

Sample :
```html
<div id="sandbox" data-launcher="#launcher">
    <a id="launcher" href="#menu">A</a>
    <ul id="menu">
        <li><a href="#">B</a></li>
        <li><a href="#">C</a></li>
        <li><a href="#">D</a></li>
    </ul>
</div>
```
- **data-launcher** define the items which is the main button
- **#launcher : href** define the id of DOM element which contains the items

```js
  var flub = new Flub('#sandbox', {
      speed: 800,
      dispatch: false,
      sync: false
    });
```
Some skin ?
```css
#sandbox {
  width: 40px;
  height:40px;
}

#sandbox a {
  text-align: center;
  width: 40px; height: 40px;
  line-height: 40px;
  background: #368Bc1; color: #FFF;
  font-weight: bold; font-size: 16px;
  display: inline-block;
  text-decoration: none;
  border-radius:100%;
}
#sandbox a:hover {
  background: #333;
  color:  #368Bc1;
}
```


### Methods

FlubJS allows to control your menu with some methods :

- toggle() : open/close menu
```js
flub.toggle();
```

- populate() : take new items (dynamicaly added) of the menu
```js
flub.populate();
```

### Browser Compat
- IE 10
- Recent Chrome and Firefox

### Todo's

 - Write Tests
 - Add Code Comments

License
----

MIT

[Lucas Bebber]:http://twitter.com/lucasbebber
[Chris Coyier CSS-tricks]:https://css-tricks.com/gooey-effect
