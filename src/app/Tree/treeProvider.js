const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const {
  response,
  errResponse,
  getDecorationResponse,
} = require("../../../config/response");

const treeDao = require("./treeDao");

exports.retrieveDecorationList = async function (userIdx, ownerNickname) {
  const connection = await pool.getConnection(async (conn) => conn);

  const decorationList = await treeDao.selectDecorations(connection, userIdx);

  // 긴 닉네임 자르기
  decorationList.forEach((decoration) => {
    if (decoration.nickname.length > 5) {
      decoration.nickname = decoration.nickname.substr(0, 5) + "...";
    }
  });
  connection.release();

  return getDecorationResponse(
    baseResponse.SUCCESS,
    ownerNickname,
    decorationList
  );
};

exports.retrieveDecoration = async function (decorationIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const decoration = await treeDao.selectDecoration(connection, decorationIdx);

  connection.release();

  if (!decoration) {
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

// 유저 status 값 조회
exports.userStatusCheck = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const userRow = await treeDao.selectUserIdx(connection, userIdx);
  if (!userRow) return errResponse(baseResponse.USER_IDX_NOT_MATCH);

  connection.release();

  // 계정 상태 확인
  if (userRow.status == "BANNED") {
    return errResponse(baseResponse.SIGNIN_BANNED_ACCOUNT);
  }
  if (userRow.status == "DELETED") {
    return errResponse(baseResponse.SIGNIN_WITHDRAWAL_ACCOUNT);
  }
  return;
};

// 24시간 내에 트리에 글을 쓴 적이 있는지 검사
exports.checkWriterHistory = async function (userIdx, writerIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const decorationRow = await treeDao.selectDecorationTime(
    connection,
    userIdx,
    writerIdx
  );

  connection.release();

  return decorationRow;
};
