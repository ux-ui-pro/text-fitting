export class TextFitting extends HTMLElement {
    constructor() {
        super()

        const shadowOpen = this.attachShadow({mode: 'open'})

        shadowOpen.innerHTML = `<div class="client"><div class="scroll"><slot></slot></div></div>`

        this.client = shadowOpen.querySelector('.client')
        this.scroll = shadowOpen.querySelector('.scroll')
        this.update = this.update.bind(this)

        this.scroll.style.cssText = `display: inline-block; white-space: nowrap;`

        addEventListener('resize', this.update)

        if (document.fonts) {
            document.fonts.addEventListener('loadingdone', this.update)
        }
    }

    disconnectedCallback() {
        removeEventListener('resize', this.update)

        if (document.fonts) {
            document.fonts.removeEventListener('loadingdone', this.update)
        }
    }

    update() {
        cancelAnimationFrame(this.af)

        this.af = requestAnimationFrame(() => {
            let fontSize = parseInt(getComputedStyle(this.scroll).fontSize, 10),
                width = ((this.client.clientWidth / this.scroll.scrollWidth) * fontSize).toFixed(0) + 'px'

            this.scroll.style.fontSize = `${width}`
        })
    }

    connectedCallback() {
        this.update()
    }
}

customElements.get('text-fitting') || customElements.define('text-fitting', TextFitting)
