import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const JsonServer = "http://localhost:3000";

export const apiClient = axios.create({
  baseURL: JsonServer,
  headers: {
    "Content-Type": "application/json"
  }
});

export const queryClient = new QueryClient();
