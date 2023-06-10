interface ITodoList {
  id: string;
  todo: string;
  completed: boolean;
}

const getLocalStorageTodo = () => {
  const localStorageTodo = localStorage.getItem("todo");
  if (localStorageTodo === null) return [];
  return JSON.parse(localStorageTodo);
};

let todoList: ITodoList[] = getLocalStorageTodo();

const inputEl = document.querySelector("#inputel") as HTMLInputElement;
const btnEl = document.querySelector("#btn") as HTMLButtonElement;
const divEl = document.querySelector("#list") as HTMLDivElement;
const deleteEl = document.querySelector<HTMLButtonElement>(".delete");

btnEl.addEventListener("click", (e: Event) => {
  e.preventDefault();
  let text = inputEl.value;
  const newTodo: ITodoList = {
    id: Date.now().toString(),
    todo: text,
    completed: false,
  };
  todoList.push(newTodo);
  localStorage.setItem("todo", JSON.stringify(todoList));
  inputEl.value = "";

  renderTodo();
});

const renderTodo = () => {
  divEl.replaceChildren();
  for (let i = 0; i < todoList.length; i++) {
    const liEl = document.createElement("li");
    const p = document.createElement("p");
    const check = document.createElement("input");
    const attr = document.createAttribute("data-id");
    attr.value = todoList[i].id.toString();
    check.setAttributeNode(attr);
    check.type = "checkbox";
    check.checked = todoList[i].completed;
    liEl.classList.add("items");
    p.innerHTML = todoList[i].todo;

    if (todoList[i].completed) {
      p.classList.add("strike");
    } else {
      p.classList.remove("strike");
    }

    check.addEventListener("click", (e: Event) => {
      const target = e.currentTarget as HTMLButtonElement;
      const newTodo = todoList.map((todo) => {
        if (todo.id === target.dataset.id) {
          return { ...todo, completed: check.checked };
        }
        return todo;
      });
      if (check.checked) {
        p.classList.add("strike");
      } else {
        p.classList.remove("strike");
      }
      todoList = newTodo;
      localStorage.setItem("todo", JSON.stringify(newTodo));
    });

    liEl.append(p, check);
    divEl.append(liEl);
  }
};

deleteEl?.addEventListener("click", () => {
  console.log("delete");

  localStorage.clear();
  todoList = [];
  renderTodo();
});

renderTodo();
