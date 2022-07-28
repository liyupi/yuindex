<template>
  <div>
    <div v-for="(song, index) in songList" :key="index">
      <a
        :href="`https://music.163.com/#/song?id=${song.id}`"
        target="_blank"
      >
        {{ song.al.name }}
      </a>
      <img :src="song.al.picUrl" height="25" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { listHotMusics } from "./hotApi";

const songList = ref([]);

onMounted(async () => {
  const res: any = await listHotMusics();
  if (res?.code === 0) {
    const songs = res.data;
    songList.value = songs.slice(0, 10);
  } else {
    terminal.writeTextErrorResult(res?.message ?? "获取热榜失败");
  }
});
</script>

<style scoped></style>
