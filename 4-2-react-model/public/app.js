var ContactStore = Backbone.Collection.extend({
  url: '/api/contacts'
});

var contactstore = new ContactStore();

contactstore.fetch().then(function () {
});
