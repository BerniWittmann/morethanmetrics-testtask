<template>
  <Card width="full">
    <template v-slot:header>
      <PersonaCardHeader/>
    </template>
    <template>
      <div class="persona-card-columns">
        <PersonaCardColumn v-for="column in columns" :key="column.id" :width="column.width">
          <PersonaCardField v-for="field in getFieldsForColumn(column.id)" :key="field.id" :type="field.field_type" :field="field"
                            :name="field.title" :value="field.data" @change="(val) => updateFieldValue(val, field)" @delete="deleteField(field)"/>
        </PersonaCardColumn>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import Card from '~/components/shared/Card.vue'
import PersonaCardHeader from '~/components/PersonaCard/PersonaCardHeader.vue'
import { Field, PersonaColumn } from '~/models/Persona'
import PersonaCardColumn from '~/components/PersonaCard/PersonaCardColumn.vue'
import PersonaCardField from '~/components/PersonaCard/PersonaCardField.vue'

const personaModule = namespace('persona')

@Component({
  components: {
    PersonaCardField,
    PersonaCardColumn,
    PersonaCardHeader,
    Card
  }
})
export default class PersonaCard extends Vue {
  @personaModule.Getter('getColumns') columns!: Array<PersonaColumn>
  @personaModule.Getter('getFieldsForColumn') getFieldsForColumn!: (columnId: number) => Array<Field>

  updateFieldValue (value: string, field: Field): void {
    this.$store.dispatch('persona/updateField', {
      ...field,
      data: value
    })
  }

  deleteField (field: Field): void {
    this.$store.dispatch('persona/deleteField', field)
  }
}
</script>

<style lang="scss" scoped>
.persona-card-columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.filler {
  background-color: white;
  width: 100%;
  height: 100%;
  min-height: 300px;
}
</style>
