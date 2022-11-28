module.exports = function (app) {
  const tree = require("./treeController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const checkEmail = require("./treeMiddleware");

  // 전체 장식품 조회 API
  app.get("/trees/:userId", checkEmail, tree.getDecorations);

  // 장식품 생성 API
  app.post("/trees/:userId/decoration", checkEmail, tree.postDecoration);

  // 장식품 삭제 API
  app.delete(
    "/trees/:userId/decoration/:decorationIdx",
    checkEmail,
    tree.deleteDecoration
  );
};
