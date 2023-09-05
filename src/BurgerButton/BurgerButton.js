


(function(smart_objects, undefined) {
    smart_objects.loaded_objects = smart_objects.loaded_objects || [];
    smart_objects.loaded_objects.push("BurgerButton");

    // (EVENT) smartobj-burger-button__toggled => An event where the burger button is clicked and it's state changes. (event.detail.newState holds either "open" or "closed" and indicates the current state)

    smart_objects.BurgerButton = class extends HTMLElement {
        constructor() {
            super();

            this.appendChild(document.createElement('span'));
            this.appendChild(document.createElement('span'));
            this.appendChild(document.createElement('span'));

            this.addEventListener('click', () => {
                const evt = new CustomEvent('smartobj-burger-button__toggled', {detail: {newState: (this.classList.contains('open') ? "closed" : "open")}, cancelable: true});
                this.dispatchEvent(evt);

                if(!evt.defaultPrevented) {
                    this.classList.toggle('open');
                }
            });
        }
    }


    customElements.define('smartobj-burger-button', smart_objects.BurgerButton);
}(window.smart_objects = window.smart_objects || {}));