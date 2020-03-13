const isAuthenticated = () => {
    return sessionStorage.getItem("hivemind_token") !== null
}
const register = (userInfo) => {
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
            if ("token" in res) {
                sessionStorage.setItem("hivemind_token", res.token)
            }
        })
}

const login = (credentials) => {
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
            if ("valid" in res && res.valid && "token" in res) {
                sessionStorage.setItem("hivemind_token", res.token)
            } else {
                alert('Username or password is incorrect.')
            }
        })
}

// Note! This is not an async method. Don't make the mistake of doing logout().then()
const logout = () => {
    sessionStorage.removeItem("hivemind_token")
}

export { isAuthenticated, login, register, logout }