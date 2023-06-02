export default class TextFitting extends HTMLElement {
	constructor() {
		super()

		const shadowOpen = this.attachShadow({ mode: 'open' })

		shadowOpen.innerHTML = `<div class="wrap"><div class="body"><slot></slot></div></div>`

		this.wrap = shadowOpen.querySelector('.wrap')
		this.body = shadowOpen.querySelector('.body')
		this.update = this.update.bind(this)
		this.af = null
		this.resizeObserver = new ResizeObserver(this.update)
	}

	init() {
		document.fonts.addEventListener('loadingdone', this.update)
		this.resizeObserver.observe(this.wrap)
	}

	update() {
		if (this.af) {
			cancelAnimationFrame(this.af)
		}

		this.af = requestAnimationFrame(() => {
			const bodyFontSize = parseInt(getComputedStyle(this.body).fontSize, 10)
			const calcFontSize = Math.floor((this.wrap.clientWidth / this.body.scrollWidth) * bodyFontSize)

			Object.assign(this.wrap.style, { display: 'flex', justifyContent: 'center' })
			Object.assign(this.body.style, { whiteSpace: 'nowrap', fontSize: `${calcFontSize}px` })
		})
	}

	destroy() {
		this.resizeObserver.unobserve(this.wrap)
		document.fonts.removeEventListener('loadingdone', this.update)
		this.af = null

		if (this.parentElement) {
			Object.assign(this.wrap.style, { display: '', justifyContent: '' })
			Object.assign(this.body.style, { fontSize: '', whiteSpace: '' })
		}
	}

	connectedCallback() {
		this.update()
		this.init()
	}

	disconnectedCallback() {
		this.destroy()
	}
}

customElements.get('text-fitting') || customElements.define('text-fitting', TextFitting)