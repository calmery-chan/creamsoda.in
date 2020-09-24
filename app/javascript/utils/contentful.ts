import axios from "./axios";
import { WorksResponse } from "../types/contentful";

export const getWorks = (): Promise<WorksResponse> =>
  axios.get("/admin/works").then(({ data }) => data);
