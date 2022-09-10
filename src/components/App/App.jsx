import { useState, useEffect} from "react";
import {Table, Button} from "react-bootstrap";
import ClientModal from "../ClientModal/ClientModal";

const clients = [
    {
        id: 0,
        nombre: 'Bigotes',
        apellido: 'López',
        telefono: 3043753430,
        direccion: 'cra 14 # 47 A 100'
    },
    {
        id: 1,
        nombre: 'Yatin',
        apellido: 'Monroy',
        telefono: 3012413046,
        direccion: 'cra 51 # 82-255'
    }
];


const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Clientes</h1>
                <Button variant='primary' onClick={openModal}>
                    Crear Cliente</Button>
            </div>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Teléfonos</th>
                        <th scope="col">Direcciones</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.nombre}</td>
                            <td>{client.apellido}</td>
                            <td>{client.telefono}</td>
                            <td>{client.direccion}</td>
                            <td>
                                <div className="d-flex">
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        >
                                            Editar
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                    >
                                    Eliminar 
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ClientModal 
                isModalOpen={isModalOpen}
                onCloseModal={() => setIsModalOpen(false)}
            />
        </div>
        
    )
}

export default App