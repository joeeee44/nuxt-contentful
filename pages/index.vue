<template>
  <section class="index-container">
    <div>

      <!-- <img :src="image_path(image1)"> -->
      <!-- <div -->
      <!--   :style="{ 'background&#45;image': 'url(' + image_path(image1) + ')' }" -->
      <!--   class="picture"/> -->

      <section class="index">

        <!-- <ul -->
        <!--   v&#45;for="post in posts" -->
        <!--   :key="post.fields.slug"> -->
        <!--   <li>{{ post.fields.headerImage }}</li> -->
        <!-- </ul> -->

        <no-ssr>
          <card
            v-for="post in posts"
            v-bind="post.fields"
            :key="post.fields.slug"/>
        </no-ssr>

      </section>
    </div>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'

const client = createClient()

export default {
  async asyncData({ env, params }) {
    return await client
      .getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishedAt'
      })
      .then(entries => {
        return {
          posts: entries.items
        }
      })
      .catch(console.error)
  },
  transition: 'slide-left',
  computed: {
    image1() {
      return this.$store.state.image1
    }
  },
  methods: {
    image_path(path) {
      return require('@/assets/images/' + path)
    }
  }
}
</script>

<style>
.index-container {
  text-align: center;
}

.index {
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* justify-content: center; */
}

.picture {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  max-width: 500px;
  height: 500px;
  margin: 0 auto;
}
@media all and (min-width: 600px) {
  .picture {
    /* background-repeat: no-repeat; */
    /* background-position: center; */
    /* background-size: cover; */
    /* width: 100%; */
  }
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
