;(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Signature = factory();
    }
})(this || window, function () {
	function addEvent(el, type, fn, capture) {el.addEventListener(type, fn, capture || false) }
	function removeEvent(el, type, fn) {el.removeEventListener(type, fn) }
	function getOffset(el) {
		var tmpL = el.offsetLeft,
			tmpT = el.offsetTop,
			parent = el.offsetParent

		while (parent != null) {
			tmpL += parent.offsetLeft
			tmpT += parent.offsetTop
			parent = parent.offsetParent
		}

		return {
			left: tmpL,
			top: tmpT
		}

	}


	var signature = function (options) {

		var 
			canvas, cxt, disLeft, disTop;

		if (!options) {throw new Error("参数不能为空")}

		if (options.el instanceof HTMLCanvasElement) {
			canvas = options.el
		}else if (typeof options.el == "string") {
			var classMath = options.el.match(/^[.|#]/)
			if (classMath) {
				switch (classMath[0]) {
					case ".":
						canvas = document.getElementsByClassName(options.el.substr(1))[0]
						break;
					case "#":
						canvas = document.getElementById(options.el.substr(1))
						break;
				}
			}else {
				throw new Error("请传入正确的参数!")
			}
		}

		options.cap = options.cap || "round"
		options.lineJoin = options.lineJoin || "round"
		options.color = options.color || "#000"
		options.width = options.width || 5
		options.offsetX = options.offsetX || 0
		options.offsetY = options.offsetY || 0

		this.opts = options

		cxt = canvas.getContext("2d")
		cxt.strokeStyle = this.opts.color
		cxt.lineWidth = this.opts.width
		cxt.lineCap = this.opts.cap
		cxt.lineJoin = this.opts.lineJoin
		
		disLeft = getOffset(canvas).left
		disTop = getOffset(canvas).top
		this.disLeft = disLeft
		this.disTop = disTop

		this.canvas = canvas
		this.cxt = cxt

		this._lock = false


		this.bindEvent(this.canvas)
	}

	var Sg = signature.prototype

	Sg.setColor = function (color) {
		if (typeof color !== "string") {throw new Error("参数须为字符串")}
		this.cxt.strokeStyle = color
	}

	Sg.setWidth = function (w) {
		if (typeof w !== "number") {throw new Error("参数须为数字")}
		this.cxt.lineWidth = w
	}

	Sg.destroy = function () {
		removeEvent(this.canvas, "touchstart", this)
		removeEvent(this.canvas, "touchmove", this)
		removeEvent(this.canvas, "touchend", this)
		removeEvent(this.canvas, "touchcancel", this)
	}

	Sg.lock = function () {this._lock = true }
	Sg.unlock = function () {this._lock = false }

	Sg.bindEvent = function (el) {
		addEvent(el, "touchstart", this, false)
		addEvent(el, "touchmove", this, false)
		addEvent(el, "touchend", this, false)
		addEvent(el, "touchcancel", this, false)
	}


	Sg.handleEvent = function (e) {
		var evt = window.event || e
		switch (evt.type) {
			case "touchstart":
				this.start(evt)
				break;
			case "touchmove":
				this.move(evt)
				break;
			case "touchend":
			case "touchcancel":
				this.end(evt)
				break;
		}
	}

	Sg.start = function (e) {
		if (this._lock) {return false;}

		var touch = e.touches[0],
			point = {
				x: touch.clientX - this.disLeft + this.opts.offsetX,
				y: touch.clientY - this.disTop + this.opts.offsetY
			}


			this.cxt.beginPath()
			this.cxt.moveTo(point.x, point.y)
	}

	Sg.move = function (e) {
		if (this._lock) {return false;}

		var touch = e.touches[0]
		var point = {
			x: touch.clientX - this.disLeft + this.opts.offsetX,
			y: touch.clientY - this.disTop + this.opts.offsetY
		}

		this.cxt.lineTo(point.x, point.y)
		this.cxt.stroke()
		this.cxt.beginPath()
		this.cxt.moveTo(point.x, point.y)

	}

	Sg.end = function (e) {
		if (this._lock) {return false;}

		var touch = e.changedTouches[0]
		var point = {
			x: touch.clientX - this.disLeft + this.opts.offsetX,
			y: touch.clientY - this.disTop + this.opts.offsetY
		}

		this.cxt.lineTo(point.x, point.y)
		this.cxt.stroke()

	}


	Sg.clear = function () {
		this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height)
	}

	return signature


})