import main from './main.js'
class MainView {
    constructor() {
        this.element = document.querySelector('.page');
        
        this.render();
    }

    static render() {
        this.element.innerHTML = ``
    }
    
      /**  prints html tree structre
     * @Param {Nodes[]} list, 
     * @Param {string} container : html container
     */
    static printTree(list, container) {
        for (let i = 0; i < list.length; i++) {
        let li = document.createElement('li');
        // li.setAttribute('oncontextmenu', 'main.openContextMenu()');
        li.setAttribute('onclick', `${main.showComponentInEditor(this)}`);
        li.className = list[i].data.name;
        li.classList.add('file');
        li.id = list[i].id;
        li.innerHTML = list[i].data.name;
        if (list[i].childrens.length > 0) {
            let ul = document.createElement('ul');
            ul.setAttribute('oncontextmenu', 'main.openContextMenu()');
            li.appendChild(ul);
            this.printTree(list[i].childrens, ul);
        }
        container.appendChild(li);
        }
    }

}

export default MainView;