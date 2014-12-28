#metal is more than a list

Metal is a pure javascript library that provides combination of select and input tag.

##Usage

add metal.css :
```css
<link rel="stylesheet" href="https://raw.githack.com/eredacokmerke/metal/master/metal.css">
```

add metal.js before your javascript file:
```js 
<script src="https://raw.githack.com/eredacokmerke/metal/master/metal.js"></script>
```

add html for list with input:
```html
<div class="metal-div" metal-width="200">
    <div class="metal-input-div" metal-text="Choose..."></div>
    <div class="metal-items-div">
        <ul class="metal-items">
            <li>first_item</li>
            <li>second_item</li>
            ....
        </ul>
    </div>
</div>
```

add html for list without input:
```html
<div class="metal-div" metal-width="200">
    <div class="metal-output-div" metal-text="Choose..."></div>
    <div class="metal-items-div">
        <ul class="metal-items">
            <li>first_item</li>
            <li>second_item</li>
            ....
        </ul>
    </div>
</div>
```

call ```metal_init()``` in your index.js
```js 
metal_init();
```

##Options
```oneListVisible```: Open list will be closed when another list is opened. (```true``` or ```false```)
```js
metal_init({
    oneListVisible: true
});
```

##Style
You have to add ```.metal-input``` and ```.metal-pointer``` rules to css in order to change input and pointer's style.

##Examples
- list with input : http://codepen.io/eredacokmerke/pen/vELgrG
- list without input : http://codepen.io/eredacokmerke/pen/YPqjVb
- list of links : http://codepen.io/eredacokmerke/pen/WbrRyd
- multiple lists : http://codepen.io/eredacokmerke/pen/YPwBVj
- fancy : http://codepen.io/eredacokmerke/pen/LEpNLg

