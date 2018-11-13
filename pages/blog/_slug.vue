<template>
  <section class="slug">

    <!-- <h1 class="slug_title">{{ post.fields.title }}</h1> -->
    <!-- <p class="slug_date"> -->
    <!--   {{ new Date(post.fields.publishedAt).toLocaleDateString() }} -->
    <!-- </p> -->
    <!-- <div class="wrapper&#45;image"> -->
    <!--   <img -->
    <!--     :src="post.fields.headerImage.fields.file.url" -->
    <!--     class="slug_image"> -->
    <!-- </div> -->
    <markdown>
      <div v-html="$md.render(post.fields.body)"/>
    </markdown>

  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import markdown from '~/components/Markdown.vue'

const client = createClient()

export default {
  components: {
    markdown
  },
  data() {
    return {
      model: '# Hello World!'
    }
  },
  transition: 'slide-left',
  // computed: {
  //
  // },
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
}
.slug_date {
  font-size: 1rem;
  color: rgb(57, 72, 85);
  text-align: right;
}
</style>
