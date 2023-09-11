
(function (smart_objects, undefined) {
    smart_objects.loaded_objects = smart_objects.loaded_objects || [];
    smart_objects.loaded_objects.push("FileSelector");


    // label = The text to show as placeholder.


    var file_id = 0;

    smart_objects.FileSelector = class extends HTMLElement {
        constructor() {
            super();

            this.init = false;
        }

        connectedCallback() {
            if(this.isConnected && !this.init) {
                this.init = true;

                this.input = document.createElement('input');
                this.input.setAttribute('type', 'file');
                this.input.setAttribute('multiple', true);
                this.input.setAttribute('hidden', true);

                this.input.addEventListener('change', (e) => {
                    e.preventDefault();
                    const filelist = e.target.files;
                    e.target.value = ''; // clear filelist

                    for(let i = 0; i < filelist.length; i++) {
                        const file = filelist[i];
                        this.add_file(file);
                    }
                });
                this.appendChild(this.input);


                this.label = document.createElement('div');
                this.label.classList.add('label');
                this.label.innerText = this.getAttribute('label') || '';
                this.appendChild(this.label);



                this.addEventListener('nds-point', (e) => {
                        this.input.click();
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
            }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            switch (name) {
                case 'label':
                    if(this.label)
                        this.label.innerText = newValue;
                    break;
            
                default:
                    break;
            }
        }

        static get observedAttributes() {
            return ['label'];
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
                    this.add_item(window.relocation.SMART_OBJECTS_RESOURCES_PATH+'/FileSelector/papers.png', fileid);
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
                e.stopPropagation();
                const on_removefile = new CustomEvent('file-selector__removefile', {detail: {file_id: fileid}, bubbles: true, cancelable: true});

                if(this.dispatchEvent(on_removefile)) {
                    imgbox.remove();
                    if(this.children.length <= 2)
                        this.label.removeAttribute('hidden');
                }
            });
            img.src = source;

            imgbox.appendChild(imgcontainer);
            imgcontainer.appendChild(img);
            this.appendChild(imgbox);
            this.label.setAttribute('hidden', '');

            const on_thumbnail_loaded = new CustomEvent('file-selector__thumbnail_loaded', {detail: {dom_element: imgbox, file_id: fileid}, bubbles: true});
            this.dispatchEvent(on_thumbnail_loaded);
        }
    }

    customElements.define('smartobj-file-selector', smart_objects.FileSelector);
}(window.smart_objects = window.smart_objects || {}))