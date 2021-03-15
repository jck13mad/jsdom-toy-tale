let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function fetchToys() {
  return fetch('https:localhost:3000/toys') 
    .then(resp => resp.json)
    .then(json => renderToys(json))
}

function sendDataForToys(form) {
  fetch('https:localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  },
  body: JSON.stringify({
    name: form.name.value, image: form.image.value, likes: 0
  })
})
.then(resp => resp(json))
.then(newToy => {
  const toyContainer = document.querySelector('#toy-collection')
  toyContainer.insertAdjacentElement('beforeend', 
  `<div class="card">
  <h2>${newToy.name}</h2>
  <img src=${newToy.image} class="toy-avatar" />
  <p><span class="counter" data-id="${newToy.id}" > ${newToy.likes = 0}</span>Likes</p>
  <button class="like-btn" data-id="${newToy.id}" > Like <3</button>
  </div`)
  form.reset()
})
}

function renderToys(json) {
const toyContainer = document.querySelector('#toy-collection')
json.forEach(toy => {
  const div = document.createElement('div')
  div.className = 'card'
  div.innerHTML = `<h2>${toy.name}</h2>
  <img src=${toy.image} class='#toy-avatar' />
  <p><span class='counter' data-id='${toy.id}' > ${toy.likes} = 0</span>Likes</p>
  <button class="like-btn" data-id="${toy.id}" > Like<3</button>`
  toyContainer.append(div)

})
}

let toyContainer = document.querySelector("#toy-collection")

toyContainer.addEventListener("click", function(e){
if (e.target.className === "like-btn"){

  let id = e.target.dataset.id
  let targetSpan;

  document.querySelectorAll("span.counter").forEach(function(span){
    if (span.dataset.id === e.target.dataset.id)
      targetSpan = span 
  })
  targetSpan.innerText++

  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      likes: parseInt(targetSpan.innerText)
    })
  })
  .then(response => response.json())
  }
})
})