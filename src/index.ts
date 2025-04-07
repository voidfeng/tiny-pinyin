import dictNotoneOrigin from './dict/pinyinDict'

// 把字典 {[拼音]: [汉字]} 转换为 {[汉字]: [拼音]}
const dictNotone: Record<string, string[]> = {}
for (const i in dictNotoneOrigin) {
  const temp = dictNotoneOrigin[i]
  for (let j = 0, len = temp.length; j < len; j++) {
    if (!dictNotone[temp[j]]) {
      dictNotone[temp[j]] = [i]
    }
    else {
      dictNotone[temp[j]].push(i)
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
  const result: string[] = []

  // 递归生成组合
  function combine(currentIndex: number, currentCombination: string): void {
    // 如果已经处理完所有数组，将当前组合加入结果
    if (currentIndex === arrays.length) {
      result.push(currentCombination)
      return
    }

    // 遍历当前数组的每个元素
    for (const element of arrays[currentIndex]) {
      // 将当前元素添加到组合中，并继续处理下一个数组
      combine(currentIndex + 1, currentCombination + element)
    }
  }

  // 从第一个数组开始组合
  combine(0, '')

  return result
}

/**
 * 根据汉字获取拼音，如果不是汉字直接返回原字符
 * @param chinese 要转换的汉字
 */
export function getPinyin(chinese: string) {
  if (!chinese || /^ +$/.test(chinese))
    return ''
  const result: string[][] = []

  for (let i = 0, len = chinese.length; i < len; i++) {
    const temp = chinese.charAt(i)
    const pinyin = dictNotone[temp]
    if (pinyin) {
      result.push(pinyin)
    }
    else {
      result.push([temp])
    }
  }
  return generateCombinations(result)
}

/**
 * 获取汉字的拼音首字母
 * @param str 汉字字符串，如果遇到非汉字则原样返回
 */
export function getFirstLetter(str: string) {
  if (!str || /^ +$/.test(str))
    return ''

  const result: string[][] = []
  for (let i = 0; i < str.length; i++) {
    const unicode = str.charCodeAt(i)
    const ch = str.charAt(i)
    if (unicode >= 19968 && unicode <= 40869) {
      const singleTextLetter: string[] = []
      for (const key in dictNotoneOrigin) {
        if (dictNotoneOrigin[key].includes(ch)) {
          singleTextLetter.push(key[0])
        }
      }
      result.push(singleTextLetter)
    }
    else {
      result.push([ch])
    }
  }

  const combinations = generateCombinations(result)

  return combinations
}
