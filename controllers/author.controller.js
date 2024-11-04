const authors = [
  { authorId: 1, name: "George Orwell", book: "1984" },
  { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
  { authorId: 3, name: "Ray Bradbury", book: "Fahrenheit 451" },
];

function getAllAuthors() {
  return authors;
}

function getAuthorById(id) {
  return authors.find((author) => author.authorId === id);
}

// add new author
function addNewAuthor(author) {
  let newAuthor = { id: authors.length + 1, ...author };
  authors.push(newAuthor);
  return newAuthor;
}

module.exports = { getAllAuthors, getAuthorById, addNewAuthor };
