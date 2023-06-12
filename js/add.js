var btn = document.getElementById('btn1');
var username = document.getElementById('name');
var age = document.getElementById('age');
var address = document.getElementById('adress');
var message = document.getElementById('add');
let url = 'https://646b70fd7d3c1cae4ce3cdba.mockapi.io/hocvien'

let btn1 = document.getElementById('btn-back');
btn1.onclick = function () {
    window.location = '../html/main.html';
}

btn.onclick = function(e){
    e.preventDefault()
    postStudent();
}

// Gọi API để gửi dữ liệu đi
function postStudent(){
    let promise = fetch(url,{
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            name: username.value,
            age: age.value,
            address: address.value
        })
    })
    
    promise
        .then(function(response){
            message.classList ="";
            if(response.status ===201){
                message.innerText = 'Thêm học viên thành công'
                message.classList.add('text-success')
                resertInp();
            }else{
                message.innerText = 'Thêm học viên thất bại'
                message.classList.add('text-danger')
            }
        })
        .catch(error => (console.log(error)))
}

// Reset các ô nhập dữ liệu
function resertInp(){
    username.value = "";
    age.value = "";
    address.value = "";
}