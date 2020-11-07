<template>
  <div class="header">
    <div class="header__part">
      <HeaderPersona></HeaderPersona>
    </div>
    <div class="header__part">
      <HeaderButton icon="save">Save persona</HeaderButton>
      <HeaderButton icon="plus-square">Add element</HeaderButton>
      <HeaderButton icon="share">Export</HeaderButton>
      <HeaderButton icon="copy">Duplicate</HeaderButton>
      <HeaderButton icon="long-arrow-alt-right">Move</HeaderButton>
      <HeaderButton icon="question-circle">Help</HeaderButton>
      <HeaderButton icon="ellipsis-h">More actions</HeaderButton>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import HeaderButton from '~/components/Header/HeaderButton.vue'
import HeaderPersona from '~/components/Header/HeaderPersona.vue'

@Component({
  components: { HeaderPersona, HeaderButton }
})
export default class Header extends Vue {

}
</script>

<style lang="scss" scoped>

.header {
  min-height: 64px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%);
  padding: 8px 16px 8px 24px;

  &__part {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: auto;
    flex: 0 0 auto;
    &--center {
      margin: 5px 0;
    }
  }
}
</style>
