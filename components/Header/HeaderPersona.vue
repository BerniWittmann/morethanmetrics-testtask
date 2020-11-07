<template>
  <div class="header-persona">
    <font-awesome-icon icon="user" class="header-persona__main-icon"></font-awesome-icon>
    <p class="header-persona__title">Persona</p>
    <p class="header-persona__name" v-if="!isEditing">{{ persona.name }}</p>
    <input :class="{
      'header-persona__name-input': true,
      'header-persona__name-input--error': hasError
    }" v-else v-model="currentName" ref="nameInput" @keydown.enter="saveName" placeholder="Name"/>
    <font-awesome-icon icon="edit" class="header-persona__edit-icon" v-if="!isEditing" @click="edit"></font-awesome-icon>
    <font-awesome-icon icon="check" class="header-persona__edit-icon" v-else @click="saveName"></font-awesome-icon>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace, Watch, Ref } from 'nuxt-property-decorator'
import { Persona } from '~/models/Persona'

const personaModule = namespace('persona')

@Component
export default class HeaderPersona extends Vue {
  @personaModule.Getter('getPersona') persona!: Persona
  isEditing: boolean = false
  currentName: string = ''
  @Ref() readonly nameInput!: HTMLInputElement

  @Watch('persona', { immediate: true, deep: true })
  onPersonaChanged(val: Persona) {
    this.currentName = val.name
  }
  edit(): void {
    this.isEditing = true
    this.$nextTick(() => {
      this.nameInput.focus()
    })
  }

  async saveName(): Promise<void> {
    if (this.hasError) return
    await this.$store.dispatch('persona/updatePersona', {
      ...this.persona,
      name: this.currentName
    })
    this.isEditing = false
  }
  get hasError(): boolean {
    return !this.currentName || this.currentName.trim().length === 0
  }
}
</script>

<style lang="scss" scoped>
.header-persona {
  $color: #3C4646;
  color: $color;
  display: flex;
  align-items: center;


  &__main-icon {
    width: 22px;
    height: auto;
    margin-right: 15px;
  }

  &__title, &__name {
    font-size: 20px;
  }

  &__title {
    margin-right: 5px;
    height: auto;
  }

  &__name {
    font-weight: bold;
    height: auto;
  }

  &__edit-icon {
    $edit-icon-color: #B1B6B6;
    color: $edit-icon-color;
    transition: all 100ms ease-in-out;
    width: 16px;
    height: auto;
    margin-left: 10px;
    cursor: pointer;

    &:hover {
      color: darken($edit-icon-color, 20%);
      transform: scale(1.1);
    }
  }

  &__name-input {
    &--error {
      background-color: red;
    }
  }
}
</style>
