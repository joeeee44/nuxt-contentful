<template>
  <section class="index-container">
    <div>
      <h1 class="title">
        <!-- {{ person.fields.name }} -->
      </h1>
      <h2 class="subtitle">
        project
      </h2>

      <section class="index">

        <card
          v-for="post in posts"
          v-bind="post.fields"
          :key="post.fields.slug"/>

      </section>
    </div>
  </section>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import Card from '~/components/card.vue'

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
  components: {
    Card
  }
}
</script>

<style>
.index-container {
  text-align: center;
}

.index {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
