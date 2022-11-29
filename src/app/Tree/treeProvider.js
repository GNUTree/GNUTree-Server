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

exports.retrieveDecoration = async function (decorationIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const decoration = await treeDao.selectDecoration(connection, decorationIdx);

  connection.release();

  if (decoration.length == 0) {
    return errResponse(baseResponse.DECORATION_NOT_EXIST);
  }

  return response(baseResponse.SUCCESS, decoration);
};

exports.decorationCheck = async function (decorationIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const decorationRow = await treeDao.existDecoration(
    connection,
    decorationIdx
  );

  connection.release();

  return decorationRow;
};
