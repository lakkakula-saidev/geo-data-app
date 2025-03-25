import { Spinner } from "flowbite-react";

export const LoadingComponent: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center p-5">
      <Spinner aria-label="Loading..." size="xl" />
    </div>
  );
};
