// Purpose: To house all functions relating to Authentication (isAuthenticated, Register, Logout, Login)

const isAuthenticated = () => {
    // checks session storage to see if there is a token
    return sessionStorage.getItem("hivemind_token") !== null
}
const register = (userInfo) => {
// makes a POST to the django auth_user table a creates a new user and applicant
    return fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(userInfo)
    })
        .then(res => res.json())
        .then(res => {
            // is there is a token in the response, set it in session storage
            if ("token" in res) {
                sessionStorage.setItem("hivemind_token", res.token)
            }
        })
}

const login = (credentials) => {
// makes a POST to log the user in 

    return fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(credentials)
    })
        .then(res => res.json())
        .then(res => {
            // if a valid token is returned, set it in session storage
            if ("valid" in res && res.valid && "token" in res) {
                sessionStorage.setItem("hivemind_token", res.token)
            } else {
            // otherwise, alert the user that they put the wrong username or password
                alert('Username or password is incorrect.')
            }
        })
}

const logout = () => {
    // removes the token from session storage
    sessionStorage.removeItem("hivemind_token")
}

export { isAuthenticated, login, register, logout }