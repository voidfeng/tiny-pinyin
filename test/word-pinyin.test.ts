import { getFirstLetter, getPinyin } from '../src/index'

it('get first letter', () => {
  expect(getFirstLetter('你好')).toStrictEqual(['nh'])
})

it('get word\'s pinyin', () => {
  expect(getPinyin('你好')).toStrictEqual(['nihao'])
})
