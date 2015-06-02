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
