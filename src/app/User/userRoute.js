module.exports = function (app) {
  const user = require("./userController");
  const jwtMiddleware = require("../../../config/jwtMiddleware");

  // 이메일 회원가입 API
  app.post("api/sign-up", user.postSignUp);

  // 이메일 로그인 API (jwt 생성)
  app.post("api/sign-in", user.login);

  // 비밀번호 재설정 API
  app.post("api/reset-password", user.resetPassword);

  // get: 회원 정보 관리 페이지
  // post: 사용자 개인정보 변경 API
  app
    .route("/users/edit/:userIdx")
    .all(jwtMiddleware)
    .get(user.getUserById)
    .post(user.editUserInfo);
};
