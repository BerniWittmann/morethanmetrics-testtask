<template>
  <div class="main-container">
    <GlobalNav />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import GlobalNav from '@/components/GlobalNav.vue'

@Component({
  components: {
    GlobalNav
  }
})
export default class DefaultLayout extends Vue {

}
</script>

<style lang="scss" scoped>
.main-container {
  background-color: #646E6E;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
