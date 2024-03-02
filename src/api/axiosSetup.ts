import axios from "axios";

const THREE_MINUTES = 3 * 60 * 1000;
export const baseURL = "http://localhost:5000";

/**
 * Axios HTTP Client
 * {@link https://github.com/axios/axios#request-config Axios Request Config}
 */

export const WorkoutHttpClient = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});
