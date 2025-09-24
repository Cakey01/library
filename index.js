// library array
const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBookToLibrary(library) {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const read = document.getElementById('read');

    const book = new Book(title.value, author.value, pages.value, read.value);
    library.push(book);
    resetInputs();
    console.log(library);
    console.log(library[0]["title"])
    reset();
    show(library);
}

function resetInputs() {
    title.value = ''
    author.value = ''
    pages.value = ''
    read.value = 'no'
}


// form
const dialog = document.querySelector("dialog");
const add = document.getElementById('add');
const submit = document.getElementById('submit');
const close = document.getElementById('close');


// show dialog
add.addEventListener('click', () => {
    dialog.showModal();
})

//stop submit
submit.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary(library);
    dialog.close();
})

// close dialog
close.addEventListener('click', () => {
    dialog.close();
})

// reset container before showing
function reset() {
    const cards = document.querySelectorAll('.card');

    if (!cards) {
        return
    } else {
        cards.forEach(card => card.remove())
    }
}

// show books in library
function show(library) {
    library.forEach((book) => {
        const container = document.querySelector('.card-container');
        const card = document.createElement('div');
        const title = document.createElement('h2');
        const author = document.createElement('h3');
        const pages = document.createElement('h5');
        const read = document.createElement('h5');

        title.textContent = book['title'];
        author.textContent = book['author'];
        pages.textContent = book['pages'];
        read.textContent = book['read'];

        card.classList.add('card');
        card.setAttribute('id', book['id']);
        card.appendChild(title);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);

        container.appendChild(card);
    })
}