import { BASE_URL } from "./base";

export async function getData(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, options);

    const data = res.json();

    if (data.status === "failed") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
