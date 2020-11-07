<template>
  <div class="avatar" :style="`background-color: ${color};`">
    <font-awesome-icon icon="user-astronaut"></font-awesome-icon>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component
export default class Avatar extends Vue {
  @Prop({ default: '#F05A50', type: String }) color!: string

}
</script>

<style lang="scss" scoped>

.avatar {
  $size: 66px;
  min-width: $size;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333333;
  svg {
    height: $size/1.75;
    width: auto;
  }
}
</style>
