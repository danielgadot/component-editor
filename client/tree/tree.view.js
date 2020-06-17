class TreeView {
    constructor() {
        this.element = document.querySelector('.panel-wrap');
        
        this.render();
    }

    render() {
        this.element.innerHTML = `
            
        <input class="user-search" type="text" placeholder="search" onkeyup="mainObj.userSearch()"> <br>
        <button class="add-component">+</button>
         <!-- <button onclick="fileModal.openAddFile()">+</button> -->
         <div class="add-file-popup">
             <div class="">
                 <ul class="ul-type-of-new-file">
                     <li>directory</li>
                     <li>html</li>
                     <li>js</li>
                     <li>css</li>
                 </ul>
             </div>
         </div>
         <button class="remove-component-btn" onclick="mainObj.removeComponent()">-</button>
         
         <ul class="tree"></ul>
        `
    }

}

export default TreeView;