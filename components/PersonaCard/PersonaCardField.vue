<template>
  <div class="persona-card-field__drag-wrap" @dragover.prevent="startDragOver" @dragexit="endDragOver">
    <div class="persona-card-field__drop-target" v-show="draggedOver" @drop="handleDrop">
      <span>Insert element here</span>
    </div>

    <div class="persona-card-field" :draggable="draggable" @dragstart="startDrag">
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
        <div v-if="isTextType"
             :class="'persona-card-field__content__text ' + (isEmpty && 'persona-card-field__content__text--empty')">
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
        <img v-for="(imgSrc, index) in images" :key="index" :src="imgSrc" alt="Image" :draggable="false"
             class="persona-card-field__content__image"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Component, Model, Prop, Watch, Emit } from 'nuxt-property-decorator'
import EnumProp from '~/common/EnumProp'
import { Field, FieldTypes } from '~/models/Persona'

@Component
export default class PersonaCardField extends Vue {
  @Prop({ type: Boolean, default: true }) readonly deletable!: boolean
  @Prop({ type: Boolean, default: false }) readonly required!: boolean
  @Prop({ type: Boolean, default: true }) readonly droppable!: boolean
  @Prop({ type: Boolean, default: true }) readonly draggable!: boolean
  @Prop({ type: String, required: true }) readonly name!: string
  @Prop({ type: Object as PropType<Field> }) readonly field?: Field
  @Prop(EnumProp(FieldTypes.SHORT_TEXT, FieldTypes)) readonly type!: FieldTypes

  @Model('change', { type: String }) readonly value?: string
  cache: string = ''
  isEditing: boolean = false
  draggedOver: boolean = false

  get isEmpty (): boolean {
    return !this.cache || this.cache.trim().length === 0
  }

  @Watch('value', { immediate: true })
  onValueChange (val: string) {
    this.cache = val || ''
  }

  @Emit('delete')
  deleteField (): void {
  }

  get isTextType (): boolean {
    return [FieldTypes.SHORT_TEXT, FieldTypes.LONG_TEXT, FieldTypes.NUMBER].includes(this.type)
  }

  get isLongTextType (): boolean {
    return FieldTypes.LONG_TEXT === this.type
  }

  get hasError (): boolean {
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

  save () {
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

  startDragOver (): void {
    this.draggedOver = this.droppable
  }

  endDragOver (): void {
    this.draggedOver = false
  }

  startDrag (ev: DragEvent): void {
    if (!this.draggable || !this.field) return
    ev.dataTransfer!.setData('type', 'field')
    ev.dataTransfer!.setData('field_id', this.field!.id.toString())
  }

  handleDrop (ev: DragEvent) {
    if (!this.field) return
    this.draggedOver = false
    if (!ev.dataTransfer) return
    const type = ev.dataTransfer.getData('type')
    if (!type) return
    if (Object.values(FieldTypes).includes(type as FieldTypes)) {
      this.$store.dispatch('persona/createField', {
        type,
        nextField: this.field
      })
    } else if (type === 'field') {
      const fieldId = ev.dataTransfer.getData('field_id')
      if (!fieldId) return
      if (fieldId === this.field.id.toString()) return
      this.$store.dispatch('persona/moveField', {
        fieldId: parseInt(fieldId),
        nextField: this.field
      })
    }
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
  cursor: pointer;

  &__drag-wrap {
    width: 100%;
  }

  &__title {
    flex: 0 0 auto;
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

  &__drop-target {
    width: 100%;
    height: 54px;
    border: 1px dashed #9CDBFB;
    background-color: #F0F8FC;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    cursor: pointer;

    span {
      font-size: 14px;
      text-align: center;
      font-style: italic;
      color: #646E6E
    }
  }
}
</style>
