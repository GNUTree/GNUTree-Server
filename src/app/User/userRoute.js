module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");
  const checkEmail = require("./userMiddleware");

  // 이메일 회원가입 API
  app.post("/sign-up", user.postSignUp);

  // 2. 유저 조회 API (+ 검색)
  //app.get("/app/users", user.getUsers);

  // 이메일 로그인 API (jwt 생성)
  app.post("/sign-in", user.login);

  // 비밀번호 재설정 API
  app.post("/reset-password", user.resetPassword);

  // 회원 정보 관리 페이지
  app.get("/users/edit/:userId", jwtMiddleware, checkEmail, user.getUserById);

  // 회원 정보 수정 API (JWT 검증 및 Validation - 메소드 체이닝 방식으로 jwtMiddleware 사용)
  //app.patch("/app/users/:userId", jwtMiddleware, user.patchUsers);
};
