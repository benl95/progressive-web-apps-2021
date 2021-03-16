function transformData(data) {
	const toJson = JSON.stringify(data);
	const toObj = JSON.parse(toJson);
	const items = toObj.items;

	return items;
}

module.exports = { transformData };
