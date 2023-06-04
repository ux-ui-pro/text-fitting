class $cf838c15c8b009ba$export$2e2bcd8739ae039 extends HTMLElement {
    constructor(){
        super();
        const shadowOpen = this.attachShadow({
            mode: "open"
        });
        shadowOpen.innerHTML = `<div id="wrap"><div id="body"><slot></slot></div></div>`;
        this.wrap = shadowOpen.querySelector("#wrap");
        this.body = shadowOpen.querySelector("#body");
        this.update = ()=>{
            !this.isDestroyed && cancelAnimationFrame(this.af);
            this.af = requestAnimationFrame(()=>{
                const bodyFontSize = parseInt(getComputedStyle(this.body).fontSize, 10);
                const calcFontSize = Math.floor(this.wrap.clientWidth / this.body.scrollWidth * bodyFontSize);
                this.wrap.style.display = "flex";
                this.wrap.style.justifyContent = "center";
                this.body.style.whiteSpace = "nowrap";
                this.body.style.fontSize = `${calcFontSize}px`;
            });
            this.resizeObserver.observe(this.wrap);
        };
        this.af = null;
        this.resizeObserver = new ResizeObserver(this.update);
        this.isDestroyed = true;
    }
    init() {
        this.isDestroyed = false;
        this.update();
    }
    destroy() {
        this.isDestroyed = true;
        this.resizeObserver.unobserve(this.wrap);
        this.af = null;
        this.wrap.style.display = "";
        this.wrap.style.justifyContent = "";
        this.body.style.whiteSpace = "";
        this.body.style.fontSize = "";
    }
}
customElements.get("text-fitting") || customElements.define("text-fitting", $cf838c15c8b009ba$export$2e2bcd8739ae039);


export {$cf838c15c8b009ba$export$2e2bcd8739ae039 as default};
//# sourceMappingURL=index.module.js.map
