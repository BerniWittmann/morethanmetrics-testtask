<template>
  <PersonaCard />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({
  async asyncData ({ store }) {
    await store.dispatch('persona/fetchPersona')
  }
})
export default class IndexPage extends Vue {

}
</script>

<style>
</style>
