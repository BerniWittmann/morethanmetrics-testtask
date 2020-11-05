<template>
  <PersonaCard />
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import PersonaCard from '@/components/PersonaCard.vue'

@Component({
  async asyncData ({ store }) {
    await store.dispatch('persona/fetchPersona')
  },
  components: {
    PersonaCard
  }
})
export default class IndexPage extends Vue {

}
</script>

<style>
</style>
