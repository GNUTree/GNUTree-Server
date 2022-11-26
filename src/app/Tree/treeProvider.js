const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const treeDao = require("./treeDao");

exports.retrieveDecorationList = async function (userEmail) {
  const connection = await pool.getConnection(async (conn) => conn);

  const userIdx = await treeDao.selectUserIdx(connection, userEmail);
  if (!userIdx) {
    return errResponse(baseResponse.TREE_USEREMAIL_NOT_EXIST);
  }

  const treeIdx = await treeDao.selectTreeIdx(connection, userIdx.idx);
  if (!treeIdx) {
    return errResponse(baseResponse.TREE_USERTREE_NOT_EXIST);
  }

  const decorationList = await treeDao.selectDecorations(
    connection,
    treeIdx.idx
  );
  connection.release();
  return response(baseResponse.SUCCESS, decorationList);
};
