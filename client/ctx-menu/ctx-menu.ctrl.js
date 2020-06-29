class CtxMenuCtrl {
    constructor() {
        this.element = document.querySelector('.ctx-menu-wrap');
        this.ctxMenu = document.getElementById('ctxMenu');
    }

    /**  onRight cLicked mouse Event : saves clicked on component and open contect menu 
     */
    openContextMenu() {
        event.preventDefault();
        this.saveRightClickdClass = event.target.className;
        this.ctxMenu.style.display = 'block';
        this.ctxMenu.style.left = event.pageX - 10 + 'px';
        this.ctxMenu.style.top = event.pageY - 10 + 'px';
        this.onSelectComponent();
    }

    /**  clears context menufrom view 
     */
    closeContextMenu(){
        this.ctxMenu.style.display = 'none';
    }

}

export default CtxMenuCtrl;