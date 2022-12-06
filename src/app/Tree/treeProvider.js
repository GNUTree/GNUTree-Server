const { pool } = require("../../../config/database");
const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const {
  response,
  errResponse,
  getDecorationResponse,
} = require("../../../config/response");
const { getDecorationImageUrl } = require("./decorationImageUrl");

const treeDao = require("./treeDao");

exports.retrieveDecorationList = async function (userIdx, ownerNickname) {
  const connection = await pool.getConnection(async (conn) => conn);

  const decorationList = await treeDao.selectDecorations(connection, userIdx);

  connection.release();

  // imageIdx -> imageUrl 변환
  decorationList[0].imageUrl = getDecorationImageUrl(
    parseInt(decorationList[0].imageUrl)
  );

  return getDecorationResponse(
    baseResponse.SUCCESS,
    ownerNickname,
    decorationList
  );
};

exports.retrieveDecoration = async function (decorationIdx, ownerNickname) {
  const connection = await pool.getConnection(async (conn) => conn);

  const decoration = await treeDao.selectDecoration(connection, decorationIdx);

  connection.release();

  if (decoration.length == 0) {
    return errResponse(baseResponse.DECORATION_NOT_EXIST);
  }

  return getDecorationResponse(baseResponse.SUCCESS, ownerNickname, decoration);
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

// 유저 status 값 조회 (boolean)
exports.userStatusCheck = async function (userIdx) {
  const connection = await pool.getConnection(async (conn) => conn);

  const userRow = await treeDao.selectUserIdx(connection, userIdx);

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
