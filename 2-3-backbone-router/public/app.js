var Contact = Backbone.Model.extend({});

var Contacts = Backbone.Collection.extend({
  model: Contact,
  url: '/api/contacts'
});

var Router = Backbone.Router.extend({
  initialize: function (options) {
    this.contacts = options.contacts; 
  },
  routes: {
    '': 'main',
    'contacts': 'displayList',
    'contacts/new': 'displayForm',
    'contacts/:id': 'displaySingle'
  },
  main: function () {
    Backbone.history.navigate('contacts', { trigger: true });
  },
  displayList: function () {
    console.log(this.contacts.pluck('firstName'));
  },
  displayForm: function () {
    console.log('form');
  },
  displaySingle: function (id) {
    console.log(this.contacts.get(parseInt(id)).toJSON());
  }
});

var contacts = new Contacts();

contacts.fetch().then(function () {
  var r = new Router({
    contacts: contacts 
  });
  Backbone.history.start({ pushState: true });
});
