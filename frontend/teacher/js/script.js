if(document.cookie == ''){
    window.location.href="./../login/login.html";
}

let data = {};
let myCookies = {};
document.cookie.split('; ').forEach(el => {
    let [key, value] = el.split('=');
    myCookies[key.trim()] = value;
});

(() => {
    setInterval(getAllInvites, 5000);
})();

const createInviteButton = document.getElementById('create');

createInviteButton.addEventListener('click', event => {
    window.location.href='./create_meet.html';
})

function getAllInvites() {
    let data = {
        username: myCookies['username']
    };
    fetch('./../../backend/teacher/get_teacher_invites.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(msg => {
            if (msg['status'] === 'FAILURE') {
                document.getElementById('no-invite-message').style.display = 'block';
                return;
            }
            else{
                document.getElementById('no-invite-message').style.display = 'none';
            }

            let data = msg['invites'];
            let container = document.getElementById('invites');

            container.innerHTML = '';
            for (let invite of data) {
                let inviteEntry = createInvite(invite['name'],invite['id']);
                container.appendChild(inviteEntry);
            }

            const invites = document.getElementById('invites');
            

            for (var invite of invites.children) {
                    invite.addEventListener('click', event => {
                    const value = invite.lastChild.firstChild.textContent;
                    const name = {
                        name: value,
                        id: invite.getAttribute('id')
                    };
                    fetch('./../../backend/teacher/join_invite.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(name)
                    })
                        .then(res => res.json())
                        .then(message => {
                            if (message['status'] === 'SUCCESS') {
                                if (myCookies['type'] === "TEACHER") {
                                    window.location.href = './../teacher/techer_view.html';
                                }
                                else if (myCookies['type'] === 'STUDENT') {
                                    window.location.href = './../queue/queue.html';
                                }
                            }
                            else {
                                return;
                            }
                        });
                    event.preventDefault(true);
                });
            }
        })
}

function createInvite(name,id) {
    let section = document.createElement('section');
    section.setAttribute('class', 'invite');
    section.setAttribute('id',id);

    let img = document.createElement('img');
    img.setAttribute('class', 'meet-icon');
    img.setAttribute('src', './img/invite_icon.png');
    img.setAttribute('alt', 'Meeting icon');
    img.style.width = "50px";
    img.style.height = "auto";
    img.style.marginLeft = "3%";

    let info = document.createElement('section');
    info.setAttribute('class', 'information');

    let h2 = document.createElement('h2');
    h2.setAttribute('class', 'name-of-meeting');

    h2.innerHTML = name;


    info.appendChild(h2);
    section.appendChild(img);
    section.appendChild(info);

    return section;
}