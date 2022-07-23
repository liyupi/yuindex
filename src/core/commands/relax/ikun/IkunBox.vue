<template>
  <div style="margin: 8px 0">
    <canvas ref="canvasRef" class="charVideoCanvas" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// @ts-ignore
import CharVideo from "./charVideo";

const getBlob = () => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "GET",
      "https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/ikun.mp4",
      true
    );
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };
    xhr.send();
  });
};

const canvasRef = ref();

onMounted(async () => {
  const blob = await getBlob();
  if (blob) {
    new CharVideo({
      canvasElement: canvasRef.value,
    }).playFile(blob);
  }
});
</script>

<style scoped>
.main {
  width: 100%;
  height: 80vh;
  min-height: 600px;
}
</style>
