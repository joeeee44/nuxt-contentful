<template>
  <article class="card">
    <nuxt-link
      :to="{ name: 'blog-slug', params: { slug: slug }}"
      class="wrapper">

      <template v-if="headerImage.fields">
        <!-- <img -->
        <!--   :src="headerImage.fields.file.url" -->
        <!--   class="image"> -->
      </template>
      <template v-else>
        <!-- <p>nai</p> -->
      </template>
      <h1 class="title">{{ title }}</h1>
      <div
        class="body"
        v-html="$md.render(body)"/>
      <div class="date">{{ new Date(publishedAt).toLocaleDateString() }}</div>
    </nuxt-link>
  </article>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default: 'slug'
    },
    title: {
      type: String,
      default: 'title'
    },
    body: {
      type: String,
      default: 'body'
    },
    headerImage: {
      type: Object,
      required: false,
      default: () => {
        // return new MyObject()
        return { message: 'hello' }
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
  width: 500px;
  height: 150px;
  text-align: left;
  // box-shadow: 1px 2px 3px 1px rgba(0, 0, 0, 0.2);
  // border: 0.5px solid rgb(57, 72, 85);
  border-bottom: 2px solid #ccc;
  padding: 10px 20px;
  margin: 0 auto;
}
.wrapper {
  text-decoration: none;
}
.title {
  font-size: 1.2rem;
  font-weight: bold;
  max-height: 60px;
  overflow: hidden;
}
.body {
  font-size: 0.8rem;
  max-height: 65px;
  margin: 10px 0;
  overflow: hidden;
}
.date {
  font-size: 0.7rem;
  color: rgb(57, 72, 85);
  margin: 10px 0;
  text-align: right;
}
.image {
  max-height: 100px;
}
</style>
