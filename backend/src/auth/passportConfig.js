const LocalStrategy = require('passport-local');
const User = require('../models/user');
const MakerChecker = require('../models/makerChecker');

module.exports = (passport) => {
    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, email, password, done) => {
                if (!req.user)
                    return done(null, false, {
                        errorCode: 404,
                        message: 'You are not logged in.',
                    });
                if (req.user.role !== 'admin')
                    return done(null, false, {
                        errorCode: 401,
                        message:
                            'You are not authorized to perform this action.',
                    });
                try {
                    // check if user exists
                    const userExists = await User.findOne({ email });
                    if (userExists) {
                        return done(null, false);
                    }
                    // Create a new user with the user data provided
                    const extraAttributes = {
                        role: req.body.role || 'member',
                        date_joined: new Date(),
                    };

                    const user = await MakerChecker.create({
                        type: 'user',
                        action: 'create',
                        primary_admin:  req.user.id,
                        data: {
                            email,
                            password,
                            ...req.body,
                            ...extraAttributes
                        }
                    });
                    return done(null, user);
                } catch (error) {
                    done(error);
                }
            }
        )
    );

    passport.use(
        'local-login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
            },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ email });
                    if (!user) return done(null, false);
                    const isMatch = await user.matchPassword(password);
                    if (!isMatch) return done(null, false);
                    // if passwords match return user
                    return done(null, user);
                } catch (error) {
                    console.log(error);
                    return done(error, false);
                }
            }
        )
    );

    passport.serializeUser((user, cb) => {
        process.nextTick(() => {
            cb(null, { id: user.id, email: user.email, role: user.role });
        });
    });

    passport.deserializeUser((user, cb) => {
        process.nextTick(() => cb(null, user));
    });
};
