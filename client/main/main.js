import Node from '../node.js';
import TreeView from '../tree/tree.view.js';
import TreeCtrl from '../tree/tree.ctrl.js';
import ActionsToolbarView from '../actions-toolbar/actions-toolbar.view.js';
import ActionsToolbarCtrl from '../actions-toolbar/actions-toolbar.ctrl.js';
import CtxMenuView from '../ctx-menu/ctx-menu.view.js';
import MainView from './main.view.js';

class Main {
  constructor() {
      this.actionsToolbarView = new ActionsToolbarView();
      this.actionsToolbarCtrl = new ActionsToolbarCtrl();
      this.treeView = new TreeView();
      this.treeCtrl = new TreeCtrl();
      this.treeAsArray = [new Node(0, [], [], null, { name: 'root-node' }, 'root')];
      this.el = document.querySelector('.tree');
      this.editorPara = document.querySelector('.component-editor');
      this.editorParaTitle = document.querySelector('.component-editor-title');
      this.nestedTree = [];
      this.saveRightClickdClass = -1;
      this.selectedComponent = '';
      
      this.disableRemoveBtn = document.querySelector('.remove-component-btn');
      this.disableRemoveBtn.disabled = true;
      this.userSearchInput = document.querySelector('.user-search');
      this.elPage = document.querySelector('.page');

  }

  // add component to tree
  addComponent(fileToAdd) {
    
    let type = fileToAdd.innerText;
    let fileName = prompt('file  name');
    let position = this.treeAsArray.length;
    let addToParent = '';
    if (this.selectedComponent !== '') {
      addToParent = this.selectedComponent.data.name;
    } else {
      addToParent = 'root-node';
    }
    let newNode = new Node(position, [], [], addToParent, {
      name: `${fileName}.${type}`,
      data: 'import {} from @angular/core'
    }, type);
    console.log('%c newNode :: ', ' color: red', newNode);

    this.treeAsArray.push(newNode);
    this.nestedTree = [];
    this.el.innerHTML = '';
    this.fillTreeWithChildren(this.nestedTree, 'root-node');
    MainView.printTree(this.nestedTree, this.el);
    CtxMenuView.closeMenu();
  }

  /**  search node in tree array
  */
  search(component) {
    return this.treeAsArray.find(node => node.data.name === component.data.name);
  }
  
  /**  removeComponent from the tree
  */
  removeComponent() {
    this.nestedTree = [];
    this.el.innerHTML = '';
    let nodeToDelete = this.search(this.selectedComponent);
    this.selectedComponent = '';
    if (nodeToDelete && nodeToDelete.childrens.length > 0) {
      nodeToDelete.childrens.map(child => (child.parent = nodeToDelete.parent));
    } else {
      let indexToRemove = this.treeAsArray.findIndex(
        node => node.id === nodeToDelete.id
      );
      this.treeAsArray.splice(indexToRemove, 1);
      this.fillTreeWithChildren(this.nestedTree, 'root-node');
      MainView.printTree(this.nestedTree, this.el);
    }
  }



  /**  cretes tree like structure
  * @Param {Nodes[]} childrenArr, 
  * @Param {string} parentName
  */
  fillTreeWithChildren(childrenArr, parentName) {
    for (let i = 0; i < this.treeAsArray.length; i++) {
      let obj = this.treeAsArray[i];
      if (obj.parent === parentName) {
        childrenArr.push(obj);
        obj.childrens = [];
        this.fillTreeWithChildren(obj.childrens, obj.data.name);
      }
    }
  }

  /**  onLeft cLicked mouse Event : saves clicked on component
  */
  onSelectComponent() {
    this.selectedComponent = this.treeAsArray.find(
        node => node.data.name === event.target.className
      );
  }
  
  /**  displayes component data
  */
  showComponentInEditor() {
    event.stopPropagation();
    this.onSelectComponent()
    this.disableRemoveBtn.disabled = false;
    this.editorParaTitle.innerText = this.selectedComponent.data.name;
    this.editorPara.value = this.selectedComponent.data.data;
  }
  
 

  /**  saves new edited data to component 
  */
  editData() {
      this.selectedComponent.data.data = this.editorPara.value;
  }

  /**  userSearch : when user press a key it will Re-render the tree 
  */
  userSearch() {
      let found = this.treeAsArray.filter(node => node.data.name === this.userSearchInput.value);
      this.nestedTree = [];
      this.el.innerHTML = '';
      if (found[0]) {
        found = found[0];
        if (found.childrens.length > 0) {
            this.fillTreeWithChildren(this.nestedTree, found.data.name);
            MainView.printTree(this.nestedTree, this.el);
        } else {
            let parent = this.treeAsArray.find(node => node.data.name === found.parent);
            parent.childrens = [];
            parent.childrens.push(found);
            this.nestedTree = [parent];
            MainView.printTree(this.nestedTree, this.el); 
        }
      } else if (this.userSearchInput.value === ''){
        this.fillTreeWithChildren(this.nestedTree, 'root-node');
        MainView.printTree(this.nestedTree, this.el); 
      }
  }
  /**  unselect component and editor view
  */
  unselectedComponent() {
    if(event.target !== event.currentTarget) return;
      this.selectedComponent = '';
      this.editorPara.value = '';
      this.editorParaTitle.innerText = '';
      this.closeContextMenu();
  }

  /**  move a node inside the tree
  * didnt find in the instructions how the user should choose where to , the idea is the same as moveNode,
  * switch between two positions in tree array and plugin new parent if necessary
  */
  askPositionToMoveNode() {
      let newPosition =  prompt(' move to position ?');
      this.moveNode(newPosition);
  }

  /**  move a node up or down inside parent
  * @Param {number} step : possible values [1, -1], 
  * switchs between two objects in tree array
  */
  moveNode(step) {
    let childPos = this.treeAsArray.findIndex(
        node => node.data.name === this.saveRightClickdClass
      );
    let tempPos = childPos + step;
    let tempComponent =  this.treeAsArray[tempPos];
    this.treeAsArray[tempPos] = this.treeAsArray[childPos];
    this.treeAsArray[childPos] = tempComponent;
    this.nestedTree = [];
    this.el.innerHTML = '';
    this.fillTreeWithChildren(this.nestedTree, 'root-node');
    this.printTree(this.nestedTree, this.el);
    this.closeContextMenu();
  }

  /**  find nested node in tree / deep search
  * @Param {Node} element : root node, 
  * @Param {string} matchingTitle : component name, 
  */
  findNestedNode(node, componentName) {
    if(node.data.name === componentName){
        return node;
   }else if (node.childrens !== null){
        let i;
        let result = null;
        for(i = 0; result === null && i < node.childrens.length; i++){
             result = this.findNestedNode(node.childrens[i], componentName);
        }
        return result;
   }
  }

}
let mainObj = new Main();
export default mainObj;