const { Router } = require('express');
const { check } = require('express-validator');
const { validatorJWT } = require('../middlewares/jwt-validators');
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} = require('../controllers/events');
const { fieldsValidators } = require('../middlewares/fields-validators');
const { isDate } = require('../helpers/isDate');

const router = Router();

//middlewares
router.use(validatorJWT);

//get events
router.get('/', getEvents);

//create events
router.post(
    '',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha final es obligatoria').custom(isDate),
        fieldsValidators,
    ],
    createEvent
);

//update events
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha final es obligatoria').custom(isDate),
        fieldsValidators,
    ],
    updateEvent
);

//delete event
router.delete('/:id', deleteEvent);

module.exports = router;
