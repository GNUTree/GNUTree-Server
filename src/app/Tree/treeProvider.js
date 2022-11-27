const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const treeDao = require("./treeDao");

exports.retrieveDecorationList = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const decorationList = await treeDao.selectDecorations(connection, userIdx);

  connection.release();

  return response(baseResponse.SUCCESS, decorationList);
};
