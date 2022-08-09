<script setup lang="ts">
import { random } from "lodash";
import { ref, onMounted } from "vue";

const elec = ref<HTMLElement>();

const left = ref("10px");
const right = ref("14px");

const randomSize = () => {
  left.value = random(10, 30) + "px";
  right.value = random(10, 30) + "px";
};
onMounted(randomSize);
</script>

<template>
  <div ref="elec" class="elec">
    <span class="elec-header" :style="{ width: left }"></span>
    <span class="elec-center"></span>
    <span class="elec-footer" :style="{ width: right }"></span>
  </div>
</template>

<style scoped>
.elec {
  display: flex;
  opacity: 0.6;
  pointer-events: none;
}
.elec-header {
  background-color: #980070;
}
.elec-center {
  width: 4px;
  background-color: #a599c1;
}
.elec-footer {
  background-color: #1f9c96;
}
</style>
