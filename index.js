// library array
const library = [];

    // variables


// function declarations
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
}

function resetInputs() {
    title.value = '';
    author.value = '';
    pages.value = '';
    read.value = 'Want to read';
}

function removeCard(library) {
    const remove = document.querySelectorAll('.remove');
    remove.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.parentElement;
            const id = card.dataset.id;
            const toDelete = library.find(book => book.id === id);
            const index = library.indexOf(toDelete);
            library.splice(index, 1);
            show(library);
        })
    })
}

// if read changes
function readChange(library) {
    const selects = document.querySelectorAll('.card-read');
    selects.forEach(select => {
        select.addEventListener('change', function() {

            const card = select.parentElement;
            const id = card.dataset.id;
            const book = library.find(book => book.id === id);
            const index = library.indexOf(book);
            library[index]['read'] = select.value;
        });
    });
}

// reset container before showing library
function resetLibrary() {
    const cards = document.querySelectorAll('.card');

    if (!cards) {
        return;
    } else {
        cards.forEach(card => card.remove());
    }
}

// show books in library
function show(library) {
    resetLibrary();
    library.forEach((book) => {
        const container = document.querySelector('.card-container');
        const card = document.createElement('div');
        const remove = document.createElement('button');
        const select = document.createElement('select');
        const values = ['Want to read', 'Reading', 'Read'];

        select.setAttribute('name', 'read');
        select.classList.add('read', 'card-read');
        
        remove.classList.add('remove');
        remove.textContent = 'remove';

        card.classList.add('card');

        for (const property in book) {
            if (property != 'id' && property != 'read') {
                const text = document.createElement('p');
                text.classList.add(property)
                text.textContent = book[`${property}`];
                card.appendChild(text);
            } else if (property == 'read') {
                const selected = book['read']; // want to read
                values.forEach(value => {
                    const option = document.createElement('option');
                    option.setAttribute('value', value);
                    option.textContent = value;
                    if (option.value === selected) {
                        option.setAttribute('selected', true);
                    }
                    select.appendChild(option);
                })
            } 
            
            else {
                card.dataset.id = book['id'];
            }
        }
        card.appendChild(select);
        card.appendChild(remove);
        container.appendChild(card);
    });
    removeCard(library);
    readChange(library);
}


// dialog
const dialog = document.querySelector('dialog');
const add = document.getElementById('add');
const submit = document.getElementById('submit');
const close = document.getElementById('close');

// show
add.addEventListener('click', () => {
    dialog.showModal();
});

// submit
submit.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary(library);
    resetInputs();
    dialog.close();
    show(library);
});

// close
close.addEventListener('click', () => {
    dialog.close();
});
