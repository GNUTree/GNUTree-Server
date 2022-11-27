const jwtMiddleware = require("../../../config/jwtMiddleware");
const treeProvider = require("../../app/Tree/treeProvider");
const treeService = require("../../app/Tree/treeService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const regexEmail = require("regex-email");

/**
 * API Name : 전체 장식품 조회 API
 * [GET] /trees/:userId
 */
exports.getDecorations = async function (req, res) {
  /**
   * Path Variable: userId
   */
  const userIdx = req.userIdx;

  const decorationListResult = await treeProvider.retrieveDecorationList(
    userIdx
  );

  return res.send(decorationListResult);
};

/**
 * API NAME : 장식품 생성 API
 * [POST] /trees/:userId/decoration
 */
exports.postDecoration = async function (req, res) {
  /**
   * Body: imageIdx, nickname, message
   * Path Variable: userId
   */
  const { imageIdx, nickname, message } = req.body;
  const userIdx = req.userIdx;

  if (!imageIdx) {
    return res.send(errResponse(baseResponse.DECORATION_IMAGEIDX_EMPTY));
  } else if (!nickname) {
    return res.send(errResponse(baseResponse.DECORATION_NICKNAME_EMPTY));
  } else if (!message) {
    return res.send(errResponse(baseResponse.DECORATION_MESSAGE_EMPTY));
  }

  const postDecorationResponse = await treeService.postDecoration(
    imageIdx,
    nickname,
    message,
    userIdx
  );

  return postDecorationResponse;
};
