<template>
  <div class="content-output">
    <template v-if="output.type === 'text'">
      <a-tag v-if="outputTagColor" :color="outputTagColor"
        >{{ output.status }}
      </a-tag>
      <span v-if="output.type === 'text'" v-html="smartText(output.text)" />
    </template>
    <component
      :is="output.component"
      v-if="output.type === 'component'"
      v-bind="output.props ?? {}"
    />
  </div>
</template>

<script setup lang="ts">
import smartText from "../../utils/smartText";
import OutputType = YuTerminal.OutputType;
import { computed, toRefs } from "vue";

interface OutputProps {
  output: OutputType;
}

const props = defineProps<OutputProps>();
const { output } = toRefs(props);
const outputTagColor = computed((): string => {
  if (!output.value.status) {
    return "";
  }
  switch (output.value.status) {
    case "info":
      return "dodgerblue";
    case "success":
      return "limegreen";
    case "warning":
      return "darkorange";
    case "error":
      return "#c0300f";
    case "system":
      return "#bfc4c9";
    default:
      return "";
  }
});
</script>

<style scoped>
.content-output :deep(.ant-tag) {
  border-radius: 0;
  font-size: 16px;
  border: none;
}
</style>
