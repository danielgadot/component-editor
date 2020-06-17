
import mainObj from './main.js';
const fileTypes = ['html', 'js', 'css', 'directory'];


class FileModal {
    static closeAddFile() {
        document.querySelector('.add-file-popup').style.display = "none";
    }

    static openAddFile() {
        document.querySelector('.add-file-popup').style.display = "block";
        document.querySelector('.ul-type-of-new-file').addEventListener('click', (e) => {
            mainObj.addComponent(e.target);
            this.closeAddFile(); 
        });
    }
}

export default FileModal;