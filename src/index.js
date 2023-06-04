export default class TextFitting extends HTMLElement {
	constructor() {
		super()

		const shadowOpen = this.attachShadow({ mode: 'open' })

		shadowOpen.innerHTML = `
			<style>
				#wrap {
					display: flex;
					justify-content: center;
				}
				#body {
					white-space: nowrap;
				}
			</style>
			<div id="wrap">
				<div id="body">
					<slot></slot>
				</div>
			</div>
		`

		this.wrap = shadowOpen.querySelector('#wrap')
		this.body = shadowOpen.querySelector('#body')
		this.update = this.update.bind(this)

		this.resizeObserver = new ResizeObserver(this.update)
		this.resizeObserver.observe(this.wrap)
	}

	update() {
		cancelAnimationFrame(this.af)

		this.af = requestAnimationFrame(() => {
			const bodyFontSize = parseInt(getComputedStyle(this.body).fontSize, 10)
			const calcFontSize = Math.floor((this.wrap.clientWidth / this.body.scrollWidth) * bodyFontSize)

			this.body.style.fontSize = `${calcFontSize}px`
		})
	}

	connectedCallback() {
		this.update()
	}

	disconnectedCallback() {
		this.resizeObserver.unobserve(this.wrap)
		this.af = null
	}
}

customElements.get('text-fitting') || customElements.define('text-fitting', TextFitting)