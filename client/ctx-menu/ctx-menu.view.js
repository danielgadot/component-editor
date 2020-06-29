
class CtxMenuView {
    constructor() {
        this.element = document.querySelector('.ctx-menu-wrap');
        this.ctxMenu = document.getElementById('ctxMenu');
        this.render();
    }

    render() {
        this.element.innerHTML = `
            
        <menu id="ctxMenu">
        <menu onclick="mainObj.addComponent(this)" title="Add"></menu>
        <menu onclick="mainObj.removeComponent(this)" title="Remove"></menu>
        <menu onclick="mainObj.askPositionToMoveNode()" title="Move"></menu>
        <menu title="Order">
        
            <menu onclick="mainObj.moveNode(-1)" title="Up"></menu>
            <menu onclick="mainObj.moveNode(1)" title="Down"></menu>
        
        </menu>
        </menu>
        `
    }
    static closeMenu() {
        // this.ctxMenu.style.display = 'none';
    }

}

export default CtxMenuView;