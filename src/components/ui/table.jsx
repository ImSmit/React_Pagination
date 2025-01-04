
export const Table = (props) => (
    <table {...props} className="min-w-full divide-y divide-gray-200 border border-gray-200" />
)

export const TableHeader = (props) => (
    <thead {...props} className="bg-black text-white hover:bg-gray-100 hover:text-black" />
)

export const TableBody = (props) => (
    <tbody {...props} className="bg-white divide-y divide-gray-200" />
)

export const TableRow = (props) => (
    <tr {...props} className="transition-colors hover:bg-gray-100" />
)

export const TableHead = (props) => (
    <th {...props} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" />
)

export const TableCell = (props) => (
    <td {...props} className="px-6 py-4 whitespace-nowrap" />
)