module.exports = function (app) {
  const api = require("./apiController");

  // 이메일 인증번호 요청 API
  app.post("/api/send-email", api.sendEmail);

  // 이메일 인증번호 확인 API
  app.post("/api/send-email/check", api.checkHashAuth);
};
