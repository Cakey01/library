class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = crypto.randomUUID();
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, pages, read) {
        const book = new Book(title, author, pages, read);

        this.books.push(book);
    }

    removeBook(id) {
        console.log(this.books)
        const toDelete = this.books.find(book => book.id === id);
        const index = this.books.indexOf(toDelete);
        this.books.splice(index, 1);
    }

    changeRead(id, selected) {
        const toChange = this.books.find(book => book.id === id);
        const index = this.books.indexOf(toChange);
        this.books[index]['read'] = selected.value;
    }

}

class Display {
    constructor(library) {
        // dialog
        this.dialog = document.querySelector('dialog');
        this.add = document.getElementById('add');
        this.submit = document.getElementById('submit');
        this.close = document.getElementById('close');
        this.form = document.querySelector('form');
        this.title = document.getElementById('title');
        this.author = document.getElementById('author');
        this.pages = document.getElementById('pages');
        this.read = document.getElementById('read');
        this.library = library;
    }

    resetInputs() {
        this.title.value = '';
        this.author.value = '';
        this.pages.value = '';
        this.read.value = 'Want to read';
    }

    addCard() {
        this.library.addBook(
            this.title.value, 
            this.author.value, 
            this.pages.value, 
            this.read.value
        );
        this.resetInputs();
        this.dialog.close();
        this.show();
    }

    removeCard() {
        const remove = document.querySelectorAll('.remove');
        remove.forEach(button => {
            button.addEventListener('click', () => {
                const card = button.parentElement;
                const id = card.dataset.id;
                this.library.removeBook(id);
                this.show();    
            });
        });
    }

    changeRead() {
        const selects = document.querySelectorAll('.card-read');
        selects.forEach(selected => {
            selected.addEventListener('change', () => {
                const card = selected.parentElement;
                const id = card.dataset.id;
                this.library.changeRead(id, selected);
                this.show();
            });
        });
    }

    clear() {
        const cards = document.querySelectorAll('.card');
        if (!cards) {
            return;
        } else {
            cards.forEach(card => card.remove());
        }
    }
    
    show() {
        this.clear();
        this.library.books.forEach((book) => {
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
        this.removeCard();
        this.changeRead();
    }

    eventListeners() {
        // show modal
        this.add.addEventListener('click', () => {
            this.dialog.showModal();
        });
        // submit
        // this.submit.addEventListener('click', this.addCard.bind(this));
        this.submit.addEventListener('click', (e) => {

            // reset custom validities
            this.title.setCustomValidity('');
            this.author.setCustomValidity('');
            this.pages.setCustomValidity('');

            // check title
            if (this.title.validity.valueMissing) {
                this.title.setCustomValidity('Please enter book title');
            }

            // check author
            if (this.author.validity.valueMissing) {
                this.author.setCustomValidity('Please enter author name');
            }

            // check pages
            if (this.pages.validity.valueMissing) {
                this.pages.setCustomValidity('Please enter number of pages');
            }

            if (!this.form.checkValidity()) {
                return;
            }

            e.preventDefault();
            this.addCard();
        });
        this.form.addEventListener('keydown', (event) => {
            if(event.key === 'Enter') {
                this.addCard(event);
            }
        });
        // close modal
        this.close.addEventListener('click', (event) => {
            event.preventDefault();
            this.dialog.close();
        });
    }
}

const library = new Library();
const display = new Display(library);
display.eventListeners();