/**
 * File Name: pets.js
 * Description: File to manage all the routes related to Pets
 */
 
const express = require('express');
const Joi = require('@hapi/joi');

const Pet = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

// API for Create Pets
router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pets name'),
    age: Joi.number().integer().required().description('Pets age'),
    colour: Joi.string().required().description('Pets Colour'),
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pet(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
);

//API for delete pets

router.post("/delete",
  validateBody(Joi.object().keys({
    _id: Joi.string().required().description('Pet _id')
  }),
    {
      stripUnknown: true,
    }), async (req, res, next) => {
      try {
        const petId = req.body._id;
        const pets = await Pet.deleteOne({ _id: petId });
        // res.status(201).json(pets);
        pets.deletedCount && res.status(201).json("Pet deleted");
      } catch (exception) {
        next(exception);
      }
    });
	
//API to get all the Pets

router.get("/", async (req, res, next) => {
  try {
    const pets = await pet.find().exec();
    res.status(201).json(pet);
  } catch (e) {
    next(e);
  }
});


module.exports = router;