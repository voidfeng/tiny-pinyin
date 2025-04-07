import dictNotoneOrigin from './dict/pinyinDict'

// 把字典 {[拼音]: [汉字]} 转换为 {[汉字]: [拼音]}
const dictNotone: Record<string, string[]> = {}
for (const pinyin in dictNotoneOrigin) {
  const characters = dictNotoneOrigin[pinyin]
  for (let charIndex = 0, charCount = characters.length; charIndex < charCount; charIndex++) {
    if (!dictNotone[characters[charIndex]]) {
      dictNotone[characters[charIndex]] = [pinyin]
    }
    else {
      dictNotone[characters[charIndex]].push(pinyin)
    }
  }
}

function generateCombinations(arrays: string[][]): string[] {
  // 如果输入为空数组，返回空数组
  if (arrays.length === 0)
    return []

  // 如果只有一个数组，直接返回这个数组的元素
  if (arrays.length === 1)
    return arrays[0]

  // 结果数组
  const combinations: string[] = []

  // 递归生成组合
  function combine(arrayIndex: number, currentString: string): void {
    // 如果已经处理完所有数组，将当前组合加入结果
    if (arrayIndex === arrays.length) {
      combinations.push(currentString)
      return
    }

    // 遍历当前数组的每个元素
    for (const item of arrays[arrayIndex]) {
      // 将当前元素添加到组合中，并继续处理下一个数组
      combine(arrayIndex + 1, currentString + item)
    }
  }

  // 从第一个数组开始组合
  combine(0, '')

  return combinations
}

/**
 * 根据汉字获取拼音，如果不是汉字直接返回原字符
 * @param chinese 要转换的汉字
 */
export function getPinyin(chinese: string) {
  if (!chinese || /^ +$/.test(chinese))
    return []
  const pinyinArrays: string[][] = []

  for (let charIndex = 0, textLength = chinese.length; charIndex < textLength; charIndex++) {
    const currentChar = chinese.charAt(charIndex)
    const possiblePinyins = dictNotone[currentChar]
    if (possiblePinyins) {
      pinyinArrays.push(possiblePinyins)
    }
    else {
      pinyinArrays.push([currentChar])
    }
  }
  return generateCombinations(pinyinArrays)
}

/**
 * 获取汉字的拼音首字母
 * @param str 汉字字符串，如果遇到非汉字则原样返回
 */
export function getFirstLetter(str: string) {
  if (!str || /^ +$/.test(str))
    return []

  const pinyinArrays: string[][] = []
  for (let charIndex = 0; charIndex < str.length; charIndex++) {
    const charCode = str.charCodeAt(charIndex)
    const currentChar = str.charAt(charIndex)
    // 检查字符是否在中文Unicode范围内（CJK统一汉字）
    if (charCode >= 19968 && charCode <= 40869) {
      pinyinArrays.push(dictNotone[currentChar].map(pinyin => pinyin.charAt(0)))
    }
    else {
      pinyinArrays.push([currentChar])
    }
  }

  const combinations = generateCombinations(pinyinArrays)

  return combinations
}
