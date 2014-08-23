/**
* slide2reveal.js - Slider to reveal an image
*
* @author: Sean T. Unwin
* @contact: <sean DOT t DOT unwin AT gmail DOT com> <https://twitter.com/seantunwin>
* @url: https://github.com/seantunwin/slide2reveal.js
*
**** USAGE ***
* var myVar = Slide2Reveal(element, [showPercent]);
*
* @param {HMTLElement} element: A valid HTML element, accepts jQuery object
*        - This should be the container for the component.
          - See code template below
* @param {Boolean} showPercent: Opotional. Default: 1
*        - 0 will not show a percentage symbol in the tooltip
*
************** HTML Template **************
<section id="slide2reveal">
    <image class="s2r-stack" src="img/002.jpg"  width="600" height="338" alt="after">
    <image class="s2r-stack" src="img/001.jpg" width="600" height="338" alt="before">
    <div class="s2r-controls" role="controls">
        <label for="s2r-slider" name="s2r-slider-label">Slide to Reveal</label>
        <input class="s2r-slider" type="range" min="0" max="100" value="0" step="1" role="slider" aria-labelledby="s2r-slider-label" aria-valuemin="0" aria-valuemax="100" aria-live="polite">
        <span class="s2r-tooltip">#</span>
    </div> <!-- End .s2r-controls -->
</secton> <!-- End #slide2reveal -->
**********************************************
*
*
* Copyright 2014 Sean T. Unwin
* Released under the MIT license.
* http://en.wikipedia.org/wiki/MIT_License
*/
(function() {

  "use strict";

  /** @constructor */
  function Slide2Reveal(element, showPercent) {

    /************************************
     *           GLOBAL VARIABLES     *
     ************************************/
    var s2r = {
        'base': {},
        'slider': {},
        'tooltip': {}
      },
      container = element,
      suffix = showPercent,
      args = arguments;



    /************************************
     *              FUNCTIONS                 *
     ************************************/
    /**
     * Verify arguments and Set object properties
     **/
    function config() {

      /** Functions **/
      function verifyHTMLElement() {

        var testel,
          result = 0;

        // Check if container is an object
        if (container && typeof container === "object") {
          // Check if container is a jQuery object
          if ('jquery' in container) {
            // Not what we want so quit
            if (!container[0]) {
              terminate();
            } else {
              result = 2;
              testel = container[0];
            }
          } else {
            // Set temp object for type test
            testel = container;
          }

          // Check if container is an HTML Element
          if (testel.nodeType === 1 || Object.prototype.toString.call(testel).match(/^\[object\s(.*)\]$/)[1] === "HTMLElement" || testel.constructor.ELEMENT_NODE === 1) {
            // Valid
            result = 1;
          }
          // Invalid object - send error message to console and quit
        } else {
          terminate();
        }

        // Return verified  container
        return result;
      } /* End verifyHTMLElement */

      function buildBase() {

        var audit = verifyHTMLElement();

        if (audit) {
          // Object is jQuery object then set the raw HTML Element
          if (audit === 2) {
            s2r.base = container[0];
          }
          // Object is HTML Element
          if (audit === 1) {
            s2r.base = container;
          }
          // Object verification failed - return 0
        } else {
          terminate();
        }
      } /* End buildBase */

      function configBase() {
        var imgArr = {}, // NodeList of element (typically images) in CSS class `.s2r-stack`
          imgArrLen = 0; // Length of NodeList

        if (s2r.base) {
          // Set whether to show '%' symbol after tooltip text
          s2r.suffix = (typeof suffix === 'undefined' || suffix === 1) ? 1 : 0;


          // Get all images in slider2reveal
          imgArr = s2r.base.querySelectorAll('.s2r-stack');
          // Count number of images
          imgArrLen = imgArr.length;
          // Set image
          s2r.image = (imgArrLen !== 0 && imgArrLen > 1) ? imgArr[imgArrLen - 1] : imgArr[1];
        } else {
          terminate();
        }
      } /* End configBase */

      /**
       *  Set Slider Params
       **/
      function configSlider() {
        // Link HTML slider to our slider object
        s2r.slider = s2r.base.querySelector('.s2r-slider');
        s2r.slider.pos = getRect(s2r.slider);
        // Set attributes to convenient properties
        s2r.slider.attr = {
          'min': s2r.slider.getAttribute('min'),
          'max': s2r.slider.getAttribute('max'),
          'mid': s2r.slider.getAttribute('max') / 2,
          'len': s2r.slider.getAttribute('max') - s2r.slider.getAttribute('min')
        };
        // Create a function to return current slider's value as a percentage
        s2r.slider.valueAsPercent = function() {
          return Math.floor(((s2r.slider.value - s2r.slider.attr.min) / (s2r.slider.attr.max - s2r.slider.attr.min)) * 100);
        }
      }

      function getRect(obj) {
          return obj.getBoundingClientRect();
        }
        /**
         * Set Tooltip Params
         **/

      function configTooltip() {
        // Link HTML label to our tooltip object
        s2r.tooltip = s2r.base.querySelector('.s2r-tooltip');

        s2r.tooltip.pos = getRect(s2r.tooltip);
        s2r.tooltip.startx = s2r.slider.pos.left - s2r.tooltip.pos.left;
      }

      /**
       * Build Component
       **/
      function setup() {
        buildBase();
        configBase();
        configSlider();
        configTooltip();
      } /* End setup */

      setup();

    } /* End config */

    /**
     * Terminate the instance
     **/
    function terminate() {
        if (document.querySelector('.s2r-tooltip')) {
          var el = document.querySelector('.s2r-tooltip');

          el.innerHTML = 'Error';
          el.style.fontSize = '11px';
          el.style.color = 'red';
        }

        // throw new TypeError('Unable to create Slide2Reveal.');
      }
      /* End Terminate

          // Display a tooltip message
          /* @param {object} tooltip - element that displays message
           * @param {string} msg - string of message to output
           */

    function updateTooltipMessage(tooltip, msg, onoff) {
      // Add '%' to @msg if suffix is true
      var message = (onoff === 1) ? msg + '%' : msg;
      // Set message to element's text
      tooltip.innerHTML = message;
    } /* End updateTooltipMessage */

    /**
     * Slider is moving. Get to work.
     **/
    function doAction() {

      // Move the clip on drag to reveal s2r.image
      reveal(s2r.slider.valueAsPercent());
      // Move tooltip to shadow the range input's position
      moveTooltip();
      // Keep tooltip text updated with current value
      updateTooltipMessage(s2r.tooltip, s2r.slider.valueAsPercent(), s2r.suffix);
    }

    /**
     * Clip the image
     * @param {object} img - Image we are going to reveal
     * @param {string} value - Slider's current value, will be converted to number
     **/
    function reveal(value) {
      var w = s2r.image.offsetWidth, // image width
        h = s2r.image.offsetHeight; // image height

      // Move the clip on drag to reveal s2r.image
      s2r.image.style.clip = 'rect(0, ' + w + 'px' + ', ' + h + 'px' + ', ' + pctValue(w, parseFloat(value)) + 'px)';
    } /* End reveal */

    /**
     * Set starting position of tooltip
     * @tooltip : HTML element that outputs a message related to a range input
     * @slider : HTML element that is the owner of @tooltip
     **/
    function setStartPos() {
      // Set input range's position to the minimum
      s2r.slider.value = s2r.slider.getAttribute('min');
      moveTooltip();
      // Set message/tooltip to input range's value
      updateTooltipMessage(s2r.tooltip, s2r.slider.valueAsPercent());
    } /* End setStartPos */

    /**
     * Get result for percentage of a number
     * @num : number that percentage used for
     * @pct : percentage to be used
     * @returns: Number
     **/
    function pctValue(num, pct) {
      // Make sure args are numbers before continuing
      if (isNaN(parseInt(num, 10)) || isNaN(parseInt(pct, 10))) {
        throw new TypeError("Function requires two (2) numbers as arguments.");
      } else {
        // Return result
        return Math.floor((num * pct) / 100);
      }

    } /* End pctValue */

    /**
     * Move tooltip so it travels with slider's thumb
     **/
    function moveTooltip() {

      var sval = s2r.slider.value, // current slider value
        ppos = s2r.slider.parentElement.getBoundingClientRect(),
        spos = s2r.slider.getBoundingClientRect(),
        swidth = parseInt(s2r.slider.offsetWidth),
        sleft = spos.left,
        twidth = s2r.tooltip.offsetWidth,
        pleft = ppos.left,
        startpos = Math.floor(sleft - pleft),
        endpos = startpos + (swidth - twidth),
        val = s2r.slider.valueAsPercent(),
        fsize = parseFloat(document.defaultView.getComputedStyle(s2r.tooltip, null).fontSize),
        lineheight = parseFloat(document.defaultView.getComputedStyle(s2r.tooltip, null).lineHeight),
        em = lineheight / fsize,
        charcount = s2r.tooltip.innerHTML.length,
        strlen = charcount * em,
        result = (pctValue((twidth / 4), val) / 4),
        subtotal = 0,
        total = 0;

      if (sval === s2r.slider.attr.min) {
        subtotal = startpos;
      } else {
        if (sval === s2r.slider.attr.max) {
          subtotal = endpos;
        } else {
          subtotal = pctValue((endpos - ((twidth) / (charcount + 1))), val) + (Math.sqrt(Math.pow(((twidth / strlen) / charcount), 2))) + ((twidth / em) / (charcount)) + result;
          if (subtotal < startpos) subtotal = startpos;
          if (subtotal > endpos) subtotal = endpos;
        }
      }

      total = subtotal;

      // Move the tooltip
      s2r.tooltip.style.transform = 'translate3d(' + total + 'px, 0, 0)';
    } /* End moveTooltip */

    /**
     * Start application
     **/
    function init() {
        // Setup object properties and values
        config();
        // Create input listener on slider
        s2r.slider.addEventListener("input", doAction, false);
        // Position tooltip over slider to default cooridinates
        setStartPos(s2r.slider, s2r.tooltip);
        // Display tooltip for the first time
        updateTooltipMessage(s2r.tooltip, s2r.slider.value, s2r.suffix);
      } /* End init */
      /* End Functions */

    // Engage
    init();

  }

  // Expose for use
  window.Slide2Reveal = Slide2Reveal;

})();