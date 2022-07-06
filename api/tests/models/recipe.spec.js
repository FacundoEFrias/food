const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Recipe model', async () => {
    it("property the : id, title, image, summary, healthScore, analyzedInstructions", async () =>{
      const recipe = await Recipe.findOne({ where: { title: 'Butternut Squash Stuffed Shells' } });
      expect(recipe.id).to.be.a('string');
      expect(recipe.title).to.be.a('string');
      expect(recipe.image).to.be.a('string');
      expect(recipe.summary).to.be.a('text');
      expect(recipe.healthScore).to.be.a('number');
      expect(recipe.analyzedInstructions).to.be.a('text');
    })
   it("contains the : title, image, summary, healthScore, analyzedInstructions", async () =>{
      const recipe = await Recipe.findOne({ where: { title: 'Butternut Squash Stuffed Shells' } });
      
      expect(recipe.title).to.have.property('Butternut Squash Stuffed Shells');

    });
  });
});

