<template>
  <div>
    <span v-if="output.type === 'text'" v-html="smartText(output.text)" />
    <component :is="output.component" v-if="output.type === 'component'" />
  </div>
</template>

<script setup lang="ts">
import smartText from "../../plugins/smartText";
import OutputType = YuTerminal.OutputType;
import { ref } from "vue";

interface OutputProps {
  output: OutputType;
}

const props = defineProps<OutputProps>();
const output = ref(props.output);
</script>

<style scoped></style>
