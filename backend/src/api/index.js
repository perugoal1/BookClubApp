const booksRouter = require('./book');
const usersRouter = require('./user');
const authRouter = require('./auth');
const analyticsRouter = require('./analytics');

const initApiRoutes = (app) => {
    app.use('/book', booksRouter);
    app.use('/user', usersRouter);
    app.use('/auth', authRouter);
    app.use('/analytics', analyticsRouter);
};

module.exports = initApiRoutes;
