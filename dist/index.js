"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPinyin = getPinyin;
exports.getFirstLetter = getFirstLetter;
var dictNotoneOrigin = globalThis.pinyinDict;
// 把字典 {[拼音]: [汉字]} 转换为 {[汉字]: [拼音]}
var dictNotone = {};
for (var pinyin in dictNotoneOrigin) {
    var characters = dictNotoneOrigin[pinyin];
    for (var charIndex = 0, charCount = characters.length; charIndex < charCount; charIndex++) {
        if (!dictNotone[characters[charIndex]]) {
            dictNotone[characters[charIndex]] = [pinyin];
        }
        else {
            dictNotone[characters[charIndex]].push(pinyin);
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
    var combinations = [];
    // 递归生成组合
    function combine(arrayIndex, currentString) {
        var e_1, _a;
        // 如果已经处理完所有数组，将当前组合加入结果
        if (arrayIndex === arrays.length) {
            combinations.push(currentString);
            return;
        }
        try {
            // 遍历当前数组的每个元素
            for (var _b = __values(arrays[arrayIndex]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var item = _c.value;
                // 将当前元素添加到组合中，并继续处理下一个数组
                combine(arrayIndex + 1, currentString + item);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    // 从第一个数组开始组合
    combine(0, '');
    return combinations;
}
/**
 * 根据汉字获取拼音，如果不是汉字直接返回原字符
 * @param chinese 要转换的汉字
 */
function getPinyin(chinese) {
    if (!chinese || /^ +$/.test(chinese))
        return [];
    var pinyinArrays = [];
    for (var charIndex = 0, textLength = chinese.length; charIndex < textLength; charIndex++) {
        var currentChar = chinese.charAt(charIndex);
        var possiblePinyins = dictNotone[currentChar];
        if (possiblePinyins) {
            pinyinArrays.push(possiblePinyins);
        }
        else {
            pinyinArrays.push([currentChar]);
        }
    }
    return generateCombinations(pinyinArrays);
}
/**
 * 获取汉字的拼音首字母
 * @param str 汉字字符串，如果遇到非汉字则原样返回
 */
function getFirstLetter(str) {
    if (!str || /^ +$/.test(str))
        return [];
    var pinyinArrays = [];
    for (var charIndex = 0; charIndex < str.length; charIndex++) {
        var charCode = str.charCodeAt(charIndex);
        var currentChar = str.charAt(charIndex);
        // 检查字符是否在中文Unicode范围内（CJK统一汉字）
        if (charCode >= 19968 && charCode <= 40869 && dictNotone[currentChar]) {
            pinyinArrays.push(new Set(dictNotone[currentChar].map(function (pinyin) { return pinyin.charAt(0); })));
        }
        else {
            pinyinArrays.push(new Set([currentChar]));
        }
    }
    var combinations = generateCombinations(pinyinArrays.map(function (pinyinSet) { return Array.from(pinyinSet); }));
    return combinations;
}
