const tasksDiv = document.querySelector(".tasks-div");
const taskInput: HTMLInputElement | null = document.querySelector(".input");
const headerImg: HTMLImageElement | null = document.querySelector("header img");
const filters = document.querySelectorAll(".filters p");
const root: HTMLHtmlElement | null = document.querySelector(":root");
const themeIcon: HTMLImageElement | null =
  document.querySelector(".theme-icon");
const storage = window.localStorage;
let isDarkTheme: boolean = true;

const observer = new ResizeObserver((entries) => {
  if (entries[0].contentRect.width < 450) {
    headerImg
      ? isDarkTheme
        ? (headerImg.src = "./images/bg-mobile-dark.jpg")
        : (headerImg.src = "./images/bg-mobile-light.jpg")
      : null;
  } else if (entries[0].contentRect.width >= 450) {
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

type Tasks = {
  done?: boolean;
  task?: string;
};

const userTasks = storage.getItem("tasks");
let taskList: Tasks[] = userTasks !== null ? JSON.parse(userTasks) : [];

const addListeners = (): void => {
  const checks: NodeListOf<HTMLDivElement> =
    document.querySelectorAll(".check");
  const crosses: NodeListOf<HTMLImageElement> =
    document.querySelectorAll(".cross-icon");
  let isChecked: boolean;

  checks.forEach((check) => {
    check.addEventListener("click", () => {
      isChecked = check.children[0].id === "checked";

      if (isChecked) {
        check.children[0].id = "";
        check.id = "";
        if (check.parentElement?.children[1]) {
          check.parentElement.children[1].id = "";
        }

        const newTaskList: Tasks[] = [];
        for (let i = 0; i < taskList.length; i++) {
          taskList[i].task === check.parentElement?.children[1].textContent
            ? newTaskList.push({
                done: false,
                task: taskList[i].task,
              })
            : newTaskList.push(taskList[i]);
        }
        taskList = newTaskList;
        storage.setItem("tasks", JSON.stringify(taskList));
      } else {
        check.children[0].id = "checked";
        check.id = "change";
        if (check.parentElement?.children[1]) {
          check.parentElement.children[1].id = "done";
        }

        const newTaskList: Tasks[] = [];
        for (let i = 0; i < taskList.length; i++) {
          taskList[i].task === check.parentElement?.children[1].textContent
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

  crosses.forEach((cross) =>
    cross.addEventListener("click", () => {
      const newTaskList: Tasks[] = [];
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].task !== cross.parentElement?.children[1].textContent) {
          newTaskList.push(taskList[i]);
        }
      }
      taskList = newTaskList;
      createTasks(taskList);
    })
  );

  // Clear completed block
  document.querySelector(".clear")?.addEventListener("click", () => {
    taskList = taskList.filter((task) => !task.done);
    createTasks(taskList);
  });
};

const createTasks = (tasks: Tasks[]): void => {
  if (tasksDiv) {
    tasksDiv.innerHTML = "";
    tasks.forEach((task) => {
      const isChecked = task.done === true;
      tasksDiv.innerHTML += `<div class="task"><div class="check" id="${
        isChecked ? "change" : ""
      }"><img class="check-icon" id="${
        isChecked ? "checked" : ""
      }" src="./images/icon-check.svg" alt="check" /></div><p id="${
        isChecked ? "done" : ""
      }">${
        task.task
      }</p><img class="cross-icon" src="./images/icon-cross.svg" alt="cross" /></div>`;
    });
    tasksDiv.innerHTML += `<div class="bottom"><p>${
      tasks.length !== 0 ? tasks.filter((task) => !task.done).length : 0
    } Items left</p><p class="clear">Clear Completed</p></div>`;
    addListeners();
    storage.setItem("tasks", JSON.stringify(taskList));
  }
};

const updateTasks = (tasks: Tasks[]): void => {
  if (tasksDiv?.lastElementChild) {
    tasksDiv.lastElementChild.innerHTML = `<p>${
      tasks.filter((task) => !task.done).length
    } Items left</p><p class="clear">Clear Completed</p>`;
  }
};

taskInput?.addEventListener("keyup", (e) => {
  const event = <KeyboardEvent>e;
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
    } else if (filter.textContent === "Active") {
      newTaskList = taskList.filter((task) => task.done === false);
      createTasks(newTaskList);
    } else if (filter.textContent === "Completed") {
      newTaskList = taskList.filter((task) => task.done === true);
      createTasks(newTaskList);
    }
  });
});

themeIcon?.addEventListener("click", () => {
  isDarkTheme = !isDarkTheme;

  if (isDarkTheme) {
    themeIcon.src = "./images/icon-sun.svg";
    root?.style.setProperty("--very-dark-blue", "hsl(235, 21%, 11%)");
    root?.style.setProperty(
      "--very-dark-desaturated-blue",
      "hsl(235, 24%, 19%)"
    );
    root?.style.setProperty("--very-light-gray", "hsl(0, 0%, 98%)");
    if (headerImg) {
      if (window.innerWidth < 450) {
        headerImg.src = "./images/bg-mobile-dark.jpg";
      } else {
        headerImg.src = "./images/bg-desktop-dark.jpg";
      }
    }
  } else {
    themeIcon.src = "./images/icon-moon.svg";
    root?.style.setProperty("--very-dark-blue", "hsl(236, 33%, 92%)");
    root?.style.setProperty("--very-dark-desaturated-blue", "hsl(0, 0%, 98%)");
    root?.style.setProperty("--very-light-gray", "hsl(235, 24%, 19%)");
    if (headerImg) {
      if (window.innerWidth < 450) {
        headerImg.src = "./images/bg-mobile-light.jpg";
      } else {
        headerImg.src = "./images/bg-desktop-light.jpg";
      }
    }
  }
});

createTasks(taskList);
