"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _connectMongo = _interopRequireDefault(require("connect-mongo"));
var _path = _interopRequireDefault(require("path"));
var _expressSession = _interopRequireDefault(require("express-session"));
var _apiRouter = _interopRequireDefault(require("./routers/apiRouter.js"));
var _userRouter = _interopRequireDefault(require("./routers/userRouter.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use((0, _morgan["default"])("dev"));
// body data backend 에서 받기위함
app.use(_express["default"].urlencoded({
  extended: true
}));
// json향태의 데이터를 front에 보내거나 받을때 사용하기위함.
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));

// server.js
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../client/build")));
app.use("/user", _userRouter["default"]);
app.use("/api", _apiRouter["default"]);
app.get("/", function (req, res) {
  res.sendFile(_path["default"].join(__dirname, "build/index.html"));
});

// react router를 사용하기위해서 user가 router를 입력하면 react 페이지를 보여주기위해서임.
app.get("*", function (req, res) {
  res.sendFile(_path["default"].join(__dirname, "../client/build/index.html"));
});
var _default = app;
exports["default"] = _default;