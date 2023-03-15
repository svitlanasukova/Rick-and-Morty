export const sortByObjName = (a: { name: string }, b: { name: string }) => {
	let nameA = a.name.toLowerCase(),
		nameB = b.name.toLowerCase();

	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
};
