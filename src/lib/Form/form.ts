import { deserialize } from "$app/forms";

const post = async (url: string, data: object | FormData | JSON, silent: Boolean = false, method: string = "POST") => {
	let loading_toast = "";
	let result = {};

	try {
		// if (!silent) loading_toast = toast.loading("Just a moment... 😊");
		const res = await fetch(url, {
			method,
			body: data instanceof FormData ? data : JSON.stringify(data),
		});

		const text = await res.text();

		const resp = parseBody(text) as any;

		// console.log(resp);

		const respData = resp.data || resp;

		if (!res.ok || resp.type === "failure") {
			const errors = getErrors(respData);
			if (!silent)
				errors.forEach((error: any) => {
					const msg = error?.message || error;
					if (msg) console.error(msg); //toast
				});
			result = {
				msg: resp.msg,
			};
		} else
			result = {
				...respData,
				msg: resp.msg || respData.msg,
				success: true,
			};
	} catch (e) {
		console.error(e);
	}

	if (!silent) {
		// toast.dismiss(loading_toast);
	}

	return result;
};

const parseBody = (text: string) => {
	let data = text;

	try {
		let data = deserialize(text);
		return data;
	} catch (e) {
		try {
			data = JSON.parse(text);
		} catch {}
	}
	return data;
};

const getErrors = (body: any) => {
	console.log(typeof body);
	if (typeof body === "string") return [body];

	const errors = body.errors || [body.msg];
	return errors;
};

const getJsonData = async (request: Request) => {
	const formData = await request.formData();
	const data = Object.fromEntries(formData);
	return data;
};

const objectToFormData = (obj: any, formData: FormData) => {
	for (let key in obj) {
		if (Array.isArray(obj[key])) {
			obj[key].forEach((item: any) => {
				formData.append(key, item);
			});
		} else {
			formData.append(key, obj[key]);
		}
	}
	return formData;
};

const get = async (url: string) => {
	try {
		const resp = await fetch(url);

		return resp.json();
	} catch {
		return null;
	}
};

const readBody = async (request: Request) => {
	if (request.headers.get("content-type")?.includes("application/json")) return { json: await request.json() };
	const formData = await request.formData();

	const values = Object.fromEntries(formData);
	const jsonResult = jsonToJson(values);

	return {
		form: formData,
		rawJson: values,
		json: jsonResult,
	};
};

const jsonToJson = (json: any) => {
	const result = {} as any;
	for (let key in json) {
		if (Array.isArray(json[key])) {
			result[key] = json[key].map((item: any) => {
				return jsonToJson(item);
			});
		} else if (typeof json[key] === "object") {
			result[key] = jsonToJson(json[key]);
		} else {
			const val = json[key];

			if (val === "undefined") continue;

			if (val === "true" || val === true) result[key] = true;
			else if (val === "false" || val === false) result[key] = false;
			else if (!isNaN(val)) result[key] = parseInt(val);
			else result[key] = val;
		}
	}
	return result;
};

const validate = (data: any, schema: any) => {
	let errors;
	const result = schema.safeParse(data);
	if (!result.success) errors = result.error.errors;

	return {
		errors,
		values: data,
	};
};

export default {
	post,
	get,
	getJsonData,
	jsonToJson,
	readBody,
	validate,
	objectToFormData,
};
