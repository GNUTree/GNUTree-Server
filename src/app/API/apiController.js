const apiProvider = require("./apiProvider");
const apiService = require("./apiService");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");

const regexEmail = require("regex-email");

/**
 * API Name : 이메일 인증번호 요청 API
 * [POST] /api/send-email
 */
exports.sendEmail = async function (req, res) {
  /**
   * Body: email
   */
  const { email } = req.body;

  // 빈 값 체크
  if (!email) return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));

  // 형식 체크 (by 정규표현식)
  if (!regexEmail.test(email))
    return res.send(response(baseResponse.SIGNUP_EMAIL_ERROR_TYPE));

  const sendEmailResponse = await apiService.sendEmail(email);

  return res.send(sendEmailResponse);
};
