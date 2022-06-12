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

        let isValid = true;

        if(!/.{2,15}/.test(firstName.value)){
            alert("First name must be between 2 and 15 symbols.");
            isValid = false;
        }

        if(!/.{2,15}/.test(lastName.value)){
            alert("Last name must be between 2 and 15 symbols.");
            isValid = false;
        }

        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email.value)){
            alert("Email is not in correct form.");
            isValid = false;
        }

        if(!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username.value)){
            alert("Username must be between 8 and 20 characters. It must not begin or end with any special characters");
            isValid = false;
        }

        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password.value)){
            alert("Password must be at minimum eight characters, at least one uppercase letter, one lowercase letter and one number.");
            isValid = false;
        }

        if(!isValid){
            event.preventDefault(true);
            return;
        }


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
        event.preventDefault(true);
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