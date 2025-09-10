// NavigationListener.tsx
import { useEffect, useRef } from 'react'
import { router } from 'src/main'
import { useFlagStore } from 'src/stores/useFlagStore'

export function NavigationListener() {
	const { setInitializedPage } = useFlagStore()
	const isInitialLoad = useRef(true)
	useEffect(() => {
		// Subscribe to the 'onResolved' event for navigation
		const unsubscribe = router.subscribe('onResolved', () => {
			if (!isInitialLoad.current) {
				setInitializedPage(false) // Set flag to false when navigation completes
			}
			isInitialLoad.current = false
		})

		// Clean up subscription on component unmount
		return () => unsubscribe()
	}, [setInitializedPage])

	return null
}
