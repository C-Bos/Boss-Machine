const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const { 
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
  } = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();
    }
});

//     GET /api/minions to get an array of all minions.
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

//     POST /api/minions to create a new minion and save it to the database.
//For all /api/minions and /api/ideas routes, any POST or PUT requests will send their new/updated resources in the request body. POST request bodies will not have an id property, you will have to set it based on the next id in sequence.
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

//     GET /api/minions/:minionId to get a single minion by id.
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

//     PUT /api/minions/:minionId to update a single minion by id.
//For all /api/minions and /api/ideas routes, any POST or PUT requests will send their new/updated resources in the request body. POST request bodies will not have an id property, you will have to set it based on the next id in sequence.
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});


//     DELETE /api/minions/:minionId to delete a single minion by id.
minionsRouter.delete('/:minionId', (req, res, next) => {
    const successfullyDeleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if(successfullyDeleted) {
        res.status(204);
    } else {
        res.status(500);
    } 
    res.send();
  });

