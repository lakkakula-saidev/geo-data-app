import { QueryClient } from "@tanstack/react-query";

/**
 * Single QueryClient instance for the app.
 * Data now loaded via window.fetch from /db.json (served from /public).
 */
export const queryClient = new QueryClient();
