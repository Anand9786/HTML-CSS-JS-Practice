// Accordion

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    let arrow = this.lastChild.previousElementSibling.classList;
    arrow.toggle("fa-angle-up");
    arrow.toggle("fa-angle-down");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

// Input Slider

var slider = document.getElementById("slider");
var time = document.getElementById("min");
var price = document.getElementById("price");
var sliderFill = document.getElementById("slider-fill");

time.innerHTML = slider.value;
price.innerHTML = slider.value * 2 + 20;
sliderFill.style.width = "0%";

slider.oninput = function () {
  time.innerHTML = this.value;
  price.innerHTML = this.value * 2 + 20;
  sliderFill.style.width = (this.value - 5 - this.value / 4.4 + 1) * 4.5 + "px";
};
