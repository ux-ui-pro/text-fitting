const TextFitting = () => {
    const fittings = document.querySelectorAll('.text-fitting')

    for (const fitting of fittings) {
        const

        template = () => {
            fitting.innerHTML = '<div class="outer"><div class="inner">' + fitting.innerHTML + '</div></div>'
            fitting.outer = fitting.querySelector('.outer')
            fitting.inner = fitting.querySelector('.inner')
            fitting.inner.style.cssText = 'display: inline-block; white-space: nowrap;'
        },

        update = () => {
            cancelAnimationFrame(fitting.af)

            fitting.af = requestAnimationFrame(() => {
                let width = parseInt(getComputedStyle(fitting.inner).fontSize, 10),
                    fontSize = Math.ceil((fitting.outer.clientWidth / fitting.inner.scrollWidth) * width)

                fitting.inner.style.fontSize = `${fontSize}px`
            })
        },

        init = () => {
            template()

            addEventListener('resize', () => update())

            if (document.fonts) {
                document.fonts.addEventListener('loadingdone', update)
            }
        }

        init()
    }
}

export {
    TextFitting
}
