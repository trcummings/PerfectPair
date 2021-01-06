import React from "react";
import createClass from "create-react-class";
import Modal from "react-modal";

import BasicInfoEditForm from "../forms/BasicInfoEditForm";

import HelperUtil from "../../../util/helperUtil";

var modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.60)",
  },
  content: {
    align: "center",
    display: "block",
    position: "relative",
    width: "270px",
    height: "400px",
    top: "80px",
    marginBottom: "60px",
    marginLeft: "-155px",
    fontSize: "13px",
    textAlign: "center",
    left: "50%",
    padding: "10px",
    background: "#fff",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "8px",
    outline: "none",
  },
};

var BasicInfoEditModal = createClass({
  getInitialState: function () {
    Modal.setAppElement(document.body);

    return {
      modalOpen: false,
    };
  },

  closeModal: function () {
    this.setState({ modalOpen: false });
  },

  openModal: function () {
    this.setState({ modalOpen: true });
  },

  render: function () {
    var currentUser = this.props.user;

    return (
      <div id="basic-information" onClick={this.openModal}>
        <h1 id="user-name">{currentUser.username}</h1>
        <ul>
          <li>{currentUser.location}</li>
          <li>{currentUser.age} </li>
          <li>{currentUser.gender}</li>
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </ul>

        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={this.closeModal}
          style={modalStyle}
          ref="popup"
        >
          <BasicInfoEditForm closeModal={this.closeModal} />
        </Modal>
      </div>
    );
  },
});

export default BasicInfoEditModal;
