document.querySelector("#signup").addEventListener("submit",event=>{
    event.preventDefault();
    const userFrank = {
        username:document.querySelector("#signupUsername").value,
        password:document.querySelector("#singupPassword").value,

    }
    console.log(userFrank)
    fetch("/api/users/",{
        method:"POST",
        body:JSON.stringify(userFrank),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("user is signed up")
            location.href="/dashboard"
        } else {
            alert("try again please")
        }
    })
})