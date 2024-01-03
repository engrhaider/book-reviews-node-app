let books = {
  1: {"author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {}},
  2: {"author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {}},
  3: {"author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {}},
  4: {"author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {}},
  5: {"author": "Unknown", "title": "The Book Of Job", "reviews": {}},
  6: {"author": "Unknown", "title": "One Thousand and One Nights", "reviews": {}},
  7: {"author": "Unknown", "title": "Nj\u00e1l's Saga", "reviews": {}},
  8: {"author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {}},
  9: {"author": "Honor\u00e9 de Balzac", "title": "Le P\u00e8re Goriot", "reviews": {}},
  10: {"author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {}}
}

module.exports = {
  books: JSON.parse(JSON.stringify(books)),
  getBooks: async () => {
    return new Promise((resolve, reject) => {
      try {
        resolve(books);
      } catch (ex) {
        reject("Couldn't fetch book");
      }
    });
  },
  getBookByISBN: async (isbn) => {
    return new Promise((resolve, reject) => {
      let isbnNum = parseInt(isbn);
      if (books[isbnNum]) {
        resolve(books[isbnNum]);
      } else {
        reject(`ISBN ${isbn} not found`);
      }
    })
  },
  getBookByTitle: async (title) => {
    return new Promise((resolve, reject) => {
      const filtered_books = Object.values(books).filter((book) => {
        return book.title === title;
      });
      if (filtered_books.length) {
        resolve(filtered_books);
      } else {
        reject(`No books associated with the title ${title}`);
      }
    })
  },
  getBookByAuthor: async (author) => {
    return new Promise((resolve, reject) => {
      const filtered_books = Object.values(books).filter((book) => {
        return book.author === author;
      });
      if (filtered_books.length) {
        resolve(filtered_books);
      } else {
        reject(`No books associated with the author ${author}`);
      }
    })
  }
};