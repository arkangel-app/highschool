import React, { Component } from "react";
import { Row, Col, Icon, Modal, Button, Menu } from 'antd';

class ModalToggle extends React.Component {
  state = {
    visible: false
  };
  toggleModal = () => {
    this.setState(prevState => ({ visible: !prevState.visible }));
  }
  render() {
    const Modal = this.props.modal;
    return (
      <div>
        <div onClick={this.toggleModal}>{this.props.label}</div>
        <Modal
          visible={this.state.visible}
          toggleVisibility={this.toggleModal}
        />
      </div>
    );
  }
}
export default ModalToggle;
