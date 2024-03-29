import express from "express"
import { getItems, createItems, deleteItem, updateItem, getItem  } from "../controllers/itemController.js"
import { verifyToken } from "../utils/verifyToken.js";
import { getWeek } from "../controllers/weekController.js";

const router = express.Router();

router
.get("/get", getItems)
.post("/create", createItems)
.delete('/delete/:id', deleteItem)
.post('/update/:id',verifyToken, updateItem)
.get('/get/:id', getItem)
.get('/week', getWeek)
// .get('/week', getWeek)
// .post('/cart', verifyToken, addItemToCart);

export default router;