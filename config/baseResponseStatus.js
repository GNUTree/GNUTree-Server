module.exports = {
  // Success
  SUCCESS: { isSuccess: true, code: 200, message: "성공" },

  // Common
  TOKEN_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "로그인을 해야 서비스 이용이 가능합니다.",
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

  SIGNUP_ID_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "아이디를 입력해주세요.",
  },
  SIGNUP_ID_ERROR_TYPE: {
    isSuccess: false,
    code: 400,
    message: "이메일 형식이 아닌 아이디를 입력해주세요.",
  },
  SIGNUP_PASSWORD_ERROR_TYPE: {
    isSuccess: false,
    code: 400,
    message:
      "비밀번호는 8~16자로 문자, 숫자, 특수 문자 조합으로 구성되어야 합니다.",
  },
  SIGNUP_NICKNAME_TOO_LONG: {
    isSuccess: false,
    code: 400,
    message: "닉네임은 10자 이하이여야 합니다.",
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
  SIGNUP_EMAIL_SESSION_EXPIRE: {
    isSuccess: false,
    code: 400,
    message: "이메일 세션이 만료되었습니다. 다시 시도해주세요.",
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

  SIGNIN_ID_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "아이디를 입력해주세요.",
  },
  SIGNIN_ID_ERROR_TYPE: {
    isSuccess: false,
    code: 400,
    message: "이메일 형식이 아닌 아이디를 입력해주세요.",
  },
  SIGNIN_PASSWORD_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "패스워드를 입력해주세요.",
  },
  SIGNIN_EMAIL_WRONG: {
    isSuccess: false,
    code: 400,
    message: "존재하지 않는 이메일입니다.",
  },
  SIGNIN_PASSWORD_WRONG: {
    isSuccess: false,
    code: 400,
    message: "패스워드가 틀립니다.",
  },
  SIGNUP_EMAIL_COOLTIME: {
    isSuccess: false,
    code: 400,
    message: "이메일을 재전송 하기에는 너무 이릅니다.",
  },
  SIGNIN_BANNED_ACCOUNT: {
    isSuccess: false,
    code: 400,
    message: "관리자에 의해 차단된 계정입니다.",
  },
  SIGNIN_WITHDRAWAL_ACCOUNT: {
    isSuccess: false,
    code: 400,
    message: "탈퇴한 계정입니다.",
  },

  USERID_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "userId를 입력해주세요.",
  },
  USERIDX_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "userIdx를 입력해주세요.",
  },
  USER_NOT_EXIST: {
    isSuccess: false,
    code: 400,
    message: "해당 유저가 존재하지 않습니다.",
  },
  USER_IDX_NOT_MATCH: {
    isSuccess: false,
    code: 400,
    message: "권한이 없습니다.",
  },
  USER_NICKNAME_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "닉네임을 입력해주세요.",
  },

  // Request error
  DECORATION_BLOCK_OWN_WRITE: {
    isSuccess: false,
    code: 400,
    message: "자신의 트리에 메세지를 작성할 수 없습니다.",
  },

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

  DECORATION_NICKNAME_TOO_LONG: {
    isSuccess: false,
    code: 400,
    message: "닉네임은 10자 이하이여야 합니다.",
  },

  DECORATION_MESSAGE_TOO_LONG: {
    isSuccess: false,
    code: 400,
    message: "메세지는 최대 200자까지만 허용됩니다.",
  },

  DECORATION_DECORATIONIDX_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "decorationIdx를 입력해주세요.",
  },

  DECORATION_CANNOT_OPEN: {
    isSuccess: false,
    code: 400,
    message:
      "크리스마스 메세지는 크리스마스 당일(12월 25일)에 열람 가능합니다.",
  },

  DECORATION_NOT_EXIST: {
    isSuccess: false,
    code: 400,
    message: "해당 장식품이 존재하지 않습니다.",
  },

  DECORATION_OWNER_NOT_MATCHED: {
    isSuccess: false,
    code: 400,
    message: "트리 주인이 아닙니다.",
  },

  DECORATION_WRITER_NOT_MATCHED: {
    isSuccess: false,
    code: 400,
    message: "장식품 작성자가 아닙니다.",
  },

  DECORATION_WRITE_TOO_MUCH: {
    isSuccess: false,
    code: 400,
    message: "이미 트리에 메세지를 작성했습니다. 내일 다시 찾아와주세요.",
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
