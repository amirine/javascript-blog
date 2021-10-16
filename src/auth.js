export function getAuthForm() {
    // Function returning auth form for the modal window
    return `
    <form class="mui-form auth-form-modal" id="auth-form">
        <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email-input">
            <label for="email-input">Email</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password-input">
            <label for="password-input">Password</label>
        </div>
        <button type="submit"
                class="mui-btn mui-btn--raised mui-btn--danger"
                id="auth-form-btn"
        >Log in</button>
    </form>
    `
}

export function authWithEmailPassword(email, password) {
    // Function for authorization with email and password
    const apiKey = 'AIzaSyDnzlRQCWL9bzcrKABWJq39S1x9JPPYmyE'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
        method: 'POST',
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data.idToken);
}
