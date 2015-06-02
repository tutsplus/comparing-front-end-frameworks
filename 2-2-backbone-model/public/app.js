var Contact = Backbone.Model.extend({});

var Contacts = Backbone.Collection.extend({
  model: Contact,
  url: '/api/contacts'
});


var contacts = new Contacts();

contacts.fetch().then(function () {


});
