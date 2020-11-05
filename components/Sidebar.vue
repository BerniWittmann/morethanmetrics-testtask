<template>
  <div class="sidebar">
    <transition name="slide">
      <Card width="thin" has-close-button v-if="visible" class="sidebar__card" @close="closeSidebar">
        <template v-slot:header>
          <p>Add Element</p>
        </template>
        <template>
          <h3>Add element to persona</h3>
          <p>Testytest</p>
        </template>
      </Card>
    </transition>
    <div class="sidebar__button" @click="showSidebar" v-if="!visible">
      <font-awesome-icon icon="bars"></font-awesome-icon>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Emit } from 'nuxt-property-decorator'
import Card from '@/components/Card.vue'

@Component({
  components: {
    Card
  }
})
export default class Sidebar extends Vue {
  @Prop({ default: true, type: Boolean }) visible!: boolean

  @Emit()
  showSidebar (): void {
  }

  @Emit()
  closeSidebar (): void {
  }
}
</script>

<style lang="scss" scoped>

.sidebar {
  flex: 1;
  &__card {
    height: 100%;
    width: 390px;
  }
}

.sidebar .sidebar__button {
  height: 40px;
  width: 40px;
  flex: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #DCDCDC;
  transition: all 100ms ease-in-out;
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: darken(#DCDCDC, 10%);

    svg {
      transform: scale(1.1);
    }
  }

  & > svg {
    transition: all 100ms ease-in-out;
    $svgSize: 16px;
    width: $svgSize;
    height: $svgSize;
  }
}
</style>

<style lang="scss">
.slide-enter-active.sidebar__card{
  transition: all 200ms ease;
  margin-right: 0;
}

.slide-leave-active.sidebar__card{
  transition: all 200ms ease-in-out;
  margin-right: 0;
}

.slide-enter.sidebar__card, .slide-leave-to.sidebar__card {
  margin-right: -390px;
}
</style>
