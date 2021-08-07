const express = require("express");
var bodyParser = require("body-parser");
//DATABASE
const database = require("./database");

//INITIALISE EXPRESS
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

/*
Route		    	/
Description		Get all the books
Access			  PUBLIC
Parameters		NONE
Method			  GET
*/

booky.get("/", (req,res) => {
	return res.json({books: database.books});
});


/*
Route			    /is
Description		Get specific books with ISBN
Access			  PUBLIC
Parameters		isbn
Method			  GET
*/

booky.get("/is/:isbn", (req,res) => {
	const getSpectificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

	if (getSpectificBook.length === 0) {
		return res.json({error: `No book found for the ISBN of '${req.params.isbn}'`});
	}

	return res.json({book: getSpectificBook});
});


/*
Route			    /c
Description		Get specific book based on category
Access		  	PUBLIC
Parameters		category
Method			  GET
*/

booky.get("/c/:category", (req, res) => {
	const getSpectificBook = database.books.filter(
    (book) => book.category.includes(req.params.category)
  );

	if (getSpectificBook.length === 0) {
		return res.json({error: `No books found for the category ${req.params.category}`});
	}

	return res.json({book: getSpectificBook});
});


/*
Route	    		/language
Description		Get specific book based on Language
Access			  PUBLIC
Parameters		lan
Method			  GET
*/

booky.get("/language/:l", (req, res) => {
	const getSpectificBook = database.books.filter(
    (book) => book.language === (req.params.lan)
  );

	if (getSpectificBook.length === 0)
		return res.json({error: `No books found for the language ${req.params.lan}`});

	return res.json({book: getSpectificBook});
});


/*
Route			    /author
Description		Get all authors
Access			  PUBLIC
Parameters		NONE
Method			  GET
*/

booky.get("/author", (req, res) => {
	return res.json({authors: database.author});
});


/*
Route			    /author
Description		Get all authors
Access			  PUBLIC
Parameters		id
Method			  GET
*/

booky.get("/author/:id", (req, res) => {
	const getSpectificAuthor = database.author.filter(
    (author) => author.id === parseInt(req.params.id)
  );

	if (getSpectificAuthor.length === 0)
		return res.json({error: `No author found for the ID of ${req.params.id}`});

	return res.json({authors: getSpectificAuthor});
});


/*
Route			    /author/book
Description		Get all author based on specific book
Access			  PUBLIC
Parameters		isbn
Method			  GET
*/

booky.get("/author/book/:isbn", (req, res) => {
	const getSpectificAuthor = database.author.filter(
    (author) => author.books.includes(req.params.isbn)
  );

	if (getSpectificAuthor.length === 0)
		return res.json({error: `No author found for the book of ${req.params.isbn}`});

	return res.json({authors: getSpectificAuthor});
});


/*
Route			    /publications
Description		Get all publications
Access			  PUBLIC
Parameters		NONE
Method			  GET
*/

booky.get("/publications", (req, res) => {
	return res.json({publications: database.publications});
});


/*
Route			    /publications
Description		Get specific publications based on id
Access		   	PUBLIC
Parameters		id
Method		   	GET
*/

booky.get("/publications/:id", (req, res) => {
	const getSpectificPublication = database.publications.filter(
    (publication) => publication.id === parseInt(req.params.id)
  );

	if (getSpectificPublication.length === 0)
		return res.json({error: `No publication found for the id of ${req.params.id}`});

	return res.json({publications: getSpectificPublication});
});


/*
Route			    /publications/book
Description		Get specific publications based on isbn
Access			  PUBLIC
Parameters		isbn
Method			  GET
*/

booky.get("/publications/book/:isbn", (req, res) => {
	const getSpectificPublication = database.publications.filter(
    (publication) => publication.books.includes(req.params.isbn)
  );

	if (getSpectificPublication.length === 0)
		return res.json({error: `No publication found for the book of ${req.params.isbn}`});

	return res.json({publications: getSpectificPublication});
});

/*
Route			    /book NEW
Description		ADD NEW BOOKS
Access			  PUBLIC
Parameters		NONE
Method			  GET
*/
booky.post("/book/new", (req, res) => {
	const newBook = req.body;
	database.books.push(newBook);
	return res.json({updatedBooks: database.books});
});

/*
Route			    /AUTHOR/NEW
Description		 ADD NEW authors
Access			  PUBLIC
Parameters		NONE
Method			  GET
*/
booky.post("/author/new", (req, res) => {
	const newAuthor = req.body;
	database.author.push(newAuthor);
	return res.json(database.author);
});

/*
Route			     /publications/new
Description		 ADD NEW PUBLICATIONS
Access			   PUBLIC
Parameters		 NONE
Method			   GET
*/
booky.post("/publications/new", (req, res) => {
	const newPublication = req.body;
	database.publications.push(newPublication);
	return res.json(database.publications);
});



booky.listen(3000, () => {
	console.log("Server is up at 3000");
});
