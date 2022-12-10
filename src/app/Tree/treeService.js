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
  writerIdx
) {
  // 장식품 생성자 status 검사
  const checkUserStatus = await treeProvider.userStatusCheck(writerIdx);
  if (checkUserStatus) {
    return checkUserStatus;
  }
  // 24시간 내에 트리에 글을 쓴 적이 있는지 검사
  const checkWriterHistory = await treeProvider.checkWriterHistory(
    userIdx,
    writerIdx
  );
  if (checkWriterHistory) {
    return errResponse(baseResponse.DECORATION_WRITE_TOO_MUCH);
  }

  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const postDecorationInfoParams = [
      imageUrl,
      nickname,
      message,
      userIdx,
      writerIdx,
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

exports.deleteDecoration = async function (decorationIdx, writerIdx) {
  const connection = await pool.getConnection(async (conn) => conn);
  try {
    const isExistDecoration = await treeProvider.decorationCheck(decorationIdx);
    // 장식품이 존재하는지 확인
    if (!isExistDecoration) {
      return errResponse(baseResponse.DECORATION_NOT_EXIST);
    }
    // 작성자 검증
    if (writerIdx !== isExistDecoration.writerIdx) {
      return errResponse(baseResponse.DECORATION_writer_NOT_MATCHED);
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
