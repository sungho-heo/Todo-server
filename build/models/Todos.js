"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var todoSchema = new _mongoose["default"].Schema({
  todo: [{
    type: String,
    required: true
  }],
  owner: {
    type: _mongoose["default"].Types.ObjectId,
    required: true,
    ref: "User"
  }
});
var Todo = _mongoose["default"].model("Todo", todoSchema);
var _default = Todo;
exports["default"] = _default;