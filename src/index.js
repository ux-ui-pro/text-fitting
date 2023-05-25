export default class TextFitting extends HTMLElement {
	constructor() {
		super()

		const shadowOpen = this.attachShadow({ mode: 'open' })

		shadowOpen.innerHTML = `<div class="wrap"><div class="body" style="display: inline-block; white-space: nowrap;"><slot></slot></div></div>`

		this.wrap = shadowOpen.querySelector('.wrap')
		this.body = shadowOpen.querySelector('.body')
		this.update = this.update.bind(this)

		this.resizeObserver = new ResizeObserver(this.update)
		this.resizeObserver.observe(this.wrap)

		document.fonts.addEventListener('loadingdone', this.update)
	}

	update() {
		if (this.af) {
			cancelAnimationFrame(this.af)
		}

		this.af = requestAnimationFrame(() => {
			let fontSize = parseInt(getComputedStyle(this.body).fontSize, 10)
			let width = Math.floor((this.wrap.clientWidth / this.body.scrollWidth) * fontSize) + 'px'

			this.body.style.fontSize = width
		})
	}

	connectedCallback() {
		this.update()
	}

	disconnectedCallback() {
		this.resizeObserver.unobserve(this.wrap)

		document.fonts.removeEventListener('loadingdone', this.update)
	}
}

customElements.get('text-fitting') || customElements.define('text-fitting', TextFitting)