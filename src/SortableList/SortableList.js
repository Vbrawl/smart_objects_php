
(function(smart_objects, undefined) {

    // smartobj-sortable-list__item-initialized = "|false|true" => ""|"false": Item was not initialized by the list. "true": Item is already initialized by the list.

    smart_objects.loaded_objects = smart_objects.loaded_objects || [];
    smart_objects.loaded_objects.push("SortableList");

    function make_draggable(node, x_padding, y_padding) {
        if(!node.classList.contains("drag-n-drop__placeholder") && node.getAttribute('smartobj-sortable-list__item-initialized') !== 'true') {
            node.setAttribute('drag-n-drop', 'draggable');
            node.setAttribute('drag-n-drop-x-padding', x_padding);
            node.setAttribute('drag-n-drop-y-padding', y_padding);
            node.setAttribute('smartobj-sortable-list__item-initialized', true);
            node.addEventListener('drag-n-drop__drag-enter', modify_sorting);
        }
    }

    function reindex(node) {
        for (let i = 1; i <= node.children.length; i++) {
            const child = node.children[i-1];
            child.setAttribute('smartobj-sortable-list__item-index', i);
        }
    }

    function modify_sorting(evt) {
        const targetIndex = parseInt(evt.target.getAttribute('smartobj-sortable-list__item-index'));
        const lastIndex = evt.target.parentElement.children.length;
        const draggableIndex = parseInt(evt.detail.original_position.getAttribute('smartobj-sortable-list__item-index'));
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
    }

    smart_objects.SortableList = class extends HTMLElement {
        constructor() {
            super();

            this.setAttribute('drag-n-drop', "container");

            if(this.getAttribute('x-padding') === null)
                this.setAttribute('x-padding', 0);

            if(this.getAttribute('y-padding') === null)
                this.setAttribute('y-padding', 0);

            
            for (let i = 0; i < this.children.length; i++)
                make_draggable(this.children[i], this.getAttribute('x-padding'), this.getAttribute('y-padding'));

            reindex(this);

            observer.observe(this, {childList: true});
        }
    }


    var observer = new MutationObserver((mutations) => {
        for (let i = 0; i < mutations.length; i++) {
            const mutationRecord = mutations[i];
            for (let i = 0; i < mutationRecord.addedNodes.length; i++) {
                make_draggable(mutationRecord.addedNodes[i], mutationRecord.target.getAttribute('x-padding'), mutationRecord.target.getAttribute('y-padding'))
            }
            reindex(mutationRecord.target);
        }
    });
    customElements.define("smartobj-sortable-list", smart_objects.SortableList);
}(window.smart_objects = window.smart_objects || {}));