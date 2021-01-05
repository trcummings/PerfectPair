var React = require("react"),
  UserStore = require("../../stores/userStore"),
  ClientActions = require("../../actions/clientActions"),
  MatchesIndexItem = require("./matchesIndexItem"),
  SessionStore = require("../../stores/sessionStore"),
  MessageBox = require("../messages/messageBox");

var MatchesIndex = React.createClass({
  getInitialState: function () {
    return { allMatches: UserStore.allUsers() };
  },

  componentDidMount: function () {
    this.userListener = UserStore.addListener(
      function () {
        this.setState({ allMatches: UserStore.allUsers() });
      }.bind(this)
    );

    ClientActions.fetchAllPossibleMatches();
  },

  componentWillUnmount: function () {
    this.userListener.remove();
  },

  handleSortByChange: function () {
    // don't even do shit yet
  },

  render: function () {
    var matches = this.state.allMatches;

    return (
      <div id="match-index">
        <div id="match-monolith">
          <div id="match-results">
            {matches.map(function (match, index) {
              return (
                <MatchesIndexItem
                  id="match-index-item"
                  key={index}
                  user={match}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  },
});

module.exports = MatchesIndex;
