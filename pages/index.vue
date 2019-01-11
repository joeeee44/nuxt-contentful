<template>
  <section class="index-container">
    <div>

      <!-- <img :src="image_path(image1)"> -->
      <!-- <div -->
      <!--   :style="{ 'background&#45;image': 'url(' + image_path(image1) + ')' }" -->
      <!--   class="picture"/> -->

      <input
        v-model="param"
        type="text"
        class="search"
        placeholder="search">

      <!-- {{ filterEntries }} -->

      <section class="index">

        <!-- <ul -->
        <!--   v&#45;for="post in posts" -->
        <!--   :key="post.fields.slug"> -->
        <!--   <li>{{ post.fields.headerImage }}</li> -->
        <!-- </ul> -->

        <no-ssr>
          <card
            v-for="post in filterEntries"
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
  data() {
    return {
      param: ''
    }
  },
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
    },

    filterEntries() {
      const self = this
      return self.posts.filter(entry => {
        const result =
          entry.fields.title.toLowerCase().indexOf(self.param.toLowerCase()) !==
            -1 ||
          entry.fields.body.toLowerCase().indexOf(self.param.toLowerCase()) !==
            -1
        return result
      })
    }
  },
  methods: {
    image_path(path) {
      return require('@/assets/images/' + path)
    }
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  text-align: center;
}

/* .index { */
/*   display: flex; */
/*   flex-wrap: wrap; */
/*   justify-content: center; */
/* } */

.search {
  position: fixed;
  top: 0;
  right: 0;
  border: 1px solid #47494e;
  height: 30px;
  border-radius: 15px;
  margin: 10px;
  padding: 10px;
  outline: 0;
  font-family: cursive;
  font-size: 16px; /*iosだとこれより小さいとズームされる*/
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
/* @media all and (min-width: 600px) { */
/*   .picture { */
/*     background-repeat: no-repeat; */
/*     background-position: center; */
/*     background-size: cover; */
/*     width: 100%; */
/*   } */
/* } */

.title {
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
