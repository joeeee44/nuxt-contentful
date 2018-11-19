import Vue from 'vue'

import Header from '~/layouts/HeaderComponent.vue'
import Footer from '~/layouts/FooterComponent.vue'
import Logo from '~/components/Logo.vue'
import Card from '~/components/Card.vue'
import Markdown from '~/components/Markdown.vue'

Vue.component('header-component', Header)
Vue.component('footer-component', Footer)
Vue.component('logo', Logo)
Vue.component('card', Card)
Vue.component('markdown', Markdown)
