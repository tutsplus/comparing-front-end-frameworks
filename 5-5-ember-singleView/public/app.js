var app = Ember.Application.create();

app.ApplicationAdapter = DS.RESTAdapter.extend({
  namespace: 'api'
});

app.Contact = DS.Model.extend({
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  email: DS.attr('string')
});

app.ContactSerializer = DS.RESTSerializer.extend({
  extractArray: function (store, primaryType, payload) {
    payload = { contacts: payload };
    return this._super(store, primaryType, payload);
  },
  extractSingle: function (store, primaryType, payload, recordId) {
    payload = { contact: payload };
    return this._super(store, primaryType, payload, recordId);
  },
  serializeIntoHash: function (hash, type, snapshot, options) {
    var json = this.serialize(snapshot, { includeId: true });
    Object.keys(json).forEach(function (key) {
      hash[key] = json[key];
    });
  }
});

app.Router.reopen({
  location: 'history'
});

app.Router.map(function () {
  this.resource('contacts');
  this.resource('contact', { path: 'contacts/:contact_id' });
  this.route('new', { path: 'contacts/new' });
});

app.IndexRoute = Ember.Route.extend({
  redirect: function () {
    this.transitionTo('contacts');
  }
});

app.ContactsRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('contact');
  }
});

app.ContactController = Ember.Controller.extend({
  actions: {
    update: function () {
      var model = this.get('model');
      model.save();
    },
    delete: function () {
      var model = this.get('model');

      model.deleteRecord();
      model.save();

      this.transitionToRoute('contacts');
    }
  }
});
