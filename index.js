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
}

function resetInputs() {
    title.value = ''
    author.value = ''
    pages.value = ''
    read.value = 'no'
}


// form
const dialog = document.querySelector("dialog");
const show = document.getElementById('show');
const submit = document.getElementById('submit');


// show dialog
show.addEventListener('click', () => {
    dialog.showModal();
})

//stop submit
submit.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary(library);
    dialog.close();
})