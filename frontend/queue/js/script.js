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
        // fetch('../../backend/queue/refresh_queue.php')
        // .then(res => res.json())
        // .then(msg => {
        //     var s = document.getElementById('ordered-list');
        //     s.innerHTML = '';
        //     for(var i of msg) {
        //         var p = document.createElement('li');
        //         p.textContent = i[''];
        //         s.appendChild(p);
        //     }

        // })
    }
}

demo();

joinButton = document.getElementById('join-button');
joinButton.addEventListener('click', event => {
    //get cookie with username
    document.cookie = "name=go6o";
    document.cookie = "queue_id=1";
    const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('name'))
    .split('=')[1];
    username = document.cookie.split(';')[0].split('=')[1];
    queueId = document.cookie.split(';')[1].split('=')[1];
    data = {
        'uname': username,
        'qId': queueId
    };
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
    p.innerHTML = data['uname'];
    msgSection.appendChild(p);
    event.preventDefault(true);
})