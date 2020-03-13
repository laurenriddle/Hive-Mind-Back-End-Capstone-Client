const remoteURL = "http://localhost:8000"

export default {
  getAll(table) {
    // gets all items from a table
    return fetch(`${remoteURL}/${table}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        //   Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
        }
      }).then(result => result.json());
  },
  getOne(table, id) {
    // gets one item from a table
    return fetch(`${remoteURL}/${table}/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
        }
      }).then(result => result.json());
  },
  delete(table, id) {
    // deltes one item from a table
    return fetch(`${remoteURL}/${table}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
        }
      }).then(result => result.json());
  },
  post(table, newItem) {
    // creates one item in a table
    return fetch(`${remoteURL}/${table}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
        },
        body: JSON.stringify(newItem)
      }).then(data => data.json());
  },
  update(route, editedItem) {
    // updates one item in a table
    return fetch(`${remoteURL}/${route}/${editedItem.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
        },
        body: JSON.stringify(editedItem)
      }).then(data => data.json());
  },
  profile_update(route, editedItem) {
    // updates the user information in the applicant table
    return fetch(`${remoteURL}/${route}/profile_update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${sessionStorage.getItem("bangazon_token")}`
      },
      body: JSON.stringify(editedItem)
    }).then(data => data.json());
    
  }
}