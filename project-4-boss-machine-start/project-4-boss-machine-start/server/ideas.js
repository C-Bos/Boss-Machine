const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

  ideasRouter.param('id', (req, res, next) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
});

// GET /api/ideas to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// POST /api/ideas to create a new idea and save it to the database.
//For all /api/minions and /api/ideas routes, any POST or PUT requests will send their new/updated resources in the request body. POST request bodies will not have an id property, you will have to set it based on the next id in sequence.
ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

// PUT /api/ideas/:ideaId to update a single idea by id.
//For all /api/minions and /api/ideas routes, any POST or PUT requests will send their new/updated resources in the request body. POST request bodies will not have an id property, you will have to set it based on the next id in sequence.
ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const successfullyDeleted = deleteFromDatabasebyId('ideas', req.params.id);
    if(successfullyDeleted) {
        res.status(204);
    } else {
        res.status(500);
    } 
    res.send();
  });

