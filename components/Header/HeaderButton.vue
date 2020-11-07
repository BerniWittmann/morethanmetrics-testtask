<template>
  <div class="header-button">
    <font-awesome-icon :icon="icon" class="header-button__icon"></font-awesome-icon>
    <div class="header-button__text"><slot /></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component
export default class HeaderButton extends Vue {
  @Prop({ type: String, required: true }) readonly icon!: string
}
</script>

<style lang="scss" scoped>
.header-button {
  $color: #646E6E;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: $color;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  transition: color 100ms ease-in-out;

  &:hover {
    color: darken($color, 20%);
  }

  &+& {
    margin-left: 20px;
  }

  &__text {
    font-size: 12px;
  }
  &__icon {
    height: 20px;
    width: auto;
    margin-bottom: 5px;
  }
}
</style>
