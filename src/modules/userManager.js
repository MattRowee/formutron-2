const remoteURL = "http://localhost:5002"

export default {
  getUser(id) {
    return fetch(`${remoteURL}/users/${id}`).then(e => e.json())
  },
  getAll: () => {
    return fetch("http://localhost:5002/users").then(users =>
      users.json()
    );
  },
  getById: id =>
    fetch(`http://localhost:5002/users/${id}`).then(e => e.json()),
  getByEmail: email =>
    fetch(`http://localhost:5002/users?email=${email}`).then(e => e.json()),
  deleteUser: id => {
    return fetch(`http://localhost:5002/users/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:5002/users`))
      .then(e => e.json());
  },
  postUser(newuser) {
    return fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newuser)
    }).then(data => data.json())
  }
};