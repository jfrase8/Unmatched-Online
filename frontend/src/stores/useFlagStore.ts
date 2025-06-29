import { create } from 'zustand'

interface FlagState {
	initializedPage: boolean
	setInitializedPage: (navigated: boolean) => void
}

export const useFlagStore = create<FlagState>()((set) => {
	return {
		initializedPage: false,
		setInitializedPage: (initializedPage) => set({ initializedPage }),
	}
})
