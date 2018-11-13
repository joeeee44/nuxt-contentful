<template>
  <div
    v-highlight
    class="md">
    <slot>markdownがありません</slot>
  </div>
</template>

<style lang="scss">
.md {
  max-width: 800px;
  margin: 0 auto;
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 10px;
    color: #35495e;
  }
  h1 {
    font-size: 35px;
  }
  pre {
    background: #00bc7e;
    padding: 15px;
    margin: 10px;
    border-left: solid 5px #3b8070;
    overflow: auto;
    code {
      background: #00bc7e;
      font-family: monaco;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>
