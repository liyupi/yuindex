<template>
  <div>
    <div>倒计时：{{ seconds }} 秒</div>
    <div>
      剩余：{{ leftTime }} 秒
      <template v-if="leftTime > 0">
        <a-button v-if="start" size="small" ghost danger @click="toggleStart">
          暂停
        </a-button>
        <a-button v-else size="small" ghost @click="toggleStart">继续</a-button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, toRefs } from "vue";

interface TimingBoxProps {
  seconds: string;
}

const props = withDefaults(defineProps<TimingBoxProps>(), {});
const { seconds } = toRefs(props);

// 剩余时间
const leftTime = ref(Number(seconds.value));
// 运行中
const start = ref(true);
// 定时器
let interval: number;

/**
 * 暂停 / 运行
 */
const toggleStart = () => {
  start.value = !start.value;
};

onMounted(() => {
  if (!leftTime.value) {
    return;
  }
  interval = window.setInterval(() => {
    if (start.value) {
      leftTime.value--;
    }
    if (leftTime.value <= 0) {
      alert(`${seconds.value} 秒倒计时结束`);
      if (interval) {
        clearInterval(interval);
      }
    }
  }, 1000);
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<style scoped></style>
