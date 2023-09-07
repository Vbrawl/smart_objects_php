
(function (smart_objects, undefined) {
    smart_objects.loaded_objects = smart_objects.loaded_objects || [];
    smart_objects.loaded_objects.push("FileSelector");


    // label = The text to show as placeholder.


    var file_id = 0;



    function label_toggle(observations) {
        for (let i = 0; i < observations.length; i++) {
            const observation = observations[i];
            const target = observation.target;
            const label = target.getElementsByClassName("label")[0];

            if(observation.type === 'childList') {
                if(target.children.length > 2) {
                    if(label) label.setAttribute('hidden', true);
                }
                else {
                    if(label) label.removeAttribute('hidden');
                    else smart_objects.FileSelector.add_label_placeholder(target);
                }
            }
            else if(observation.type === 'attributes') {
                if(label) label.innerText = target.getAttribute('label') || '';
                else smart_objects.FileSelector.add_label_placeholder(target);
            }
        }
    }

    const observer = new MutationObserver(label_toggle);

    smart_objects.FileSelector = class extends HTMLElement {
        constructor() {
            super();

            smart_objects.FileSelector.add_label_placeholder(this);
            smart_objects.FileSelector.add_input_object(this);

            this.addEventListener('nds-point', (e) => {
                if(e.target === this || e.target.classList.contains('label') || e.target.classList.contains('image_box')) {
                    var input = this.getElementsByTagName('input')[0];
                    if(!input) {
                        input = smart_objects.FileSelector.add_input_object(this);
                    }
                    input.click();
                }
            });

            this.addEventListener('dragover', (e) => {e.preventDefault();});

            this.addEventListener('dragenter', (e) => {
                e.preventDefault();
                this.classList.add("hovering");
            });

            this.addEventListener('dragleave', (e) => {
                e.preventDefault();
                const rect = this.getBoundingClientRect();
                if(e.pageX <= rect.left || e.pageX >= rect.right || e.pageY <= rect.top || e.pageY >= rect.bottom) {
                    this.classList.remove("hovering");
                }
            });

            this.addEventListener('drop', (e) => {
                e.preventDefault();
                this.classList.remove('hovering');

                for (let i = 0; i < e.dataTransfer.files.length; i++) {
                    const file = e.dataTransfer.files[i];
                    this.add_file(file);
                }
            });


            observer.observe(this, {childList: true, attributes: true});
        }

        static add_label_placeholder(_this) {
            const label = document.createElement('div');
            label.classList.add('label');
            label.innerText = _this.getAttribute('label') || '';
            _this.appendChild(label);
            return label;
        }

        static add_input_object(_this) {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('multiple', true);
            input.setAttribute('hidden', true);

            input.addEventListener('change', (e) => {
                e.preventDefault();
                const filelist = e.target.files;
                e.target.value = ''; // clear filelist

                for(let i = 0; i < filelist.length; i++) {
                    const file = filelist[i];
                    _this.add_file(file);
                }
            });

            _this.appendChild(input);
            return input;
        }

        add_file(file) {
            const fileid = file_id++;
            const on_file = new CustomEvent('file-selector__file', {detail: {file: file, file_id: fileid}, bubbles: true, cancelable: true});

            if(this.dispatchEvent(on_file)) {
                if(file.type.startsWith("image")) {
                    const reader = new FileReader();
                    reader.onloadend = () => {this.add_item(reader.result, fileid)};
                    reader.readAsDataURL(file);
                }
                else {
                    // base64 for a broken image file.
                    this.add_item('data:image/png;base64,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', fileid);
                }
            }

        }

        add_item(source, fileid) {
            const imgbox = document.createElement('div');
            const imgcontainer = document.createElement('div');
            const img = document.createElement('img');

            imgbox.classList.add('image_box');
            imgbox.setAttribute('file-id', fileid);
            imgcontainer.classList.add('image_container');

            imgcontainer.addEventListener('nds-point', (e) => {
                const on_removefile = new CustomEvent('file-selector__removefile', {detail: {file_id: fileid}, bubbles: true, cancelable: true});

                if(this.dispatchEvent(on_removefile)) {
                    imgbox.remove();
                }
            });
            img.src = source;

            imgbox.appendChild(imgcontainer);
            imgcontainer.appendChild(img);
            this.appendChild(imgbox);

            const on_thumbnail_loaded = new CustomEvent('file-selector__thumbnail_loaded', {detail: {dom_element: imgbox, file_id: fileid}, bubbles: true});
        }
    }

    customElements.define('smartobj-file-selector', smart_objects.FileSelector);
}(window.smart_objects = window.smart_objects || {}))