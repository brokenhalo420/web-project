const cookie = document.cookie;
let mycookies = {};
if (cookie != "") {
    cookie.split('; ').forEach(el => {
        let [key, value] = el.split('=');
        mycookies[key.trim()] = value;
    })
    if (mycookies['type'] === 'TEACHER') {
        window.location.href ='./../teacher/techer_view.html';
    }
    else if (mycookies['type'] === 'STUDENT') {
        window.location.href = './../student/student_account.html';
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



(() => {
    const button = document.getElementById('register-button');

    button.addEventListener('click', (event) => {
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const email = document.getElementById('email');
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        const data = {
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value,
            username: username.value,
            password: password.value,
        };

        fetch('./../../backend/register/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(msg => {
            if(msg.status === 'SUCCESS') {
                console.log('Successfully registered');
                const form = document.getElementById('main-section');
                const exits_box =document.getElementById('message-box');
                if(exits_box != null){
                    exits_box.parentNode.removeChild(exits_box);
                }
                const success_msg = construct_msg_box(msg.message + ' Redirecting...','SUCCESS',form.style.width);
                form.appendChild(success_msg);
                sleep(3000).then(() => {
                    window.location.href= './../login/login.html';
                });
                
            }
            else {
                console.error('Could not register user');
                const form = document.getElementById('main-section');
                const exits_box =document.getElementById('message-box');
                if(exits_box != null){
                    exits_box.parentNode.removeChild(exits_box);
                }
                const error_msg = construct_msg_box(msg.message,'FAILURE',form.style.width);
                form.appendChild(error_msg);
            }
        })
        event.preventDefault();
    });
})();

function construct_msg_box(msg, status, width){
    const error_msg = document.createElement('section');
    const text = document.createElement('p');
    text.textContent = msg;
    error_msg.appendChild(text);

    switch (status) {
        case 'SUCCESS': {
            error_msg.style.backgroundColor = "rgb(143,188,143)";
            error_msg.style.border = "1px darkgreen solid";
        }
        break;
        case 'FAILURE': {
            error_msg.style.backgroundColor = "rgb(255,102,102)";
            error_msg.style.border = "1px darkred solid";
        };
        break;
    }
    error_msg.setAttribute('id','message-box');
    error_msg.style.borderRadius = "10px";
    error_msg.style.marginTop = '10px';
    error_msg.style.width = width;
    return error_msg;
}