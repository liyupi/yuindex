<template>
  <div>关于本站：YuIndex 极客范儿的浏览器主页</div>
  <div>
    <a href="https://github.com/liyupi/yuindex" target="_blank">
      代码开源，欢迎 star 和贡献~
    </a>
  </div>
  <div></div>
  <div>
    作者：
    <a href="https://docs.qq.com/doc/DUFFRVWladXVjeUxW" target="_blank">
      程序员鱼皮
    </a>
  </div>
</template>

<script setup lang="ts">
interface InfoBoxProps {
  seconds: string;
}

const props = withDefaults(defineProps<InfoBoxProps>(), {});
</script>

<style scoped></style>
