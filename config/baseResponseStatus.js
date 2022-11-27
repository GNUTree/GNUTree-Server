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
    message: "nickname을 입력해주세요.",
  },

  DECORATION_MESSAGE_EMPTY: {
    isSuccess: false,
    code: 400,
    message: "message를 입력해주세요.",
  },

  // Response error

  // Connection, Transaction 등의 서버 오류
  DB_ERROR: { isSuccess: false, code: 500, message: "데이터 베이스 에러" },
  SERVER_ERROR: { isSuccess: false, code: 500, message: "서버 에러" },
};
