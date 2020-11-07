<template>
  <div :class="classes">
    <div class="card__header">
      <slot name="header" />
      <div class="card__header__close-button" v-if="hasCloseButton" @click="close">
        <font-awesome-icon icon="times"></font-awesome-icon>
      </div>
    </div>
    <div class="card__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'nuxt-property-decorator'
import EnumProp from '~/common/EnumProp'

enum Width {
  Normal = 'normal',
  Thin = 'thin',
  Full = 'full'
}

@Component
export default class Card extends Vue {
  @Prop(EnumProp(Width.Normal, Width)) width!: Width
  @Prop({ default: false, type: Boolean }) hasCloseButton!: boolean

  get classes(): Record<string, boolean> {
    return {
      'card': true,
      'card--width-normal': this.width === Width.Normal,
      'card--width-full': this.width === Width.Full,
      'card--width-thin': this.width === Width.Thin,
    }
  }

  @Emit()
  close (): void {}
}
</script>

<style lang="scss" scoped>

.card {
  box-shadow: 0 20px 20px 0 rgba(0,0,0,0.1);
  $border-radius: 2px;
  border-radius: $border-radius;
  display: flex;
  flex-direction: column;

  &--width-normal {

  }
  &--width-full {
    width: 100%;
  }
  &--width-thin {
    width: 390px;
  }

  &__content {
    background-color: #F0F0F0;
    padding: 16px;
    flex: 1;
    border-bottom-left-radius: $border-radius;
    border-bottom-right-radius: $border-radius;
  }

  &__header {
    background-color: #DCDCDC;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    color: #646E6E;
    flex: 0;
    border-top-left-radius: $border-radius;
    border-top-right-radius: $border-radius;

    $padding: 16px;
    padding: $padding;

    &__close-button {
      height: auto;
      width: auto;
      min-height: 48px;
      min-width: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #F0F0F0;
      padding: 10px;
      margin: -$padding;
      margin-left: 0;
      cursor: pointer;
      background-color: inherit;
      transition: background-color 100ms ease-in-out;

      &:hover {
        background-color: darken(#DCDCDC, 10%);
        svg {
          transform: scale(1.1);
        }
      }

      & > svg {
        transition: all 100ms ease-in-out;
        $svgSize: 20px;
        width: $svgSize;
        height: $svgSize;
      }
    }
  }
}
</style>
