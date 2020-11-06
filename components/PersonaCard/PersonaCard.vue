<template>
  <Card width="full">
    <template v-slot:header>
      <PersonaCardHeader />
    </template>
    <template>
      <div class="persona-card-columns">
        <PersonaCardColumn v-for="column in columns" :key="column.id" :width="column.width">
          <PersonaCardField v-for="field in getFieldsForColumn(column.id)" :key="field.id" :type="field.field_type" :name="field.title" :value="field.data" />
        </PersonaCardColumn>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, namespace } from 'nuxt-property-decorator'
import Card from '~/components/Card.vue'
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
  @personaModule.Getter('getFields') allFields!: Array<Field>

  getFieldsForColumn(columnId: number): Array<Field> {
    return this.allFields.filter((field) => {
      return field.column_id === columnId
    })
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
