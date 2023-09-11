
(function(smart_objects, undefined) {

    // smartobj-sortable-list__draggable = "|false" => "": Item is draggable. "false": Item is not draggable.
    // x-padding = "num" => A number representing the padding (in pixels) before items are moved in the X axis. (DEFAULT: 0)
    // y-padding = "num" => A number representing the padding (in pixels) before items are moved in the Y axis. (DEFAULT: 0)
    // smartobj-sortable-list__item-initialized(AUTOMATICALLY ADDED) = "|false|true" => ""|"false": Item was not initialized by the list. "true": Item is already initialized by the list.
    // smartobj-sortable-list__item-index(AUTOMATICALLY ADDED) = "num" => A number representing the index of the element in the list.

    smart_objects.loaded_objects = smart_objects.loaded_objects || [];
    smart_objects.loaded_objects.push("SortableList");

    smart_objects.SortableList = class extends HTMLElement {
        constructor() {
            super();

            this.init = false;
        }

        connectedCallback() {
            if(this.isConnected && !this.init) {
                this.init = true;

                this.setAttribute('drag-n-drop', "container");

                if(this.getAttribute('x-padding') === null)
                    this.setAttribute('x-padding', 0);

                if(this.getAttribute('y-padding') === null)
                    this.setAttribute('y-padding', 0);

            
                for (let i = 0; i < this.children.length; i++)
                    this.make_draggable(this.children[i]);

                this.reindex();
            }
        }

        reindex() {
            for (let i = 1; i <= this.children.length; i++) {
                const child = this.children[i-1];
                child.setAttribute('smartobj-sortable-list__item-index', i);
            }
        }

        make_draggable(node) {
            if(!node.classList.contains("drag-n-drop__placeholder") && node.getAttribute('smartobj-sortable-list__item-initialized') !== 'true' && node.getAttribute('smartobj-sortable-list__draggable') !== "false") {
                node.setAttribute('drag-n-drop', 'draggable');
                node.setAttribute('drag-n-drop-x-padding', this.getAttribute('x-padding'));
                node.setAttribute('drag-n-drop-y-padding', this.getAttribute('y-padding'));
                node.setAttribute('smartobj-sortable-list__item-initialized', true);
                node.addEventListener('drag-n-drop__drag-enter', smart_objects.SortableList.modify_sorting);
            }
        }

        static modify_sorting(evt) {
            const targetIndex = parseInt(evt.target.getAttribute('smartobj-sortable-list__item-index'));
            const lastIndex = evt.target.parentElement.children.length;
            const draggableIndex = parseInt(evt.detail.object.children[0].getAttribute('smartobj-sortable-list__item-index'));
            var before_child = evt.target;

            if(targetIndex > draggableIndex) {
                if(targetIndex === lastIndex) {
                    before_child = null;
                }
                else {
                    before_child = evt.target.parentElement.querySelector(`*[smartobj-sortable-list__item-index="${targetIndex+1}"]`);
                }
            }
            evt.target.parentElement.insertBefore(evt.detail.original_position, before_child);
            smart_objects.SortableList.prototype.reindex.call(evt.target.parentElement);
            evt.detail.object.children[0].setAttribute('smartobj-sortable-list__item-index', evt.detail.original_position.getAttribute('smartobj-sortable-list__item-index'));
        }
    }

    customElements.define("smartobj-sortable-list", smart_objects.SortableList);
}(window.smart_objects = window.smart_objects || {}));