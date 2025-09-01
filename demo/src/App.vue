<script setup lang="ts">
import { computed, ref } from 'vue'
import { getFirstLetter, getPinyin } from '../../src/index.ts'

const value = ref('1a卡卡西😁2b')

const firstLetter = computed(() => {
  return getFirstLetter(value.value)
})

const pinyin = computed(() => {
  return getPinyin(value.value)
})

// 字符长度计算
const characterCount = computed(() => {
  return value.value.length
})

// 预设示例
const examples = [
  '你好世界',
  '拼音转换',
  '汉字转拼音',
  '1a卡卡西😁2b',
  '混合文本123',
]

function setExample(example: string) {
  value.value = example
}
</script>

<template>
  <div class="app">
    <!-- 头部区域 -->
    <header class="header">
      <div class="container">
        <h1 class="title">
          <span class="title-text">Tiny Pinyin</span>
          <span class="title-badge">演示</span>
        </h1>
        <p class="subtitle">
          轻量级汉字转拼音工具，支持首字母提取和全拼音转换
        </p>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main">
      <div class="container">
        <!-- 输入区域 -->
        <div class="input-section">
          <h2 class="section-title">
            输入文本
          </h2>
          <div class="input-wrapper">
            <input
              v-model="value"
              class="text-input"
              placeholder="请输入需要转换的文本..."
              autocomplete="off"
            >
            <div class="input-focus-ring" />
          </div>

          <!-- 字符长度显示 -->
          <div class="character-count">
            <span class="count-text">字符数：</span>
            <span class="count-number">{{ characterCount }}</span>
          </div>

          <!-- 示例按钮 -->
          <div class="examples">
            <span class="examples-label">试试这些示例：</span>
            <div class="examples-list">
              <button
                v-for="example in examples"
                :key="example"
                class="example-btn"
                @click="setExample(example)"
              >
                {{ example }}
              </button>
            </div>
          </div>

          <!-- 组合数量显示 -->
          <div class="combination-info">
            <span class="combination-icon">📊</span>
            <span class="combination-text">有 {{ firstLetter.length }} 种组合</span>
          </div>
        </div>

        <!-- 结果区域 -->
        <div class="results-grid">
          <!-- 首字母结果 -->
          <div class="result-card">
            <h3 class="result-title">
              <span class="result-icon">🔤</span>
              首字母
            </h3>
            <div class="result-content">
              <div class="result-value">
                {{ firstLetter.join(' ') || '暂无结果' }}
              </div>
              <div class="result-note">
                提取中文汉字的拼音首字母
              </div>
            </div>
          </div>

          <!-- 全拼音结果 -->
          <div class="result-card">
            <h3 class="result-title">
              <span class="result-icon">🎯</span>
              完整拼音
            </h3>
            <div class="result-content">
              <div class="result-value">
                {{ pinyin.join(' ') || '暂无结果' }}
              </div>
              <div class="result-note">
                转换为完整的拼音形式
              </div>
            </div>
          </div>
        </div>

        <!-- 功能特点 -->
        <div class="features">
          <h2 class="section-title">
            功能特点
          </h2>
          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon">
                ⚡
              </div>
              <h4>轻量高效</h4>
              <p>体积小巧，性能优异</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                🌐
              </div>
              <h4>全面支持</h4>
              <p>支持简繁体中文</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                🎨
              </div>
              <h4>灵活配置</h4>
              <p>多种输出格式选择</p>
            </div>
            <div class="feature-item">
              <div class="feature-icon">
                🔧
              </div>
              <h4>易于集成</h4>
              <p>简单的API接口</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <div class="container">
        <p>© 2024 Tiny Pinyin - 开源汉字转拼音工具</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
}

/* PC大屏优化 */
@media (min-width: 1440px) {
  .container {
    max-width: 1600px;
    padding: 0 32px;
  }
}

@media (min-width: 1920px) {
  .container {
    max-width: 1800px;
    padding: 0 40px;
  }
}

/* 头部样式 */
.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 40px 0;
  text-align: center;
}

.title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 0 0 16px 0;
  font-size: 3rem;
  font-weight: 700;
  color: white;
}

.title-text {
  background: linear-gradient(45deg, #fff, #f0f9ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.125rem;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* 主要内容 */
.main {
  padding: 60px 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 24px 0;
  text-align: center;
}

/* 输入区域 */
.input-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.input-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.text-input {
  width: 100%;
  padding: 16px 20px;
  font-size: 1.125rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  transition: all 0.3s ease;
  outline: none;
}

.text-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.text-input::placeholder {
  color: #94a3b8;
}

/* 字符长度显示 */
.character-count {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-bottom: 16px;
  padding: 0 4px;
}

.count-text {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}

.count-number {
  color: #667eea;
  font-size: 0.875rem;
  font-weight: 600;
  background: rgba(102, 126, 234, 0.1);
  padding: 2px 8px;
  border-radius: 6px;
  min-width: 24px;
  text-align: center;
}

/* 组合数量显示 */
.combination-info {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  border: 1px solid #cbd5e1;
  border-radius: 20px;
  padding: 6px 12px;
  margin-top: 12px;
  font-size: 0.8rem;
  color: #475569;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.combination-info:hover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: #667eea;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.combination-icon {
  font-size: 0.9rem;
}

.combination-text {
  font-weight: 500;
  white-space: nowrap;
}

/* 示例按钮 */
.examples {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.examples-label {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.examples-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.example-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #475569;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.example-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
  transform: translateY(-1px);
}

/* 结果网格 */
.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-bottom: 60px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.result-card {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

.result-card:hover {
  transform: translateY(-4px);
}

.result-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
}

.result-icon {
  font-size: 1.25rem;
}

.result-value {
  font-size: 1.125rem;
  font-weight: 500;
  color: #667eea;
  background: #f8fafc;
  padding: 12px 16px;
  border-radius: 8px;
  border-left: 4px solid #667eea;
  word-break: break-all;
  min-height: 44px;
  display: flex;
  align-items: center;
}

.result-note {
  color: #64748b;
  font-size: 0.875rem;
  margin-top: 8px;
}

/* 功能特点 */
.features {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 40px 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.features .section-title {
  color: #1e293b;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 32px;
}

/* PC端优化 - 确保功能特点在大屏幕上最多4列 */
@media (min-width: 1200px) {
  .features-grid {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1200px;
    margin: 0 auto;
  }

  /* 大屏幕字体和间距优化 */
  .title {
    font-size: 3.5rem;
  }

  .subtitle {
    font-size: 1.25rem;
  }

  .main {
    padding: 80px 0;
  }

  .input-section {
    padding: 48px;
  }

  .text-input {
    font-size: 1.25rem;
    padding: 20px 24px;
  }

  .result-card {
    padding: 32px;
  }

  .features {
    padding: 60px 48px;
  }
}

.feature-item {
  text-align: center;
  padding: 20px;
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 12px;
}

.feature-item h4 {
  margin: 0 0 8px 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
}

.feature-item p {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
}

/* 底部 */
.footer {
  background: rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 24px 0;
  margin-top: 40px;
}

.footer p {
  margin: 0;
  font-size: 0.875rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
    flex-direction: column;
    gap: 8px;
  }

  .subtitle {
    font-size: 1rem;
  }

  .input-section {
    padding: 24px 20px;
  }

  .examples {
    flex-direction: column;
    align-items: flex-start;
  }

  .features {
    padding: 32px 20px;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }
}
</style>
