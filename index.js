const content = document.querySelector("#content");
const submit = document.querySelector('#add');
const update = document.querySelector("#update");

//POST API
submit.addEventListener('click', () => {
    let fname = document.querySelector('#fname').value;
    let lname = document.querySelector('#lname').value;
    let email = document.querySelector('#email').value;
    let gender = document.querySelector('#gender').value;
    let formData={fname, lname, email, gender};

    fetch('http://localhost:7400/api/users', {
        method: 'POST',
        body: JSON.stringify(formData), 
        headers: {
            "Content-Type": "application/json",
        },
    }).catch((error) => {
        console.log(error);
    })
    alert("User Added Successfully");
    location.reload();
});

window.addEventListener('load', () => {
    getUsers();
})

function getUsers(){
    let html = ""
    //FETCH API
    //fetch('https://employeesbscs.onrender.com/api/users', {mode:'cors'})

    fetch('http://localhost:7400/api/users', {mode:'cors'})

    .then(response=>{
        console.log(response);
        return response.json();
    })

    .then(data=>{
        console.log(data);
        data.forEach(element=>{
            html+=`<li> ${element.first_name} ${element.last_name} <a href="javascript:void(0)" onClick="deleteMember(${element.id})">Delete</a>
            <a href="javascript:void(0)" onClick="updateMember(${element.id})">Update</a></li>`

            
        })

        content.innerHTML=html;
    })
    .catch(error=>{
        console.log(error);
    })
}


//DELETE
function deleteMember(id){

    let text;

    if (confirm("Press a button!") == true) {
        text = "You pressed ok";
    
    fetch("http://localhost:7400/api/users",{
        method:'DELETE',
        body: JSON.stringify({id}),
        headers:{
            "Content-Type":"application/json",
        },
    }).then(response=> response.text())
    .then(response=>console.log(response))
    .catch(error=>{
        console.log(error);
    })}     
    else {
        text = "you cancelled";}

        location.reload();
    }

    // search
    function updateMember(id){
        fetch (`http://localhost:7400/api/users/${id}` )
        .then( response => response.json())
        .then(data => {
            
            document.querySelector("#fname").value=data[0].first_name;
            document.querySelector("#lname").value=data[0].last_name;
            document.querySelector("#email").value=data[0].email;
            document.querySelector("#gender").value=data[0].gender;

            document.querySelector("#ID").value=data[0].id;
        }).catch(error=> {
            console.log(error)
        })
    }

    // put
    update.addEventListener('click', () => {
        let fname = document.querySelector("#fname").value;
        let lname = document.querySelector("#lname").value;
        let email = document.querySelector("#email").value;
        let gender = document.querySelector("#gender").value;

        let id = document.querySelector("#ID").value

        let formdata = {fname,lname,email,gender,id};
        fetch (`http://localhost:7400/api/users`, {
            method: 'PUT',
            body: JSON.stringify(formdata),
            headers : {
                "Content-Type" : "application/json",
            },
        }).catch((error)=>{
            console.log(error);
        })
        alert("User Updated Successfully")
        location.reload();
})