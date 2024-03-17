const express = require('express');
const uuid = require('uuid');

const router = express.Router();
const itemsDal = require('../services/pg.items.dal')

router.get('/', async (req, res) => {
  try {
     let theItems = await itemsDal.getItems(); 
      if(DEBUG) console.table(theItems);
      res.render('items', {theItems});
  } catch {
      res.render('503');
  }
});

router.get('/:id', async (req, res) => {
  try {
      let anItem = await itemsDal.getItemByItemId(req.params.id); // from Postgresql
      if(DEBUG) console.table(anItem);
      if (anItem.length === 0)
          res.render('norecord')
      else
          res.render('item', {anItem});
  } catch {
      res.render('503');
  }
});

router.get('/:id/edit', async (req, res) => {
  if(DEBUG) console.log('item.Edit : ' + req.params.id);
  res.render('itemPatch.ejs', {name: req.query.name, description: req.query.description, theId: req.params.id});
});

router.get('/:id/delete', async (req, res) => {
  if(DEBUG) console.log('item.Delete : ' + req.params.id);
  res.render('itemDelete.ejs', {name: req.query.name, theId: req.params.id});
});

router.post('/', async (req, res) => {
  if(DEBUG) console.log("items.POST");
  try {
      await itemsDal.addItem(req.body.name, req.body.description, req.body.price, uuid.v4());
      res.redirect('/items/');
  } catch (err){
      res.render('503');
  } 
});

router.patch('/:id', async (req, res) => {
  if(DEBUG) console.log('items.PATCH: ' + req.params.id);
  try {
      await itemsDal.patchLogin(req.params.id, req.body.name, req.body.description, req.body.price);
      res.redirect('/items/');
  } catch {
      res.render('503');
  }
});

router.delete('/:id', async (req, res) => {
  if(DEBUG) console.log('items.DELETE: ' + req.params.id);
  try {
      await itemsDal.deleteItem(req.params.id);
      res.redirect('/items/');
  } catch {
      res.render('503');
  }
});

module.exports = router