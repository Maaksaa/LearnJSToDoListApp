const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095c1288e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
  {
    _id: "5d2ca9e2e03d40b3232496aa7",
    completed: true,
    body:
      "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
    title: "Eu ea incididunt sunt consectetur fugiat non.",
  },
  {
    _id: "5d2ca9e29c8a94095564788e0",
    completed: false,
    body:
      "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
    title:
      "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.",
  },
];

(function (arrOfTasks) {
  const objOfTask = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // elements UI
  const liistContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputBody = form.elements["body"];

  // проверка на наличие задач
  // если их нет, то добавляю в дом.
  if (Object.keys(objOfTask).length === 0) {
    const noTaskItem = noTaskTemplate();
    // console.log("ура");

    // добавление задачи в дом.
    liistContainer.insertAdjacentElement("afterbegin", noTaskItem);
  }

  // Events
  // console.log(objOfTask);
  // console.log(tasks);
  // console.log(arrOfTasks);

  renderAllTask(objOfTask);
  form.addEventListener("submit", onFormSubmitHandler);

  liistContainer.addEventListener("click", onDeleteHandler);
  liistContainer.addEventListener("click", onDoneHandler);

  function renderAllTask(tasksList) {
    if (!tasksList) {
      console.error("Передайте список задач!");
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    liistContainer.appendChild(fragment);
  }

  // создаю шаблон для сообщения о том, что нет задач
  function noTaskTemplate() {
    const liNotifi = document.createElement("li");
    liNotifi.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2",
      "no-task"
    );
    const span = document.createElement("span");
    span.textContent = "Задач нет";
    span.style.fontWeight = "bold";

    const article = document.createElement("p");
    article.textContent = "Добавьте задачи";
    article.classList.add("mt-2", "w-100");
    liNotifi.appendChild(span);
    liNotifi.appendChild(article);

    // console.log("ура2");

    return liNotifi;
  }

  // создаю шаблон для создания оболочки задачи
  // в аргументах фунцкции выполнена деструктуризация
  function listItemTemplate({ _id, title, body } = {}) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
    li.setAttribute("data-task-id", _id);

    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";

    // создание кнопки выполненой задачи
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done task";
    doneBtn.classList.add("btn", "btn-success", "ml-auto", "done-btn");

    // создание кнопки удалить задачу
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete task";
    deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

    const article = document.createElement("p");
    const art = document.createElement("abc");

    article.textContent = body;
    article.classList.add("mt-2", "w-100");

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    li.appendChild(article);

    return li;
  }
  // проверка на заполение инфы для задачи
  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert("данные пиши");
      return;
    }

    const task = createNewTask(titleValue, bodyValue);

    const listItem = listItemTemplate(task);

    // добавление задачи в дом.
    liistContainer.insertAdjacentElement("afterbegin", listItem);

    // ищу класс no-task, если есть, удаляю узёл
    let liNoTask = document.querySelector(".no-task");
    // console.log(liNoTask);
    if (liNoTask) {
      liNoTask.remove();
    }
    // очистить данные формы
    form.reset();
  }
  // создание новой задачи
  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTask[newTask._id] = newTask;

    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfTask[id];
    const isConfirm = confirm(`Удаляем задачу? ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTask[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
    // если при удалении это последняя задача, то добавляю шаблон с просьбой добавить задачу
    if (Object.keys(objOfTask).length === 0) {
      // console.log("Надо добавить");
      const noTaskItem = noTaskTemplate();
      // console.log("добавляю что пусто");

      // добавление задачи в дом.
      liistContainer.insertAdjacentElement("afterbegin", noTaskItem);
    }
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
    }
  }

  function changeColorTask(el) {
    el.style.backgroundColor = "#4caf50";
    el.style.textDecoration = "line-through";
    // console.log(el);
  }

  function onDoneHandler({ target }) {
    if (target.classList.contains("done-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      changeColorTask(parent);
    }
  }
})(tasks);
