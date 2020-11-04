import { MutationTree } from 'vuex'

export const state = () => ({})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {}
