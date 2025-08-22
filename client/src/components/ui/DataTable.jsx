function DataTable({ columns, data, renderActions }) {
  return (
    <div className="relative shadow-md sm:rounded-lg min-w-full bg-white overflow-auto mb-2 custom-scroll">
      <table className="min-w-[640px] w-full text-sm text-left text-gray-500">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-3">
                {col.header}
              </th>
            ))}
            {renderActions && <th className="px-6 py-3">Actions</th>}
          </tr>
        </thead>

        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="px-6 py-4 text-center"
              >
                No records found
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row._id} className="bg-white border-b hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {renderActions && (
                  <td className="px-6 py-4">{renderActions(row)}</td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
