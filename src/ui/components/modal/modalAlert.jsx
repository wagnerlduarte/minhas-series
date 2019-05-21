import React, { Component } from 'react';

import { Modal, Button } from 'react-bootstrap'

class ModalAlert extends Component {

    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <Modal show={this.props.modalShow} onHide={this.props.modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{this.props.message}</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.modalClose}>Fechar</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalAlert;