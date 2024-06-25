const { Strategy } = require('passport-jwt');
const User = require("../models/user.entity");

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt-token'];
    }
    return token;
}

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
}

module.exports = (passport) => {
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                const user = await User.findOne({
                    where: {id: payload.id}
                })
                if (user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (err) {
                done(err);
            }
        })
    )
};

