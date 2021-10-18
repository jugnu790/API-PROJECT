require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
//DATABASE
const database = require("./database/database");


//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");


//INITIALISE EXPRESS
const booky = express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL,
{
	useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}
).then(()=> console.log("Connection Establish"));





/*                           GET METHOD                                       */




/*
Route		    	/
Description		Get all the books
Access			  PUBLIC
Parameters		NONE
Method			  GET
*/

booky.get("/", async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


/*
Route			    /is
Description		Get specific books with ISBN
Access			  PUBLIC
Parameters		isbn
Method			  GET
*/

booky.get("/is/:isbn", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
//null
    if (!getSpecificBook) {
        return res.json({error: `No Book found for the ISBN of ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});
});



/*
Route			    /c
Description		Get specific book based on category
Access		  	PUBLIC
Parameters		category
Method			  GET
*/

booky.get("/c/:category", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category});

    if (!getSpecificBook) {
        return res.json({error: `No Book found for the category of ${req.params.category}`});
    }
    return res.json({book: getSpecificBook});
});



/*
Route	    		/language
Description		Get specific book based on Language
Access			  PUBLIC
Parameters		lan
Method			  GET
*/
booky.get("/lang/:language", async(req, res) => {
    const getSpecificBook = await BookModel.findOne({language: req.params.language});

    if (!getSpecificBook) {
        return res.json({error: `No Book found for the language of ${req.params.language}`});
    }
    return res.json({book: getSpecificBook});
});



/*
Route			    /author
Description		Get all authors
Access			  PUBLIC
Parameters		NONE
Method			  GET
*/

booky.get("/authors", async(req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
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


booky.get("/Publications", async(req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
})

/*
Route        /publication
Description   Get specific publication based on name
 Access       PUBLIC
 Parameter     name
 Methods       GET
*/


booky.get("/publication/:name", (req, res) => {
    const getSpecificPublication = database.publication.filter(
        (publication) => publication.name.includes(req.params.name)
    );

    if (getSpecificPublication.length === 0) {
        return res.json({error: `No such publication found for name ${req.params.name}`});
    }
    return res.json({publication: getSpecificPublication});
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



/*                                POST METHOD                                 */


/*
Route			    /book NEW
Description		ADD NEW BOOKS
Access			  PUBLIC
Parameters		NONE
Method			  GET
*/
booky.post("/book/new", async(req, res) => {
    const {newBook} = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({
        books: addNewBook,
        message: "Book was added !!!"
    });
});


/*
Route			    /AUTHOR/NEW
Description		 ADD NEW authors
Access			  PUBLIC
Parameters		NONE
Method			  GET
*/
booky.post("/author/new", (req, res) => {
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json({
        author: addNewAuthor,
        message: "Author was added !!!"
    });
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



/*                                 PUT Method                                 */





/*
Route			     /publications/update/book
Description		 update book om isbn
Access			   PUBLIC
Parameters		 isbn
Method			   put

*/

booky.put("/book/update/:isbn",async (req,res)=>{
	const updatedBook = await BookModel.findOneAndUpdate(
		{
			ISBN: req.params.isbn
		},
		{
			title: req.body.bookTitle
		},
		{
			new: true
		}
	);

	return res.json({
		books: updatedBook
	});
});


/*
Route         /book/author/update
 Description   Update / Add new author
 Access        PUBLIC
 Parameter     ISBN
 Methods       PUT
*/
booky.put("/book/author/update/:isbn", async(req, res) => {
    //Update Book Database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
					ISBN: req.params.isbn
				},
        {
					$addToSet: {authors: req.body.newAuthor}
				},
        {
					new: true
				}
    );

    //Update Author Database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
        {
					id: req.body.newAuthor
				},
        {
					$addToSet: {books: req.params.isbn}
				},
        {
					new: true
				}
    );
    return res.json({
        books: updatedBook,
        authors: updatedAuthor,
        message: "New author was added"
    });
});


/*
Route         /book/publication/update
Description   Update / Add new publication
 Access       PUBLIC
 Parameter     ISBN
 Methods        PUT

*/

booky.put("/book/publication/update/:isbn", async(req, res) => {
    //Update Book Database
    const updatedBook = await BookModel.findOneAndUpdate(
        {
					ISBN: req.params.isbn
				},
        {
					$addToSet: {publications: req.body.newPublication}
				},
        {
					new: true
				}
    );

    //Update Publication Database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
        {
					id: req.body.newPublication
				},
        {
					$addToSet: {books: req.params.isbn}
			},
        {
					new: true
				}
    );
    return res.json({
        books: updatedBook,
        authors: updatedPublication,
        message: "New publication was added"
    });
});





/*                                    DELETE METHOD                           */




/*
Route			     \book/delete
Description		 DELETE books
Access			   PUBLIC
Parameters		 ISBN
Method			   DELETE
*/
booky.delete("/book/delete/:isbn", async(req, res) => {
	/*Whichever book that doesnot match with the isbn ,
	just send it to an updatedBookDatabase array
  and rest will be filtered out*/
    const updatedBookDatabase = await BookModel.findOneAndDelete({ISBN: req.params.isbn});
    return res.json({books: updatedBookDatabase});
});


/*
Route         /author/delete
Description  Delete author
Access       PUBLIC
Methods     DELETE
*/

booky.delete("/author/delete/:id", async(req, res) => {
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({id: req.params.id});
    return res.json({authors: updatedAuthorDatabase});
});


/*
Route			     \book/delete/author
Description		 DELETE an author from a book and vice versa
Access			   PUBLIC
Parameters		 ISBN authorId
Method			   DELETE
*/
booky.delete("/book/author/delete/:isbn/:authorId", async(req, res) => {
    //Update Book database
    const updatedBookDatabase = await BookModel.findOneAndDelete({ISBN: req.params.isbn});

    //Update Author database
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete({id: req.params.authorId});

    return res.json({
        books: updatedBookDatabase,
        authors: updatedAuthorDatabase,
        message: "Book and  Author is Deleted "
    });
});




booky.listen(3000, () => {
	console.log("Server is up at 3000");
});
