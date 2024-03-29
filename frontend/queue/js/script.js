const cookie = document.cookie;
let mycookies = {};
if (cookie != "") {
    cookie.split('; ').forEach(el => {
        let [key, value] = el.split('=');
        mycookies[key.trim()] = value;
    })
}
else {
    window.location.href = "./../login/login.html";
}

leaveButton = document.getElementById('leave-button');
if(mycookies['url']){
    //window.open(mycookies['url']);
    window.open(decodeURIComponent(mycookies['url']),'_blank');
    leaveButton.click();
}

const label = document.getElementById('room-name');
label.textContent = decodeURI(mycookies['queue_name']);

const btn = document.getElementById('normal-send-button');

btn.addEventListener('click', event => {
    data = {
        'text': document.getElementById('input-to-chat').value,
        'private': 0,
        'id': mycookies['queue_id']
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
            if (msg["status"] == 'fail') {
                console.log('mn sizle')
                alert('FAIL');
            }
        })
    const msgSection = document.getElementById('messages');
    const p = document.createElement('p');
    p.innerHTML = mycookies['username'] + ': ' + data['text'];
    msgSection.appendChild(p);
    document.getElementById('input-to-chat').value = "";
    msgSection.scrollTop = msgSection.scrollHeight;
    event.preventDefault(true);
})


leaveButton.addEventListener('click', event => {
    data = getData();

    fetch('../../backend/queue/leave_queue.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(msg => {
            console.log(msg);
            if (msg["status"] == 'fail') {
                console.log('mn sizle')
                alert('FAIL');
            }
        })
    refreshQueue();
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
            if (msg["status"] == 'fail') {
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

function getData() {
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
        'queue_id': mycookies['queue_id']
    };
    return data;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    while (true) {
        await sleep(1000);
        fetch('../../backend/chatbox/refresh_messages.php')
            .then(res => res.json())
            .then(msg => {
                var s = document.getElementById('messages');
                s.innerHTML = '';
                for (var i of msg) {
                    var p = document.createElement('p');
                    p.textContent = mycookies['username'] + ': ' + i['text'];
                    s.appendChild(p);
                }

            })
        refreshQueue();
        checkIfReadyToJoin();
    }
}

function refreshQueue() {
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
            for (var i of msg) {
                var p = document.createElement('li');
                p.textContent = i['username'];
                s.appendChild(p);
            }

        })
}

function checkIfReadyToJoin() {
    data = {
        name: decodeURI(mycookies['queue_name'])
    }
    fetch('../../backend/student/ready_to_join.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(msg => {
            if (!msg['status'] === "SUCCESS") {
                console.log('so bad 179');
                return;
            }
            let link = '';
            fetch('../../backend/student/get_link.php',{
                method: 'POST',
                    headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(message => {
                if(!message['status']==="SUCCESS"){
                    console.log('so sad 192');
                    return;
                }
                //window.location.reload();
                return;
            })
        })
}

demo();

