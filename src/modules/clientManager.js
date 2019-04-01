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

// export default {
//   get(id) {
//     return fetch(`${remoteURL}/animals/${id}`).then(e => e.json())
//   },
//   getAll: () => {
//     return fetch("http://localhost:5002/animals").then(animals =>
//       animals.json())
//   },
//   put(editedAnimal) {
//   return fetch(`${remoteURL}/animals/${editedAnimal.id}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(editedAnimal)
//         }).then(data => data.json())
//       }
//     ,
//   getOne: (id) =>
//     fetch(`${remoteURL}/animals/${id}`)
//       .then(animal => animal.json()
//       ),

//   deleteAnimal: id => {
//     return fetch(`http://localhost:5002/animals/${id}`, {
//       method: "DELETE"
//     })
//       .then(() => fetch(`http://localhost:5002/animals`))
//       .then(e => e.json());
//   },
//   postAnimal(newAnimal) {
//     return fetch(`${remoteURL}/animals`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(newAnimal)
//     }).then(data => data.json())
//   }
// };