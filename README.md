# Slide2Reveal


## Description
**Slide2Reveal**
A UI Component for revealing an image using a slider with a custom tooltip.


This experiment was born from a desire to show an original image and then the edited version by using a slider to gradually show the difference between the two.
Following that initial experimentation I thought it would be neat to have a tooltip showing the amount of progress which the slider had been moved.
This is the result of that experimentation.

*Note: This is not fully cross-browser compatible although it performs nicely in Firefox and Chrome browsers.*


## Installation

* Place `slide2reveal.min.js` into your `/js` directory.
* Place `slide2reveal.min.css` into your `/css` directory or add the contents into your own CSS.
* Reference the files in your HTML. See [Configuration](#Configuration).
* Use the template section found in `index.html` as a guide or paste it into your HTML.
* Update the `<img>` tags in the template with your own images.


## Screenshots

![Screenshot 1](http://i.imgur.com/tVhxD6E.jpg)

![Screenshot 2](http://i.imgur.com/izcXC6a.jpg)


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
    <form name="s2r-controls" class="s2r-controls">
        <fieldset>
            <h4 class="s2r-controls-label">Slide to Reveal</h4>
            <!-- Using a label because IE does not support <output> -->
            <output id="s2r-slider-label" class="s2r-tooltip" for="s2r-slider">0%</output>
            <input id="s2r-slider" class="s2r-slider" type="range" min="0" max="100" value="0" step="1" role="slider" aria-labelledby="s2r-slider-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="0" aria-live="polite" />
        </fieldset>
    </form><!-- End .s2r-controls -->
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
