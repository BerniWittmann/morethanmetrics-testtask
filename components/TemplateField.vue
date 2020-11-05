<template>
  <div class="template-field">
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

  get fieldConfig(): FieldConfig {
    return config[this.type]
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
  transition: background-color 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: darken(white, 20%);
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
