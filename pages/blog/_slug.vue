<template>
  <section class="slug">

    <h1 class="slug_title">{{ post.fields.title }}</h1>

    <div class="flex-tag-date">
      <div class="tags">
        <div
          v-for="(tag, index) in post.fields.tags"
          :key="index.id"
          class="tag">{{ tag }}</div>
      </div>
      <div class="date">{{ new Date(post.fields.publishedAt).toLocaleDateString() }}</div>
    </div>

    <!-- <p class="slug_date"> -->
    <!--   {{ new Date(post.fields.publishedAt).toLocaleDateString() }} -->
    <!-- </p> -->
    <!-- <div class="wrapper&#45;image"> -->
    <!--   <img -->
    <!--     :src="post.fields.headerImage.fields.file.url" -->
    <!--     class="slug_image"> -->
    <!-- </div> -->
    <no-ssr>
      <markdown>
        <div v-html="$md.render(post.fields.body)"/>
      </markdown>
    </no-ssr>

  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  data() {
    return {
      model: '# Hello World!'
    }
  },
  transition: 'slide-left',
  async asyncData({ env, params }) {
    return await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug,
        order: '-sys.createdAt'
      })
      .then(entries => {
        return {
          post: entries.items[0]
        }
      })
      .catch(console.error)
  }
}
</script>

<style lang="scss" scoped>
.slug {
  max-width: 800px;
  margin: 0 auto;
  padding: 10px;
  .wrapper-image {
    text-align: center;
    img {
      max-width: 800px;
    }
  }
}
.slug_title {
  font-size: 2rem;
  font-weight: bolder;
  color: #47494e;
  padding: 10px;
}
.flex-tag-date {
  display: flex;
  padding: 10px;
  .tags {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    .tag {
      font-size: 0.8rem;
      color: #47494e;
      background: #fff;
      padding: 4px 15px;
      height: 30px;
      border: 1px solid #47494e;
      border-radius: 15px;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .date {
    font-size: 0.8rem;
    color: #47494e;
    padding: 5px 10px;
    height: 30px;
    border-radius: 5px;
  }
}
.slug_date {
  font-size: 1rem;
  color: rgb(57, 72, 85);
  text-align: right;
}
</style>
