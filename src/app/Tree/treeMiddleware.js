const { pool } = require("../../../config/database");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const userProvider = require("../User/userProvider");

const checkEmail = async (req, res, next) => {
  /**
   * Path Variable: userIdx
   */
  const { userIdx } = req.params;

  if (!userIdx) {
    return res.send(errResponse(baseResponse.USERIDX_EMPTY));
  }

  const user = await userProvider.retrieveUser(userIdx);

  if (!user) {
    return res.send(errResponse(baseResponse.USER_NOT_EXIST));
  }

  req.userIdx = user.idx;
  req.nickname = user.nickname;
  next();
};

module.exports = checkEmail;
