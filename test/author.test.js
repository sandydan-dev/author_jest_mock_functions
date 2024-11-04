const { beforeEach, describe, mock } = require("node:test");
const {
  getAllAuthors,
  getAuthorById,
  addNewAuthor,
} = require("../controllers/author.controller");
const { app } = require("../index");

// require http method
const http = require("http");

// define jest mock functions
jest.mock("../controllers/author.controller.js", () => ({
  ...jest.requireActual("../controllers/author.controller.js"),
  getAllAuthors: jest.fn(),
  getAuthorById: jest.fn(),
  addNewAuthor: jest.fn(),
}));

// initialize server variable to create server
let server;

// create  server before all test
beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

// close server after  all test done
afterAll((done) => {
  server.close(done);
});

// describe test suite for author controller

describe("test author function ", () => {
  // when all test are done clear or reset all mock  function

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // get author mock function
  test("should return all authors", () => {
    let mockAuthor = [
      { authorId: 1, name: "George Orwell", book: "1984" },
      { authorId: 2, name: "Aldous Huxley", book: "Brave New World" },
      { authorId: 3, name: "Ray Bradbury", book: "Fahrenheit 451" },
    ];

    // check what data  is passed to the function
    getAllAuthors.mockReturnValue(mockAuthor);

    //  call the function
    let result = getAllAuthors();
    // expect  the result to be equal to the mock data
    expect(result).toEqual(mockAuthor);
    // expect to have  called the function once, just access function name do not call
    expect(getAllAuthors).toHaveBeenCalled();
  });

  //  get author by id mock function
  test("should return mock function which is get author id", () => {
    let mockAuthor = { authorId: 1, name: "George Orwell", book: "1984" };
    // check what data  is passed to the mock function
    getAuthorById.mockReturnValue(mockAuthor);
    let result = getAuthorById(1);
    // expect  the result to be equal to the mock data
    expect(result).toEqual(mockAuthor);
    // expect  to have  called the function once, just access function name do not call
    expect(getAuthorById).toHaveBeenCalledWith(1);
  });

  // if author id not found showing undefined
  test("should return mock  function which is get author id not found", () => {
    let mockAuthor = undefined;
    getAuthorById.mockReturnValue(mockAuthor);
    let result = getAuthorById(143);
    expect(result).toBeUndefined();
    expect(getAuthorById).toHaveBeenCalledWith(143);
  });

  // add new author  mock function
  test("should return new author data to mock function", () => {
    let mockAuthor = {
      authorId: 4,
      name: "J.K. Rowling",
      book: "Harry Potter",
    };
    addNewAuthor.mockReturnValue(mockAuthor);
    let result = addNewAuthor(mockAuthor);
    expect(result).toEqual(mockAuthor);
    expect(addNewAuthor).toHaveBeenCalledWith(mockAuthor);
  });
});
