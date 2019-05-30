let $wrapper = $("#wrapper");
let $buttons = $("#menu > svg");
const imageWidth = 700;
const size = $buttons.length;
let n = 0;
let current = 0;
$wrapper.css({
  transform: `translate(${-imageWidth}px)`
});

makeFakeSlides();

let timerId = setTimer();

$buttons.on("click", function(e) {
  let index = $(e.currentTarget).index();
  console.log("index current");
  console.log(index + "||" + current);
  slideImage(index);
});

$("#next").on("click", function() {
  slideImage(current + 1);
});

$("#previous").on("click", function() {
  slideImage(current - 1);
});

$("#gallery").on("mouseenter", function() {
  window.clearInterval(timerId);
});

$("#gallery").on("mouseleave", function() {
  timerId = setTimer();
});

document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    window.clearInterval(timerId);
  } else {
    timerId = setTimer();
  }
});

function slideImage(index) {
  if (index > size - 1) {
    index = 0;
  }
  if (index < 0) {
    index = size - 1;
  }

  if (index === 0 && current === size - 1) {
    //从最后一张到第一张
    $wrapper
      .css({
        transform: `translate(${-imageWidth * (size + 1)}px)`
      })
      .one("transitionend", function() {
        console.log("back to origin");
        $wrapper.hide().offset();
        $wrapper
          .css({
            transform: `translate(${-imageWidth * (index + 1)}px)`
          })
          .show();
      });
  } else if (index === size - 1 && current === 0) {
    //从第一张到最后一张
    $wrapper
      .css({
        transform: "translate(0px)"
      })
      .one("transitionend", function() {
        console.log("back to origin");
        $wrapper.hide().offset();
        $wrapper
          .css({
            transform: `translate(${-imageWidth * (index + 1)}px)`
          })
          .show();
      });
  } else {
    $wrapper.css({
      transform: `translate(${-imageWidth * (index + 1)}px)`
    });
  }
  highLightButton(index);
  current = index;
}

function highLightButton(index) {
  let $currentButton = $buttons.eq(index);
  $currentButton
    .addClass("active")
    .siblings()
    .removeClass("active");
}

function setTimer() {
  return setInterval(function() {
    slideImage(n % size);
    n++;
  }, 2000);
}

function makeFakeSlides() {
  let $images = $wrapper.children("img");
  let $firstCopy = $images.eq(0).clone();
  let $lastCopy = $images.eq(size - 1).clone();
  $wrapper.append($firstCopy);
  $wrapper.prepend($lastCopy);
}
