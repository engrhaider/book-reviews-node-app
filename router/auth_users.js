const express = require('express');
const jwt = require('jsonwebtoken');
let {books, getBookByISBN} = require("./../db/booksdb.js");
const users_router = express.Router();

let users = [];

const isValid = (username, password) => {
  let response = {error: false, message: 'Success.'}
  if (username === undefined || password === undefined || username.length == 0 || password.length == 0) {
    response = {error: true, message: 'Invalid request'};
  }
  const filtered_user = users.filter((user) => {
    return user.username === username
  });
  if (filtered_user.length) {
    response = {error: true, message: `A user with the username '${username}' already exists`};
  }
  return response;
}

const userExists = (username, password) => {
  return users.find((user) => {
    return user.username == username && user.password == password;
  });
}

//only registered users can login
users_router.post("/login", (req, res) => {
  const {username, password} = req.body;
  // check if user exists
  const user = userExists(username, password);
  if (user === undefined) {
    return res.status(404).json({message: "Invalid credentials"});
  }
  let accessToken = jwt.sign({
    data: user
  }, 'access', {expiresIn: 60 * 60});

  req.session.authorization = {
    accessToken
  }
  return res.status(200).json({message: "Login successful!"});
});

// Add a book review
users_router.put("/auth/review/:isbn", (req, res) => {
  getBookByISBN(req.params.isbn)
    .then((book) => {
      book.reviews[req.user.username] = req.body.review;
      books[req.params.isbn] = book;
      return res.status(200).json({data: book});
    })
    .catch((message) => {
      return res.status(403).json({message: message});
    });
});

// delete a book review
users_router.delete("/auth/review/:isbn", (req, res) => {
  getBookByISBN(req.params.isbn)
    .then((book) => {
      if (book.reviews[req.user.username] === undefined) {
        return res.status(403).json({message: "Review not found!"});
      }
      delete book.reviews[req.user.username];
      books[req.params.isbn] = book;
      return res.status(200).json({data: book});
    })
    .catch((message) => {
      return res.status(403).json({message: message});
    });
});

module.exports.authenticated = users_router;
module.exports.isValid = isValid;
module.exports.users = users;
