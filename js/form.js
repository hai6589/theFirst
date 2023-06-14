let sub = document.getElementById('btn');
let repass = document.querySelector('input[name="re-password"]')
let errorRepass = repass.nextElementSibling;
let user = document.querySelector('input[name="name"]');
let pass = document.querySelector('input[name="password"]');
let email = document.querySelector('input[name="email"]');
let url = 'https://646b70fd7d3c1cae4ce3cdba.mockapi.io';
sub.onclick = function (e) {
    e.preventDefault();
    validateForm();
    postData();
}


let btn = document.querySelector('button[type="button"]');
btn.onclick = function (e) {
    e.preventDefault();
    getData();
}

// Validate form register
function validateForm() {

    if (!user.value) {
        user.nextElementSibling.innerText = 'Please enter username';
        user.nextElementSibling.classList.add('text-danger')
    } else {
        user.nextElementSibling.innerText = '';
    }

    let errorEmail = email.nextElementSibling;
    if (!email.value) {
        errorEmail.innerText = 'Please enter email';
        errorEmail.classList.add('text-danger');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        errorEmail.innerText = 'email syntax error';
        errorEmail.classList.add('text-danger');
    } else {
        errorEmail.innerText = '';
    }

    let errorPassword = pass.nextElementSibling;
    if (!pass.value) {
        errorPassword.innerText = 'Please enter password';
        errorPassword.classList.add('text-danger');
    } else if (!/^[a-z A-Z0-9]+$/.test(pass.value)) {
        errorPassword.innerText = 'Password must in renger a-z A-Z 0-9';
        errorPassword.classList.add('text-danger');
    } else if ((pass.value).length < 8) {
        errorPassword.innerText = 'Password must greater to equal 8';
        errorPassword.classList.add('text-danger');
    } else {
        errorPassword.innerText = '';
    }

    if (pass.value != repass.value) {
        errorRepass.innerText = 'incorrect password';
        errorRepass.classList.add('text-danger');
        return;
    } else {
        errorRepass.innerText = '';
    }
}

// submit registration form data
function postData() {
    errorRepass.classList = '';
    let promise = fetch(url+'/'+'dulieunguoidung', {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            name: user.value,
            email: email.value,
            password: pass.value
        })
    })
    promise
        .then(function (response) {
            if (response.status === 201) {
                errorRepass.innerText = 'Sign up success';
                errorRepass.classList.add('text-success');
                console.log(123);
                resertInp();
            } else {
                errorRepass.innerText = 'Sign up success';
                errorRepass.classList.add('text-danger');
            }
        })
        .catch(function(){
        errorRepass.innerText = 'Sign up success'; 
        errorRepass.classList.add('text-danger')
        })
}

// Get data
function getData(){
    let username = document.getElementById('user').value;
    let password = document.getElementById('pass').value;
    let promise = fetch(url+'/'+'dulieunguoidung',{
        method: "GET",
        headers: {"content-type":"application/json"}
    })
    promise
        .then(async function(res){
            let listData = await res.json();
            for(let i=0; i < listData.length; i++){
                let dataUser = listData[i];
                if(dataUser.name === username && dataUser.password === password){
                    window.location = '../html/main.html';
                }
            }
        })
}

// reset input
function resertInp(){
    user.value ='';
    email.value= '';
    pass.value = '';
    repass.value='';
}