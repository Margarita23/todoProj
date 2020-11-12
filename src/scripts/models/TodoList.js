class TodoList extends Backbone.Model {

    defaults(){
        return {title: "ToDo List Name", items: []}
    }
}