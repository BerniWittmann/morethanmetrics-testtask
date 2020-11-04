<template>
  <div class="global-nav-button">
    <font-awesome-icon :icon="icon" class="global-nav-button__icon"></font-awesome-icon>
    <div class="global-nav-button__content"><slot /></div>
    <div v-if="displayedCount" class="global-nav-button__count"><div class="global-nav-button__count__display">{{ displayedCount }}</div></div>
    <div v-if="displayDropdownCaret" class="global-nav-button__dropdown-caret"><font-awesome-icon icon="caret-down"></font-awesome-icon></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class GlobalNavButton extends Vue {
  @Prop(Number) readonly displayedCount: number | undefined
  @Prop({ type: String, required: true }) readonly icon!: string
  @Prop({ type: Boolean, default: false}) readonly displayDropdownCaret!: boolean
}
</script>

<style lang="scss" scoped>
.global-nav-button {
  $bg-color: #646E6E;
  color: #DCDCDC;
  border-radius: 3px;
  background-color: $bg-color;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: auto;
  align-items: center;
  padding: 3px 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 100ms ease-in-out;
  height: 24px;

  &:hover {
    background-color: lighten($bg-color, 10%);
  }

  &+& {
    margin-left: 5px;
  }

  &__icon {
    height: 14px;
    width: 14px;
    color: #DCDCDC;
  }
  &__content {
    padding-left: 5px;
    white-space: nowrap;
  }
  &__count {
    margin-left: 5px;
    border-radius: 16px;
    background-color: #3C4646;
    display: flex;
    justify-content: center;
    align-items: center;
    $size: 18px;
    height: $size;
    width: $size;
    font-size: 12px;
    line-height: 12px;
    text-align: center;
    font-weight: bold;

    &__display {
      color: #FFFFFF;
    }
  }
  &__dropdown-caret {
    margin-left: 10px;
    font-size: 12px;
    height: 100%;
    & > svg {
      height: 100%;
    }
  }
}
</style>
