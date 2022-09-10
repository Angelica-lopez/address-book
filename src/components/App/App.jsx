import { useState, useEffect } from "react";
import { getClients } from "../../api";
import {
  getClientsFromLocalStorage,
  updateClientsFromLocalStorage,
} from "../../utils/localStorage";
import ClientModal from "../ClientModal";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clients, setClients] = useState(getClientsFromLocalStorage());
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getClients()
      .then((res) => {
        if (!clients.length) setClients(res);
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateClientsFromLocalStorage(clients);
  }, [clients]);

  useEffect(() => {
    if (!isModalOpen) setSelectedClient(null);
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);

  const onRemoveClient = (clientId) => {
    const updatedClients = clients.filter(({ id }) => id !== clientId);
    setClients(updatedClients);
  };

  if (isLoading)
    return (
      <div className="p-4 d-flex align-items-center justify-content-center vh-100">
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Clientes</h1>
          <Button variant="primary" onClick={openModal}>
            Crear Cliente
          </Button>
        </div>
        {!clients.length ? (
          <p>Aun no tienes clientes registrados.</p>
        ) : (
          <Table striped bordered>
            <thead>
              <tr>
                <th scope="col">Nombres</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Dirección</th>
                <th scope="col">Telefono</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.nombre}</td>
                  <td>{client.apellido}</td>
                  <td>{client.direccion}</td>
                  <td>{client.telefono}</td>
                  <td>
                    <div className="d-flex">
                      <Button
                        onClick={() => {
                          setSelectedClient(client);
                          openModal(true);
                        }}
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onRemoveClient(client.id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <ClientModal
        selectedClient={selectedClient}
        setClients={setClients}
        isModalOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default App;