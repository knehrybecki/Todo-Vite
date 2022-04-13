import './style/style.sass'
import './style/reset.css'
import $ from 'jquery'
import { v4 as uuidv4 } from 'uuid'

const inputText = $('.input-text')
const buttonAddTodo = $('.add-item')
const todoList = $('.todo__list')

const filtrAll = $('.filtr-all')
const filtrTodo = $('.filtr-todo')
const filtrDone = $('.filtr-done')

let todoArray = []

const createNewTodo = getText => {
    
    const todo = $('<li>', {
        class: 'todo__item',
        text: getText,
        'data-id': uuidv4()
    })

    return todo
}

inputText.keyup(event => event.keyCode === 13 ? addTodo() : null)

buttonAddTodo.click(() => addTodo())

const addTodo = () => {
    if (inputText.val() === '') {
        alert("Please write any text")
    }

    else {
        const newTodo = createNewTodo(inputText.val())   
 
        newTodo.appendTo(todoList)

        createTodoControls(newTodo)

        todoArray = todoArray.concat([
            {
                isDone: false,
                text: inputText.val(),
                id: newTodo.attr('data-id')
            }
        ])
    }
    
    inputText.val('')
}

const createTodoControls = todoItem => {
    const allButton = $('<div>', {
        class: 'todo__item-all-button'
    }).appendTo(todoItem)

    const acceptedButton = $('<button>', {
        class: 'todo__item-accepted'
    }).appendTo(allButton)

    $('<i>', {
        class: 'fa-solid fa-check'
    }).appendTo(acceptedButton)

    const deleteButton = $('<button>', {
        class: 'todo__item-deleted'
    }).appendTo(allButton)

    $('<i>', {
        class: 'fa-solid fa-trash'
    }).appendTo(deleteButton)
    
    deleteButton.click(event => {
        event.currentTarget.parentElement.parentElement.remove()
        const id = event.currentTarget.parentElement.parentElement.getAttribute('data-id')
        const index = todoArray.findIndex(item => {
            return item.id == id
        })

        todoArray.pop(index)
    })

    acceptedButton.click(event => {
        event.currentTarget.parentElement.parentElement.classList.add('checked')
        const id = event.currentTarget.parentElement.parentElement.getAttribute('data-id')

        const index = todoArray.findIndex(item => {
            return item.id == id
        })

        todoArray[index].isDone = true 
    })
}

const filters = () => {
    filtrAll.click(() => { 
        $('.todo__item').show(500) 
    })

    filtrTodo.click(() => { 
        $('.todo__item').show(500)
        $('.todo__item.checked').hide(400)
    })

    filtrDone.click(() => {     
        $('.todo__item').hide(400)
        $('.todo__item.checked').show(500)
    })
}

filters()
