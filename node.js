class Node {
    constructor(id, childrens, childrenIds, parent, data, type) {
        this.id = id;
        this.childrens = childrens;
        this.childrenIds = childrenIds || [];
        this.parent = parent;
        this.type = type;
        this.data = data;
    }
}