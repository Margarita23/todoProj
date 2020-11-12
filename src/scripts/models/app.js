class App extends Backbone.Model {
    initialize() {
    }

    defaults(){
        return {title: 'todo', todos: []}
    }
}