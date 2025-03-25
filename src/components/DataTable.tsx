import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow
} from "flowbite-react";

interface DataTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
}

export const DataTable = <T,>({ data, columns }: DataTableProps<T>) => {
  return (
    <Table striped>
      <TableHead>
        {columns.map((col) => (
          <TableHeadCell key={col.key as string}>{col.label}</TableHeadCell>
        ))}
      </TableHead>
      <TableBody className="divide-y">
        {data.map((row, rowIndex) => (
          <TableRow
            key={rowIndex}
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
          >
            {columns.map((col) => (
              <TableCell
                key={`${rowIndex}-${col.key as string}`}
                className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
              >
                {String(row[col.key])}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
