function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $4fa36e821943b400$export$2e2bcd8739ae039);
class $4fa36e821943b400$export$2e2bcd8739ae039 extends HTMLElement {
    constructor(){
        super();
        const shadowOpen = this.attachShadow({
            mode: "open"
        });
        shadowOpen.innerHTML = `<div class="wrap" style="display: flex; justify-content: center;"><div class="body" style="white-space: nowrap;"><slot></slot></div></div>`;
        this.wrap = shadowOpen.querySelector(".wrap");
        this.body = shadowOpen.querySelector(".body");
        this.update = this.update.bind(this);
        this.af = null;
        this.resizeObserver = new ResizeObserver(this.update);
        this.resizeObserver.observe(this.wrap);
        document.fonts.addEventListener("loadingdone", this.update);
    }
    update() {
        if (this.af) cancelAnimationFrame(this.af);
        this.af = requestAnimationFrame(()=>{
            let bodyFontSize = parseInt(getComputedStyle(this.body).fontSize, 10), calcFontSize = Math.floor(this.wrap.clientWidth / this.body.scrollWidth * bodyFontSize);
            this.body.style.fontSize = `${calcFontSize}px`;
        });
    }
    connectedCallback() {
        this.update();
    }
    disconnectedCallback() {
        this.resizeObserver.unobserve(this.wrap);
        document.fonts.removeEventListener("loadingdone", this.update);
    }
}
customElements.get("text-fitting") || customElements.define("text-fitting", $4fa36e821943b400$export$2e2bcd8739ae039);


//# sourceMappingURL=index.js.map
