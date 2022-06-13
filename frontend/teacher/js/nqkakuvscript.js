if(document.cookie == ''){
    window.location.href="./../login/login.html";
}


//delete table rows
var node = document.getElementById("tablebody");

function clearTable(){
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }
}


//chat thing
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
    msgSection.scrollTop = msgSection.scrollHeight;
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

    let msgSection = document.getElementById('table-data');
    let p = document.createElement('td');
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
        refreshQueue();
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
            var s = document.getElementById('list');
            s.innerHTML = '';
            for(var i of msg) {
                createThing(i['username'],s);
            }

        })
}

  function createThing(username, parent){
    const li = document.createElement('li');
    const sec1 = document.createElement('section');
    const p = document.createElement('p');
    p.innerHTML = username;
    sec1.setAttribute('class','user');
    sec1.appendChild(p);
    
    const sec2 = document.createElement('section');
    sec2.className = 'buttonsec';
    const btn1 = document.createElement('button');
    btn1.innerHTML = "Добави";
    btn1.className = 'add-button add';

    const btn2 = document.createElement('button');
    btn2.innerHTML = "Добави временно";
    btn2.className = 'tempAdd-button tempAdd';

    sec2.appendChild(btn1);
    sec2.appendChild(btn2);
    li.appendChild(sec1);
    li.appendChild(sec2);
    parent.appendChild(li);
  }
  
  
demo();