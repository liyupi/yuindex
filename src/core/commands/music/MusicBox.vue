<template>
  <div>
    <iframe
      frameborder="no"
      marginwidth="0"
      marginheight="0"
      width="330"
      height="86"
      src="//music.163.com/outchain/player?type=2&id=1366755599&auto=1&height=66"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, toRefs } from "vue";

interface MusicBoxProps {
  name: string;
}

const props = withDefaults(defineProps<MusicBoxProps>(), {});
const { name } = toRefs(props);

onMounted(() => {
  // todo 搜索音乐，返回 id
});

onUnmounted(() => {});
</script>

<style scoped></style>
