gsap.registerPlugin(Draggable);

function setupSliders() {
  $(".range").each(function () {
    var range = this;
    var $range = $(this);
    var range_track = $range.find(".range__track");
    var range_thumb = $range.find(".range__thumb");
    var range_max = $range.attr("data-range-max");
    var range_step = $range.attr("data-range-step");
    var range_bg = $range.find(".range__bg");
    var range_value = $range.find(".range__value");
    var draggable_snap_distance = $range.width() / (range_max / range_step);

    range.percent = range.percent || 0;
    gsap.set(range_thumb, { x: Math.round(range.percent * $range.width()) });
    update_value(range.percent * $range.width());

    function update_value(pos) {
      var percent = pos / $range.width();
      var number = Math.round((pos / $range.width()) * range_max);
      gsap.set(range_track, { scaleX: percent });
      range_value.text(number);
      range.percent = percent;
    }

    /* thumb animation */
    var tl = gsap
      .timeline({ paused: true, defaults: { duration: 0.2 } })
      .from(range_bg, { scale: 0.25, ease: "none" })
      .from(range_value, { opacity: 0, ease: "power4.in" }, "<");

    if (typeof range.myDraggable === "undefined") {
      range_thumb
        .on("mouseover", function () {
          tl.play();
        })
        .on("mouseout", function () {
          tl.reverse();
        });
    }

    if (range.myDraggable) range.myDraggable.kill();
    range.myDraggable = Draggable.create(range_thumb, {
      type: "x",
      bounds: range,
      liveSnap: function (value) {
        return (
          Math.round(value / draggable_snap_distance) * draggable_snap_distance
        );
      },
      onDrag: function () {
        update_value(this.x);
      },
    })[0];

    /* accessibility */

    /* add tabindex */
    $range.attr({
      tabindex: 0,
    });

    /* show value on focus */
    if (typeof range.myDraggable === "undefined") {
      $range
        .on("focusin", function () {
          tl.play();
        })
        .on("focusout", function () {
          tl.reverse();
        });

      /* keyboard navigation (right/up and left/down arrows) */
      $range.keydown(function (e) {
        if (e.which == 39 || e.which == 38) {
          if (range.myDraggable.x < range.myDraggable.maxX) {
            gsap.set(range.myDraggable.target, {
              x: "+=" + draggable_snap_distance,
              onUpdate: range.myDraggable.update,
            });
            update_value(range.myDraggable.x);
          }
        } else if (e.which == 37 || e.which == 40) {
          if (range.myDraggable.x > range.myDraggable.minX) {
            gsap.set(range.myDraggable.target, {
              x: "-=" + draggable_snap_distance,
              onUpdate: range.myDraggable.update,
            });
            update_value(range.myDraggable.x);
          }
        }
      });
    }
  });
}

setupSliders();
window.addEventListener("resize", setupSliders);
