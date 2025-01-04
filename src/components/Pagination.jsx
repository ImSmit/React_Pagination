// import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { get_pages_array } from '../helper'
import { DropdownMenu } from './ui/dropdown'
function Pagination({ documents, currentPage, itemsPerPage, changePage, handleLimitChange }) {
    const totalPages = Math.ceil(documents.count / itemsPerPage)
    const pagesArray = get_pages_array(totalPages, currentPage, 5)

    return (
        <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center justify-center gap-4">
                <p className="text-sm text-[#000000]">
                    Showing {currentPage} out of {Math.ceil(documents.count / itemsPerPage)}
                </p>
                <DropdownMenu onChange={handleLimitChange} value={itemsPerPage}/>
            </div>

            <div className="flex space-x-2">
                {documents.previous && (
                    <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={!documents.previous}
                        className="p-2 rounded-md bg-[#000000] text-white hover:bg-[#7d7d7d] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>)}
                {pagesArray.map((page) => (
                    <button
                        key={page}
                        onClick={() => changePage(page)}
                        disabled={currentPage === page}
                        className='p-2 rounded-md bg-[#000000] w-10 text-white hover:bg-[#7b7b7b] disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {page}
                    </button>
                ))}
                {documents.next && (
                <button
                    onClick={() => changePage(currentPage + 1)}
                    disabled={currentPage >= Math.ceil(documents.count / itemsPerPage)}
                    className="p-2 rounded-md bg-[#000000] text-white hover:bg-[#7b7b7b] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>)}
            </div>
        </div>
    )
}

export default Pagination
