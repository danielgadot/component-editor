class TreeView {
    constructor() {
        this.element = document.querySelector('.panel-wrap');
        
        this.render();
    }

    render() {
        const div = document.createElement('div');
        div.innerHTML = `         
        <div class="add-file-popup">
            <div class="">
                <ul class="ul-type-of-new-file">
                    <li>html</li>
                    <li>js</li>
                    <li>css</li>
                </ul>
            </div>
        </div>
        <button class="remove-component-btn" onclick="mainObj.removeComponent()">-</button>
        
        <ul class="tree"></ul>`
        this.element.appendChild(div)
    }

}

export default TreeView;