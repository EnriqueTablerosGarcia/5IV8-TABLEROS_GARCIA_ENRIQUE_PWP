import { Router } from "express";
import * as ProductController from '../controllers/productcontroller.js';

const router = Router();

router.get('/products', ProductController.create);

export default router;