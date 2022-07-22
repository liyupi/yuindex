<template>
  <div>
    <div>
      ⭐️ 使用 [help 命令英文名] 可以查询某命令的具体用法，如：help search
    </div>
    <div>命令列表：</div>
    <div v-for="(command, index) in commandList" :key="index">
      <a-row :gutter="16">
        <a-col :span="4">{{ command.func }}</a-col>
        <a-col :span="4">{{ command.name }}</a-col>
        <a-col>{{ command.desc }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { commandList } from "../../../commandRegister";

onMounted(() => {});
</script>

<style scoped></style>
