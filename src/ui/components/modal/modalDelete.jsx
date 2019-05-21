import React, { Component } from 'react';

import { Modal, Button } from 'react-bootstrap'

class ModalDelete extends Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Modal show={true} onHide={this.props.modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{this.props.message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.modalClose}>Não</Button>
                    <Button variant="danger" onClick={this.props.modalConfirm}>Sim</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalDelete;