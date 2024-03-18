export default class TextFitting extends HTMLElement {
	wrap = null;
	body = null;
	resizeObserver = null;
	af = null;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' }).innerHTML = `
            <style>
                :host {
                    --font-size: 16px;
                }
                #wrap {
                    display: flex;
                    justify-content: center;
                }
                #body {
                    white-space: nowrap;
                    font-size: var(--font-size);
                }
            </style>
            <div id="wrap">
                <div id="body"><slot></slot></div>
            </div>
        `;

		this.wrap = this.shadowRoot.querySelector('#wrap');
		this.body = this.shadowRoot.querySelector('#body');

		this.update = this.throttle(this.update.bind(this), 100);

		this.resizeObserver = new ResizeObserver(this.update);
		this.resizeObserver.observe(this.wrap);
	}

	update = () => {
		cancelAnimationFrame(this.af);
		this.af = requestAnimationFrame(() => {
			const bodyFontSize = parseInt(getComputedStyle(this.body).fontSize, 10);
			const calcFontSize = Math.floor((this.wrap.clientWidth / this.body.scrollWidth) * bodyFontSize);

			this.body.style.setProperty('--font-size', `${calcFontSize}px`);
		});
	}

	throttle(func, limit) {
		let inThrottle;

		return function() {
			const args = arguments;
			const context = this;

			if (!inThrottle) {
				func.apply(context, args);

				inThrottle = true;

				setTimeout(() => (inThrottle = false), limit);
			}
		};
	}

	connectedCallback() {
		this.update();
	}

	disconnectedCallback() {
		this.resizeObserver.unobserve(this.wrap);

		cancelAnimationFrame(this.af);
	}
}

customElements.get('text-fitting') || customElements.define('text-fitting', TextFitting);
