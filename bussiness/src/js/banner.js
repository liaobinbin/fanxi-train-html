/**
 * Make Banner
 *
 * @param {string} elementId
 * */
function Banner(elementId) {
  let bannerElement = document.getElementById(elementId);
  this.current = 0;
  this.interval = null;
  if (bannerElement) {
    this.element = bannerElement;
    this.mask = bannerElement.childNodes[0];
    this.slides = bannerElement.childNodes[1].childNodes;
    this.init();
  } else {
    this.check();
  }
}

/**
 * Bind the event
 * */
Banner.prototype.init = function () {
  this.element.addEventListener("mouseenter", () => {
    this.pause();
  });
  this.element.addEventListener("mouseout", () => {
    this.start();
  });
};

Banner.prototype.getMask = function () {
  return this.mask;
};

Banner.prototype.pause = function () {
  if (this.interval) {
    clearInterval(this.interval);
  }
};

Banner.prototype.switchMask = function () {
  // 先设置Mask透明度为1
  // css 动画结束后，再设置为0
  this.mask.style.opacity = 1;
  const timeout = setTimeout(() => {
    this.mask.style.opacity = 0;
    clearTimeout(timeout);
  }, 1000);
};

Banner.prototype.goNext = function (order) {
  const timeout = setTimeout(() => {
    let next = order ?? this.current + 1;
    if (next === this.slides.length) {
      next = 0;
    }
    // 切换slide显示
    this.slides[this.current].style.display = "none";
    this.slides[next].style.display = "block";
    this.current = next;
    clearTimeout(timeout);
  }, 1000);
};

Banner.prototype.check = function () {
  if (!this.element) {
    console.warn("banner element not exist!");
    return false;
  }
  return true;
};

Banner.prototype.start = function () {
  if (!this.check()) {
    return;
  }
  if (this.interval) {
    clearInterval(this.interval);
  }
  this.interval = setInterval(() => {
    this.switchMask();
    this.goNext();
  }, 5000);
};

window.onload = () => {
  const banner = new Banner("banner");
  banner.start();

  const m = function (e) {
    e.preventDefault();
  };

  const menu = document.getElementById("mobile-menu");
  const collpse = document.getElementById("collpse");
  collpse.addEventListener("click", () => {
    // open mobile menu
    document.body.style.overflow = "hidden";
    document.addEventListener("touchmove", m, false);
    menu.style.visibility = "visible";
  });

  const close = document.getElementById("close-button");
  close.addEventListener("click", () => {
    document.body.style.overflow = "";
    document.removeEventListener("touchmove", m, false);
    menu.style.visibility = "";
  });

  new WOW().init();
};
