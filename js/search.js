var searchStudent = document.querySelector('input[type="text"]');
var message = document.getElementById('message');
var table = document.getElementById('list')
var btn = document.getElementById('btn');
let url = 'https://646b70fd7d3c1cae4ce3cdba.mockapi.io/hocvien'

let btn1 = document.getElementById('btn-back');
btn1.onclick = function () {
    window.location = 'html/main.html';
}
btn.onclick = function (event){
    event.preventDefault();
   getStd();
}


function getStd(){
    let promise = fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
    promise
        .then(async function (response){
            let listStd = await response.json();
                compare(listStd);

        })
        .catch(function(error){
            console.log(error);
        })
}

function compare(listStd){
    let list = listStd.length;

    for(let i = 0; i < list; i++){
        let student = listStd[i];
        if(student.name == searchStudent.value){
            searchStudent.value = ""
            message.classList = ""
            
            message.innerHTML = 'Tìm thấy học viên'
            message.classList.add("text-success")
            table.innerHTML =  `<tr>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.address}</td>
            <td>${student.point}</td>
        </tr>`
            return
        }else{
            message.innerHTML = 'Không tìm thấy học viên'
            message.classList.add("text-danger")
        }
    }
}