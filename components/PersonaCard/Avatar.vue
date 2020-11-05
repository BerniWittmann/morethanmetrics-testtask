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
  width: $size;
  height: $size;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333333;
  svg {
    width: $size/1.75;
    height: $size/1.75;
  }
}
</style>
