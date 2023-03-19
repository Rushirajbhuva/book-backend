import { client } from "./index.js";
import bcrypt from "bcrypt";
export async function getAllBooks(req) {
  return await client
    .db("b40-b39-we")
    .collection("books")
    .find(req.query)
    .toArray();
}
export async function getBookByID(id) {
  return await client.db("b40-b39-we").collection("books").findOne({ id: id });
}
export async function deleteBookByID(id) {
  return await client
    .db("b40-b39-we")
    .collection("books")
    .deleteOne({ id: id });
}
export async function addBooks(newBooks) {
  return await client.db("b40-b39-we").collection("books").insertMany(newBooks);
}

export async function updateBooksByID(id, updateBooks) {
  return await client
    .db("b40-b39-we")
    .collection("books")
    .updateOne({ id: id }, { $set: updateBooks });
}

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10); // bcrypt.genSalt(no. of rounds)
  //console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  //console.log("hashedPassword", hashedPassword);
  return hashedPassword;
}

export async function createUser(username, hashedPassword) {
  return await client
    .db("b40-b39-we")
    .collection("users")
    .insertOne({ username: username, password: hashedPassword });
}

export async function getUserByName(username) {
  return await client
    .db("b40-b39-we")
    .collection("users")
    .findOne({ username: username });
}

export async function getUserList() {
  return await client.db("b40-b39-we").collection("users").find().toArray();
}
