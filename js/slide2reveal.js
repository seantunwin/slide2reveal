/**
* slide2reveal.js - Slider to reveal an image
*
* @author: Sean T. Unwin
* @contact: <sean DOT t DOT unwin AT gmail DOT com> <https://twitter.com/seantunwin>
* @url: https://github.com/seantunwin/slide2reveal
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
<section class="slide2reveal">
        <img class="s2r-stack" src="img/002.jpg"  width="600" height="338" alt="after">
        <img class="s2r-stack" src="img/001.jpg" width="600" height="338" alt="before">
        <form name="s2r-controls" class="s2r-controls">
            <fieldset>
                <h4 class="s2r-controls-label">Slide to Reveal</h4>
                <output id="s2r-slider-label" class="s2r-tooltip" for="s2r-slider">0%</output>
                <input id="s2r-slider" class="s2r-slider" type="range" min="0" max="100" value="0" step="1" role="slider" aria-labelledby="s2r-slider-label" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="0" aria-live="polite" />
            </fieldset>
        </form><!-- End .s2r-controls -->
    </section> <!-- End .slide2reveal -->
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
      suffix = showPercent;
      // args = arguments;



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
          return Math.floor(((s2r.slider.value - s2r.slider.attr.min) / (s2r.slider.attr.len)) * 100);
        }
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

    function getRect(obj) {
        return obj.getBoundingClientRect();
    }

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

    function updateAriaValues(slider, value) {
      // Add '%' to string
      var newvalue = value.toString + '%';
      // Set aria-valuenow and aria-valuetext attributes' value
      slider.setAttribute('aria-valuenow', slider.value);
      slider.setAttribute('aria-valuetext', newvalue);
    } /* End updateAriaValueNow */

    /**
     * Slider is moving. Get to work.
     **/
    function doAction() {
      // Move the clip on drag to reveal s2r.image
      reveal(s2r.slider.valueAsPercent());
      // Update the aria-valuenow attribute
      updateAriaValues(s2r.slider, s2r.slider.valueAsPercent());
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

      var sval = s2r.slider.value,
            ppos = getRect(s2r.base),
            spos = getRect(s2r.slider),
            swidth = parseInt(s2r.slider.offsetWidth),
            twidth = s2r.tooltip.offsetWidth,
            pleft = Math.round(ppos.left),
            sleft = Math.round(spos.left),
            startpos = Math.floor(spos.left - ppos.left),
            endpos = startpos + (swidth - twidth),
            val = s2r.slider.valueAsPercent(),
            charcount = s2r.tooltip.innerHTML.length,
            result3 = pctValue((twidth), val),
            result6 = Math.round(((sval - s2r.slider.attr.min) / (s2r.slider.attr.len)) * swidth),
            result7 = Math.round((result3 / twidth) * 100),
            xpos = result6,
            subtotal = 0,
            total = 0;

      //  When slider is at minimum value set tooltip's position value
      if (sval === s2r.slider.attr.min) {
        subtotal = startpos;
      } else {
        //  When slider is at maximum value set tooltip's position value
        if (sval === s2r.slider.attr.max) {
          subtotal = endpos;
        // Calculate tooltip position where it should be when slider value is not at min or max
        } else {
          subtotal = startpos + xpos - ((twidth / 5)) - ((result7 / 5)) - (charcount / 2);
          // Keep tooltip stationary when tooltip position is less than start position
          if (subtotal < startpos) subtotal = startpos;
          // Keep tooltip stationary when tooltip position is greater than end position
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