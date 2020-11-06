import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'
import { Field, FieldTypes, Persona, PersonaColumn } from '~/models/Persona'

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
}

export const actions: ActionTree<Persona, RootState> = {
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
      id: 104,
      title: 'Occupation',
      field_type: FieldTypes.SHORT_TEXT,
      data: 'Researcher',
      column_id: 2,
      prev_id: null,
      next_id: 105
    }, {
      id: 105,
      title: 'Nationality',
      field_type: FieldTypes.SHORT_TEXT,
      data: 'French',
      column_id: 2,
      prev_id: 104,
      next_id: 106
    }, {
      id: 106,
      title: 'Marital Status',
      field_type: FieldTypes.SHORT_TEXT,
      data: '--',
      column_id: 2,
      prev_id: 105,
      next_id: 107
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
    }]
    context.commit('setFields', [...data, ...mockData])
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
  }
}
