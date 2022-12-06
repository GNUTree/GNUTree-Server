const decorationList = { 1: "test1", 2: "test2" };

function getDecorationImageUrl(idx) {
  return decorationList[idx] ? decorationList[idx] : null;
}

module.exports = {
  getDecorationImageUrl,
};
