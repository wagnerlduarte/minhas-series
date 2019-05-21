import React, { Component } from 'react'

import ModalAlert from './modalAlert'
import ModalConfirm from './modalConfirm'
import ModalDelete from './modalDelete'

const modalTypes = {
    alert: 'alert',
    confirm: 'confirm',
    delete: 'delete'
}

const modalComponents = {
    alert: ModalAlert,
    confirm: ModalConfirm,
    delete: ModalDelete
}

class RootModal extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const SpecifiedModal = modalComponents[this.props.modalType]

        return (
            <SpecifiedModal {...this.props} />
        );
    }
}

export { RootModal, modalTypes }