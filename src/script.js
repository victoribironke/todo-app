"use strict";
const tasksDiv = document.querySelector(".tasks-div");
const taskInput = document.querySelector(".input");
const headerImg = document.querySelector("header img");
const filters = document.querySelectorAll(".filters p");
const root = document.querySelector(":root");
const themeIcon = document.querySelector(".theme-icon");
const storage = window.localStorage;
let isDarkTheme = true;
const observer = new ResizeObserver((entries) => {
    if (entries[0].contentRect.width < 450) {
        headerImg
            ? isDarkTheme
                ? (headerImg.src = "./images/bg-mobile-dark.jpg")
                : (headerImg.src = "./images/bg-mobile-light.jpg")
            : null;
    }
    else if (entries[0].contentRect.width >= 450) {
        headerImg
            ? isDarkTheme
                ? (headerImg.src = "./images/bg-desktop-dark.jpg")
                : (headerImg.src = "./images/bg-desktop-light.jpg")
            : null;
    }
});
if (headerImg) {
    observer.observe(headerImg);
}
const userTasks = storage.getItem("tasks");
let taskList = userTasks !== null ? JSON.parse(userTasks) : [];
const addListeners = () => {
    var _a;
    const checks = document.querySelectorAll(".check");
    const crosses = document.querySelectorAll(".cross-icon");
    let isChecked;
    checks.forEach((check) => {
        check.addEventListener("click", () => {
            var _a, _b, _c, _d;
            isChecked = check.children[0].id === "checked";
            if (isChecked) {
                check.children[0].id = "";
                check.id = "";
                if ((_a = check.parentElement) === null || _a === void 0 ? void 0 : _a.children[1]) {
                    check.parentElement.children[1].id = "";
                }
                const newTaskList = [];
                for (let i = 0; i < taskList.length; i++) {
                    taskList[i].task === ((_b = check.parentElement) === null || _b === void 0 ? void 0 : _b.children[1].textContent)
                        ? newTaskList.push({
                            done: false,
                            task: taskList[i].task,
                        })
                        : newTaskList.push(taskList[i]);
                }
                taskList = newTaskList;
                storage.setItem("tasks", JSON.stringify(taskList));
            }
            else {
                check.children[0].id = "checked";
                check.id = "change";
                if ((_c = check.parentElement) === null || _c === void 0 ? void 0 : _c.children[1]) {
                    check.parentElement.children[1].id = "done";
                }
                const newTaskList = [];
                for (let i = 0; i < taskList.length; i++) {
                    taskList[i].task === ((_d = check.parentElement) === null || _d === void 0 ? void 0 : _d.children[1].textContent)
                        ? newTaskList.push({
                            done: true,
                            task: taskList[i].task,
                        })
                        : newTaskList.push(taskList[i]);
                }
                taskList = newTaskList;
                storage.setItem("tasks", JSON.stringify(taskList));
            }
            updateTasks(taskList);
        });
    });
    crosses.forEach((cross) => cross.addEventListener("click", () => {
        var _a;
        const newTaskList = [];
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].task !== ((_a = cross.parentElement) === null || _a === void 0 ? void 0 : _a.children[1].textContent)) {
                newTaskList.push(taskList[i]);
            }
        }
        taskList = newTaskList;
        createTasks(taskList);
    }));
    (_a = document.querySelector(".clear")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        taskList = taskList.filter((task) => !task.done);
        createTasks(taskList);
    });
};
const createTasks = (tasks) => {
    if (tasksDiv) {
        tasksDiv.innerHTML = "";
        tasks.forEach((task) => {
            const isChecked = task.done === true;
            tasksDiv.innerHTML += `<div class="task"><div class="check" id="${isChecked ? "change" : ""}"><img class="check-icon" id="${isChecked ? "checked" : ""}" src="./images/icon-check.svg" alt="check" /></div><p id="${isChecked ? "done" : ""}">${task.task}</p><img class="cross-icon" src="./images/icon-cross.svg" alt="cross" /></div>`;
        });
        tasksDiv.innerHTML += `<div class="bottom"><p>${tasks.length !== 0 ? tasks.filter((task) => !task.done).length : 0} Items left</p><p class="clear">Clear Completed</p></div>`;
        addListeners();
        storage.setItem("tasks", JSON.stringify(taskList));
    }
};
const updateTasks = (tasks) => {
    if (tasksDiv === null || tasksDiv === void 0 ? void 0 : tasksDiv.lastElementChild) {
        tasksDiv.lastElementChild.innerHTML = `<p>${tasks.filter((task) => !task.done).length} Items left</p><p class="clear">Clear Completed</p>`;
    }
};
taskInput === null || taskInput === void 0 ? void 0 : taskInput.addEventListener("keyup", (e) => {
    const event = e;
    if (event.key === "Enter") {
        taskList.push({ done: false, task: taskInput.value });
        createTasks(taskList);
        taskInput.value = "";
    }
});
filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        let newTaskList = [];
        filters.forEach((filt) => (filt.id = ""));
        filter.id = "clicked";
        if (filter.textContent === "All") {
            createTasks(taskList);
        }
        else if (filter.textContent === "Active") {
            newTaskList = taskList.filter((task) => task.done === false);
            createTasks(newTaskList);
        }
        else if (filter.textContent === "Completed") {
            newTaskList = taskList.filter((task) => task.done === true);
            createTasks(newTaskList);
        }
    });
});
themeIcon === null || themeIcon === void 0 ? void 0 : themeIcon.addEventListener("click", () => {
    isDarkTheme = !isDarkTheme;
    if (isDarkTheme) {
        themeIcon.src = "./images/icon-sun.svg";
        root === null || root === void 0 ? void 0 : root.style.setProperty("--very-dark-blue", "hsl(235, 21%, 11%)");
        root === null || root === void 0 ? void 0 : root.style.setProperty("--very-dark-desaturated-blue", "hsl(235, 24%, 19%)");
        root === null || root === void 0 ? void 0 : root.style.setProperty("--very-light-gray", "hsl(0, 0%, 98%)");
        if (headerImg) {
            if (window.innerWidth < 450) {
                headerImg.src = "./images/bg-mobile-dark.jpg";
            }
            else {
                headerImg.src = "./images/bg-desktop-dark.jpg";
            }
        }
    }
    else {
        themeIcon.src = "./images/icon-moon.svg";
        root === null || root === void 0 ? void 0 : root.style.setProperty("--very-dark-blue", "hsl(236, 33%, 92%)");
        root === null || root === void 0 ? void 0 : root.style.setProperty("--very-dark-desaturated-blue", "hsl(0, 0%, 98%)");
        root === null || root === void 0 ? void 0 : root.style.setProperty("--very-light-gray", "hsl(235, 24%, 19%)");
        if (headerImg) {
            if (window.innerWidth < 450) {
                headerImg.src = "./images/bg-mobile-light.jpg";
            }
            else {
                headerImg.src = "./images/bg-desktop-light.jpg";
            }
        }
    }
});
createTasks(taskList);
