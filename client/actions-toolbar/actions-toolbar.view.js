class ActionsToolbarView {
    constructor() {
        this.element = document.getElementsByTagName('actions-toolbar-wrap')[0];
        console.log('%c  :: element', ' color: red', this.element);
        
        
        this.render();
    }

    render() {
        this.element.innerHTML = `
            <div class="actions-wrap">
                <input class="user-search" type="text" placeholder="search" onkeyup="mainObj.userSearch()"> <br>
                <button class="add-component-btn"><img src="assets/add-doc.svg" class="add-doc-svg"></button>
                <button class="add-folder-btn"><img src="assets/add-folder.svg" class="add-doc-svg"></button>
            </div>
        `
    }

}

export default ActionsToolbarView;