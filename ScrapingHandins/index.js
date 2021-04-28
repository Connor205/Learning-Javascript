var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var app = require("express")();
var fs = require("fs");
var nodeFetch = require("node-fetch");
var jssoup = require("jssoup")["default"];
var PORT = 8080;
app.listen(PORT, function () { return console.log("it is alive on http://localhost:" + PORT); });
app.get("/grade/:id", function (req, res) {
    var id = req.params.id;
    getAndReturnResult(id).then(function (output) {
        res.status(200).send(output);
    });
});
var sumArray = function (current, acc) { return current + acc; };
function updateSavedPage(id) {
    return __awaiter(this, void 0, void 0, function () {
        var fetchResponse, text;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("https://handins.ccs.neu.edu/courses/" + id + "/assignments");
                    return [4 /*yield*/, nodeFetch("https://handins.ccs.neu.edu/courses/" + id + "/assignments", {
                            headers: {
                                Cookie: "_bn_session=WkUxQy9zWlhKajlSSUtvaHQ2cTZld1FreFl5S1BKM0tiYnR0NXBRZHFmdmV3Q0Q3OVd4L2cwSXRmVmlPMWVmSFUxclI0TU5oQWg5bko4UkN2RUwvMnZHUjFVRVRZYWJqVlduYUpkd216YnIrQkd5T3dxemhpd0RvdUhPLytQd2hDYmVkT0tYcjVoM1ZSdi92UUJjeVNzMmRkMjRnYmtrVUdEUytnTUk4cGRwdzNVbnJrdTFJNk12YzBBbG41ZytOaUxZZWMwQXF2c2QwVmdBNy8zcGlGemd1RlVRT21WeExiRTdNN1dqZXNJST0tLWdiQ1FGSjk4aEdIUzljN0k2Zitsa0E9PQ%3D%3D--4ef550f927ac933799ae0af0117b323d11e7afc5"
                            }
                        })];
                case 1:
                    fetchResponse = _a.sent();
                    return [4 /*yield*/, fetchResponse.text()];
                case 2:
                    text = _a.sent();
                    fs.writeFileSync("savedPage.html", text, function (err) {
                        if (err)
                            return console.log(err);
                        console.log("Saved page to html");
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function getResult() {
    var soup = new jssoup(fs.readFileSync("savedPage.html"));
    var allValues = soup.findAll("td", { "class": "text-right" });
    var allNums = allValues.map(function (item) {
        return parseFloat(item.text.replace(/\s/g, ""));
    });
    if (allNums.length == 0) {
        return { message: "Class Does Not Exist" };
    }
    var weights = allNums.filter(function (item, index) { return index % 2 == 0; });
    var values = allNums.filter(function (item, index) { return index % 2 == 1; });
    // console.log(gradeWeights);
    var gradedWeights = weights.filter(function (item, index) { return !isNaN(values[index]); });
    var gradedValues = values.filter(function (item, index) { return !isNaN(item); });
    // console.log(gradedValues);
    var pointsAccumulatedArr = gradedValues.map(function (item, index) { return (item * gradedWeights[index]) / 100; });
    // console.log(pointsAccumulatedArr);
    var totalPointsAccumulated = pointsAccumulatedArr.reduce(sumArray, 0);
    var totalWeight = gradedWeights.reduce(sumArray, 0);
    return {
        possiblePoints: totalWeight,
        earnedPoints: totalPointsAccumulated,
        currentGrade: totalPointsAccumulated / totalWeight
    };
}
function getAndReturnResult(id) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateSavedPage(id)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, getResult()];
            }
        });
    });
}
