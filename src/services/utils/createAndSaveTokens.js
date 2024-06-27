const tokenService = require("../token.service");

module.exports = async (user) => {
    const { id, email, role } = user;
    const tokens = tokenService.generateTokens({ id, email, role });
    await tokenService.saveToken(user.id, tokens.refreshToken);
    return tokens;
}
