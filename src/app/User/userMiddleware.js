const { pool } = require("../../../config/database");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const userDao = require("../User/userDao");

const checkEmail = async (req, res, next) => {
  /**
   * Path Variable: userId
   */
  const { userId } = req.params;
  const userEmail = userId + "@gnu.ac.kr";

  if (!userId) {
    return res.send(errResponse(baseResponse.USERID_EMPTY));
  }

  const connection = await pool.getConnection(async (conn) => conn);
  const userIdx = await userDao.selectUserEmail(connection, userEmail);
  connection.release();

  if (userIdx.length == 0) {
    return res.send(errResponse(baseResponse.USEREMAIL_NOT_EXIST));
  }

  req.userIdx = userIdx[0].idx;
  req.nickname = userIdx[0].nickname;
  next();
};

module.exports = checkEmail;
