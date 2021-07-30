const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const button = document.getElementById('button');
const storage = window.localStorage;

firstName.placeholder = storage.getItem('first-name');
lastName.placeholder = storage.getItem('last-name');
email.placeholder = storage.getItem('email');

button.addEventListener('click', function() {
    const myArray = [firstName, lastName, email, password];
    let key = 'first-name';
    let num = 1;
    
    myArray.forEach((i) => {
        if (num === 1) {
            key = 'first-name';
        } else if (num === 2) {
            key = 'last-name';
        } else if (num === 3) {
            key = 'email';
        } else if (num === 4) {
            key = 'password'
        };

        if (i.value !== '') {
            storage.setItem(key, i.value);
            num += 1;
        } else {
            num += 1;
        };
    });

    firstName.value = '';
    lastName.value = '';
    email.value = '';
    password.value = '';

    firstName.placeholder = storage.getItem('first-name');
    lastName.placeholder = storage.getItem('last-name');
    email.placeholder = storage.getItem('email');
});