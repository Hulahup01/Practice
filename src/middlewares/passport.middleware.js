const { Strategy } = require('passport-jwt');
const userRepository = require('../repositories/user.repository');

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt-access-token'];
    }
    return token;
}

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_ACCESS_SECRET,
}

module.exports = function (passport) {
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                const user = await userRepository.findOne({
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

