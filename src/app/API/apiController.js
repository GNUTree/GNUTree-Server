const apiProvider = require("./apiProvider");
const apiService = require("./apiService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { regexEmail } = require("../../../config/regex");

/**
 * API Name : 이메일 인증번호 요청 API
 * [POST] /api/send-email
 */
exports.sendEmail = async function (req, res) {
  /**
   * Body: email
   */
  const { email } = req.body;
  const hashAuth = req.cookies.hashAuth;

  // 이메일 전송 쿨타임 체크
  if (hashAuth)
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_COOLTIME));

  // 빈 값 체크
  if (!email) return res.send(errResponse(baseResponse.SIGNUP_EMAIL_EMPTY));

  // 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email))
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

  const sendEmailResponse = await apiService.sendEmail(email);

  // cookie에 암호화 된 인증번호 저장
  res.cookie("hashAuth", sendEmailResponse[1], {
    maxAge: 300000,
  });

  return res.send(sendEmailResponse[0]);
};

/**
 * API Name : 이메일 인증번호 확인 API
 * [POST] /api/send-email/check
 */
exports.checkHashAuth = async function (req, res) {
  /**
   * Body: authenticationNumber
   * Cookie: hashAuth
   */
  const { authenticationNumber } = req.body;
  const hashAuth = req.cookies.hashAuth;

  // 인증시간 만료 여부 체크
  if (!hashAuth)
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_AUTH_EXPIRE));

  // 빈 값 체크
  if (!authenticationNumber)
    return res.send(errResponse(baseResponse.SIGNUP_AUTH_EMPTY));

  const checkHashAuthResponse = await apiService.checkHashAuth(
    hashAuth,
    authenticationNumber
  );

  return res.send(checkHashAuthResponse);
};
