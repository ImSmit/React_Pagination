// import React from 'react'
import { Button } from "../ui/button";
function Actions({onClick}) {

    
    return <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center border-b-2 border-gray-200 pb-4">
            <div className="text-2xl font-bold">Banks</div>
            <div className="text-2xl"><Button onClick={onClick} variant="outline">Insert Bank</Button></div>
        </div>
    </div>
}

export default Actions
