function parseData(data) {
	const stringify = JSON.stringify(data);
	const parsed = JSON.parse(stringify);
	const items = parsed.body.items;

	return items;
}

module.exports = { parseData };
