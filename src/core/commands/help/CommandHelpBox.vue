<template>
  <div>
    <div>命令：{{ command.name }}</div>
    <div v-if="command.desc">介绍：{{ command.desc }}</div>
    <div v-if="command.alias?.length > 0">
      别名：{{ command.alias.join(", ") }}
    </div>
    <div>用法：{{ usageStr }}</div>
    <div>参数：</div>
    <div v-for="(param, index) in command.params" :key="index">
      {{ param.key }}
      {{ param.required ? "必填" : "可选" }}
      {{ param.defaultValue ? `默认：${param.defaultValue}` : "" }}
      {{ param.desc }}
    </div>
    <div>选项：</div>
    <div v-for="(option, index) in command.options" :key="index">
      {{ getOptionKeyList(option).join(", ") }}
      {{ option.required ? "必填" : "可选" }}
      {{ option.defaultValue ? `默认：${option.defaultValue}` : "" }}
      {{ option.desc }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs } from "vue";
import { CommandType } from "../../command";
import { getUsageStr, getOptionKeyList } from "./helpUtils";

interface HelpBoxProps {
  command: CommandType;
}

const props = withDefaults(defineProps<HelpBoxProps>(), {});
const { command } = toRefs(props);

/**
 * 拼接用法字符串
 */
const usageStr = computed(() => {
  let commandValue = command.value;
  return getUsageStr(commandValue);
});

onMounted(() => {});
</script>

<style scoped></style>
