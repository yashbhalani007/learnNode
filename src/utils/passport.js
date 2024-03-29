const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const User = require('../model/user.model');


const connectPassport = () => {
    try {

        passport.use(new GoogleStrategy({
            clientID: '139490470532-1d4d2idt2k9ucjuia6iol8fm0m9jvrk9.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: "http://localhost:3000/v1/users/google/callback"
        },
           async function (accessToken, refreshToken, profile, cb) {
                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });

                try {
                    const user = await User.findOne({ googleId: profile.id })
                    console.log(user);
                    if (!user) {
                        console.log('userauthhhhh');
                       await User.create({
                            name: profile.displayName,
                            googleId: profile.id
                        })
                    }

                    passport.serializeUser(function (user, done) {
                        done(null, user.id);
                    });

                    passport.deserializeUser(function (id, done) {
                        User.findById(id, function (err, user) {
                            done(err, user);
                        });
                    });

                    return cb(null, user);

                } catch (err) {
                    return cb(err, null);
                }
            }
        ));

    } catch (error) {
        console.log(error);
    }
}


const connectFacebook = () => {
    try {

        passport.use(new FacebookStrategy({
            clientID: '336377512711030',
            clientSecret: 'caf7c55d73ec242a5820d8952c17e800',
            callbackURL: "http://localhost:3000/v1/users/facebook/callback"
        },
            function (accessToken, refreshToken, profile, cb) {
                // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
                //   return cb(err, user);
                // });
            }
        ));

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectPassport,
    connectFacebook
}