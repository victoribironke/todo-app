const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const check = document.getElementById('check');
const button = document.getElementById('button');
const storage = window.localStorage;

button.addEventListener('click', function() {
    if (firstName.value === '') {
        alert('Please fill in the fields');
    } else if (lastName.value === '') {
        alert('Please fill in the fields');
    } else if (email.value === '') {
        alert('Please fill in the fields');
    } else if (password.value === '') {
        alert('Please fill in the fields');
    } else if (check.checked === false) {
        alert('Please agree to the terms of use.');
    } else {
        storage.setItem('first-name', firstName.value);
        storage.setItem('last-name', lastName.value);
        storage.setItem('email', email.value);
        storage.setItem('password', password.value);
        button.innerHTML = '<a href="../Dashboard/index.html">Sign Up</a>';
    }
});
