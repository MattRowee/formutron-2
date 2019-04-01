const remoteURL = "http://localhost:5002"

export default {
  getNote(id) {
    return fetch(`${remoteURL}/notes/${id}`).then(e => e.json())
  },
  getAll: () => {
    return fetch("http://localhost:5002/notes").then(notes =>
      notes.json()
    );
  },
  getById: id =>
    fetch(`http://localhost:5002/notes/${id}`).then(e => e.json()),
//   getByEmail: email =>
//     fetch(`http://localhost:5002/employees?email=${email}`).then(e => e.json()),
  deleteNote: id => {
    return fetch(`http://localhost:5002/notes/${id}`, {
      method: "DELETE"
    })
      .then(() => fetch(`http://localhost:5002/notes`))
      .then(e => e.json());
  },
  postNote(newNote) {
    return fetch(`${remoteURL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newNote)
    }).then(data => data.json())
  }
};