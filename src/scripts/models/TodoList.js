class TodoList extends Backbone.Model {
    initialize() {
    }

    defaults(){
        return {title: "ToDo List Name", items: []}
    }
}