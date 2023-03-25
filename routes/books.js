import express from "express";
import {
  getAllBooks,
  getBookByID,
  deleteBookByID,
  addBooks,
  updateBooksByID,
  getBookBylanguage,
} from "../helper.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

//get all books
router.get("/", async (req, res) => {
  const { language, rating } = req.query; //search query after ?
  console.log(req.query, language);

  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const books = await getAllBooks(req);
  res.send(books);
});

//get books by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const book = await getBookByID(id);
  console.log(book);
  book ? res.send(book) : res.status(404).send({ message: "No Book found" });
});

//get language by ID
router.get("language/:language", async (req, res) => {
  const{ language } = req.params;
  console.log(language);
  const bo = await getBookBylanguage(language);
  console.log(bo);
  bo ? res.send(bo) : res.status(404).send({ message: "No Book found" });
});

//delete book ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const book = await deleteBookByID(id);
  res.send(book);
});

//add books
router.post("/", async (req, res) => {
  const newBooks = req.body;
  console.log(newBooks);

  const result = await addBooks(newBooks);
  res.send(result);
});

//update books

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateBooks = req.body;
  console.log(updateBooks);
  //db.books.updateOne({id: id},{$set: updateBooks } )
  const result = await updateBooksByID(id, updateBooks);
  res.send(result);
});

export const bookRouter = router;
