// Purpose: To house all fetch call functions that will communicate with the DB

const remoteURL = "http://localhost:8000"

export default {
    getAllNotAuth(table) {
        // gets (GET) all items from a table if the user is not authenticated (i.e. not passing the token)
        return fetch(`${remoteURL}/${table}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(result => result.json());
    },
    getAllAuth(table) {
        // gets (GET) all items from a table if the user is authenticated (i.e. passing the token)
        return fetch(`${remoteURL}/${table}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
            }
        }).then(result => result.json());
    },
    getOne(table, id) {
        // gets (GET) one item from a table (must be authenticated)
        return fetch(`${remoteURL}/${table}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
            }
        }).then(result => result.json());
    },
    delete(table, id) {
        // deletes (DELETE) one item from a table (must be authenticated)
        return fetch(`${remoteURL}/${table}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
            }
        })
    },
    post(table, newItem) {
        // creates (POST) one item in a table (must be authenticated)
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
        // updates (PUT) one item in a table (must be authenticated)
        return fetch(`${remoteURL}/${route}/${editedItem.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
            },
            body: JSON.stringify(editedItem)
        })
    },
    update_profile(route, editedItem) {
        // updates (PUT) the user information in the applicant table (must be authenticated)
        return fetch(`${remoteURL}/${route}/profile_update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Token ${sessionStorage.getItem("hivemind_token")}`
            },
            body: JSON.stringify(editedItem)
        })

    }
}