// It might be a good idea to add event listener to make sure this file 
// only runs after the DOM has finshed loading. 
document.addEventListener("DOMContentLoaded", callBack)

function callBack() {
    getQuotes();
}


function getQuotes() {
    fetch(`http://localhost:3000/quotes?_embed=likes`)
    .then(response => response.json())
    .then(objects => {objects.forEach(object => renderQuotes(object))})
}

function renderQuotes(object) {
    let quoteList = document.getElementById('quote-list')

    let quoteLi = document.createElement('li')
    quoteLi.classList.add('quote-card')

    let blockQuoteLi = document.createElement('blockquote')
    blockQuoteLi.classList.add('blockquote')

    let pLi = document.createElement('p')
    pLi.classList.add('mb-0')
    pLi.innerText = object.quote

    let footerLi = document.createElement('footer')
    footerLi.classList.add('blockquote-footer')
    footerLi.innerText = object.author

    let likeButton = document.createElement('button')
    likeButton.classList.add('btn-success')
    likeButton.innerText = 'Likes:'
    let likeButtonSpan = document.createElement('span')
    likeButtonSpan.innerText = 0
    likeButton.appendChild(likeButtonSpan)

    let deleteButton = document.createElement('button')
    deleteButton.classList.add('btn-danger')
    deleteButton.innerText = 'Delete'
    deleteButton.addEventListener('click', () => {deleteQuote(event, object)})
    let br = document.createElement('br')

    blockQuoteLi.appendChild(pLi)
    blockQuoteLi.appendChild(footerLi)
    blockQuoteLi.appendChild(br)
    blockQuoteLi.appendChild(likeButton)
    blockQuoteLi.appendChild(deleteButton)
    quoteLi.appendChild(blockQuoteLi)
    quoteList.appendChild(quoteLi)

    let quoteForm = document.getElementById('new-quote-form')
    quoteForm.addEventListener('submit', createNewQuote)
}


function createNewQuote(event) {
    event.preventDefault()
    let data = {
        'quote': document.getElementById('new-quote').value,
        'author': document.getElementById('author').value
    }
    const configOptions = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(`http://localhost:3000/quotes`, configOptions)
    .then(response => response.json())
    .then(data => renderQuotes(data))
    .catch(error => console.log(error.message))
}



function deleteQuote(event, object) {
    let objectId = object.id
    let configOption = {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json'
        }
    }
    fetch(`http://localhost:3000/quotes/${objectId}`, configOption)
    .then(response => response.json())
    .then(data => hideQuote(event, data))
}


function hideQuote(event) {
    event.target.parentNode.parentNode.style.display = 'none'
}
