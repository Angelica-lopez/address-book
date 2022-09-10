import { useState, useEffect} from "react";
import {Form, Button, Modal, ModalFooter, ModalHeader} from "react-bootstrap";
import PropTypes from "prop-types"; 



const ClientModal = ({ isModalOpen, onCloseModal }) => {
    return (
        <Modal show={isModalOpen} onHide={onCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Crear Cliente
                </Modal.Title>
            </Modal.Header>  
                <Form>
                <Modal.Body>
                    <div className="row mb-3">
                        <div className="col">
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>Nombres</Form.Label>
                                <Form.Control
                                    type="text"
                                />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control
                                    type="text"
                                />
                            </Form.Group>
                        </div>
                        </div>
                        <div className="row">
                        <div className="col">
                            <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                    type="text"
                                />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group className="mb-3" controlId="phoneNumber">
                                <Form.Label>Teléfono</Form.Label>
                                <Form.Control
                                    type="text"
                                />
                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>
                <ModalFooter>
                    <Button variant="secondary" type="button" >Cerrar</Button>
                    <Button variant="primary" type="submit" >Crear</Button>
                </ModalFooter>
                </Form>
        </Modal>
    )
}

ClientModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}

export default ClientModal;