<template>
  <div class="global-nav">
    <div class="global-nav__part">
      <img src="~/assets/smaply_logo.svg" class="global-nav__brand-image" alt="Smaply"/>
      <GlobalNavButton icon="user" :displayed-count="3"></GlobalNavButton>
      <GlobalNavButton icon="dot-circle" :displayed-count="1"></GlobalNavButton>
      <GlobalNavButton icon="th-large" :displayed-count="1"></GlobalNavButton>
    </div>
    <div class="global-nav__part global-nav__part--center">
      <p class="global-nav__breadcrumb">Dashboard / My Project / <strong>Persona {{ persona.name }}</strong></p>
    </div>
    <div class="global-nav__part">
      <GlobalNavButton icon="sitemap" display-dropdown-caret>My organization</GlobalNavButton>
      <GlobalNavButton icon="user">Jane Doe</GlobalNavButton>
      <GlobalNavButton icon="power-off"></GlobalNavButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace, Getter } from 'nuxt-property-decorator'
import GlobalNavButton from '~/components/GlobalNav/GlobalNavButton.vue'
import { Persona } from '~/models/Persona'

const personaModule = namespace('persona')

@Component({
  components: { GlobalNavButton }
})
export default class GlobalNav extends Vue {
  @personaModule.Getter('getPersona') persona!: Persona
}
</script>

<style lang="scss" scoped>
$height: 36px;

.global-nav {
  min-height: $height;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #3C4646;
  padding: 6px 8px;

  &__part {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    &--center {
      margin: 5px 0;
    }
  }

  &__breadcrumb {
    color: #B1B6B6;
    font-size: 12px;
    letter-spacing: 0;
    line-height: 15px;
    margin-bottom: 0;
    text-transform: uppercase;
    text-align: center;
    width: 100%;
    strong {
      font-weight: bold;
    }

  }

  &__brand-image {
    flex: 1 1 auto;
    height: 24px;
    margin-right: 8px;
  }
}
</style>
