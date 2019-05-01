const graphController = require('../controller/graphController');

module.exports = (router) => {
    router.get('/api/graph', graphController.graphGet)
    return router;
}