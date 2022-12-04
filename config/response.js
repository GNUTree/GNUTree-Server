const response = ({ isSuccess, code, message }, result) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    result: result,
  };
};

const getDecorationResponse = (
  { isSuccess, code, message },
  treeOwnerNickname,
  result
) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
    treeOwnerNickname,
    result: result,
  };
};

const errResponse = ({ isSuccess, code, message }) => {
  return {
    isSuccess: isSuccess,
    code: code,
    message: message,
  };
};

module.exports = { response, errResponse, getDecorationResponse };
