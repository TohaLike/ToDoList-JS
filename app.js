const addMessage = document.querySelector('.message');
const addButton = document.querySelector('.button');
const spisok = document.querySelector('.spisok')

let array = [];

if (localStorage.getItem('todo')){
    array = JSON.parse(localStorage.getItem('todo'));
    displayMessage()
};

addButton.addEventListener('click', () => {
    if (!addMessage.value) return;
    let newTodo = {
        todo: addMessage.value,
        checked: false,
        important: false
    };

    array.push(newTodo)
    displayMessage()
    localStorage.setItem('todo', JSON.stringify(array));
    addMessage.value = '';
});

function displayMessage() {
    let displayMessage = '';
    if (array.length === 0) {
        spisok.innerHTML = '';
    };
    array.forEach((item, i) => {
    displayMessage += `
            <li class='sps'> 
                <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
                <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
            </li>
        `;
        spisok.innerHTML = displayMessage;
    });
};

spisok.addEventListener('change', (event) => {
    let idInput = event.target.getAttribute('id');
    let forLabel = spisok.querySelector('[for='+ idInput + ']');
    let valueLabel = forLabel.innerHTML;
    array.forEach((item) => {
        if(item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(array));
        }
    });
});


spisok.addEventListener('contextmenu', (event, index) => {
    event.preventDefault();
    array.forEach((item) => {
        if (item.todo === event.target.innerHTML) {
            if(event.ctrlKey) {
                array.splice(index, 1)
            } else {
                item.important = !item.important;
            }
            displayMessage()
            localStorage.setItem('todo', JSON.stringify(array));
        };
    });
});


