<template>
  <div class="persona-card-field">
    <div class="persona-card-field__title">
      {{ name }}
      <span v-if="deletable" class="persona-card-field__delete" @click="deleteField">
        <font-awesome-icon icon="trash"></font-awesome-icon>
      </span>
    </div>

    <div class="persona-card-field__content">
      <div v-if="isLongTextType" class="persona-card-field__content__utilities">
        <font-awesome-icon icon="bold"></font-awesome-icon>
        <font-awesome-icon icon="italic"></font-awesome-icon>
        <font-awesome-icon icon="heading"></font-awesome-icon>
        <font-awesome-icon icon="list"></font-awesome-icon>
        <font-awesome-icon icon="paint-brush"></font-awesome-icon>
        <font-awesome-icon icon="link"></font-awesome-icon>
      </div>
      <div v-if="isTextType" :class="'persona-card-field__content__text ' + (isEmpty && 'persona-card-field__content__text--empty')">
        <span v-if="!isEditing" @click="edit">{{ isEmpty ? 'Enter Text...' : cache }}</span>
        <textarea v-else-if="isLongTextType"
                  v-model="cache"
                  placeholder="Enter text..."
                  @blur="save"
                  @keydown.enter="save"
                  ref="textarea"
                  :class="hasError && 'invalid'"
        />
        <input v-else
               v-model="cache"
               placeholder="Enter text..."
               @blur="save"
               @keydown.enter="save"
               ref="input"
               :class="hasError && 'invalid'"
        />
      </div>
      <img v-for="(imgSrc, index) in images" :key="index" :src="imgSrc" alt="Image"
           class="persona-card-field__content__image"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Model, Prop, Watch, Emit } from 'nuxt-property-decorator'
import EnumProp from '~/common/EnumProp'
import { FieldTypes } from '~/models/Persona'

@Component
export default class PersonaCardField extends Vue {
  @Prop({ type: Boolean, default: true }) deletable!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ type: String, required: true }) name!: string
  @Prop(EnumProp(FieldTypes.SHORT_TEXT, FieldTypes)) type!: FieldTypes

  @Model('change', { type: String }) readonly value?: string
  cache: string = ''
  isEditing: boolean = false

  get isEmpty(): boolean {
    return !this.cache || this.cache.trim().length === 0
  }

  @Watch('value', { immediate: true })
  onValueChange(val: string) {
    this.cache = val || ''
  }

  @Emit('delete')
  deleteField (): void {}

  get isTextType (): boolean {
    return [FieldTypes.SHORT_TEXT, FieldTypes.LONG_TEXT, FieldTypes.NUMBER].includes(this.type)
  }

  get isLongTextType (): boolean {
    return FieldTypes.LONG_TEXT === this.type
  }

  get hasError(): boolean{
    if (!this.required) return false
    return this.isEmpty
  }

  get images (): Array<string> {
    if (this.type === FieldTypes.IMAGE) {
      return ['https://picsum.photos/300/300']
    }
    if (this.type === FieldTypes.IMAGE_GALLERY) {
      return [
        'https://picsum.photos/300/200',
        'https://picsum.photos/301/200',
        'https://picsum.photos/302/200'
      ]
    }
    return []
  }

  edit () {
    this.isEditing = true
    this.$nextTick(() => {
      if (this.isLongTextType) {
        (this.$refs.textarea as HTMLInputElement).focus()
      } else {
        (this.$refs.input as HTMLInputElement).focus()
      }
    })
  }

  save() {
    if (this.required && this.hasError) {
      return
    }
    this.isEditing = false
    this.sendChangeEvent()
  }

  @Emit('change')
  sendChangeEvent (): string {
    return this.cache
  }
}
</script>

<style lang="scss" scoped>
.persona-card-field {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-color: white;
  padding: 12px;
  border-radius: 2px;
  margin-bottom: 16px;

  &__title {
    flex: 0;
    font-size: 12px;
    color: #B1B6B6;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 5px;
    white-space: nowrap;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__delete {
    cursor: pointer;
    transition: color 200ms ease-in-out;

    &:hover {
      color: darken(#B1B6B6, 20%);
    }

    svg {
      $size: 12px;
      width: $size;
      height: $size;
    }
  }

  &__content {
    color: #3C4646;

    &__image {
      width: 100%;
    }

    &__utilities {
      color: rgba(#B1B6B6, 0.8);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-top: 5px;
      margin-bottom: 10px;

      svg {
        width: 12px;
        height: 12px;
        margin-right: 10px;
        cursor: pointer;
        transition: color 200ms ease-in-out;

        &:hover {
          color: darken(#B1B6B6, 20%);
        }
      }
    }

    &__text {
      span {
        cursor: pointer;
      }
      &--empty {
        color: #B1B6B6;
      }

      input, textarea {
        width: 100%;
        font-family: 'Source Sans Pro', sans-serif;

        &.invalid {
          background-color: red;
        }
      }
    }
  }
}
</style>
