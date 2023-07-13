var existingBlogs = document.querySelector("#existingblogs")
var CreateNew = document.querySelector("#createNew")
var newPost = document.querySelector("#newpost")
var newBlog = document.querySelector('#newBlog')

function hideCreateNew() {
    CreateNew.hidden=true;
}

hideCreateNew();

newPost.addEventListener("submit",event=>{
    event.preventDefault()
    console.log('click')
    existingBlogs.hidden=true;
    newPost.hidden =true;
    CreateNew.hidden =false;
});

newBlog.addEventListener("submit", event => {
    var title = document.querySelector("#title").value;
    var content = document.querySelector("#content").value
    event.preventDefault()
    console.log('you clicked me')
    if (!title || !content {
        alert('Enter both title and content')
        return;
    }
    const blogObj = {
        title: title,
        content: content,
    }
    fetch("/api/blogs", {
        method:"POST",
        body:JSON.stringify(blogObj),
        headers:{
            "Content-Type":application/json
        }

    }).then(res=>{
        if(res.ok){
            CreateNew.setAttribute("hidden", false)
            location.reload()
        } else {
            alert("Error - try again")
        }
    })
})