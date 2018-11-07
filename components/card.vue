<template>
  <article class="card">
    <nuxt-link
      :to="{ name: 'blog-slug', params: { slug: slug }}"
      class="wrapper">
      <img
        :src="headerImage.fields.file.url"
        class="image">
      <h1 class="title">{{ title }}</h1>
      <p class="date">{{ new Date(publishedAt).toLocaleDateString() }}</p>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title'
    },
    slug: {
      type: String,
      default: 'slug'
    },
    headerImage: {
      type: Object,
      default: () => {
        return new MyObject()
      }
    },
    publishedAt: {
      type: String,
      default: new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  height: 200px;
  box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.2);
  border: 0.5px solid rgb(57, 72, 85);
  padding: 10px 20px;
  margin: 10px 10px;
}
.wrapper {
  text-decoration: none;
}
.title {
  font-size: 1.2rem;
}
.date {
  font-size: 0.7rem;
  color: rgb(57, 72, 85);
  text-align: right;
}
.image {
  max-height: 100px;
}
</style>
