import { Router } from "express";
import { createOrder } from "../controllers/orderController.js";


const orderRouter = Router();




orderRouter.post('/create',createOrder);




export default orderRouter;