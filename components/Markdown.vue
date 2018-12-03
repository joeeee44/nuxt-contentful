<template>
  <div
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
    img {
      max-width: 760px;
      width: 100%;
    }
  }
  h1 {
    font-size: 35px;
  }
  pre {
    /* background: #3b8070; */
    background: #282c34;
    padding: 15px;
    margin: 10px;
    border-left: solid 5px #00bc7e;
    overflow: auto;
    code {
      /* background: #3b8070; */
      background: #282c34;
      font-family: monaco;
      font-size: 12px;
      line-height: 1.7;
      color: #fff;
    }
  }
}
</style>
