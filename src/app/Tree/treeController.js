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
  const { userId } = req.params;
  const userEmail = userId + "@gnu.ac.kr";

  if (!userId) {
    return res.send(errResponse(baseResponse.TREE_USERID_EMPTY));
  }
  const decorationListResult = await treeProvider.retrieveDecorationList(
    userEmail
  );

  return res.send(decorationListResult);
};
