/**
 * File Name: pets.test.js
 * Description: Test file containing test cases for pets
 */

const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('../app');
const expect = chai.expect;

chai.use(chaiAsPromised);


describe('functional - pet', () => {
 
it('should fail to create a pet without name', async () => {
const res = await request(app).post('/pets').send({
age:'1',
colour:'white',
    });
expect(res.status).to.equal(400);
expect(res.body.message).to.equal('"name" is required');
  });
 
 
it('should fail to create a pet without age', async () => {
const res = await request(app).post('/pets').send({
name: 'Tommy',
colour:'white',
    });
expect(res.status).to.equal(400);
expect(res.body.message).to.equal('"age" is required');
  });
 
 
it('should fail to create a pet without Colour', async () => {
const res = await request(app).post('/pets').send({
name: 'Tommy',
age:'1',
    });
expect(res.status).to.equal(400);
expect(res.body.message).to.equal('"colour" is required');
  });
  
  
it('should create a pet', async () => {
 const pet = {
      name:  'Dolphin',
      age: 6,
      colour: 'Blue',
    };
const res = await request(app).post('/pets').send(pet);
expect(res.status).to.equal(201);
expect(res.body.name).to.equal(pet.name);
expect(res.body.age).to.equal(pet.age);
expect(res.body.colour).to.equal(pet.colour);
  });
  	
	
it('should list ALL Pets on GET', async()=> {
	const res = await request(app).get('/pets')
    expect(res.status).to.equal(500);
});


it('Should delete a pet', async () => {
        const pet = {
              name:  'Catty',
              age: 5,
              colour: 'White',
    };
     const res = await request(app).post('/pets').send(pet);
     expect(res.status).to.equal(201);
     expect(res.body.name).to.equal(pet.name);
     expect(res.body.age).to.equal(pet.age);
     expect(res.body.colour).to.equal(pet.colour);
	 
     const petRes = await request(app).post('/pets/delete').send({ _id: res.body._id });
     expect(petRes.status).to.equal(201);
     expect(petRes.body).to.equal("Pet deleted");
    });
	
});


  
 

