var ContactList = React.createClass({
  getInitialState: function () {
    return {
      contacts: contactstore
    };
  },
  render: function () {
    var items = this.state.contacts.map(function (contact) {
      return (<ContactListItem key={contact.get('id')} contact={contact} />);
    });

    return (<div>
        <div className='actions'>
          <ReactRouter.Link to='/contacts/new'> New Contact </ReactRouter.Link>
        </div>
        <ul> {items} </ul>
      </div>);

  }
});

var ContactListItem = React.createClass({
  render: function () {
    var c = this.props.contact.toJSON();

    return (<li>
        <ReactRouter.Link to={'/contacts/' + c.id}>
          {c.firstName} {c.lastName}
          <span className='email'> {c.email} </span>
        </ReactRouter.Link>
      </li>);
  
  }
});

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
