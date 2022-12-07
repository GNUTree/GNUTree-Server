const regexPassword = /^(?=.*[a-zA-Z])(?=.*[?!@#$%^*+=-])(?=.*[0-9]).{8,16}/; // 8~16자 숫자, 영문, 특수기호 조합
const regexEmail = /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
const regexNickname = 10; // 10자 이하
const regexMessage = 200; // 200자 이하

module.exports = {
  regexPassword,
  regexEmail,
  regexNickname,
  regexMessage,
};
