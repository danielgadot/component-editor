import FileModal from './../add-file-modal.js';

class ActionsToolbarCtrl {
    constructor() {
        // this.addFolder.bind(this)
        document.querySelector('.add-component-btn').addEventListener('click', (e) => FileModal.openAddFile())
        document.querySelector('.add-folder-btn').addEventListener('click', (e) => this.addFolder())

    }

    addFolder() {
        const folderName = prompt('Folder Name ');
        const treeUl = document.querySelector('.tree');
        const li = document.createElement('li');
        li.innerText = folderName;
        li.classList.add('folder');
        treeUl.appendChild(li)
    }

}

export default ActionsToolbarCtrl;

