<template>
  <yu-terminal
    ref="terminalRef"
    full-screen
    :on-submit-command="onSubmitCommand"
  />
</template>

<script setup lang="ts">
import { doCommandExecute } from "../core/commandExecutor";
import { ref } from "vue";

const terminalRef = ref();

const onSubmitCommand = (inputText: string) => {
  if (!inputText) {
    return;
  }
  const terminal = terminalRef.value.terminal;
  doCommandExecute(inputText, terminal);
};
</script>

<style></style>
