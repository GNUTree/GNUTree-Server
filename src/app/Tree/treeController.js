const jwtMiddleware = require("../../../config/jwtMiddleware");
const treeProvider = require("../../app/Tree/treeProvider");
const treeService = require("../../app/Tree/treeService");
const userProvider = require("../User/userProvider");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { regexNickname, regexMessage } = require("../../../config/regex");

/**
 * API Name : 전체 장식품 조회 API
 * [GET] /trees/:userIdx
 */
exports.getDecorations = async function (req, res) {
  /**
   * Path Variable: userIdx
   * Middleware: userIdx, nickname
   */
  const userIdx = req.userIdx;
  const ownerNickname = req.nickname;

  const decorationListResult = await treeProvider.retrieveDecorationList(
    userIdx,
    ownerNickname
  );

  return res.send(decorationListResult);
};

/**
 * API NAME : 장식품 생성 API
 * [POST] /trees/:userIdx/decoration
 */
exports.postDecoration = async function (req, res) {
  /**
   * Body: imageIdx, nickname, message
   * jwt: userIdx
   * Middleware: userIdx, nickname
   */

  const { imageIdx, nickname, message } = req.body;
  const loggedInUserIdx = req.verifiedToken.userIdx;
  const userIdx = req.userIdx;

  // 본인 트리에 메세지 작성 불가
  if (loggedInUserIdx == userIdx) {
    return res.send(errResponse(baseResponse.DECORATION_BLOCK_OWN_WRITE));
  }

  // 형식적 validation 처리
  if (!imageIdx) {
    return res.send(errResponse(baseResponse.DECORATION_IMAGEIDX_EMPTY));
  } else if (!nickname) {
    return res.send(errResponse(baseResponse.DECORATION_NICKNAME_EMPTY));
  } else if (!message) {
    return res.send(errResponse(baseResponse.DECORATION_MESSAGE_EMPTY));
  } else if (nickname.length > regexNickname) {
    return res.send(errResponse(baseResponse.DECORATION_NICKNAME_TOO_LONG));
  } else if (message.length > regexMessage) {
    return res.send(errResponse(baseResponse.DECORATION_MESSAGE_TOO_LONG));
  }

  const postDecorationResponse = await treeService.postDecoration(
    imageIdx,
    nickname,
    message,
    userIdx,
    loggedInUserIdx
  );
  return res.send(postDecorationResponse);
};

/**
 * API NAME : 장식품 상세 조회 API
 * [GET] /trees/:userIdx/decoration/:decorationIdx
 */
exports.getDecoration = async function (req, res) {
  /**
   * Path Variable: userIdx, decorationIdx
   */
  const { decorationIdx } = req.params;
  const loggedInUserIdx = req.verifiedToken.userIdx;
  const treeUserIdx = req.userIdx;

  if (!decorationIdx)
    return res.send(errResponse(baseResponse.DECORATION_DECORATIONIDX_EMPTY));
  // 트리 주인 검증
  if (loggedInUserIdx != treeUserIdx) {
    return res.send(errResponse(baseResponse.DECORATION_OWNER_NOT_MATCHED));
  }
  return res.send(errResponse(baseResponse.DECORATION_CANNOT_OPEN));

  const decorationResult = await treeProvider.retrieveDecoration(decorationIdx);

  return res.send(decorationResult);
};
/**
 * API NAME : 장식품 삭제 API
 * [DELETE] /trees/:userId/decoration/:decorationIdx
 */
exports.deleteDecoration = async function (req, res) {
  /**
   * Path Variable: userId, decorationIdx
   */
  const { decorationIdx } = req.params;
  const loggedInUser = req.verifiedToken.userIdx;

  if (!decorationIdx)
    return res.send(errResponse(baseResponse.DECORATION_DECORATIONIDX_EMPTY));

  const deleteDecorationResponse = await treeService.deleteDecoration(
    parseInt(decorationIdx),
    loggedInUser
  );

  return res.send(deleteDecorationResponse);
};
