if (document.cookie == '') {
    window.location.href = "./../login/login.html";
}

let data = {};
let mycookies = {};
document.cookie.split('; ').forEach(el => {
    let [key, value] = el.split('=');
    mycookies[key.trim()] = value;
});

const title = document.getElementById('room-name');
title.innerHTML = decodeURI(mycookies['queue_name']);

function createThing(username, num) {
    const li = document.createElement('li');

    const sectMain = document.createElement('section');
    sectMain.style.display = 'flex';
    sectMain.style.justifyContent = "space-between";

    const sec1 = document.createElement('section');
    const p = document.createElement('p');
    p.innerHTML = username;
    sec1.setAttribute('class', 'user');
    sec1.appendChild(p);

    const sec2 = document.createElement('section');
    sec2.className = 'buttonsec';
    const btn1 = document.createElement('button');
    btn1.innerHTML = "Добави";
    btn1.className = 'add-button add';

    const btn2 = document.createElement('button');
    btn2.innerHTML = "Добави временно";
    btn2.className = 'tempAdd-button tempAdd';
    btn1.setAttribute('id', "btn-" + num);

    sec2.appendChild(btn1);
    sec2.appendChild(btn2);
    sectMain.appendChild(sec1);
    sectMain.appendChild(sec2);
    li.appendChild(sectMain);
    return li;
}
demo();

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
        await sleep(5000);
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
    }
}

let n = 0;
function refreshQueue() {
    data = getData();
    fetch('../../backend/teacher/refresh_queue.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(msg => {
            var s = document.getElementById('ordered-list');
            s.innerHTML = '';
            n = 0;
            for (var i of msg) {
                n += 1;
                var p = createThing(i['username'], n);
                p.style.marginLeft = "10px";
                p.style.display = "list-item";
                s.appendChild(p);
            }
            const buttons = document.getElementById('ordered-list').childNodes;

            for (let count = 1; count <= n; count++) {
                var username = {
                    username: mycookies['username']
                };
                button = document.getElementById('btn-' + count);
                button.addEventListener('click', event => {
                    fetch('./../../backend/teacher/add_user_to_invited.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(username)
                    })
                        .then(res => res.json)
                        .then(msg => {
                            if (!msg['status'] === "SUCCESS") {
                                return;
                            }
                        })

                    event.preventDefault();
                });
            }
        })

}





