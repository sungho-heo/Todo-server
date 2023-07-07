"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var userSchema = new _mongoose["default"].Schema({
  name: [{
    type: String,
    required: true
  }],
  todoList: {
    type: _mongoose["default"].Types.ObjectId,
    ref: "Todo"
  }
});
var User = _mongoose["default"].model("User", userSchema);
var _default = User;
exports["default"] = _default;