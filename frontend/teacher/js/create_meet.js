function fillListWithEmails() {
    let tb = document.getElementById('invite-table');
    fetch('../../backend/teacher/get_users.php')
        .then(res => res.json())
        .then(msg => {
            for (var i of msg) {

                let button = document.createElement('input');
                button.textContent = "click me";
                button.setAttribute('type', 'checkbox');
                button.setAttribute('class', 'send-invite-checkbox');
                button.setAttribute('name', i['email']);
                var tr = document.createElement('tr');
                tr.setAttribute('class', 'table-row-with-button');
                var td = document.createElement('td');
                var td2 = document.createElement('td');
                td.textContent = i['email'];
                tr.appendChild(td);

                td2.appendChild(button);
                tr.appendChild(td2);

                tb.appendChild(tr);
            }
        })
}

sendBtn = document.getElementById('send-button');
sendBtn.addEventListener('click', event => {
    //create an invite, get its id
    let link = document.getElementById('url').value;
    let roomName = document.getElementById('roomName').value;
    let queue_id;
    let createRoomJson = {
        'name': roomName,
        'url': link
    }
    fetch('../../backend/teacher/create_invite.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(createRoomJson)
    }).then(res => res.json())
        .then(msg => {
            //below look
            queue_id = msg['id'];
            //console.log(msg + '\nMSG TUKA TUKA DOLU QEU \n');
            //console.log(queue_id + 'TUYKA TUKA TKA TKA');
            checkboxes = document.getElementsByClassName('send-invite-checkbox');
            for (let i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked == true) {
                    email = checkboxes[i].getAttribute('name');
                    userInviteJson = {
                        'email': email,
                        'queue_id': queue_id
                    };

                    fetch('../../backend/teacher/create_user_invite.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userInviteJson)
                    }).then(res => res.json())
                        .then(msg => {
                            if (msg["status"] == 'fail') {
                                console.log('mn sizle')
                                alert('FAIL');
                            }
                        })
                }
            }
            if (msg["status"] == 'fail') {
                console.log('mn sizle')
                alert('FAIL');
            }
        })


    //send invite id to users
    //create user invites - one invite per user- not all at once

    event.preventDefault();
})

fillListWithEmails();