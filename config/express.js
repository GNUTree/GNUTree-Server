const express = require("express");
const compression = require("compression");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");

var cors = require("cors");
module.exports = function () {
  const app = express();

  app.use(compression());

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use(methodOverride());

  app.use(cookieParser());

  // 다른 서버와 통신 허용 (whitelist)
  const whitelist = ["https://hatch.loca.lt"];
  const corsOption = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, true);
        //callback(new Error("Not Allowed Origin!"));
      }
    },
    credentials: true,
  };
  app.use(cors(corsOption));

  app.use(cookieParser());
  // app.use(express.static(process.cwd() + '/public'));

  /* App (Android, iOS) */
  // TODO: 도메인을 추가할 경우 이곳에 Route를 추가하세요.
  require("../src/app/User/userRoute")(app);
  require("../src/app/Tree/treeRoute")(app);
  require("../src/app/API/apiRoute")(app);

  return app;
};
