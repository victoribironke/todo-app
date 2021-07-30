const textInput = document.getElementById('text-input');
const tasksContainer = document.getElementById('container');
const counter = document.getElementById('counter');
const welcome = document.getElementById('welcome');
const clearButton = document.getElementById('clear');
const storage = window.localStorage;
const tasks = [];
let num = 0;

const getName = storage.getItem('first-name');
welcome.innerText = 'Welcome, ' + getName;

textInput.addEventListener('click', function() {
    counter.innerText = num + ' Tasks Left';
    textInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            if (textInput.value == '') {
                console.log('Enter a Valid Task!');
            } else {
                tasks.push(textInput.value);
                const save = JSON.stringify(tasks);
                storage.setItem('Tasks', save);
                addNewTasks();
                addToCounter();
            };
        };
    });
});

clearButton.addEventListener('click', function() {
    tasksContainer.innerHTML = '';
    num = 0;
    counter.innerText = num + ' Tasks Left';
    const get = JSON.parse(storage.getItem('Tasks'));
    get.splice(0, get.length);
    const save = JSON.stringify(get);
    storage.setItem('Tasks', save);
});

function addToCounter() {
    textInput.value = '';
    num += 1;
    counter.innerText = num + ' Tasks Left';  
};

function addNewTasks() {
    const container = document.createElement('div');
    const check = document.createElement('input');
    const task = document.createElement('p');
    const removeOne = document.createElement('div');
    const removeTwo = document.createElement('div');
    const remove = document.createElement('div');

    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.width = '100%';
    container.style.height = '30px';
    container.classList.add('tasks');
    
    check.style.width = '20px';
    check.style.height = '20px';
    check.style.position = 'absolute';
    check.style.left = '15px';
    check.style.cursor = 'pointer'; 
    check.type = 'checkbox';

    task.innerText = textInput.value;
    task.style.color = 'white';
    task.style.position = 'absolute';
    task.style.left = '50px';

    removeOne.style.width = '20px';
    removeOne.style.height = '2px';
    removeOne.style.background = 'grey';
    removeOne.style.transform = 'rotate(45deg)';
    removeOne.style.position = 'absolute';
    removeOne.style.right = '15px';

    removeTwo.style.width = '20px';
    removeTwo.style.height = '2px';
    removeTwo.style.background = 'grey';
    removeTwo.style.transform = 'rotate(-45deg)';
    removeTwo.style.position = 'absolute';
    removeTwo.style.right = '15px';

    remove.style.width = '20px';
    remove.style.height = '20px';
    remove.style.position = 'absolute';
    remove.style.right = '15px';
    remove.style.cursor = 'pointer';

    container.appendChild(check);
    container.appendChild(task);
    container.appendChild(removeOne);
    container.appendChild(removeTwo);
    container.appendChild(remove);
    tasksContainer.appendChild(container);

    remove.addEventListener('click', function() {
        container.remove(container);
        if (check.checked === true) {
            counter.innerText = num + ' Tasks Left';
        } else {
            num -= 1;
            counter.innerText = num + ' Tasks Left';
        }
    });

    check.addEventListener('click', function() {
        if (check.checked === true) {
            task.style.textDecoration = 'line-through';
            num -= 1;
            counter.innerText = num + ' Tasks Left';
        } else {
            task.style.textDecoration = 'none';
            num += 1;
            counter.innerText = num + ' Tasks Left';
        }
    });
};

function addExistingTasks(value) {
    const container = document.createElement('div');
    const check = document.createElement('input');
    const task = document.createElement('p');
    const removeOne = document.createElement('div');
    const removeTwo = document.createElement('div');
    const remove = document.createElement('div');

    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';
    container.style.width = '100%';
    container.style.height = '30px';
    container.classList.add('tasks');
    
    check.style.width = '20px';
    check.style.height = '20px';
    check.style.position = 'absolute';
    check.style.left = '15px';
    check.style.cursor = 'pointer'; 
    check.type = 'checkbox';

    task.innerText = value;
    task.style.color = 'white';
    task.style.position = 'absolute';
    task.style.left = '50px';

    removeOne.style.width = '20px';
    removeOne.style.height = '2px';
    removeOne.style.background = 'grey';
    removeOne.style.transform = 'rotate(45deg)';
    removeOne.style.position = 'absolute';
    removeOne.style.right = '15px';

    removeTwo.style.width = '20px';
    removeTwo.style.height = '2px';
    removeTwo.style.background = 'grey';
    removeTwo.style.transform = 'rotate(-45deg)';
    removeTwo.style.position = 'absolute';
    removeTwo.style.right = '15px';

    remove.style.width = '20px';
    remove.style.height = '20px';
    remove.style.position = 'absolute';
    remove.style.right = '15px';
    remove.style.cursor = 'pointer';

    container.appendChild(check);
    container.appendChild(task);
    container.appendChild(removeOne);
    container.appendChild(removeTwo);
    container.appendChild(remove);
    tasksContainer.appendChild(container);

    remove.addEventListener('click', function() {
        container.remove(container);
        if (check.checked === true) {
            counter.innerText = num + ' Tasks Left';
        } else {
            num -= 1;
            counter.innerText = num + ' Tasks Left';
        }
    });

    check.addEventListener('click', function() {
        const get = JSON.parse(storage.getItem('Tasks'));
        if (check.checked === true) {
            task.style.textDecoration = 'line-through';
            num -= 1;
            counter.innerText = num + ' Tasks Left';
        } else {
            task.style.textDecoration = 'none';
            num += 1;
            counter.innerText = num + ' Tasks Left';
        };
    });
};

function getTasks() {
    const get = storage.getItem('Tasks');
    if (get !== null) {
        const parsed = JSON.parse(get);
        for (let i in parsed) {
            addExistingTasks(parsed[i]);
        };
        num = parsed.length;
        counter.innerText = num + ' Tasks Left';
    };
};

