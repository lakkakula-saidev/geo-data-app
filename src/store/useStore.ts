import { create } from "zustand";
import { useRoadsQuery, useTodosQuery } from "../hooks";
import { useEffect } from "react";

type StoreType = {
  geoData: any;
  todosData: any;
  isLoading: boolean;
  isError: boolean;
  error: any;
  setGeoData: (data: any) => void;
  setTodosData: (data: any) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: any) => void;
};

export const useRoadStore = create<StoreType>((set) => ({
  geoData: null,
  todosData: [],
  isLoading: false,
  isError: false,
  error: null,
  setGeoData: (data) =>
    set((state) => (state.geoData !== data ? { geoData: data } : {})),
  setTodosData: (data) =>
    set((state) => (state.todosData !== data ? { todosData: data } : {})),
  setLoading: (loading) =>
    set((state) => (state.isLoading !== loading ? { isLoading: loading } : {})),
  setError: (error) => set((state) => (state.error !== error ? { error } : {}))
}));

export const useStoreWithQuery = () => {
  const roadsQuery = useRoadsQuery();
  const todosQuery = useTodosQuery();
  const { setGeoData, setTodosData, setLoading, setError } = useRoadStore();

  useEffect(() => {
    setGeoData(roadsQuery.data);
    setTodosData(todosQuery.data);
    setLoading(roadsQuery.isLoading || todosQuery.isLoading);
    setError(roadsQuery.error || todosQuery.error);
  }, [
    roadsQuery.data,
    todosQuery.data,
    roadsQuery.isLoading,
    todosQuery.isLoading,
    roadsQuery.error,
    todosQuery.error,
    setGeoData,
    setTodosData,
    setLoading,
    setError
  ]);

  return useRoadStore();
};
