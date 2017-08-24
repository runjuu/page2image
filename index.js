"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Koa = require("koa");
var puppeteer = require("puppeteer");
var ScreenServer = (function () {
    function ScreenServer() {
        this.config = {
            port: 3000,
            quality: 80,
            type: 'jpeg',
            viewportConfig: null,
            waitUntil: null,
        };
    }
    ScreenServer.prototype.init = function (config) {
        Object.assign(this.config, config);
    };
    ScreenServer.prototype.takeScreenshot = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var pic, page, _a, viewportConfig, quality, type, waitForFunction, waitUntil, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!url)
                            return [2, null];
                        return [4, this.browser.newPage()];
                    case 1:
                        page = _b.sent();
                        _a = this.config, viewportConfig = _a.viewportConfig, quality = _a.quality, type = _a.type, waitForFunction = _a.waitForFunction, waitUntil = _a.waitUntil;
                        if (viewportConfig) {
                            page.setViewport(viewportConfig);
                        }
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 7, , 8]);
                        return [4, page.goto(url, { waitUntil: waitUntil })];
                    case 3:
                        _b.sent();
                        if (!waitForFunction) return [3, 5];
                        return [4, page.waitForFunction(waitForFunction)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5: return [4, page.screenshot({ fullPage: true, quality: quality, type: type })];
                    case 6:
                        pic = _b.sent();
                        return [3, 8];
                    case 7:
                        err_1 = _b.sent();
                        console.error(err_1);
                        return [3, 8];
                    case 8:
                        page.close();
                        return [2, pic];
                }
            });
        });
    };
    ScreenServer.prototype.server = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var pic, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.takeScreenshot(ctx.query.url)];
                    case 1:
                        pic = _a.sent();
                        if (pic) {
                            ctx.type = "." + (this.config.type || 'jpg');
                            ctx.body = pic;
                        }
                        else {
                            throw new Error('can not take screenshot');
                        }
                        return [3, 3];
                    case 2:
                        err_2 = _a.sent();
                        ctx.throw(400, err_2);
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    ScreenServer.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, app;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.browser)
                            this.browser.close();
                        _a = this;
                        return [4, puppeteer.launch()];
                    case 1:
                        _a.browser = _b.sent();
                        app = new Koa();
                        app.use(this.server.bind(this));
                        app.listen(this.config.port);
                        return [2];
                }
            });
        });
    };
    return ScreenServer;
}());
exports.default = ScreenServer;
