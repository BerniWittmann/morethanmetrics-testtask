import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'
import { Field, FieldTypes, Persona, PersonaColumn } from '~/models/Persona'
import { DCons } from '@thi.ng/dcons'

function getFieldList(fields: Array<Field>, columnId: number): DCons<Field> {
  // Get only fields of relevant column
  const relevantFields = fields.filter((f: Field) => {
    return f.column_id === columnId
  })
  // Adjust sorting by prev and next with double linked list
  let list = new DCons<Field>()
  relevantFields.forEach((f: Field) => {
    list.insertSorted(f, (field, otherField) => {
      if (otherField.prev_id === field.id) return -1
      return 1
    })
  })
  list = updateListPrevNextValues(list)
  return list
}

function updateListPrevNextValues(list: DCons<Field>): DCons<Field> {
  // Adjust prev_id and next_id according to list position
  return list.map((f) => {
    const node = list.find(f)
    if (!node) {
      return f
    }
    return {
      ...f,
      prev_id: node.prev ? node.prev.value.id : null,
      next_id: node.next ? node.next.value.id : null
    } as Field
  });
}

interface Store {
  persona?: Persona,
  columns: Array<PersonaColumn>
  fields: Array<Field>
}

const getDefaultState: () => Store = () => ({
  persona: undefined,
  columns: [],
  fields: []
})

export const state = getDefaultState

export type PersonaState = ReturnType<typeof state>

export const getters: GetterTree<PersonaState, RootState> = {
  getPersona (state): Persona | undefined {
    return state.persona
  },
  hasPersona (state): boolean {
    return !!state.persona
  },
  getColumns (state): Array<PersonaColumn> {
    return state.columns
  },
  getFields (state): Array<Field> {
    return state.fields
  },
  getFieldsForColumn (state, getters) {
    return function (columnId: number): Array<Field> {
      return getters.getFields.filter((f: Field) => {
        return f.column_id === columnId
      })
    }
  },
  getFieldById (state, getters) {
    return function (id: number): Field | undefined {
      return getters.getFields.find((f: Field) => {
        return f.id === id
      })
    }
  },
}

