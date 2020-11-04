import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUser, faDotCircle, faPowerOff, faSitemap, faThLarge, faCaretDown
} from '@fortawesome/free-solid-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

library.add(
  faUser, faDotCircle, faPowerOff, faSitemap, faThLarge, faCaretDown
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
