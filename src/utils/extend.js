export function extend() {
	const newObj = {};

	for (let i = 0; i < arguments.length; i++) {
		const obj = arguments[i];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				newObj[key] = obj[key];
			}
		}
	}

	return newObj;
}

export default extend;