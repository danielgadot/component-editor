import mainObj from './../main.js';
import FileModal from './../add-file-modal.js';

class TreeCtrl {
    constructor() {
        document.querySelector('.add-component').addEventListener('click', (e) => FileModal.openAddFile())
    }


}

export default TreeCtrl;