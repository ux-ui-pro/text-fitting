export class TextFitting extends HTMLElement {
    constructor() {
        super()

        const shadowOpen = this.attachShadow({ mode: 'open' })

        shadowOpen.innerHTML = `<div class="outer"><div class="inner"><slot></slot></div></div>`

        this.outer = shadowOpen.querySelector('.outer')
        this.inner = shadowOpen.querySelector('.inner')
        this.update = this.update.bind(this)

        this.inner.style.cssText = 'display: inline-block; white-space: nowrap;'

        addEventListener('resize', this.update)

        document.fonts.addEventListener('loadingdone', this.update)
    }

    connectedCallback() {
        this.update()
    }

    disconnectedCallback() {
        removeEventListener('resize', this.update)

        document.fonts.removeEventListener('loadingdone', this.update)
    }

    update() {
        cancelAnimationFrame(this.af)

        this.af = requestAnimationFrame(() => {
            let fontSize = parseInt(getComputedStyle(this.inner).fontSize, 10),
                width = ((this.outer.clientWidth / this.inner.scrollWidth) * fontSize).toFixed(0) + 'px'

            this.inner.style.fontSize = `${width}`
        })
    }
}

customElements.get('text-fitting') || customElements.define('text-fitting', TextFitting)
