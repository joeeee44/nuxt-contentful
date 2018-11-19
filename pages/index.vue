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
  // `env` is available in the context object
  asyncData({ env }) {
    return Promise.all([
      // fetch the owner of the blog
      client.getEntries({
        'sys.id': env.CTF_PERSON_ID
      }),
      // fetch all blog posts sorted by creation date
      client.getEntries({
        content_type: env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      })
    ])
      .then(([entries, posts]) => {
        // return data that should be available
        // in the template
        return {
          person: entries.items[0],
          posts: posts.items
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
