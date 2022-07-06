/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  describe('GET /recipes:id', () => {
    it('should get 200', () =>{
     return agent.get('/recipes/716268')
     .then(res=>{
      expect(res.status).to.equal(200);
     })
  });
  it('should get a recipe', () =>{
    return agent.get('/recipes/716268')
    .then(res=>{
      
      expect(res.body).to.have.property('title');
      expect(res.body).to.have.property('image');
      expect(res.body).to.have.property('summary');
      expect(res.body).to.have.property('healthScore');
      expect(res.body).to.have.property('analyzedInstructions');
    })
  });
  it('should get a recipe with the correct id', () =>{
    return agent.get('/recipes/716268')
    .then(res=>{
      expect(res.body.id).to.equal('716268');
    })
  });
  it('should get a recipe with the correct title', () =>{
    return agent.get('/recipes/716268')
    .then(res=>{
      expect(res.body.title).to.equal('chicken');
    })
  })

 })
  });

