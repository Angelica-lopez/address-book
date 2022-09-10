const CLIENTS = "clients";

export const getClientsFromLocalStorage = () => {
    const clients = localStorage.getItem(CLIENTS);
    return clients ? JSON.parse(clients) : [];
};

export const updateClientsFromLocalStorage = (clients = []) => {
    localStorage.setItem(CLIENTS, JSON.stringify(clients));
}