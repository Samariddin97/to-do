"use strict";

const formCreate = document.getElementById('form-create');
const formEdit = document.getElementById('form-edit');
const listGroupTodo = document.getElementById('list-group-todo');
const messageCreate = document.getElementById('message-create');
const messageEdit = document.getElementById('message-edit');
const time = document.getElementById('time');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');
 
// Time elements
const fullDay = document.getElementById('full-day');
const hourEl = document.getElementById('hour');
const minuteEl = document.getElementById('minute');
const secondEl = document.getElementById('second');

let editItemId 

// check 
let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : [];
if (todos.length) showTodos()

// time 
function getTime() {
  const now = new Date
  const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
  const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
  const year = now.getFullYear()
  const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
  const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
  const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

  const months = [
    'January', 
    'February',
    'March', 
    'April',
    'May',
    'June',
    'July', 
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month_title = now.getMonth()
  fullDay.textContent = `${date} ${months[month_title]}, ${year}`
  hourEl.textContent = `${hour}`
  minuteEl.textContent = `${minute}`
  secondEl.textContent = `${second}`

  return (`${hour}:${minute}, ${date}.${month}.${year}`)
}
setInterval(getTime, 1000)

// set Todos
function setTodos() {
  localStorage.setItem('list', JSON.stringify(todos))
}

// show todos
function showTodos () {
  const todos = JSON.parse(localStorage.getItem('list'))
  listGroupTodo.innerHTML = ''
  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li ondblclick="setCompleted(${i})" class="list-group-item d-flex justify-content-between ${item.completed == true ? 'completed' : ''}">
          ${item.text}
          <div class="todo-icons">
            <span class="opacity-50 me-2">${item.time}</span>
            <img onclick="editTodo(${i})" src="img/edit.svg" alt="edit-icon" width="25" height="25">
            <img onclick="deleteTodo(${i})" src="img/delete.svg" alt="delete-icon" width="25" height="25">
          </div>
        </li>
    `
  })
}

// get Todos 
formCreate.addEventListener('submit', (e) => {
  e.preventDefault()
  const textTodo = formCreate['input-create'].value.trim()
  formCreate.reset()
  if (textTodo.length) {
    todos.push({ text: textTodo, time: getTime(), completed: false })
    setTodos()
    showTodos()
  } else {
    messageCreate.textContent = 'Please enter something...'
  }

  setTimeout(() => {
    messageCreate.textContent = ''
  }, 2500)
})

// delete Todos
function deleteTodo(id) {
  const deleteTodos = todos.filter((item, i) => {
    return i !== id
  })

  todos = deleteTodos
  setTodos()
  showTodos()
}

// setCompleted 
function setCompleted(id) {
  const completedTodos = todos.map((item, i) => {
    if (id == i) {
      return { ...item, completed: item.completed == true ? false : true }
    } else {
      return { ...item }
    }
  })
  todos = completedTodos
  setTodos()
  showTodos()
}

// formEdit
formEdit.addEventListener('submit', (e) => {
  e.preventDefault()

  const textTodo = formEdit['input-edit'].value.trim()
  formEdit.reset()
  if (textTodo.length) {
    todos.splice(editItemId, 1, { text: textTodo, time: getTime(), completed: false })
    setTodos()
    showTodos()
    close()
  } else {
    messageEdit.textContent = 'Please enter something...'
  }

  setTimeout(() => {
    messageEdit.textContent = ''
  }, 2500)  
})

// editTodo
function editTodo(id) {
  open();
  editItemId = id
}

function open() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function close() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

closeBtn.addEventListener('click', () => {
  close();
})

overlay.addEventListener('click', () => {
  close();
})

window.addEventListener('keydown', (e) => {
  e.key == 'Escape' ? close() : ''
})
