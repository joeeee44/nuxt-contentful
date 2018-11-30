<template>
  <header>
    <nuxt-link to="/">
      <h1 class="header-title">nuxt-contentful</h1>
    </nuxt-link>
  </header>
</template>

<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.15);
  opacity: 0.9;
  a {
    text-decoration: none;
    color: #47494e;
  }
}

.header-title {
  font-family: cursive;
  display: block;
  font-weight: 300;
  font-size: 25px;
  color: #47494e;
  letter-spacing: 1px;
  padding: 5px 10px;
}
</style>
