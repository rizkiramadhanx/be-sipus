"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("../controllers/auth.controller");
var router = (0, express_1.Router)();
router.route('/login').post(auth_controller_1.Login);
router.route('/register').post(auth_controller_1.Register);
exports.default = router;
