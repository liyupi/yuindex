<script setup lang="ts">
import { range, sample, random } from "lodash";
import { ref, onMounted } from "vue";
import BarrageItem from "./BarrageItem.vue";

const barrages = ref<HTMLElement>();
const barrageNumbers = ref(5);
const genElec = (el: HTMLElement) => {
  // get a render position
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * width;
  const y = Math.random() * height;
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.style.height =
    (sample([...range(3, 6), ...range(3, 6), ...range(3, 6), 10]) as number) +
    "px";
};
const handleBarrage = (number?: number) => {
  if (number === 0) return (barrageNumbers.value = 0);
  if (number) barrageNumbers.value = number;
  else barrageNumbers.value = random(4, 12, false);
  const elements = barrages.value!.children;
  // loop elelments
  for (var i = 0; i < elements.length; i++) {
    const child = elements[i] as HTMLElement;
    genElec(child);
  }
};
const initBarrage = () => {
  const _render = () => {
    const time = 110;
    const times = 6;
    const timeout = setInterval(handleBarrage, time);
    setTimeout(() => {
      clearInterval(timeout);
      handleBarrage(0);
    }, time * times);
  };
  _render();
  setInterval(_render, random(3000, 10000, false));
};
onMounted(initBarrage);
</script>

<template>
  <div ref="barrages" class="barrages">
    <barrage-item
      v-for="(_, index) in barrageNumbers"
      :key="index"
      class="item"
    />
  </div>
</template>

<style scoped>
.item {
  position: fixed;
}
.barrages {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  color: #f5f5f5;
}
</style>
