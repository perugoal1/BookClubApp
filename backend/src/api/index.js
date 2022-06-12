const booksRouter = require('./book');
const usersRouter = require('./user');
const authRouter = require('./auth');

const initApiRoutes = (app) => {
    app.use('/book', booksRouter);
    app.use('/user', usersRouter);
    app.use('/auth', authRouter);
};

module.exports = initApiRoutes;
