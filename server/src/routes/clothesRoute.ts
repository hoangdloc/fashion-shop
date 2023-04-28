import express from 'express';

import clothesController from './../controllers/clothesController';

const router = express.Router();

router
  .route('/')
  .get(clothesController.getAllClothes)
  .post(clothesController.createClothes);

router.route('/:id').get(clothesController.getClothes);

export default router;
