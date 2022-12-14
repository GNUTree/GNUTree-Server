const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { transporter } = require("../../../config/nodemailer");
const bcrypt = require("bcrypt");
const apiProvider = require("./apiProvider");
const apiDao = require("./apiDao");
const res = require("express/lib/response");

// 이메일 인증번호 전송 로직
exports.sendEmail = async function (email) {
  try {
    const randomNum = String(Math.floor(100000 + Math.random() * 900000)); // 인증번호 생성
    const hashAuth = await bcrypt.hash(randomNum, 10); // 인증번호 암호화
    // 이메일 인증번호 전송
    let info = await transporter.sendMail({
      from: process.env.NODEMAILER_USER, // sender address
      to: email, // list of receivers
      subject: "[GNU-MAS Tree] 인증 관련 이메일 입니다", // Subject line
      text: "오른쪽 숫자 6자리를 입력해주세요 :" + randomNum, // plain text body
    });
    return [response(baseResponse.SUCCESS), hashAuth];
  } catch (err) {
    logger.error(`Web - sendEmail Service error\n: ${err.message}`);
    return errResponse(baseResponse.NODEMAILER_ERROR);
  }
};

// 이메일 인증번호 검증
exports.checkHashAuth = async function (hashAuth, authenticationNumber, email) {
  try {
    const isSameNumber = bcrypt.compareSync(authenticationNumber, hashAuth);
    if (!isSameNumber) {
      return errResponse(baseResponse.SIGNUP_AUTH_VERIFICATION_FAILURE);
    }
  } catch (err) {
    logger.error(`Web - checkHashAuth Service error\n: ${err.message}`);
    return errResponse(baseResponse.BCRYPT_ERROR);
  }

  // 회원 가입 여부 확인
  const emailRows = await apiProvider.emailCheck(email);
  if (emailRows.length > 0) return response(baseResponse.SUCCESS, true);
  else return response(baseResponse.SUCCESS, false);
};
