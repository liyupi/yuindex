<template>
  <div>
    <div>命令：{{ command.name }}</div>
    <div v-if="command.desc">介绍：{{ command.desc }}</div>
    <div v-if="command.alias && command.alias.length > 0">
      别名：{{ command.alias.join(", ") }}
    </div>
    <div>用法：{{ usageStr }}</div>
    <template
      v-if="command.subCommands && Object.keys(command.subCommands).length > 0"
    >
      <div>子命令：</div>
      <ul style="margin-bottom: 0">
        <li
          v-for="(subCommand, key, index) in command.subCommands"
          :key="index"
        >
          {{ subCommand.func }}
          {{ subCommand.name }}
          {{ subCommand.desc }}
        </li>
      </ul>
    </template>
    <template v-if="command.params && command.params.length > 0">
      <div>参数：</div>
      <ul style="margin-bottom: 0">
        <li v-for="(param, index) in command.params" :key="index">
          {{ param.key }}
          {{ param.required ? "必填" : "可选" }}
          {{ param.defaultValue ? `默认：${param.defaultValue}` : "" }}
          {{ param.desc }}
        </li>
      </ul>
    </template>
    <template v-if="command.options?.length > 0">
      <div>选项：</div>
      <ul style="margin-bottom: 0">
        <li v-for="(option, index) in command.options" :key="index">
          {{ getOptionKeyList(option).join(", ") }}
          {{ option.required ? "必填" : "可选" }}
          {{ option.defaultValue ? `默认：${option.defaultValue}` : "" }}
          {{ option.desc }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, toRefs } from "vue";
import { CommandType } from "../../../command";
import { getUsageStr, getOptionKeyList } from "./helpUtils";

interface HelpBoxProps {
  command: CommandType;
  parentCommand: CommandType;
}

const props = withDefaults(defineProps<HelpBoxProps>(), {});
const { command, parentCommand } = toRefs(props);

/**
 * 拼接用法字符串
 */
const usageStr = computed(() => {
  return getUsageStr(command.value, parentCommand.value);
});

onMounted(() => {});
</script>

<style scoped></style>
