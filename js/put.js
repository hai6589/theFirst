var btn = document.getElementById('searc');
var btn1 = document.getElementById('btn');
var searchStd = document.getElementById('search');
var smal = document.getElementById('message1') ;
var username = document.querySelector('input[name ="name"]');
var age = document.querySelector('input[type="number"]');
var add = document.querySelector('input[name="address"]')
var message = document.getElementById('message2');
var idHv ;
let url = 'https://646b70fd7d3c1cae4ce3cdba.mockapi.io/hocvien'

//Tìm học viên
btn.onclick = function(e) {
    e.preventDefault();
    searchStudent();
}

// Gọi API lấy dữ liệu về
function searchStudent(){
    let promise = fetch(url, {
        method: "GET",
        headers: {"content-type": "application/json"}
    })
    promise
        .then(async function(response){
            let listStudent = await response.json();
            printStudent(listStudent);
        })
        .catch(error => {console.log(error);})
}

// Tìm kiếm in ra ô input
function printStudent(listStudent){
    let list = listStudent.length;

    for(let i = 0; i < list; i++){
        var student = listStudent[i];
        idHv = student.id;

        if(student.name === searchStd.value){
            searchStd.value = "";
            smal.classList ="";
            smal.innerHTML = "Tìm thấy học viên";
            smal.classList.add('text-success')
            username.value = student.name;
            age.value = student.age;
            add.value = student.address
            return;
        }else{
            smal.innerHTML = "Không tìm thấy học viên";
            smal.classList.add('text-danger')
        }
    }
}

// Chỉnh sửa thông tin học viên
btn1.onclick = function(e){
    e.preventDefault();
    putStudent();
}

// Gọi API để chỉnh sửa thông tin
function putStudent(){
    let url = 'https://646b70fd7d3c1cae4ce3cdba.mockapi.io/hocvien/' + idHv;
    let promise = fetch(url,{
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            name: username.value,
            age: age.value,
            address: add.value
        })
    })
    promise
        .then(function(response){
            message.classList ="";

            if(response.status === 200){
                message.innerHTML = "Sửa học viên thành công";
                message.classList.add('text-success')
            }else{
                message.innerHTML = "Sửa học viên thất bại";
                message.classList.add('text-danger')
            }
        })
        .catch(error => {console.log(error);})
}