//CONSTANTES
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTodo();
});

//Este código define una función llamada "addTodo" que toma un solo argumento, "todo".
//La función recupera el valor de entrada, verifica si se proporciona una tarea pendiente y luego crea un nuevo elemento de tarea pendiente.
//Agrega detectores de eventos para hacer clic y hacer clic con el botón derecho (menú contextual) para alternar entre completar y eliminar la tarea pendiente, respectivamente.
//Finalmente, agrega el nuevo elemento de tarea a la lista desordenada y actualiza el almacenamiento local.
function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement("li");

        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        todoEl.innerText = todoText;

        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");
            updateLS();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);
        input.value = "";
        updateLS();
    }
}

//En este código, definimos una función llamada `updateLS()`.
//Esta función es responsable de actualizar el almacenamiento local con el estado actual de la lista de tareas pendientes.
//Primero obtenemos todos los elementos de tarea del DOM usando `querySelectorAll("li")`.
//Luego, creamos una matriz vacía llamada `todos` para almacenar los objetos de tareas pendientes.
//A continuación, iteramos sobre cada elemento de tarea usando el método `forEach()`.
//Para cada elemento de tarea, creamos un objeto de tarea con las propiedades "texto" y "completado".
//Luego insertamos este objeto de tareas pendientes en la matriz `todos`.
//Finalmente, convertimos la matriz `todos` en una cadena JSON usando `JSON.stringify(todos)` y la almacenamos en el almacenamiento local usando `localStorage.setItem("todos", JSON.stringify(todos))`.
//Esto nos permite conservar los datos de la lista de tareas pendientes durante las recargas de páginas y las sesiones del navegador.
function updateLS() {
    const todosEl = document.querySelectorAll("li");
    const todos = [];

    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}