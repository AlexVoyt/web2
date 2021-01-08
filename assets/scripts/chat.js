let messages = [];

function SendButton()
{
    let input_form = document.querySelector('.input-form');
    if(input_form.value != ' ')
    {
        SendMessage(input_form.value);
    }
    input_form.value = ' ';
}

function SendMessage(msg)
{
    let input_form = document.querySelector('.input-form');
    let chat_container = document.querySelector('#main-content');

    let div = document.createElement('div');
    div.setAttribute('class', 'message');
    div.textContent = msg;
    chat_container.insertBefore(div, input_form);

    messages.push(msg);
    localStorage.setItem('messages', messages);
}

function ClearButton()
{
    let chat_messages = document.querySelectorAll('.message');
    chat_messages.forEach(elem => {elem.remove();});
    localStorage.clear();
}

function InitCallbacks()
{
    let send_button = document.querySelector('#send-button');
    let clear_button = document.querySelector('#clear-button');

    send_button.onclick = SendButton;
    clear_button.onclick = ClearButton;
}

function GetMessagesFromStorageAndRender()
{
    let local_messages = localStorage.getItem('messages');
    if(local_messages)
    {
        local_messages.split(',').forEach(SendMessage);
    }
}

InitCallbacks();
GetMessagesFromStorageAndRender();
