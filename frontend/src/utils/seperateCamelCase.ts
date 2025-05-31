/** Seperates a camel case string into a string of seperate words */
export function seperateCamelCase(str: string) {
	return str.replace(/([a-z0-9])([A-Z])/g, '$1 $2')
}
