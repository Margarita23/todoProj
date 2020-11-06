class TodoListView extends Backbone.View {

    events() {
        return {
            'click #todo__remove-btn' : 'removeTodo',
            'click .todo__title' : 'showInputChangeTitleWithBtn',
            'click #text__change-btn--cancel' : 'hideInputChangeTitleWithBtn',
            'click #text__change-btn--submit' : 'changeTitle',
        };
    }

    template() {
        return _.template(
            `<div class="todo-list__block">
                <ul class="todo__list">
                <% this.collection.each((model, index) => { %>
                    <li class="todo__item">
                        <button data-id="<%= index %>" id="todo__remove-btn" class="todo__remove-btn" type="submit">X</button>
                        <h2 data-id="<%= index %>" class="todo__title"><%= model.title %></h2>
                        <div class="todo__change-block">
                            <input type="text" name="todoItemTitle" class="todo-title__input" placeholder="<%= model.title %>">
                            <div class="change__btns change__btns--todo">
                                <button data-id="<%= index %>" data-cid="<%= model.cid %>" id="text__change-btn--submit" class="text__change-btn text__change-btn--submit" type="submit">Change Text</button>
                                <button data-id="<%= index %>" id="text__change-btn--cancel" class="text__change-btn text__change-btn--cancel" type="submit">X</button>
                            </div>
                        </div>
                    </li>
                <% }); %>
                </ul>
            </div>`
        ).bind(this);
    }

    initialize() {
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'remove', this.render);
        this.listenTo(this.collection, 'update', this.render);
        this.render();
    }
     
    render() {
        this.$el.html(this.template(this.collection.models));
        $('#app').append(this.el);
        return this;
    }
    
    removeTodo(btn) {
        const idTodo = $(btn.target).attr('data-id');  
        this.collection.remove(this.collection.models[idTodo]);
    }

    changeTitle(btn) {
        const idTodoItem = $(btn.target).attr('data-id'); 
        const cidTodoItem = $(btn.target).attr('data-cid'); 
        const inputVal = this.$('.todo-title__input').eq(idTodoItem).val();

        if(!!inputVal) {
            this.hideInputChangeTitleWithBtn(btn);
            setTimeout(() => {
                this.collection.get({cid: cidTodoItem}).title = inputVal;
                this.$el.html(this.template(this.collection.models));                
            }, 300);
        }
    }

    showInputChangeTitleWithBtn(title){
        const idTodoItem = $(title.target).attr('data-id');
        if($('.todo__change-block').eq(idTodoItem).is(':hidden')){
            this.$('.todo__title').eq(idTodoItem).slideUp(300);
            this.$('.todo__change-block').eq(idTodoItem).slideDown(1000);
        }
    }
    
    hideInputChangeTitleWithBtn(btn) {
        let idTodoItem = $(btn.target).attr('data-id');
        if($('.todo__change-block').eq(idTodoItem).is(':visible')){
            this.$('.todo__change-block').eq(idTodoItem).slideToggle(300);
            this.$('.todo__title').eq(idTodoItem).slideDown(1000);
        }
    }
}