// import React from 'react'
import { Plus } from 'lucide-react'
function PlusCard({setIsOpen, background_mode = false}) {
  return (
    <div className="flex items-center" onClick={() => setIsOpen(true)}>
        <div className={`w-72 h-40 p-6 flex justify-center items-center bg-white border border-gray-200 rounded-lg shadow ${background_mode && 'dark:bg-gray-800'} ${background_mode && 'dark:border-gray-700'}`}>
        <Plus className="w-16 h-16" />
        </div>
    </div>
  )
}

export default PlusCard
