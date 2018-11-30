<template>
  <article class="card">

    <nuxt-link
      :to="{ name: 'blog-slug', params: { slug: slug }}"
      class="wrapper">
      <!-- <div -->
      <!--   class="wrapper" -->
      <!--   @click="test($md.render(body))"> -->

      <template v-if="headerImage.fields">
        <!-- <img -->
        <!--   :src="headerImage.fields.file.url" -->
        <!--   class="image"> -->
      </template>
      <template v-else>
        <!-- <p>nai</p> -->
      </template>

      <h1 class="title">{{ title.substr(0, 75) }}</h1>
      <!-- <div -->
      <!--   id="str" -->
      <!--   class="body" -->
      <!--   v&#45;html="$md.render(body)"/> -->
      <div
        id="str"
        :text-content.prop="body"
        class="body"/>

      <div class="flex-tag-date">
        <template v-if="tags">
          <div class="tags">
            <div
              v-for="(tag, index) in tags"
              :key="index.id"
              class="tag">{{ tag }}</div>
          </div>
        </template>
        <template v-else/>
        <div class="date">{{ new Date(publishedAt).toLocaleDateString() }}</div>
      </div>

    </nuxt-link>
    <!-- </div> -->

  </article>
</template>

<script>
export default {
  props: {
    slug: {
      type: String,
      default: 'slug'
    },
    tags: {
      type: Array,
      default: () => {
        return []
      }
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
        return {}
      }
    },
    publishedAt: {
      type: String,
      default: new Date()
    }
  },
  computed: {
    // html() {
    //   const html = this.$md.render(this.body)
    //   // console.log(html)
    //   // const text = html.textContent
    //   // console.log(text)
    //   // const text = document.getElementById(html).textContent
    //   return html
    // },
    //
    // text() {
    //   return this.$el.textContent
    // }
  },
  methods: {
    // test(html) {
    //   // console.log(html)
    //   // const text = document.getElementById('str').textContent
    //   const text = html.textContent()
    //   // const text = html
    //   console.log(text)
    // }
  }
}
</script>

<style lang="scss" scoped>
.card {
  max-width: 800px;
  text-align: left;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.15);
  padding: 20px;
  margin: 0 auto;
}
.wrapper {
  text-decoration: none;
}
.title {
  font-size: 1.2rem;
  font-weight: bold;
  max-height: 28px;
  overflow: hidden;
}
.body {
  font-size: 0.8rem;
  color: #47494e;
  max-height: 37px;
  margin: 0 0 10px;
  overflow: hidden;
}
.flex-tag-date {
  display: flex;
  .tags {
    display: flex;
    width: 100%;
    .tag {
      font-size: 0.8rem;
      color: #47494e;
      background: #fff;
      padding: 3px 15px;
      height: 30px;
      border: 1px solid #47494e;
      border-radius: 15px;
      margin-right: 5px;
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
.image {
  max-height: 100px;
}
</style>
