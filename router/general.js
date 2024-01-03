const express = require('express');
let {books, getBooks, getBookByISBN, getBookByAuthor, getBookByTitle} = require("./../db/booksdb.js");
let {users, isValid} = require("./auth_users.js");

const public_router = express.Router();
// register a new user
public_router.post("/register", (req, res) => {
  let {username, password} = req.body;
  const result = isValid(username, password);
  if (result.error) {
    return res.status(405).json({message: result.message});
  }
  const newUser = {username: username, password: password};
  users.push(newUser);
  return res.status(200).json({message: "User created", data: newUser});
});

// Get the book list available in the shop
public_router.get('/', function (req, res) {
  return res.status(200).json({data: books});
});

// Get book details based on ISBN
public_router.get('/isbn/:isbn', function (req, res) {
  getBookByISBN(req.params.isbn)
    .then((book) => {
      return res.status(200).json({data: book});
    })
    .catch((message) => {
      return res.status(403).json({message: message});
    });
});

// Get book details based on author
public_router.get('/author/:author', function (req, res) {
  getBookByAuthor(req.params.author)
    .then((books) => {
      return res.status(200).json({data: books});
    })
    .catch((message) => {
      return res.status(403).json({message: message});
    });
});

// Get all books based on title
public_router.get('/title/:title', function (req, res) {
  getBookByTitle(req.params.title)
    .then((book) => {
      return res.status(200).json({data: book});
    })
    .catch((message) => {
      return res.status(403).json({message: message});
    });
});

//  Get book review
public_router.get('/review/:isbn', function (req, res) {
  getBookByISBN(req.params.isbn)
    .then((book) => {
      return res.status(200).json({data: book});
    })
    .catch((message) => {
      return res.status(403).json({message: message});
    });
});

module.exports.general = public_router;
