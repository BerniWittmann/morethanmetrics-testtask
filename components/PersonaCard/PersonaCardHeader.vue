<template>
  <div class="persona-card-header">
    <Avatar :color="persona.color"></Avatar>
    <PersonaCardField type="short_text" name="Persona Name" v-model="name" :deletable="false" :droppable="false" :required="true" />
    <PersonaCardField type="short_text" name="Short Name" v-model="shortName" :deletable="false" :droppable="false" :required="true" @change="updatePersona"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace, Watch } from 'nuxt-property-decorator'
import Avatar from '~/components/PersonaCard/Avatar.vue'
import PersonaCardField from '~/components/PersonaCard/PersonaCardField.vue'
import { Persona } from '~/models/Persona'

const personaModule = namespace('persona')

@Component({
  components: { Avatar, PersonaCardField }
})
export default class PersonaCardHeader extends Vue {
  @personaModule.Getter('getPersona') persona!: Persona

  name: string = ''
  shortName: string = ''

  @Watch('persona', { immediate: true, deep: true })
  onPersonaChanged(val: Persona) {
    this.name = val.name
    this.shortName = val.initials
  }
  @Watch('name')
  onNameChanged(val: string) {
    this.shortName = val.substr(0, 3).toUpperCase()
    this.updatePersona()
  }

  async updatePersona(): Promise<void> {
    await this.$store.dispatch('persona/updatePersona', {
      ...this.persona,
      name: this.name,
      initials: this.shortName
    })
  }

}
</script>

<style lang="scss" scoped>

.persona-card-header {
  display: flex;
  align-items: stretch;
  width: 100%;

  & > * {
    margin-right: 16px;
  }

  &:last-child {
    margin-right: 0;
  }

  .avatar {
  }
  .persona-card-field__drag-wrap {
    flex: 1;
    &:first-of-type {
      flex: 2;
    }
  }
}
</style>
