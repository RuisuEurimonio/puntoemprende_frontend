import React from 'react';

interface TableProps<T> {
  items: T[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  columns: { key: keyof T; label: string }[];
}

// Definimos un tipo que asegura que el valor de la celda es compatible con ReactNode
type CellValue<T> = T[keyof T] extends string | number | boolean ? T[keyof T] : string;

const GenericTable = <T extends { id: number }>({
  items,
  handleEdit,
  handleDelete,
  columns,
}: TableProps<T>) => {
  return (
    <table className="table-auto w-full border-collapse">
      <thead>
        <tr className='text-black bg-main'>
          {columns.map((column) => (
            <th key={column.key as string} className="py-3 px-6">
              {column.label}
            </th>
          ))}
          <th className="py-3 px-6">Editar</th>
          <th className="py-3 px-6">Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className="odd:bg-gray-200 even:bg-gray-50 hover:bg-gray-200 text-black"
          >
            {columns.map((column) => (
              <td key={column.key as string} className="py-3 px-6">
                {/* Usamos el tipo `CellValue<T>` para asegurar que el valor sea adecuado */}
                {item[column.key as keyof T] as CellValue<T>}
              </td>
            ))}
            {/* Botón de editar */}
            <td className="py-3 px-6 text-center">
              <button
                onClick={() => handleEdit(item.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                Editar
              </button>
            </td>
            {/* Botón de eliminar */}
            <td className="py-3 px-6 text-center">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GenericTable;
