import { create } from 'zustand'

export type configType={
    numberOfQuestion: number,
    category:{id:number,name:string}
    level: string,
    difficulty: string,
    type: string,
    status: string,
    score: number
}

const defaultConfig = {
    numberOfQuestion: 5,
    score:0,
}

const useQuiz = create((set) => ({
  config: {...defaultConfig},
  addLevel: (level:string) => set((state) => ({ config: {...state.config,level:level}})),
  addDifficulty: (difficulty:string) => set((state) => ({ config: {...state.config,difficulty:difficulty}})),
  addStatus: (status:string) => set((state) => ({config:{...state.config,status:status}})),
  addScore: () => set((state) => ({config:{...state.config,score:state.config.score+1}})),
}))

export default useQuiz;