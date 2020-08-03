const db = require("./../mongoDB/configDb")
var User = require('./../mongoDB/schemaUsers.js')





var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = db.secret;


module.exports = function (passport) {

    passport.use(new JwtStrategy(opts, async function (payload, done) {
        try {
            const user = await User.findById(payload.id).select('id email name')

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
        catch (e) {
            console.log(e);
        }
    }));
}


