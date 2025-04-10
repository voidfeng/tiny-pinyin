# tiny-pinyin-next

轻量级的汉字转无注音拼音库，支持多音字，常用汉字仅18kb，全部可显示汉字gzip仅75kb。

## 特性

- 🚀 轻量级，无外部依赖
- 🔄 支持多音字，返回所有可能的拼音组合
- 📝 支持获取拼音首字母
- 🛠️ 使用TypeScript编写，提供类型定义
- 支持选择 常用简体汉字 6763 个 或 GB 18030-2005‌ 标准中的繁简汉字 27111 个，涵盖全部操作系统中全部可显示汉字

## 安装

```sh
npm install tiny-pinyin-next
```

## 使用

### 重要说明：引入字典文件

在使用库之前，需要先通过script标签引入字典文件，这样可以避免通过打包工具处理时将汉字转换为unicode字符，导致包体积变大：

```html
<script src="pinyinDict.js"></script>
```

> 注意：字典文件可以从项目的 `src/dict` 下获取。

### 基本用法

```js
import { getFirstLetter, getPinyin } from 'tiny-pinyin-next'

// 获取汉字的拼音
getPinyin('你好') // ['nihao']

// 获取拼音首字母
getFirstLetter('你好') // ['nh']
```

### 多音字处理

```js
import { getPinyin } from 'tiny-pinyin-next'

// 处理多音字，返回所有可能的组合
const pinyinCombinations = getPinyin('重庆')
console.log(pinyinCombinations) // 返回所有可能的拼音组合: [ "chongqing", "zhongqing" ]
```

## API

### getPinyin(chinese: string)

将汉字转换为拼音。

- **参数**:
  - `chinese`: 要转换的汉字字符串
- **返回值**: 转换后的拼音字符串或所有可能的拼音组合数组

### getFirstLetter(str: string)

获取汉字的拼音首字母。

- **参数**:
  - `str`: 要获取首字母的汉字字符串
- **返回值**: 拼音首字母字符串或所有可能的首字母组合数组

## 开发

```sh
# 安装依赖
npm install

# 运行测试
npm test

# 构建项目
npm run build

# 运行演示项目
npm run dev
```

## 许可证

[ISC](https://opensource.org/licenses/ISC)

## 贡献

欢迎提交问题和贡献代码，请确保在提交PR之前运行测试并通过lint检查。
