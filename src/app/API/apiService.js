const { logger } = require("../../../config/winston");
const baseResponse = require("../../../config/baseResponseStatus");
const { response, errResponse } = require("../../../config/response");
const { transporter } = require("../../../config/nodemailer");
const apiProvider = require("./apiProvider");
const apiDao = require("./apiDao");

// 이메일 인증번호 전송 로직
exports.sendEmail = async function (email) {
  try {
    // 이메일 중복 확인
    const emailRows = await apiProvider.emailCheck(email);
    if (emailRows.length > 0)
      return errResponse(baseResponse.SIGNUP_REDUNDANT_EMAIL);

    const randomNum = Math.floor(100000 + Math.random() * 900000); // 랜덤한 숫자 여섯자리 생성
    // 이메일 인증번호 전송
    let info = await transporter.sendMail({
      from: process.env.NODEMAILER_USER, // sender address
      to: email, // list of receivers
      subject: "[GNU-MAS Tree] 인증 관련 이메일 입니다", // Subject line
      text: "오른쪽 숫자 6자리를 입력해주세요 :" + randomNum, // plain text body
    });
    return response(baseResponse.SUCCESS, randomNum);
  } catch (err) {
    logger.error(`Web - sendEmail Service error\n: ${err.message}`);
    return errResponse(baseResponse.NODEMAILER_ERROR);
  }
};
