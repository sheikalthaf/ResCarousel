# ResCarousel
This is Project is based on bootstrap carousel. I have Seen some disadvantage in bootstrap carousel so i started to develope this ResCarousel. 

ResCarousel Means "Responsive Carousel"
```
<div class="resCarousel" data-items="2,4,5,6" data-slide="2">
  <div class="resCarousel-inner" >
      <div class="item">
        your item content
      </div>
      <div class="item">
        your item content
      </div>
      ...
      ...
      ...
  </div>
  <button class='btn btn-default leftRs'><i class="fa fa-fw fa-angle-left"></i></button>
  <button class='btn btn-default rightRs'><i class="fa fa-fw fa-angle-right"></i></button>
</div>
```
# data-items
```
type: "xs-sm-md-lg"
```
(eg. data-items="2-4-5-6")

`data-items` is important one in this carousel which defines the no of item to be viewed in a page.

xs - (In mobile size) How many items to be viewed in mobile view

sm - (In tablet size) How many items to be viewed in tablet view

md - (In desktop size) How many items to be viewed in desktop view

xs - (In Large Desktop size) How many items to be viewed in  Large Desktop view

added the looping of the items when it reaches the end

# data-slide
```
type: number
```
(eg. data-slide="2")

`data-slide` is important one in this carousel which defines the no of item to be slide in a button click.

# data-interval
```
type: milli seconds
```
(eg. data-interval="6000")

`data-interval` is defines the auto sliding of items with value of milli seconds.

# data-speed
```
type:  milli seconds,
default: 300
```
(eg. data-speed="600")

`data-speed` is used to control the speed of the moving items

# data-animator
```
type: string
```
(eg. data-interval="lazy")

`data-animator` is used to give some animation to sliding items. currently `lazy` animation only available.

# data-load
```
type: number
```
(eg. data-interval="6")

`data-load` is used to intimate that the slider is going to touch the end( data-load value ) so that the developer can load( append ) another set of items. for more info go to the header link.


# custom CSS

## Banner

if your using this for banner add a `banner` class to rescarousel-inner. so that it will bhehave like a banner.


## Tile

for tile just create a div with class name `tile`. then you will get a tile structure.

Hope you guys enjoying the Rescarousel

if you find any bug let me know i will try to solve as much as possible

> # By CreativeTechSoft
