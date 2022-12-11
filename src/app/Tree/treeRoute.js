module.exports = function (app) {
  const tree = require("./treeController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const checkUserIdx = require("./treeMiddleware");

  // 전체 장식품 조회 API
  app.get("/trees/:userIdx", checkUserIdx, tree.getDecorations);

  // 장식품 생성 API
  app.post(
    "/trees/:userIdx/decoration",
    jwtMiddleware,
    checkUserIdx,
    tree.postDecoration
  );

  // 장식품 상세 조회 API
  app.get(
    "/trees/:userIdx/decoration/:decorationIdx",
    jwtMiddleware,
    checkUserIdx,
    tree.getDecoration
  );

  // 장식품 삭제 API
  app.delete(
    "/trees/decoration/:decorationIdx",
    jwtMiddleware,
    tree.deleteDecoration
  );
};
