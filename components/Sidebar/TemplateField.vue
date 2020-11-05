<template>
  <div :class="classes" draggable="true" @dragstart="startDrag" @dragend="endDrag">
    <font-awesome-icon v-if="fieldConfig.icon" :icon="fieldConfig.icon" class="template-field__icon"></font-awesome-icon>
    <div v-if="fieldConfig.text" class="template-field__illustration-string" :style="'font-size: ' + fieldConfig.textSize">{{ fieldConfig.text }}</div>
    <div class="template-field__text">{{ fieldConfig.title }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { FieldTypes } from '~/models/Persona'
import EnumProp from '~/common/EnumProp'

interface FieldConfig { title: string, icon?: string, text?: string, textSize?: string }

const config: Record<FieldTypes, FieldConfig> = {
  [FieldTypes.SHORT_TEXT]: {
    title: 'Short Text',
    text: 'Abc',
    textSize: '50px'
  },
  [FieldTypes.LONG_TEXT]: {
    title: 'Long Text',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
    textSize: '10px'
  },
  [FieldTypes.IMAGE]: {
    title: 'Image',
    icon: 'image'
  },
  [FieldTypes.IMAGE_GALLERY]: {
    title: 'Image Gallery',
    icon: 'images'
  },
  [FieldTypes.NUMBER]: {
    title: 'Number',
    text: '123',
    textSize: '50px'
  },
}

@Component
export default class TemplateField extends Vue {
  @Prop(EnumProp(FieldTypes.SHORT_TEXT, FieldTypes)) readonly type!: FieldTypes
  private isBeingDragged: boolean = false

  get fieldConfig(): FieldConfig {
    return config[this.type]
  }

  get classes(): Record<string, boolean> {
    return {
      'template-field': true,
      'template-field--dragging': this.isBeingDragged
    }
  }

  startDrag(event: DragEvent): void {
    event.dataTransfer!.setData('type', this.type)
    try {
      const el = this.$el.cloneNode(true) as HTMLElement
      el.classList.add('template-field--dragged')
      el.id = "drag-ghost-image"
      el.style.position = "absolute";
      el.style.top = "-1000px";
      document.body.appendChild(el)
      event.dataTransfer!.setDragImage(el, 0, 15)
      this.isBeingDragged = true
    } catch (e) {
      console.warn("Your browser does not support setting a drag image", e)
    }
  }
  endDrag(): void {
    this.isBeingDragged = false
    const ghost = document.getElementById("drag-ghost-image");
    if (ghost && ghost.parentNode) {
      ghost.parentNode.removeChild(ghost);
    }
  }
}
</script>

<style lang="scss" scoped>
.template-field {
  width: 150px;
  height: 120px;
  border-radius: 2px;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px;
  padding: 10px;
  transition: all 100ms ease-in-out;
  border: none;
  cursor: pointer;
  box-sizing: border-box;
  &--dragging {
    border: 2px dashed rgba(#646e6e, 0.5);
    background-color: transparent;
    & > * {
      display: none;
    }
  }
  &--dragged {
    border: none;
    background-color: white;
    transform: rotate(-5deg);
    & > * {
      display: block;
    }
  }

  &__icon {
    width: 40px;
    flex: 1;
    color: #646e6e;
  }
  &__illustration-string {
    flex: 1;
    font-weight: lighter;
    color: #646e6e;
    text-align: center;
    vertical-align: center;
  }
  &__text {
    flex: 0;
    color: #646e6e;
    font-size: 12px;
    font-weight: bold;
    line-height: 8px;
    text-align: center;
    text-transform: uppercase;
  }
}
</style>
