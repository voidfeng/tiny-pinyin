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
</script>

<template>
  <main>
    <input v-model="value">
    <p>firstLetter: {{ firstLetter }}（正确结果：['kkx', 'kqx', 'qkx', 'qqx']）</p>
    <p>pinyin: {{ pinyin }}</p>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
