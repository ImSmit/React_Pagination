import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Checkbox } from "./ui/checkbox"
import { Eye, Pencil, Trash2 } from 'lucide-react'

export function DocumentTable({ onView, documents, onEdit, onDelete, onSelect, selectedDocuments }) {

  return (
    <div className="mt-6 max-h-[500px] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              Select
            </TableHead>

            <TableHead>Name</TableHead>
            <TableHead>Document Name</TableHead>
            <TableHead className="w-[150px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.results.map((document) => (
            <TableRow key={document.id}>
              <TableCell>
                <Checkbox value={selectedDocuments.includes(document.id)} checked={selectedDocuments.includes(document.id)} onChange={() => onSelect(document)} />
              </TableCell>
              <TableCell>{document.name}</TableCell>
              <TableCell>{document.document.split('/')[document.document.split('/').length - 1]}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <button onClick={() => onView(document.document)} className="p-1 hover:bg-gray-100 rounded">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button onClick={() => onEdit(document.id, document.name)} className="p-1 hover:bg-gray-100 rounded">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button onClick={() => onDelete([document.id])} className="p-1 hover:bg-gray-100 rounded">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

