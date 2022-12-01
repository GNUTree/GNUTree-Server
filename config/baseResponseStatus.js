module.exports = {
  // Success
  SUCCESS: { isSuccess: true, code: 200, message: "성공" },

  // Common
  TOKEN_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "JWT 토큰을 입력해주세요.",
  },
  TOKEN_VERIFICATION_FAILURE: {
    isSuccess: false,
    code: 400,
    message: "JWT 토큰 검증 실패",
  },
  TOKEN_VERIFICATION_SUCCESS: {
    isSuccess: true,
    code: 200,
    message: "JWT 토큰 검증 성공",
  },

  SIGNUP_EMAIL_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "이메일을 입력해주세요.",
  },
  SIGNUP_EMAIL_ERROR_TYPE: {
    isSuccess: false,
    code: 400,
    message: "이메일을 형식을 정확하게 입력해주세요.",
  },
  SIGNUP_REDUNDANT_EMAIL: {
    isSuccess: false,
    code: 400,
    message: "이미 가입 처리된 이메일입니다.",
  },
  SIGNUP_EMAIL_AUTH_EXPIRE: {
    isSuccess: false,
    code: 400,
    message: "인증번호 유효 시간이 만료되었습니다.",
  },
  SIGNUP_AUTH_VERIFICATION_FAILURE: {
    isSuccess: false,
    code: 400,
    message: "인증번호가 일치하지 않습니다.",
  },
  SIGNUP_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "패스워드를 입력해주세요.",
  },
  SIGNUP_NICKNAME_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "닉네임을 입력해주세요.",
  },
  SIGNUP_AUTH_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "인증번호를 입력해주세요.",
  },

  SIGNIN_EMAIL_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "이메일을 입력해주세요.",
  },
  SIGNIN_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "패스워드를 입력해주세요.",
  },
  SIGNIN_EMAIL_WRONG: {
    isSuccess: "false",
    code: 400,
    message: "존재하지 않는 이메일입니다.",
  },
  SIGNIN_PASSWORD_WRONG: {
    isSuccess: "false",
    code: 400,
    message: "패스워드가 틀립니다.",
  },
  SIGNIN_BANNED_ACCOUNT: {
    isSuccess: "false",
    code: 400,
    message: "관리자에 의해 차단된 계정입니다.",
  },
  SIGNIN_WITHDRAWAL_ACCOUNT: {
    isSuccess: "false",
    code: 400,
    message: "탈퇴한 계정입니다.",
  },

  USERID_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "userId를 입력해주세요.",
  },
  USEREMAIL_NOT_EXIST: {
    isSuccess: false,
    code: 400,
    message: "해당 유저가 존재하지 않습니다.",
  },

  // Request error
  DECORATION_IMAGEIDX_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "imageIdx를 입력해주세요.",
  },

  DECORATION_NICKNAME_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "닉네임을 입력해주세요.",
  },

  DECORATION_MESSAGE_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "메세지를 입력해주세요.",
  },

  DECORATION_DECORATIONIDX_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "decorationIdx를 입력해주세요.",
  },

  DECORATION_NOT_EXIST: {
    isSuccess: false,
    code: 400,
    message: "해당 장식품이 존재하지 않습니다.",
  },

  // Response error

  // Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 500, message: "데이터 베이스 에러" },
  NODEMAILER_ERROR: {
    isSuccess: false,
    code: 500,
    message: "이메일 전송 모듈 에러",
  },
  BCRYPT_ERROR: {
    isSuccess: false,
    code: 500,
    message: "암호화 모듈 에러",
  },
  SERVER_ERROR: { isSuccess: false, code: 500, message: "서버 에러" },
};
