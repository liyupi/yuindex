<template>
  <div>关于本站：YuIndex-PLUS 极客范儿的浏览器主页</div>
  <div>
    <a href="https://github.com/tonywdy/yuindex-plus" target="_blank">
      代码开源，欢迎 star 和贡献~
    </a>
  </div>
  <div></div>
  <div>
    作者：程序员鱼皮 PLUS作者：kingwdy
  </div>
</template>

<script setup lang="ts">
interface InfoBoxProps {
  seconds: string;
}

const props = withDefaults(defineProps<InfoBoxProps>(), {});
</script>

<style scoped></style>
