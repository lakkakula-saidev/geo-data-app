import { ExclamationIcon } from "@heroicons/react/outline";

interface ErrorComponentProps {
  message: string;
}

export const ErrorComponent: React.FC<ErrorComponentProps> = ({ message }) => {
  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center p-4 bg-red-50 text-red-700 rounded-lg">
      <ExclamationIcon className="w-xs text-red-600" />
      <div>{message}</div>
    </div>
  );
};
