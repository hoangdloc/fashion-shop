import express from 'express';

import clothesController from './../controllers/clothesController';

const router = express.Router();

router
  .route('/')
  .get(clothesController.getAllClothes)
  .post(clothesController.createClothes);

router.route('/:id').get(clothesController.getClothes);

router.route('/current/:slug').get(clothesController.getCurrentClothes);

export default router;
