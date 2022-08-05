<template>
  <div :class="['main', variablesTable.source ? 'success' : 'warning']">
    <a-spin
      :spinning="!loadOK"
      :style="{
        height: !loadOK ? '283px' : '',
        position: !loadOK ? 'inherit' : '',
      }"
    >
      <div v-show="loadOK">
        <a-table
          v-if="variablesTable?.source"
          class="table"
          :data-source="variablesTable?.source"
          :columns="variablesTable?.columns"
          :size="'small'"
          :pagination="false"
        />
        <content-output v-else :output="output" />
      </div>
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from "vue";
import { getNamedVariables } from "./hooks/api/rest/translate";
import { parseNamedVariable } from "./hooks/character/standard";
import ContentOutput from "../../../components/yu-terminal/ContentOutput.vue";
import OutputType = YuTerminal.OutputType;

interface VariableBoxProps {
  searchText: string;
}

const props = defineProps<VariableBoxProps>();

const { searchText } = toRefs(props);
const variablesTable = ref<any>({});
const loadOK = ref(false);
const output = reactive<OutputType>({
  type: "text",
  status: "warning",
  text: "",
});

getNamedVariables(searchText.value)
  .then((res: any) => {
    const { code, data, msg } = res;
    code === 200
      ? (variablesTable.value = parseNamedVariable(data.namedVariables))
      : (output.text = msg);
  })
  .catch((err: any) => {
    output.text = "服务器扛不住了，请稍后再试";
  })
  .finally(() => {
    loadOK.value = true;
  });
</script>

<style scoped>
.main {
  max-width: 600px;
}

.success {
  margin: 8px 0;
}

.warning {
  margin: 0;
}

.table {
  overflow: hidden;
  background-color: white;
  padding: 5px;
  border-radius: 10px;
  box-shadow: 2px 3px 3px 1px #8b8b8b59;
}
</style>
