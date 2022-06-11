const btn = document.getElementById('normal-send-button');

btn.addEventListener('click', event => {
    data = {
        'text': document.getElementById('input-to-chat').value,
    }

    console.log(data);

    fetch('../../backend/chatbox/send_message.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(msg => {
        console.log(msg);
        if(msg["status"] == 'fail') {
            console.log('mn sizle')
            alert('FAIL');
        }


    })
    const msgSection = document.getElementById('messages');
    const p = document.createElement('p');
    p.innerHTML = data['text'];
    msgSection.appendChild(p);

    event.preventDefault(true);
})