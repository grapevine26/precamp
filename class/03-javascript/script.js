const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const savedTodoList = JSON.parse(localStorage.getItem('saved-items'))

const createTodo = function (storageData) {
    let todoContents = todoInput.value;
    if (storageData) {
        todoContents = storageData.contents;
    }


    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    const newBtn = document.createElement('button');

    newBtn.addEventListener('click', () => {
        newLi.classList.toggle('complete');
        saveItemsFn();
    });

    newLi.addEventListener('dblclick', () => {
        newLi.remove();
        saveItemsFn();
    });

    if(storageData?.complete === true) {
        newLi.classList.add('complete')
    }

    newSpan.textContent = todoContents;
    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);
    todoList.appendChild(newLi);
    todoInput.value = '';
    saveItemsFn();
}
const keyCodeCheck = function () {
    if (window.event.keyCode === 13 && todoInput.value) {
        createTodo();
    }
}

const deleteAll = function () {
    const liList = document.querySelectorAll('li');
    console.log(liList)
    liList.forEach(function (n) {
        n.remove()
    })
    saveItemsFn();
}

const saveItemsFn = function () {
    const saveItems = [];
    for(let i =0; i < todoList.children.length; i++) {
        const todoObj = {
            contents : todoList.children[i].querySelector('span').textContent,
            complete :todoList.children[i].classList.contains('complete'),
        }
        saveItems.push(todoObj)
    }

    saveItems.length === 0
        ? localStorage.removeItem('saved-items')
        : localStorage.setItem('saved-items',JSON.stringify(saveItems))
}

if (savedTodoList) {
    for(let i = 0; i< savedTodoList.length; i++) {
        createTodo(savedTodoList[i])
    }
}
