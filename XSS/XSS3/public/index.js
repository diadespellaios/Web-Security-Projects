const postContent = document.getElementById("post-content")
const postAuthor = document.getElementById("post-author")
const submit = document.getElementById("submit")
const posts = document.getElementById("posts")

const PORT = location.port

const renderPosts = async () => {
  const fetchPosts = await fetch(`http://localhost:${PORT}/posts`)

  const queryResult = await fetchPosts.json()

  if (queryResult)
    posts.style.display = "block"

  posts.innerHTML = `${queryResult}`
}

renderPosts()

const addPost = async () => {
  await fetch(`http://localhost:${PORT}/post`, {
    method: "POST",
    body: JSON.stringify({
      author: `${postAuthor.value}`,
      content: `${postContent.value}`
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  postContent.value = ''
  postAuthor.value = ''
  
  renderPosts()
}

postAuthor.addEventListener("keypress", (e) => {
  if(e.key === "Enter")
    addPost()
})

submit.addEventListener("click", addPost)