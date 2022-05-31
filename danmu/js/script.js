
const $ = window.$;

/**
 * 或者区间内的随机整数
 * @param {number} min
 * @param {number} max
 */
function random(min = 0, max = 100) {
    return Math.round(Math.random() * (max - min)) + min;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

/**
 * @param {*} viewport  danmu display window
 * @param {string} message 
 * @param {{type: "scoll" | "fixed", position?: "top" | "mid" | "bottom"}, color: string, randomColor?: boolean} options 
 */
function Danmu(viewport, message, options) {
    this.dom = null;
    // init the danmu dom
    this.init()
    // config the danmu color position and message
    this.config(viewport, message, options)
}

/**
 * bind event
 */
Danmu.prototype.init = function () {
    this.dom = $('<span class="danmu"></span>')
    // Mouse enter stop move or stop disappear
    this.dom.mouseenter(() => {
        this.pause()
    })
    this.dom.mouseleave(() => {
        this.resume()
    })
}

Danmu.prototype.play = function () {
    this._start()
}

Danmu.prototype.pause = function () {
    // record current position
    if (this.type === "scroll") {
        this.dom.stop()
    } else {
        clearTimeout(this.timeout)
    }
}

Danmu.prototype.resume = function () {
    if (this.type === "scroll") {
        const domWidth = this.dom.width()
        const moveWidth = this.viewportWidth + domWidth;
        const speed = moveWidth / this.duration;
        const { left } = this.dom.position()
        const remainDistance = left + domWidth

        const time = remainDistance / speed;

        this.dom.animate({ right: this.viewportWidth }, time, 'linear', () => {
        })
    } else {
        // re count time
        this._setTimeout()
    }
}
Danmu.prototype.config = function (viewport, message, options) {
    this.viewport = viewport
    this.text = message;
    this.type = options.type || "scoll"
    this.position = options.position || "top";
    this.duration = options.duration || 6000;
    this.viewportWidth = viewport.width();
    this.color = options.color || '#000';
    this.randomColor = options.randomColor;
    this.randomPosition = options.randomPosition;
    this.done = options.done;
    this.timeout = null;

    this.dom.text(message)
}

Danmu.prototype.getDom = function () {
    return this.dom
}

/**
 * 
 * @param {*} viewportElement 
 * @param {number} duration 
 * @param {function} cb
 */
Danmu.prototype._start = function () {
    this.dom.css({
        fontSize: random(14, 28),
        opacity: 0,
    })
    // need append the danmu element then get danmu height value
    // if not, will be get 0
    this.viewport.append(this.dom)

    this.dom.css({
        position: "absolute",
        right: -this.dom.width(),
        top: this.getPosition(this.viewport.height()),
        opacity: 1,
        color: this.randomColor ? this.randomColor : this.color
    })

    if (this.type === 'scroll') {
        this.dom.animate({ right: this.viewport.width() }, this.duration, 'linear', () => {
            this._end()
        })
    } else {
        this.dom.css({
            right: (this.viewportWidth - this.dom.width()) / 2
        })
        this.dom.show()
        this._setTimeout()

    }
}

Danmu.prototype._setTimeout = function () {
    this.timeout = setTimeout(() => {
        this._end()
        clearTimeout(this.timeout)
    }, this.duration)
}

Danmu.prototype._end = function () {
    if (this.type === "scroll") {
        this.dom.finish()
    } else {
        // TODO: add fade out
        this.dom.hide()
    }

    console.log(this.done);
    this.done && this.done()
}

/**
 * Get Position with viewport 
 * @param {number} viewportHeight 
 * @returns {number}
 */
Danmu.prototype.getPosition = function (viewportHeight) {
    const domHeight = this.dom.height()
    if (this.randomPosition) {
        return 0
    }
    switch (this.position) {
        case "top":
            return 0
        case "mid":
            return (viewportHeight - domHeight) / 2
        case "bottom":
            return viewportHeight - domHeight
    }
}

function DanmuWall(viewportElement) {
    this.viewport = viewportElement
    // setting container
    this.viewport.css({
        position: 'relative',
        overflow: 'hidden'
    })
    // danmu Queue
    this.queue = new Map()
    // cache  
    this.pool = []
}

DanmuWall.prototype.send = function (message, options) {
    if (!message) {
        throw new Error('danmu message need a string!')
    }
    const originCB = options.done;
    options.done = () => {
        originCB && originCB()
        this.pool.push(this.queue.get(message))
        this.queue.delete(message)
        console.log(this.pool);
    }
    if (!this.queue.has(message)) {
        const danmu = this.getDanmu(message, options)
        this.queue.set(message, danmu)
        danmu.play()
    }

}

DanmuWall.prototype.getDanmu = function (message, options) {
    let danmu;
    if (this.pool.length > 0) {
        danmu = this.pool.shift()
    } else {
        // make danmu and bind mouse event
        danmu = new Danmu(this.viewport, message, options)
    }
    return danmu
}


$(document).ready(function () {

    const viewport = $(".viewport")
    const position = $("#position")
    const message = $("#message")
    const type = $("#type")
    const color = $("#color")
    const submit = $(".submit")
    const randomP = $("#randomP")
    const randomC = $("#randomC")

    let randomPosition = false;
    let randomColor = false;

    randomP.on("change", function () {
        randomPosition = !randomPosition
    })
    randomC.on("change", function () {
        randomColor = !randomColor
    })

    const danmuWall = new DanmuWall(viewport)

    submit.on("click", function () {
        // try {
        const options = {
            type: type.val(), position: position.val(), duration: 4000,
            color: color.val(),
            randomColor,
            randomPosition,
        }
        danmuWall.send(message.val(), options)
        // } catch (e) {
        //     alert(e.message)

        // }
    })

})