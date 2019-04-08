const remoteURL = "http://localhost:5002"

export default {
  getTherapy(id) {
    return fetch(`${remoteURL}/notes/${id}`).then(e => e.json())
  },
  getAll: () => {
    return fetch("http://localhost:5002/therapy").then(notes =>
      notes.json()
    );
  },
  getById: id =>
    fetch(`http://localhost:5002/therapy/${id}`).then(e => e.json()),}