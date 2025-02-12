import { Router } from 'express';
import * as sliderController from '../controllers/sliderController.js';

const router = Router();

router.get('/', sliderController.getAllSliders);
router.get('/:id', sliderController.getSliderById);
router.post('/', sliderController.createSlider);
router.put('/:id', sliderController.updateSlider);
router.delete('/:id', sliderController.deleteSlider);

export default router;
