var App = React.createClass({
  render: function () {
    return (<div>
        <header>
          <h1> <ReactRouter.Link to='/contacts'> React Contacts </ReactRouter.Link> </h1>
        </header>
        <ReactRouter.RouteHandler /> 
      </div>);
  }
});

var routes = (<ReactRouter.Route handler={App}> 
      <ReactRouter.Route name='contacts' handler={ContactList} />
      <ReactRouter.Route name='contacts/new' handler={NewContactForm} />
      <ReactRouter.Route name='contact' path='contacts/:id' handler={Contact} />
      <ReactRouter.Redirect from='/' to='/contacts' />
    </ReactRouter.Route>);

var ContactStore = Backbone.Collection.extend({
  url: '/api/contacts'
});

var contactstore = new ContactStore();

contactstore.fetch().then(function () {
  ReactRouter.run(routes, ReactRouter.HistoryLocation, function (Handler) {
    React.render(<Handler />, document.getElementById('main')); 
  });
});
