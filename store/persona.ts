import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { RootState } from '~/store'
import { Persona } from '~/models/Persona'

interface Store {
  persona?: Persona
}

const getDefaultState: () => Store = () => ({
  persona: undefined
})

export const state = getDefaultState

export type PersonaState = ReturnType<typeof state>

export const getters: GetterTree<PersonaState, RootState> = {
  getPersona (state): Persona | undefined {
    return state.persona
  },
  hasPersona (state): boolean {
    return !!state.persona
  }
}

export const actions: ActionTree<Persona, RootState> = {
  async fetchPersona (context) {
    const data = await this.$axios.$get('/42')
    context.commit('setPersona', data)
  },
  async updatePersona (context, persona: Persona) {
    const data = await this.$axios.$put('/42', persona)
    context.commit('setPersona', data)
  }
}

export const mutations: MutationTree<PersonaState> = {
  setPersona (state, persona: Persona) {
    state.persona = persona
  }
}
