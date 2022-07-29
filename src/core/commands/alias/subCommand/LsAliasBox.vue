<template>
  <div>
    <div>别名列表：</div>
    <div v-for="(name, index) in names" :key="index">
      <a-row :gutter="16">
        <a-col :span="4">{{ name }}</a-col>
      </a-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from "vue";

interface LsAliasBoxProps {
  names: string[];
}

const props = withDefaults(defineProps<LsAliasBoxProps>(), {});
const { names } = props;

onMounted(() => { });
</script>

<style scoped>
</style>
