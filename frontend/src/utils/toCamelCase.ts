export function toCamelCase(str: string) {
	return str
		.replace(/[-_ ]+([a-zA-Z])/g, (_, char) => char.toUpperCase()) // capitalize after separator
		.replace(/^[A-Z]/, (char) => char.toLowerCase()) // lowercase the first character if needed
}
