/**
 * transform이 있는지 확인
 * get css transform
 */
function getCSSTransform() {
  var properties = [
    "transform",
    "WebkitTransform",
    "msTransform",
    "MozTransform",
    "OTransform",
  ];
  var p;
  while ((p = properties.shift())) {
    if (typeof $contaier.style[p] != "undefined") {
      return p;
    }
  }
  return false;
}

/**
 * 브라우져에서 translate3d를 사용하는지 확인하는 부분
 * detect translate3d
 * http://stackoverflow.com/questions/5661671/detecting-transform-translate3d-support
 */
function has3d() {
  var el = document.createElement("p"),
    has3d,
    transforms = {
      webkitTransform: "-webkit-transform",
      OTransform: "-o-transform",
      msTransform: "-ms-transform",
      MozTransform: "-moz-transform",
      transform: "transform",
    };

  // Add it to the body to get the computed style.
  document.body.insertBefore(el, null);

  for (var t in transforms) {
    if (el.style[t] !== undefined) {
      el.style[t] = "translate3d(1px,1px,1px)";
      has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
    }
  }

  document.body.removeChild(el);

  return has3d !== undefined && has3d.length > 0 && has3d !== "none";
}

/**
 * 사용하기
 * _cssTransform = getCSSTransform();
 * if (!_cssTransform) {
    alert("Your browser does not seem to support CSS Transform.");
    return;
   }

 * _isTrans3D = has3d();
 */

/**
 다른브라우져에서 사용하는 프레임을 window.requestAnimationFrame으로 사용하는 코드
*/
if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
}
