/** Capitalizes the first letter of a string */
export function capitalizeFirstLetter(str: string) {
	if (str.length === 0) return str // Handle empty string
	return str.charAt(0).toUpperCase() + str.slice(1)
}
