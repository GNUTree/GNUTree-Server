module.exports = function (app) {
  const tree = require("./treeController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 전체 장식품 조회 API
  app.get("/trees/:userId", tree.getDecorations);
};
