const { logger } = require("../../../config/winston");
const { pool } = require("../../../config/database");
const secret_config = require("../../../config/secret");
const treeProvider = require("./treeProvider");
const treeDao = require("./treeDao");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const res = require("express/lib/response");

exports.postDecoration = async function (
  imageUrl,
  nickname,
  message,
  userIdx,
  writterIdx
) {
  // 장식품 생성자 status 검사
  const checkUserStatus = await treeProvider.userStatusCheck(writterIdx);
  if (checkUserStatus) {
    return checkUserStatus;
  }

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const postDecorationInfoParams = [
      imageUrl,
      nickname,
      message,
      userIdx,
      writterIdx,
    ];
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
    const isExistDecoration = await treeProvider.decorationCheck(decorationIdx);
    if (!isExistDecoration) {
      return errResponse(baseResponse.DECORATION_NOT_EXIST);
    }

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
