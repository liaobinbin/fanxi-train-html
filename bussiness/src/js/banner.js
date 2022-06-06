
/**
 * Make Banner
 *
 * @param {string} elementId
 * */
function Banner(elementId) {
  let bannerElement = document.getElementById(elementId)
  this.current = 0
  this.timeout = null;
  if (bannerElement) {
    this.element = bannerElement
    this.mask = bannerElement.childNodes[0]
    this.slides = bannerElement.childNodes[1].childNodes
    this.init()
  } else {
    this.check()
  }
}

/**
 * Bind the event
 * */
Banner.prototype.init = function() {
  this.element.addEventListener('click', () => { this.switchMask() })
}

Banner.prototype.getMask = function() {
  return this.mask
}

Banner.prototype.switchMask = function() {
  // 先设置Mask透明度为1
  // css 动画结束后，再设置为0
  this.mask.style.opacity = 1
  const timeout = setTimeout(() => {
    this.mask.style.opacity = 0
    clearTimeout(timeout)
  }, 1000)
}

Banner.prototype.goNext = function(order) {
  const timeout = setTimeout(() => {
    let next = order ?? this.current + 1
    if (next === this.slides.length) {
      next = 0;
    }
    // 切换slide显示
    this.slides[this.current].style.display = 'none'
    this.slides[next].style.display = 'block'
    this.current = next;
    clearTimeout(timeout)
  }, 1000)
}

Banner.prototype.check = function() {
  if (!this.element) {
    console.warn('banner element not exist!')
  }
}

Banner.prototype.start = function() {
  this.timeout = setInterval(() => {
    this.switchMask()
    this.goNext()
  }, 5000)
}


window.onload = () => {
  const banner = new Banner('banner')
  banner.start()
}
