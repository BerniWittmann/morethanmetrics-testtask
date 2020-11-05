import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'
import { Persona, PersonaColumn } from '~/models/Persona'

interface Store {
  persona?: Persona,
  columns: Array<PersonaColumn>
}

const getDefaultState: () => Store = () => ({
  persona: undefined,
  columns: []
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

  }
}

export const mutations: MutationTree<PersonaState> = {
  setPersona (state, persona: Persona) {
    state.persona = persona
  },
  setColumns (state, columns: Array<PersonaColumn>) {
    state.columns = columns
  }
}
