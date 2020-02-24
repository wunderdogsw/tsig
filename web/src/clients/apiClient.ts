import { getAuthHeader } from "../services/authService";
import { setAuthToken } from "./storageClient";

const API_URL = process.env.REACT_APP_API_URL;

export class TokenExpiredError extends Error {
  name = "TokenExpiredError";
  stack?: string;
  constructor(message: string, stack?: string) {
    super(message);
    this.stack = stack;
  }
}

export async function get<T>(path: string) {
  return await fetchWithHeaders<T>("GET", `${API_URL}${path}`);
}

export async function post<T, B = object>(path: string, body: B) {
  return await fetchWithHeaders<T, B>("POST", `${API_URL}${path}`, body);
}

export async function put<T, B = object>(path: string, id: string, body: B) {
  return await fetchWithHeaders<T, B>("PUT", `${API_URL}${path}/${id}`, body);
}

export async function remove(path: string, id: string) {
  return await fetchWithHeaders<void>("DELETE", `${API_URL}${path}/${id}`);
}

async function storeNewAuthToken(response: Response) {
  const token = response.headers.get("token");
  if (token) {
    await setAuthToken(token);
  }
}

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

async function fetchWithHeaders<T, B = object>(
  method: RequestMethod,
  fullUrl: string,
  body?: B
) {
  const authHeader = await getAuthHeader();
  const requestOptions = {
    method: method,
    headers: { "Content-Type": "application/json", ...authHeader },
    body: body ? JSON.stringify(body) : undefined
  };
  const response = await fetch(fullUrl, requestOptions);
  if (response.ok) {
    await storeNewAuthToken(response);
    const json: T = await response.json();
    return json;
  }

  const json: Error = await response.json();
  if (json.name === "TokenExpiredError") {
    throw new TokenExpiredError(json.message, json.stack);
  }
  throw new Error(`Failed ${method} to ${fullUrl}.`);
}
