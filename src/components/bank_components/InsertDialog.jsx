// import React from 'react'
import { Fragment } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
// import { useSelector } from 'react-redux'
// import { useDocumentsUpdateAPIMutation } from '../reducers/documents/api'
// import LoadingSpinner from './LoadingSpinner'

function InsertDialog({ isOpen, onClose }) {


    return (
        <Transition show={isOpen} as={Fragment}>
            <HeadlessDialog onClose={onClose} className="relative z-50">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                </Transition.Child>

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >

                        <HeadlessDialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#ffffff] p-6 text-left align-middle shadow-xl transition-all">
                            <HeadlessDialog.Title
                                as="h3"
                                className="text-lg font-medium mb-4 leading-6 text-[#000000]"
                            >
                                Insert Bank
                            </HeadlessDialog.Title>
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-2 p-1 rounded-full text-[#000000] hover:bg-[#000000] hover:text-[#ffffff] transition-colors"
                                aria-label="Close dialog"
                            >
                                <X size={20} />
                            </button>
                            {/* {isLoadingUpdate && <LoadingSpinner />}
                            {!isLoadingUpdate && ( */}
                            <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="bankName" className="sr-only">
                                        Bank Name
                                    </label>
                                    <input
                                        id="bankName"
                                        name="bankName"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#7b7b7b] text-[#000000] rounded-t-md focus:outline-none focus:ring-[#DEAA79] focus:border-[#000000] focus:z-10 sm:text-sm"
                                        placeholder="Bank Name"
                                    // value={documentName}
                                    // onChange={(e) => setDocumentName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="money" className="sr-only">
                                        Money
                                    </label>
                                    <input
                                        id="money"
                                        name="money"
                                        type="number"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#7b7b7b] text-[#000000] rounded-b-md focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                                        placeholder="Money"
                                    // onChange={handleFileChange}
                                    />
                                    {/* {isErrorUpdate && errorUpdate.data.data?.document?.map((e) => <li>{e}</li>)} */}
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        // onClick={() => handleUpdate(docId, documentName, document)}
                                        className="group relative w-full flex justify-center py-2 mt-4 px-4 border border-black text-sm font-medium rounded-md text-white bg-[#000000] hover:bg-[#ffffff] hover:text-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffffff]"
                                    >
                                        Insert Bank
                                    </button>
                                </div>
                                <div>
                                    {/* {errorMessage && <div className='mt-4'>{errorMessage}</div>}
                                    {isErrorUpdate && 
                                        <div>
                                            Error: {errorUpdate.data.error}
                                        </div>} */}
                                </div>
                            </div>
                            {/* )} */}

                        </HeadlessDialog.Panel>

                    </Transition.Child>
                </div>
            </HeadlessDialog>
        </Transition>
    )
}

export default InsertDialog
