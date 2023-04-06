export default class TextFitting extends HTMLElement {
    constructor() {
        super()

        const shadowOpen = this.attachShadow({ mode: 'open' })

        shadowOpen.innerHTML = `<div class="wrap"><div class="body"><slot></slot></div></div>`

        this.wrap = shadowOpen.querySelector('.wrap')
        this.body = shadowOpen.querySelector('.body')
        this.update = this.update.bind(this)

        this.body.style.cssText = 'display: inline-block; white-space: nowrap;'

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
            let fontSize = parseInt(getComputedStyle(this.body).fontSize, 10),
                width = Math.ceil((this.wrap.clientWidth / this.body.scrollWidth) * fontSize) + 'px'

            this.body.style.fontSize = `${width}`
        })
    }
}

customElements.get('text-fitting') || customElements.define('text-fitting', TextFitting)
