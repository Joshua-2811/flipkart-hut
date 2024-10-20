document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Basic validation
    if (email && password) {
        alert(`Logging in with:\nEmail: ${email}\nPassword: ${password}`);
        // Add your login logic here (e.g., API call)
    } else {
        alert('Please fill in all fields.');
    }
});