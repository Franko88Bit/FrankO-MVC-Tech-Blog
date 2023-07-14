document.querySelector("#login").addEventListener("submit",event=> {
    event.preventDefault();
    const userFrank = {
        username:document.querySelector("#loginUsername").value,
        password:document.querySelector("#loginPassword").value,
    }
    console.log(userFrank)
    fetch("/api/users/login",{
        method:"POST",
        body:JSON.stringify(userFrank),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            console.log("Logs in user")
            location.href="/dashboard"
        } else {
            alert("Try again please")
        }
    })
})