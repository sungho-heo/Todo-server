"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _apiController = require("../controllers/apiController.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var apiRouter = _express["default"].Router();

// 로그인 확인 미들웨어
var checkAuth = function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  next();
};
apiRouter.get("/todo", _apiController.getTodo);
apiRouter.post("/todos", checkAuth, _apiController.postTodo);
apiRouter["delete"]("/todo/delete", _apiController.deleteTodo);
var _default = apiRouter;
exports["default"] = _default;