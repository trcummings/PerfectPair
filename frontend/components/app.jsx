var React = require("react");
var AuthMain = require("./auth/authMain");
var SessionStore = require("../stores/sessionStore");
var ClientActions = require("../actions/clientActions");
var Header = require("./header");
var Footer = require("./footer");

var App = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
  },

  getInitialState: function () {
    return { currentUser: SessionStore.currentUser() };
  },

  componentDidMount: function () {
    this.listener = SessionStore.addListener(
      function () {
        this.checkForCurrentUser();
      }.bind(this)
    );

    if (this.state.currentUser) {
      this.context.router.push("/matches");
    }
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  checkForCurrentUser: function () {
    var currentUser = SessionStore.currentUser();

    if (currentUser) {
      this.setState({ currentUser: currentUser });
    }
  },

  welcome: function () {
    if (SessionStore.isUserLoggedIn()) {
      return (
        <div>
          <Header />
          <div className="main-div">{this.props.children}</div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <AuthMain />
          <footer id="auth-main-footer"></footer>
        </div>
      );
    }
  },

  handleClick: function (event) {
    event.preventDefault();

    ClientActions.logout(
      function () {
        this.context.router.push("/");
      }.bind(this)
    );
  },

  render: function () {
    return <div>{this.welcome()}</div>;
  },
});

module.exports = App;
