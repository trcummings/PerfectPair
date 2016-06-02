var React = require('react');
var ClientActions = require('../../actions/clientActions');
var SessionStore = require('../../stores/sessionStore');
var HelperUtil = require('../../util/helperUtil');
var BasicInfoEditModal = require('./modals/basicInfoEditModal');
var ProfileAboutTab = require('./profileAboutTab');

var Tabs = ({
  0: function () {
    return (<ProfileAboutTab />);
  },
  1:function () {
    // return (<ProfilePicturesTab />);
    return (<div />);
  },
  2:function () {
    // return (<ProfileQuestionsTab />);
    return (<div />);
  },
});

var ProfileMain = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      selectedTab: 0
    };
  },

  selectTab: function (event) {
    event.preventDefault();

    this.setState({selectedTab: event.target.value});
  },

  renderTab: function () {
    return Tabs[this.state.selectedTab]();
  },

  render: function () {
    var currentUser = SessionStore.currentUser();
    // var pane = this.props.panes[this.state.selectedTab];

    // photo is 215x200

    if (currentUser) {
      return (
        <div id='profile-main'>
          <div id='tabbed-heading'>
            <div id='profile-thumbs' className='group'>

            </div>

            <ul className='page-tabs'>
              <li
                value={0}
                onClick={this.selectTab}
                >
                About
              </li>

              <li
                value={1}
                onClick={this.selectTab}
                >
                Photos
              </li>
              <li
                value={2}
                onClick={this.selectTab}
                >
                Questions
              </li>
            </ul>

            <div id='basic-information'>
              <h1 id='user-name'>{currentUser.username}</h1>

                <BasicInfoEditModal user={currentUser}/>
            </div>
          </div>


          <div className='profile-monolith'>
            <div id='main-column'>
              {this.renderTab()}
            </div>

            <div id='right-column'>
              <div id='looking-for'>
                looking for
              </div>

              <div id='details'>
                my details
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          scoobert doobert!
          you shouldn't be here!
        </div>
      );
    }
  }
});

module.exports = ProfileMain;
