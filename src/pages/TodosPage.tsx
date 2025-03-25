import { DataTable, ErrorComponent, LoadingComponent } from "../components";
import { useStoreWithQuery } from "../store/useStore";

export const TodosPage: React.FC = () => {
  const { todosData, isLoading, isError, error } = useStoreWithQuery();

  if (isLoading) return <LoadingComponent />;
  if (isError) return <ErrorComponent message={(error as Error).message} />;

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "status", label: "Status" },
    { key: "author", label: "Author" },
    { key: "road_fid", label: "Road FID" }
  ];

  return (
    <div className="flex h-screen w-screen justify-center">
      <div className="relative flex flex-col w-[80%] p-5">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white my-5">
          To-Do List
        </h3>
        <DataTable data={todosData} columns={columns} />
      </div>
    </div>
  );
};
