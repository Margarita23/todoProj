class TodoListsCollection extends Backbone.Collection {
    initialize() {
        this.model = TodoList;
    }
}