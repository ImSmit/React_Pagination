import { Fragment, useState, useEffect } from 'react'
import { Dialog as HeadlessDialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useDocumentsUpdateAPIMutation } from '../reducers/documents/api'
import LoadingSpinner from './LoadingSpinner'

function UpdateDocumentDialog({ isOpen, onClose, docName, docId, setRefresh }) {
    const [documentName, setDocumentName] = useState('')
    const [document, setDocument] = useState(null)
    const { userInfo } = useSelector(state => state.user)
    const [errorMessage, setErrorMessage] = useState('')

    const [documentsUpdateAPI, { isLoading: isLoadingUpdate, error: errorUpdate, isError: isErrorUpdate }] = useDocumentsUpdateAPIMutation()
    const [isOpenUpdateDocument, setIsOpenUpdateDocument] = useState(false)

    const handleUpdate = async () => {
        if (documentName === '' || document === null) {
            setErrorMessage('Please fill in all fields')
            return
        }
        const result = await documentsUpdateAPI({ token: userInfo.token, documentId: docId, name: documentName, document: document }).unwrap()
        if (result.success) {
            setRefresh((prev) => !prev);
            onClose()
            setIsOpenUpdateDocument(!isOpenUpdateDocument);
        }
    }

    const handleFileChange = (event) => {
        setDocument(event.target.files[0]);
    };

    useEffect(() => {
        setDocumentName(docName)
    }, [docName])

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
                                Update Document
                            </HeadlessDialog.Title>
                            <button
                                onClick={onClose}
                                className="absolute top-2 right-2 p-1 rounded-full text-[#000000] hover:bg-[#000000] hover:text-[#ffffff] transition-colors"
                                aria-label="Close dialog"
                            >
                                <X size={20} />
                            </button>
                            {isLoadingUpdate && <LoadingSpinner />}
                            {!isLoadingUpdate && (
                                <div className="rounded-md shadow-sm -space-y-px">
                                <div>
                                    <label htmlFor="documentName" className="sr-only">
                                        Document Name
                                    </label>
                                    <input
                                        id="documentName"
                                        name="documentName"
                                        type="text"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#7b7b7b] text-[#000000] rounded-t-md focus:outline-none focus:ring-[#DEAA79] focus:border-[#000000] focus:z-10 sm:text-sm"
                                        placeholder="Document Name"
                                        value={documentName}
                                        onChange={(e) => setDocumentName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="sr-only">
                                        Password
                                    </label>
                                    <input
                                        id="document"
                                        name="document"
                                        type="file"
                                        required
                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[#000000] placeholder-[#7b7b7b] text-[#000000] rounded-b-md focus:outline-none focus:ring-[#000000] focus:border-[#000000] focus:z-10 sm:text-sm"
                                        placeholder="Document"
                                        onChange={handleFileChange}
                                    />
                                    {isErrorUpdate && errorUpdate.data.data?.document?.map((e) => <li>{e}</li>)}
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => handleUpdate(docId, documentName, document)}
                                        className="group relative w-full flex justify-center py-2 mt-4 px-4 border border-black text-sm font-medium rounded-md text-white bg-[#000000] hover:bg-[#ffffff] hover:text-[#000000] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ffffff]"
                                    >
                                        Update Document
                                    </button>
                                </div>
                                <div>
                                    {errorMessage && <div className='mt-4'>{errorMessage}</div>}
                                    {isErrorUpdate && 
                                        <div>
                                            Error: {errorUpdate.data.error}
                                        </div>}
                                </div>
                            </div>
                            )}
                            
                        </HeadlessDialog.Panel>

                    </Transition.Child>
                </div>
            </HeadlessDialog>
        </Transition>
    )
}

export default UpdateDocumentDialog
