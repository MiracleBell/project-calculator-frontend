import { apiUrl, originUrl } from "@root/utils/fetch";

const REGISTRATION_PATH = apiUrl("users");
const ORIGIN = originUrl();

export const registrationUser = async (data) => {
  const res = await fetch(REGISTRATION_PATH, {
    mode: "cors",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ORIGIN,
      Origin: ORIGIN,
    },
    body: JSON.stringify(data),
  });
  let parse = await res.json();
  if (parse.errors !== undefined) {
    return await parse;
  }
  return parse;
};

export const updateUser = async (data) => {
  const res = await fetch(REGISTRATION_PATH, {
    mode: "cors",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": ORIGIN,
      Origin: ORIGIN,
    },
    body: JSON.stringify(data),
  });
  let parse = await res.json();
  if (parse.errors !== undefined) {
    return await parse;
  }
  return parse;
};
