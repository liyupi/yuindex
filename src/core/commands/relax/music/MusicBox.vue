<template>
  <div>
    <iframe
      v-if="musicPath"
      frameborder="no"
      marginwidth="0"
      marginheight="0"
      width="330"
      height="86"
      :src="musicPath"
    />
    <div v-if="errorHint">{{ errorHint }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from "vue";
import { getSingleMusic } from "./musicApi";

interface MusicBoxProps {
  name: string;
}

const props = withDefaults(defineProps<MusicBoxProps>(), {});
const { name } = toRefs(props);
const musicPath = ref("");
const errorHint = ref("");

onMounted(async () => {
  // 搜索音乐，返回 id
  const res: any = await getSingleMusic(name.value);
  if (res?.code === 0) {
    const music = res.data;
    musicPath.value = `//music.163.com/outchain/player?type=2&id=${music.id}&auto=1&height=66`;
  } else {
    errorHint.value = "未找到音乐";
  }
});
</script>

<style scoped></style>
