// class NewAppView extends Backbone.View {
//     initialize() {
//         this.render();
//     }

//     render() {
//         this.$el.html('123');
//         $('#newApp').html(this.el);

//         return this;
//     }

//     renderList() {
//         this.collection.each((model) => {
//             const todoListItemView = new todoListItemView({model});

//             this.$('todoListItemsContainer').append(todolistItemView.render().el);
//         });


//     }
// }