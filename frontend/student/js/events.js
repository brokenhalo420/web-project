let data = {};
let myCookies = {};
document.cookie.split('; ').forEach(el => {
    let [key, value] = el.split('=');
    myCookies[key.trim()] = value;
});

(() => {


    setInterval(getAllInvites, 2000);

})();


function getAllInvites() {
    let data = {
        username: myCookies['username']
    };
    fetch('./../../backend/student/get_student_invites.php', {
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

            let data = msg['invites'];
            let container = document.getElementById('invites');

            container.innerHTML = '';
            for (let invite of data) {
                let inviteEntry = createInvite(invite['name']);
                invites.appendChild(inviteEntry);
            }
        })
}

function createInvite(name) {
    let section = document.createElement('section');
    section.setAttribute('class', 'invite');

    let img = document.createElement('img');
    img.setAttribute('class', 'meet-icon');
    img.setAttribute('src', './img/invite_icon.png');
    img.setAttribute('alt', 'Meeting icon');

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