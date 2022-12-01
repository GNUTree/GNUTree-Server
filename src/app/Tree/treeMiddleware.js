const { pool } = require("../../../config/database");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const treeDao = require("../../app/Tree/treeDao");

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
  const userIdx = await treeDao.selectUserIdx(connection, userEmail);
  connection.release();

  if (!userIdx) {
    return res.send(errResponse(baseResponse.USEREMAIL_NOT_EXIST));
  }

  req.userIdx = userIdx.idx;
  next();
};

module.exports = checkEmail;
