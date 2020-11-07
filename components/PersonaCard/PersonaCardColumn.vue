<template>
  <div :class="classes">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { PersonaColumnWidth } from '~/models/Persona'
import EnumProp from '~/common/EnumProp'

@Component
export default class PersonaCardColumn extends Vue {
  @Prop(EnumProp(PersonaColumnWidth.NORMAL, PersonaColumnWidth)) width!: PersonaColumnWidth
  get classes(): Record<string, boolean> {
    return {
      'persona-card-column': true,
      'persona-card-column--width-normal': this.width === PersonaColumnWidth.NORMAL,
      'persona-card-column--width-thin': this.width === PersonaColumnWidth.THIN,
      'persona-card-column--width-wide': this.width === PersonaColumnWidth.WIDE
    }
  }
}
</script>

<style lang="scss" scoped>

.persona-card-column {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  &+& {
    margin-left: 16px;
  }

  &--width-normal {
    flex: 1 1 auto;
  }
  &--width-thin {
    flex: calc(2/3);
  }
  &--width-wide {
    flex: calc(3/2);
  }
}
</style>