export const actions: ActionTree<PersonaState, RootState> = {
  async fetchPersona (context) {
    const data = await this.$axios.$get('/42')
    context.commit('setPersona', data)
  },
  async updatePersona (context, persona: Persona) {
    const data = await this.$axios.$put('/42', persona)
    context.commit('setPersona', data)
  },
  async fetchColumns (context) {
    const data = await this.$axios.$get('/42/columns')
    context.commit('setColumns', data)
  },
  async updateField (context, field: Field) {
    const data = await this.$axios.$put(`/42/fields/${field.id}`, field)
    context.commit('updateField', data)
  },
  async deleteField (context, field: Field) {
    await this.$axios.$delete(`/42/fields/${field.id}`, field)
    context.commit('removeFieldFromColumn', field)
  },
  async createField (context, { type, nextField }: { type: FieldTypes, nextField: Field }) {
    const newField: Field = {
      id: context.getters.getFields.length + 100,
      field_type: type,
      title: 'New Field',
      data: '',
      column_id: nextField.column_id,
      next_id: nextField.id,
      prev_id: nextField.prev_id
    }
    context.commit('createField', { newField, nextField })
    const newFieldData = context.getters.getFieldById(newField.id)
    await this.$axios.$post(`/42/fields`, newFieldData)
  },
  async moveField (context, { fieldId, nextField }: { fieldId: number, nextField: Field }) {
    const field = context.getters.getFieldById(fieldId)
    if (!field) return
    let newFieldData: Field = {
      ...field,
      column_id: nextField.column_id,
      next_id: nextField.id,
      prev_id: nextField.prev_id
    }
    context.commit('removeFieldFromColumn', field)
    context.commit('createField', { newField: newFieldData, nextField })
    newFieldData = context.getters.getFieldById(newFieldData.id)
    await this.$axios.$put(`/42/fields/${newFieldData.id}`, newFieldData)
  },
  async fetchFields (context) {
    const data = await this.$axios.$get('/42/fields')
    const mockData: Array<Field> = [{
      id: 100,
      title: 'Image',
      field_type: FieldTypes.IMAGE,
      data: '',
      column_id: 1,
      prev_id: 3,
      next_id: 101
    }, {
      id: 101,
      title: 'Age',
      field_type: FieldTypes.NUMBER,
      data: '28',
      column_id: 1,
      prev_id: 100,
      next_id: 102
    }, {
      id: 102,
      title: 'Gender',
      field_type: FieldTypes.SHORT_TEXT,
      data: 'Not defined',
      column_id: 1,
      prev_id: 101,
      next_id: 103
    }, {
      id: 103,
      title: 'Mood Images',
      field_type: FieldTypes.IMAGE_GALLERY,
      data: '',
      column_id: 1,
      prev_id: 102,
      next_id: null
    }, {
      id: 105,
      title: 'Nationality',
      field_type: FieldTypes.SHORT_TEXT,
      data: 'French',
      column_id: 2,
      prev_id: 104,
      next_id: 106
    }, {
      id: 104,
      title: 'Occupation',
      field_type: FieldTypes.SHORT_TEXT,
      data: 'Researcher',
      column_id: 2,
      prev_id: null,
      next_id: 105
    }, {
      id: 107,
      title: 'Quote',
      field_type: FieldTypes.LONG_TEXT,
      data: '"Life may not be the party we hoped for, but while we\'re here, we should dance."',
      column_id: 2,
      prev_id: 106,
      next_id: 108
    }, {
      id: 108,
      title: 'Description',
      field_type: FieldTypes.LONG_TEXT,
      data: 'Tess is that friendly neighbor next door. She has a secure job at the national railway company. Together with her husband, she has a monthly household income of  5000 Euro net.\n' +
        'Tess loves to spend free time with her three kids. Marcus, her husband, loves being outdoors, so whenever possible the couple takes long hiking tours with their children.\n' +
        'Tess is not very interested in technology. \n' +
        'She wants things that just work.',
      column_id: 2,
      prev_id: 107,
      next_id: null
    }, {
      id: 106,
      title: 'Marital Status',
      field_type: FieldTypes.SHORT_TEXT,
      data: '--',
      column_id: 2,
      prev_id: 105,
      next_id: 107
    },]
    data[2].next_id = 100
    context.commit('setFields', [...data, ...mockData])
    context.state.columns.forEach((column: PersonaColumn) => {
      context.commit('updateFieldOrderStatus', column.id)
    })
  }
}

export const mutations: MutationTree<PersonaState> = {
  setPersona (state, persona: Persona) {
    state.persona = persona
  },
  setColumns (state, columns: Array<PersonaColumn>) {
    state.columns = columns
  },
  setFields (state, fields: Array<Field>) {
    state.fields = fields
  },
  updateField (state, field: Field) {
    state.fields = state.fields.map((f) => {
      return f.id === field.id ? field : f
    })
  },
  updateFieldOrderStatus (state, columnId: number) {
    const list = getFieldList(state.fields, columnId)

    const unrelatedFields = [...state.fields.filter((f: Field) => {
      return f.column_id !== columnId
    })]
    state.fields = [...unrelatedFields, ...(list.toJSON() as Array<Field>)]
  },
  createField (state, { newField, nextField }: { newField: Field, nextField: Field }) {
    let list = getFieldList(state.fields, nextField.column_id)
    const nextNode = list.findWith((f: Field) => f.id === nextField.id)
    if (!nextNode) {
      list.push(newField)
    } else {
      list.insertBefore(nextNode, newField)
    }
    list = updateListPrevNextValues(list)
    const unrelatedFields = [...state.fields.filter((f: Field) => {
      return f.column_id !== nextField.column_id
    })]
    state.fields = [...unrelatedFields, ...(list.toJSON() as Array<Field>)]
  },
  removeFieldFromColumn (state, field: Field) {
    let list = getFieldList(state.fields, field.column_id)
    const node = list.findWith((f: Field) => f.id === field.id)
    if (!node) return
    list.remove(node)
    list = updateListPrevNextValues(list)
    const unrelatedFields = [...state.fields.filter((f: Field) => {
      return f.column_id !== field.column_id
    })]
    state.fields = [...unrelatedFields, ...(list.toJSON() as Array<Field>)]
  }
}
