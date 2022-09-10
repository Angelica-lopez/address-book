import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import uuid from "react-uuid";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { formatDataToEnglish, formatDataToSpanish } from "../../utils/utils";

const defaultFormDataState = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
};

const errorsDefaultState = {
  firstName: false,
  lastName: false,
  address: false,
  phoneNumber: false,
};

const ClientModal = ({
  selectedClient,
  setClients,
  isModalOpen,
  onCloseModal,
}) => {
  const [formData, setFormData] = useState(defaultFormDataState);
  const [errorsState, setErrorsState] = useState(errorsDefaultState);

  const { firstName, lastName, address, phoneNumber } = formData;

  useEffect(() => {
    const newFormData = selectedClient
      ? formatDataToEnglish(selectedClient)
      : defaultFormDataState;
    setFormData(newFormData);
  }, [selectedClient]);

  useEffect(() => {
    if (!isModalOpen) {
      setFormData(defaultFormDataState);
      setErrorsState(errorsDefaultState);
    }
  }, [isModalOpen]);

  const onUpdateClient = (updatedClient) => {
    setClients((prevClients) =>
      prevClients.map((client) => {
        if (client.id === selectedClient.id) {
          return { ...updatedClient, id: selectedClient.id };
        }
        return client;
      })
    );
  };

  const onCreateClient = (newClient) => {
    setClients((prevClients) => [...prevClients, { ...newClient, id: uuid() }]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if ([!firstName, !lastName, !address, !phoneNumber].includes(true)) {
      setErrorsState({
        firstName: !firstName,
        lastName: !lastName,
        address: !address,
        phoneNumber: !phoneNumber,
      });
      return;
    }

    const formattedData = formatDataToSpanish(formData);
    if (selectedClient) {
      onUpdateClient(formattedData);
    } else {
      onCreateClient(formattedData);
    }
    onCloseModal();
    setFormData(defaultFormDataState);
  };

  const onChange = ({ target: { value, id } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrorsState((prevData) => ({
      ...prevData,
      [id]: !value,
    }));
  };

  return (
    <Modal show={isModalOpen} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {selectedClient ? "Actualizar Cliente" : "Crear Cliente"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <div className="row mb-3">
            <div className="col">
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  type="text"
                  onChange={onChange}
                  value={firstName}
                  isInvalid={errorsState.firstName}
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  type="text"
                  onChange={onChange}
                  value={lastName}
                  isInvalid={errorsState.lastName}
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
                  onChange={onChange}
                  value={address}
                  isInvalid={errorsState.address}
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3" controlId="phoneNumber">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  onChange={onChange}
                  value={phoneNumber}
                  isInvalid={errorsState.phoneNumber}
                />
              </Form.Group>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" type="button" onClick={onCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit">
            {selectedClient ? "Actualizar" : "Crear"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

ClientModal.propTypes = {
  selectedClient: PropTypes.shape({
    id: PropTypes.string,
    nombre: PropTypes.string,
    apellido: PropTypes.string,
    direccion: PropTypes.string,
    telefono: PropTypes.string,
  }),
  setClients: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

ClientModal.defaultProps = {
  selectedClient: null,
};

export default ClientModal;