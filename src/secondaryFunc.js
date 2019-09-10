export function fetchData (id, bodyData, load) {   
  fetch(`https://bloggy-api.herokuapp.com/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bodyData)
  })
    .then(data => load(id))
}