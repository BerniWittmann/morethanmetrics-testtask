<template>
  <div class="sidebar">
    <transition name="slide">
      <Card width="thin" has-close-button v-if="visible" class="sidebar__card" @close="closeSidebar">
        <template v-slot:header>
          <p class="sidebar__header__title">Add Element</p>
        </template>
        <template>
          <h3 class="sidebar__content__title">Add element to persona</h3>
          <div class="sidebar__content__note">
            <p>Click or drag & drop one of the element types below to add it to the persona.</p>
            <p>Click on the <font-awesome-icon icon="cog"></font-awesome-icon> icon of each element to edit its settings.</p>
            <p>You can reorder the elements by dragging them.</p>
          </div>
          <div class="sidebar__content__template-fields">
            <TemplateField v-for="type in fieldTypes" :key="type" :type="type"></TemplateField>
          </div>
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
import Card from '~/components/Card.vue'
import TemplateField from '~/components/Sidebar/TemplateField.vue'
import { FieldTypes } from '~/models/Persona'

@Component({
  components: {
    TemplateField,
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

  get fieldTypes (): Array<string> {
    return Object.values(FieldTypes)
  }
}
</script>

<style lang="scss" scoped>

.sidebar {
  flex: 1;
  &__card {
    height: 100%;
  }

  &__header__title {
    font-size: 12px;
    color: #646E6E;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    font-weight: bold;
  }

  &__content {
    &__title {
      color: #3C4646;
      font-size: 24px;
      font-weight: 300;
      letter-spacing: 0;
    }

    &__note {
      background-color: #F0F8FC;
      $padding: 16px;
      margin-left: -$padding;
      margin-right: -$padding;
      padding: 10px $padding;
      margin-top: 20px;
      font-size: 14px;

      color: #646E6E;
      font-style: italic;
      p {
        vertical-align: center;
        margin-bottom: 5px;
      }
      svg {
        margin-left: 3px;
        height: 14px;
        position: relative;
        top: 3px;
      }
    }
    &__template-fields {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      flex-wrap: wrap;
      padding: -8px;
      margin-top: 10px;
    }
  }
}

.sidebar .sidebar__button {
  height: 48px;
  width: 48px;
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
    $svgSize: 20px;
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
