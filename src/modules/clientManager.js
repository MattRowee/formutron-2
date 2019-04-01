const remoteURL = "http://localhost:5002"

export default {
  getClient(id) {
    return fetch(`${remoteURL}/clients/${id}`).then(e => e.json())
  },
  getAll: () => {
    return fetch("http://localhost:5002/clients").then(clients =>
      clients.json()
    );
  },
  getById: id =>
    fetch(`http://localhost:5002/clients/${id}`).then(e => e.json()),
  getByEmail: email =>
    fetch(`http://localhost:5002/clients?email=${email}`).then(e => e.json()),
  deleteClient: id => {
    return fetch(`http://localhost:5002/clients/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:5002/clients`))
      .then(e => e.json());
  },
  postClient(newClient) {
    return fetch(`${remoteURL}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newClient)
    }).then(data => data.json())
  }
};