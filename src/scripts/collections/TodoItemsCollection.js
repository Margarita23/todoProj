class TodoItemsCollection extends Backbone.Collection {
    initialize() {
        this.model = TodoItem;
    }
}