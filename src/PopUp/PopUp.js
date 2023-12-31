


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

                while (this.childNodes.length !== 0) {
                    container.appendChild(this.childNodes[0]);
                }

                container.addEventListener("nds-point", (evt) => {
                    evt.stopPropagation();
                });

                this.addEventListener("nds-point", (evt) => {
                    const event = new CustomEvent('smartobj-popup-closed', {cancelable: true, bubbles: true});
                    if(this.dispatchEvent(event)) {
                        this.close_popup();
                    }
                });
                
                this.appendChild(container);
            }
        }
        
        open_popup() {
            this.removeAttribute('hidden');
        }

        close_popup() {
            this.setAttribute('hidden', true);
        }
    }

    customElements.define('smartobj-popup', smart_objects.PopUp);


}(window.smart_objects = window.smart_objects || {}))