const email = document.getElementById('email');
const password = document.getElementById('password');
const button = document.getElementById('button');
const storage = window.localStorage;
const getEmail = storage.getItem('email');
const getPassword = storage.getItem('password');

button.addEventListener('click', function() {
    if (getEmail !== email.value) {
        alert('Incorrect Email and Password.');
        email.value = '';
        password.value = '';
    } else if (getPassword !== password.value) {
        alert('Incorrect Email and Password.');
        email.value = '';
        password.value = '';
    } else {
        button.innerHTML = '<a href="../Dashboard/index.html">Log In</a>';
    };
});
