"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPinyin = getPinyin;
exports.getFirstLetter = getFirstLetter;
var pinyinDict_1 = __importDefault(require("./dict/pinyinDict"));
// 把字典 {[拼音]: [汉字]} 转换为 {[汉字]: [拼音]}
var dictNotone = {};
for (var i in pinyinDict_1.default) {
    var temp = pinyinDict_1.default[i];
    for (var j = 0, len = temp.length; j < len; j++) {
        if (!dictNotone[temp[j]]) {
            dictNotone[temp[j]] = [i];
        }
        else {
            dictNotone[temp[j]].push(i);
        }
    }
}
function generateCombinations(arrays) {
    // 如果输入为空数组，返回空数组
    if (arrays.length === 0)
        return [];
    // 如果只有一个数组，直接返回这个数组的元素
    if (arrays.length === 1)
        return arrays[0];
    // 结果数组
    var result = [];
    // 递归生成组合
    function combine(currentIndex, currentCombination) {
        // 如果已经处理完所有数组，将当前组合加入结果
        if (currentIndex === arrays.length) {
            result.push(currentCombination);
            return;
        }
        // 遍历当前数组的每个元素
        for (var _i = 0, _a = arrays[currentIndex]; _i < _a.length; _i++) {
            var element = _a[_i];
            // 将当前元素添加到组合中，并继续处理下一个数组
            combine(currentIndex + 1, currentCombination + element);
        }
    }
    // 从第一个数组开始组合
    combine(0, '');
    return result;
}
/**
 * 根据汉字获取拼音，如果不是汉字直接返回原字符
 * @param chinese 要转换的汉字
 */
function getPinyin(chinese) {
    if (!chinese || /^ +$/.test(chinese))
        return '';
    var result = [];
    for (var i = 0, len = chinese.length; i < len; i++) {
        var temp = chinese.charAt(i);
        var pinyin = dictNotone[temp];
        if (pinyin) {
            result.push(pinyin);
        }
        else {
            result.push([temp]);
        }
    }
    return generateCombinations(result);
}
/**
 * 获取汉字的拼音首字母
 * @param str 汉字字符串，如果遇到非汉字则原样返回
 */
function getFirstLetter(str) {
    if (!str || /^ +$/.test(str))
        return '';
    var result = [];
    for (var i = 0; i < str.length; i++) {
        var unicode = str.charCodeAt(i);
        var ch = str.charAt(i);
        if (unicode >= 19968 && unicode <= 40869) {
            var singleTextLetter = [];
            for (var key in pinyinDict_1.default) {
                if (pinyinDict_1.default[key].includes(ch)) {
                    singleTextLetter.push(key[0]);
                }
            }
            result.push(singleTextLetter);
        }
        else {
            result.push([ch]);
        }
    }
    var combinations = generateCombinations(result);
    return combinations;
}
