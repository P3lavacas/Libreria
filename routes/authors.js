const express = require('express');
const router = express.Router();
const Author = require('../models/author');

//Mostrar todos los autores
router.get('/', async(req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await Author.find({searchOptions});
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    });
  } catch {
res.redirect('/');
  }
});

//nuevo autor
router.get('/new', (req, res) =>{
  res.render('authors/new', { author: new Author() });
});

//crear autor
router.post('/', async(req, res) => {
  const author = new Author({
    name: req.body.name
  });
  try {
    const newAuthor = await author.save();
    //res.redirect(`authors/${newauthor.id}`);
    res.redirect('authors');
  } catch {
    res.render('authors/new', {
      author : author,
      errorMessage: 'Ocurrio un error'
    });
  }
});

module.exports = router;
