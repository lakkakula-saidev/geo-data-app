import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json"
  }
});

export const queryClient = new QueryClient();
