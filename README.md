# Scroll2Reveal
<!-- If you'd like to use a logo instead uncomment this code and remove the text above this line

  ![Logo](URL to logo img file goes here)

-->



![Scroll2Reveal](https://seantunwin.github.io/scroll2reveal)

## Description
**Scroll2Reveal** A UI Component for revealing an image using a slider with a custom tooltip.

## Installation

* Place `slide2reveal.min.js` into your `/js` directory.
* Place `slide2reveal.min.css` into your `/css` directory or add the contents into your own CSS.
* Reference the files in your HTML.
* Use the template section found in `index.html` as a guide or paste it into your HTML.
* Update the `<img>` tags in the template to your own images.


## Screenshots

![Screenshot 1](http://imgur.com/tVhxD6E)

![Screenshot 2](http://imgur.com/izcXC6a)


## Usage

#### Include the files

In the head of your HTML include the CSS file:

```HTML

<link  href="css/slide2reveal.css" rel="stylesheet">

```

At the bottom of your HTML include the JavaScript files:

```HTML

<script src="js/slide2reveal.js" type="text/javascript"></script>
<script src="js/app.js" type="text/javascript"></script>

```

Create a new instance in `app.js`.

```JavaScript

 var s2r = document.querySelector('.slide2reveal'), // Any valid HTMLElement to used as the container
        slide2reveal = new Slide2Reveal(s2r);

```

If you do not want the percentage symbol to be shown use:

```JavaScript

var slide2reveal = new Slide2Reveal(s2r, 0);

```


## Configuration

#### HTML Template

```HTML

<!-- *********************** TEMPLATE: Slide2Reveal *************************** -->
    <section class="slide2reveal">
        <img class="s2r-stack" src="img/002.jpg"  width="600" height="338" alt="after">
        <img class="s2r-stack" src="img/001.jpg" width="600" height="338" alt="before">
        <div class="s2r-controls" role="controls">
            <label class="s2r-controls-label" for="s2r-controls" name="s2r-controls-label">Slide to Reveal</label>
            <!-- Using a label because IE does not support <output> -->
            <label class="s2r-tooltip" for="s2r-slider" name="s2r-slider-label">0%</label>
            <input class="s2r-slider" type="range" min="0" max="100" value="0" step="1" role="slider" aria-labelledby="s2r-slider-label" aria-valuemin="0" aria-valuemax="100" aria-live="polite" />
        </div><!-- End .s2r-controls -->
    </section> <!-- End .slide2reveal -->
    <!-- *********************** END TEMPLATE: Slide2Reveal *************************** -->

```

#### CSS

Feel free to edit the CSS to your liking. Be sure to check the comments in `css/slide2reveal.css`.


### Known Issues

If you discover any bugs (the math for centering the tooltip may likely be improved upon), feel free to create an issue on GitHub fork and
send us a pull request.

[Issues List](https://github.com/seantunwin/slide2reveal/issues).

## Authors

* Sean T. Unwin (https://github.com/seantunwin)


## License

Copyright (c) 2014 [@seantunwin](https://twitter.com/seantunwin) Licensed under the MIT license.
