
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
                    this.add_item(window.relocation.SMART_OBJECTS_RESOURCES_PATH+'/papers.png', fileid);
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