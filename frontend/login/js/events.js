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
    return new Promise(r => setTimeout(r, ms));
}

(() => {
    const button = document.getElementById('login-button');

    button.addEventListener('click', (event) => {
        const username = document.getElementById('username');
        const password = document.getElementById('password');

        let isValid = true;

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
            username: username.value,
            password: password.value
        };

        fetch('./../../backend/login/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'SUCCESS') {
                    console.log('logged in');
                    const form = document.getElementById('login-form');
                    const success_msg = construct_msg_box("Successful login!", 'SUCCESS', form.style.width);
                    form.appendChild(success_msg);
                    sleep(3000).then(() => {
                        window.location.reload();
                    });
                }
                else {
                    console.error('could not log in');
                    const form = document.getElementById('main-section');
                    const error_msg = construct_msg_box("Error! Wrong credentials", 'FAILURE', form.style.width);
                    form.appendChild(error_msg);
                }
            })
        event.preventDefault();
    });
})();

function construct_msg_box(msg, status, width) {
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

    error_msg.style.borderRadius = "10px";
    error_msg.style.marginTop = '10px';
    error_msg.style.width = width;
    return error_msg;
}


(() => {
    const button = document.getElementById('register-button');

    button.addEventListener('click', event => {
        window.location.href = "./../register/register.html";
        event.preventDefault(true);
    })
})();