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
import { CommandOptionType, CommandType } from "../../command";

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
  let str = commandValue.func;
  if (commandValue.params && commandValue.params.length > 0) {
    const paramsStrList: string[] = commandValue.params.map((param) => {
      if (param.required) {
        return `<${param.key}>`;
      } else {
        return `[${param.key}]`;
      }
    });
    str += " " + paramsStrList.join(" ");
  }
  if (commandValue.options?.length > 0) {
    const optionStrList: string[] = commandValue.options.map((option) => {
      const optionKey = getOptionKey(option);
      if (option.required) {
        if (option.type === "boolean") {
          return `<${optionKey} ${option.key}>`;
        } else {
          return `<${optionKey}>`;
        }
      } else {
        if (option.type === "boolean") {
          return `[${optionKey}]`;
        } else {
          return `[${optionKey} ${option.key}]`;
        }
      }
    });
    str += " " + optionStrList.join(" ");
  }
  return str;
});

/**
 * 获取选项关键词
 * @param option
 */
const getOptionKey = (option: CommandOptionType) => {
  // 优先用简写
  if (option.alias && option.alias.length > 0) {
    return "-" + option.alias[0];
  }
  return "--" + option.key;
};

/**
 * 获取选项关键词列表
 * @param option
 */
const getOptionKeyList = (option: CommandOptionType) => {
  const list = [];
  // 优先用简写
  if (option.alias && option.alias.length > 0) {
    list.push("-" + option.alias[0]);
  }
  list.push("--" + option.key);
  return list;
};

onMounted(() => {});
</script>

<style scoped></style>
