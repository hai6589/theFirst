let url = 'https://646b70fd7d3c1cae4ce3cdba.mockapi.io/hocvien'


function getStudent() {
    let promise = fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
    })
    promise
        .then(async function (response) {
            let listStudents = await response.json()
            console.log(listStudents)
            showList(listStudents)
        })
        .catch(function (erroe) {
            console.log(erroe);
        })
}
getStudent()

function showList(listStudents) {
    let str = '';
    for (let i = 0; i < listStudents.length; i++) {
        let student = listStudents[i];
        str += `<tr>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.address}</td>
        <td>${student.point}</td>
        <td><button class="btn btn-secondary" onclick="deleteStd(${student.id})">Xóa</button></td>
    </tr>`
    document.getElementById('list').innerHTML = str
    }
}

function deleteStd(id){
    let promise = fetch(url + '/' + id, {
        method: "DELETE",
        headers: {"content-type":"application/json"}
    })
    promise
        .then(response => response.json())
        .then(function(){
            getStudent();
        })
}

let btn = document.getElementById('btn-back');
btn.onclick = function () {
    window.location = '../html/main.html';
}