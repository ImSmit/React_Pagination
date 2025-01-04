import { Button } from "./ui/button";

function DocumentActions({ searchQuery, setSearchQuery, handleDelete, selectedDocuments, handleInsertDialog, handleDeleteAll }) {       

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-6">Document Management</h1>
                <Button onClick={handleInsertDialog} variant="outline">Insert Document</Button>
            </div>
            <div className="flex justify-between items-center mb-6">
                <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none rounded-none relative block w-1/4 px-3 py-2 border border-[#000000] placeholder-[#000000] text-[#000000] rounded-tl-md rounded-tr-md rounded-br-md rounded-bl-md focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                    placeholder="First name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="flex items-center space-x-2">
                    {selectedDocuments.length > 0 && (
                        <Button
                            className="bg-[#000000] text-white px-4 py-2 rounded-md"
                        onClick={() => handleDelete(selectedDocuments)}
                        variant="outline">
                        Delete Selected
                    </Button>
                )}
                <Button variant="outline" onClick={() => handleDeleteAll()}>
                        Delete All
                    </Button>
                </div>
            </div>
        </>
    )
}

export default DocumentActions
