


(function(smart_objects, undefined) {
    smart_objects.loaded_objects = smart_objects.loaded_objects || [];
    smart_objects.loaded_objects.push("PopUp");


    smart_objects.PopUp = class extends HTMLElement {
        constructor() {
            super();

            this.init = false;
        }

        connectedCallback() {
            if(!this.init) {
                const container = document.createElement("div");
                container.classList.add("container");

                container.innerText = this.innerText;
                this.innerText = '';
                while (this.children.length !== 0) {
                    container.appendChild(this.children[0]);
                }

                container.addEventListener("nds-point", (evt) => {
                    evt.stopPropagation();
                });

                this.addEventListener("nds-point", (evt) => {
                    const event = new CustomEvent('smartobj-popup-closed', {cancelable: true, bubbles: true});
                    if(evt.currentTarget.dispatchEvent(event)) {
                        this.setAttribute("hidden", true);
                    }
                });

                this.addEventListener('smartobj-popup-open', (evt) => {
                    const event = new CustomEvent('smartobj-popup-opened', {cancelable: true, bubbles: true});
                    if(evt.currentTarget.dispatchEvent(event)) {
                        this.removeAttribute('hidden');
                    }
                });

                this.appendChild(container);
            }
        }

        static open_popup(element) {
            const event = new CustomEvent('smartobj-popup-open', {cancelable: false, bubbles: true});
            element.dispatchEvent(event);
        }
    }

    customElements.define('smartobj-popup', smart_objects.PopUp);

}(window.smart_objects = window.smart_objects || {}))