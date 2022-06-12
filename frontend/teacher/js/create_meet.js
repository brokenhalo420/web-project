function fillListWithEmails() {
    let tb = document.getElementById('invite-table');
    fetch('../../backend/teacher/get_users.php')
    .then(res => res.json())
    .then(msg => {
        for(var i of msg) {
            
            let button = document.createElement('button');
            button.textContent = "click me";
            button.setAttribute('class', 'selectButton');
            button.addEventListener('click', event => {
                sec = document.getElementById('hidden-section');
                p = document.createElement('p');
                p.textContent = i['email'];
                sec.appendChild(p);
            })
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
    sec = document.getElementById('hidden-section');
    //create an invite, get its id
    
    //send invite id to users
    //create user invites - one invite per user- not all at once
    for(let i in sec) {

    }
})

fillListWithEmails();