const apiProvider = require("./apiProvider");
const apiService = require("./apiService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { regexEmail } = require("../../../config/regex");
const { getRounds } = require("bcrypt");

/**
 * API Name : 이메일 인증번호 요청 API
 * [POST] /api/send-email
 */
exports.sendEmail = async function (req, res) {
  /**
   * Body: id
   */
  const { id } = req.body;

  // 빈 값 체크
  if (!id) return res.send(errResponse(baseResponse.SIGNUP_ID_EMPTY));

  // 형식 체크 (by 정규표현식)
  if (regexEmail.test(id))
    return res.send(errResponse(baseResponse.SIGNUP_ID_ERROR_TYPE));

  const email = id + "@gnu.ac.kr";
  const hashAuth = req.cookies.hashAuth;

  // 이메일 전송 쿨타임 체크
  if (hashAuth)
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_COOLTIME));

  const sendEmailResponse = await apiService.sendEmail(email);

  // cookie에 암호화 된 인증번호, 이메일 저장
  res.cookie("hashAuth", sendEmailResponse[1], {
    sameSite: "None",
    secure: true,
    httpOnly: true,
    maxAge: 300000,
  });
  res.cookie("email", email, {
    sameSite: "None",
    httpOnly: true,
    secure: true,
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
   * Cookie: hashAuth, email
   */
  const { authenticationNumber } = req.body;
  const { hashAuth, email } = req.cookies;

  // 인증시간, 이메일 세션 만료 여부 체크
  if (!hashAuth)
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_AUTH_EXPIRE));
  if (!email)
    return res.send(errResponse(baseResponse.SIGNUP_EMAIL_AUTH_EXPIRE));

  // 빈 값 체크
  if (!authenticationNumber)
    return res.send(errResponse(baseResponse.SIGNUP_AUTH_EMPTY));

  const checkHashAuthResponse = await apiService.checkHashAuth(
    hashAuth,
    authenticationNumber,
    email
  );

  // 인증 성공시 인증번호 쿠키 초기화
  if (checkHashAuthResponse.isSuccess) res.clearCookie("hashAuth");

  return res.send(checkHashAuthResponse);
};
