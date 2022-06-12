const btn = document.getElementById('normal-send-button');

btn.addEventListener('click', event => {
    data = {
        'text': document.getElementById('input-to-chat').value,
        'private': 0
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
    document.getElementById('input-to-chat').value = "";
    event.preventDefault(true);
})



joinButton = document.getElementById('join-button');
joinButton.addEventListener('click', event => {
    data = getData();
    fetch('../../backend/queue/join_queue.php', {
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

    let msgSection = document.getElementById('ordered-list');
    let p = document.createElement('li');
    p.innerHTML = data['username'];
    msgSection.appendChild(p);
    event.preventDefault(true);
})

function getData(){
    const cookieValueUsername = document.cookie
    .split('; ')
    .find(row => row.startsWith('username'))
    .split('=')[1];

    const cookieValuePassword = document.cookie
    .split('; ')
    .find(row => row.startsWith('password'))
    .split('=')[1];
    
    data = {
        'username': cookieValueUsername,
        'password': cookieValuePassword,
        'queue_id': 1
    };
    return data;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    while(true) {
        await sleep(3000);
        fetch('../../backend/chatbox/refresh_messages.php')
        .then(res => res.json())
        .then(msg => {
            var s = document.getElementById('messages');
            s.innerHTML = '';
            for(var i of msg) {
                var p = document.createElement('p');
                p.textContent = i['text'];
                s.appendChild(p);
            }

        })
        data = getData();
        fetch('../../backend/queue/refresh_queue.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(msg => {
            var s = document.getElementById('ordered-list');
            s.innerHTML = '';
            for(var i of msg) {
                var p = document.createElement('li');
                p.textContent = i['username'];
                s.appendChild(p);
            }

        })
    }
}

demo();