"use strict";

require("dotenv/config");
require("./db.js");
require("./models/Todos.js");
require("./models/User.js");
var _server = _interopRequireDefault(require("./server.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PORT = process.env.PORT || 8080;
var handleServer = function handleServer() {
  console.log("\uD83D\uDE80 http://localhost:".concat(PORT, "/"));
};
_server["default"].listen(PORT, handleServer);