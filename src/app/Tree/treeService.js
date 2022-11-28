const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const treeProvider = require("./treeProvider");
const treeDao = require("./treeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

exports.postDecoration = async function (imageUrl, nickname, message, userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const postDecorationInfoParams = [imageUrl, nickname, message, userIdx];
    await connection.beginTransaction();
    const postDecorationResult = await treeDao.insertDecoration(
      connection,
      postDecorationInfoParams
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    await connection.rollback();
    logger.error(`Web - postDecoration Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};

exports.deleteDecoration = async function (decorationIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction();
    const deleteDecorationResult = await treeDao.deleteDecoration(
      connection,
      decorationIdx
    );
    await connection.commit();
    return response(baseResponse.SUCCESS);
  } catch (err) {
    await connection.rollback();
    logger.error(`Web - deleteDecoration Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
};
