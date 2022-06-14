
export default class ImageLoader {

    subElements = {};


    preventDefaults = (event) => {
        event.preventDefault();
    }

    highlight = () => {
        const { dropArea } = this.subElements;

        dropArea.classList.add('highlight');
    }

    unhighlight = () => {
        const { dropArea } = this.subElements;
        dropArea.classList.remove('highlight')
    }

    handleDrop = (event) => {
        const dt = event.dataTransfer;
        const files = dt.files;
        //  files это не массив, а FileList
        this.handleFiles(files);
        // реализация handleFiles, нам нужно преобразовать FileList в массив, чтобы более легко было его итерировать
    }


    onUploadImage = () => {
        const inputFile = document.createElement('input');
    
        inputFile.type = 'file';
        inputFile.accept = 'image/*';
    
        inputFile.addEventListener('change', async () => {
           const files = inputFile.files;
        //    работает с FileList
          if (files) {
            this.handleFiles(files);

        // сетевые запросы, сервера нет (пока)
        // this.initializeProgress(files.length)
        // [...files].forEach((file) => this.uploadFile(file));
            
            inputFile.remove();
          }
        });
    
        // для корректной работы в IE
        inputFile.hidden = true;
        document.body.appendChild(inputFile);
        inputFile.click();
      }



    constructor() {
        this.filesDone = 0;
        this.filedToDo = 0;
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');

        wrapper.innerHTML = this.getTemplate();
        this.element = wrapper.firstElementChild;

        this.subElements = this.getSubElements();
        this.initEventListeners();
    }


    initEventListeners() {
        const { dropArea, uploadImage } = this.subElements;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.preventDefaults)
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.highlight)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, this.unhighlight)
        });

        uploadImage.addEventListener('click', this.onUploadImage);
        dropArea.addEventListener('drop', this.handleDrop);
    }

    removeEventListeners() {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            document.removeEventListener(eventName, this.preventDefaults);
        })

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.removeEventListener(eventName, this.highlight)
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.removeEventListener(eventName, this.unhighlight)
        });

    }

    handleFiles(files) {
        ([...files]).forEach((file) => this.previewFile(file));

        // сетевые запросы, сервера нет (пока)
        // this.initializeProgress(files.length)
        // [...files].forEach((file) => this.uploadFile(file));
    }

    async uploadFile(file) {
        const url = new URL();
        const formData = new FormData();

        formData.append('file', file);
        let responce;

        try {
            responce = await fetch(url, {
                method: 'POST',
                body: formData
            })
        } catch (err) {
            console.error(err.message);
        }

        if (!responce.ok) {
            console.error(responce.statusText)
        } else {
            this.progressDone();
        }

        return await responce.json();

    }

    previewFile(file) {
        const { gallery } = this.subElements;
        const reader = new FileReader();
       
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            const img = document.createElement('img');
            img.src = reader.result;
            gallery.appendChild(img);
        }
    }

    // строка загрузки, серверная часть
    initializeProgress(numFiles) {
        const { progressBar } = this.subElements;
        progressBar.value = 0;
        this.filedToDo = numFiles;
        this.filesDone = 0
    }

    progressDone() {
        const { progressBar } = this.subElements;
        this.filesDone++;
        progressBar.value = this.filesDone / this.filedToDo * 100;

    }
    //


    getSubElements() {
        const elements = this.element.querySelectorAll('[data-element]')
        for (const item of elements) {
            this.subElements[item.dataset.element] = item;
        }
        console.log(this.subElements);
        return this.subElements;
    }


    getTemplate() {
        return `
            <div class="container" data-element="imgaeLoader">
            <div class="drop-area" id="drop-area" data-element='dropArea'>
            <form class="my-form">
              <p>Загрузите изображения с помощью диалога выбора файлов или перетащив нужные изображения в выделенную область</p>
              <button type="button" class="button" name="uploadImage" data-element="uploadImage" class="button-primary-outline fit-content"><span>Выбрать изображения</span></button>
            </form>
            <!-- <<progress id="progress-bar" max=100 value=0 data-element='progressBar'></progress> -->
            <div id="gallery" class="gallery" data-element='gallery'></div>
          </div>
            </div>`
    }



    remove() {
        if (this.element) {
            this.element.remove();
        }
    }

    destroy() {
        this.remove();
        this.element = null;
        this.subElements = null;
    }


}