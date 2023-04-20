import express from 'express';

import clothesController from './../controllers/clothesController';

const router = express.Router();

router.route('/').get(clothesController.getAllClothes)

export default router;
