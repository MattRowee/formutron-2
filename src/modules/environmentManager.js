const remoteURL = "http://localhost:5002"

export default {
  getEnvironment(id) {
    return fetch(`${remoteURL}/notes/${id}`).then(e => e.json())
  },
  getAll: () => {
    return fetch("http://localhost:5002/environment").then(notes =>
      notes.json()
    );
  },
  getById: id =>
    fetch(`http://localhost:5002/environment/${id}`).then(e => e.json()),}