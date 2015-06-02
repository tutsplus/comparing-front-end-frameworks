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

var Contact = React.createClass({
  contextTypes: {
    router: React.PropTypes.func 
  },
  getInitialState: function () {
    var id = parseInt(this.context.router.getCurrentParams().id, 10);

    return {
      contact: contactstore.get(id) 
    } 
  },
  update: function () {
    this.state.contact.save({
      firstName: React.findDOMNode(this.refs.firstName).value,
      lastName: React.findDOMNode(this.refs.lastName).value,
      email: React.findDOMNode(this.refs.email).value
    }).then(function () {
      this.setState({
        contact: this.state.contact 
      }); 
    }.bind(this));
  },
  delete: function () {
    this.state.contact.destroy().then(function () {
      this.context.router.transitionTo('/contacts');
    }.bind(this));
  },
  render: function () {

    var c = this.state.contact.toJSON();

    return (<div>
        <h2> {c.firstName} {c.lastName} </h2>
        <p> <label> First Name: </label> <input ref='firstName' defaultValue={c.firstName} /> </p>
        <p> <label> Last Name: </label> <input ref='lastName' defaultValue={c.lastName} /> </p>
        <p> <label> Email: </label> <input ref='email' defaultValue={c.email} /> </p>
        <p>
          <button onClick={this.update}> Update </button>
          <button onClick={this.delete}> Delete </button>
        </p>
      </div>);
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
