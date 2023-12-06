const SUPABASE_MODES = {
	eq: "Equal",
	neq: "Not equal",
	gt: "Greater than",
	gte: "Greater than or equal",
	lt: "Less than",
	lte: "Less than or equal",
	ts: "Text search",
};

const applyFilters = (query: any, filters: any[]) => {
	filters
		.filter((s) => s)
		.forEach((item) => {
			let mode, value, key;

			if (typeof item === "string") {
				[key, mode, value] = item.split(":");
			} else {
				key = item.key;
				mode = item.mode;
				value = item.value;
			}

			switch (mode) {
				case "eq":
					query = query.eq(key, value);
					break;
				case "neq":
					query = query.neq(key, value);
					break;
				case "gt":
					query = query.gt(key, value);
					break;
				case "gte":
					query = query.gte(key, value);
					break;
				case "lt":
					query = query.lt(key, value);
					break;
				case "lte":
					query = query.lte(key, value);
					break;
				case "or":
					query = query.or(value);
					break;
				case "ilike":
					query = query.ilike(key, value);
					break;
				case "ts":
					query = query.textSearch(key, value);
					break;
			}
		});

	return query;
};

export default {
	applyFilters,

	SUPABASE_MODES,
};
