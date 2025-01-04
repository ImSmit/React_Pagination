import { DocumentTable } from "../components/DocumentTable";
import { ViewDialog } from "../components/ViewDialog";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDocumentsSearchAPIMutation, useDocumentsDeleteAPIMutation, useDocumentsDeleteAllAPIMutation } from "../reducers/documents/api";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import UpdateDialog from "../components/UpdateDialog";
import DocumentActions from "../components/DocumentActions";
import InsertDocumentDialog from "../components/InsertDocumentDialog";
import { useNavigate, useSearchParams } from "react-router-dom";
import { debounce } from "lodash"; 

const Documents = () => {
  // states
  const [selectedDocuments, setSelectedDocuments] = useState([])
  const navigate = useNavigate()
  // Pagination states
  const [offset, setOffset] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [ searchParams ] = useSearchParams()
  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : "/login"
  
  // Dialogs states
  const [isOpenDocument, setIsOpenDocument] = useState(false);
  const [isOpenUpdateDocument, setIsOpenUpdateDocument] = useState(false);
  const [isOpenInsertDocument, setIsOpenInsertDocument] = useState(false);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  const [searchQuery, setSearchQuery] = useState('')
  const [documentsData, setDocumentsData] = useState({})
  const [refresh, setRefresh] = useState(false)
  const [documentName, setDocumentName] = useState("")
  const [documentId, setDocumentId] = useState("")
  const [documentUrl, setDocumentUrl] = useState(null)
  const userInfo = useSelector(state => state.user)
  
  // APIS
  const [ documentsDeleteAPI ] = useDocumentsDeleteAPIMutation()
  const [documentsSearchAPI, { isLoading: isLoadingSearch, error: errorSearch, isError: isErrorSearch }] = useDocumentsSearchAPIMutation()
  const [documentsDeleteAllAPI] = useDocumentsDeleteAllAPIMutation()

  const handleview = (document) => {    
    setDocumentUrl(document)
    setIsOpenDocument(!isOpenDocument);
  }

  useEffect(() => {
    if(!userInfo.isLoggedIn){
      navigate(redirect)
    }
    const handler = debounce((query) => {
      setDebouncedSearchQuery(query);
    }, 500); // Debounce time in milliseconds
  
    handler(searchQuery);
    return () => {
      handler.cancel();
    };
  }, [searchQuery]);
  

  useEffect(() => {
    

    const fetchDocumentsSearch = async () => {
      const result = await documentsSearchAPI({ token: userInfo.userInfo.token, limit: limit, offset: offset, searchQuery: debouncedSearchQuery })
      setDocumentsData(result.data)
      setCurrentPage(1)
    }
    fetchDocumentsSearch()
  }, [debouncedSearchQuery, refresh])

  // handle select document
  const handleSelect = (document) => {
    if (selectedDocuments.includes(document.id)) {
      setSelectedDocuments(selectedDocuments.filter(doc => doc !== document.id))
    } else {
      setSelectedDocuments([...selectedDocuments, document.id])
    }
  }

  const changePage = async (page) => {
    const offset = (page - 1) * limit
    const result = await documentsSearchAPI({ token: userInfo.userInfo.token, limit: limit, offset: offset, searchQuery: searchQuery })
      setOffset((prevOffset) => {
        return prevOffset + limit
      })
      setDocumentsData(result.data)
      setCurrentPage(page)
  }

  const handleClose = () => {
    setIsOpenDocument(false);
  }

  const handleCloseUpdateDialog = () => {
    setIsOpenUpdateDocument(false);
  }

  const handleInsertDialog = () => {
    setIsOpenInsertDocument(!isOpenInsertDocument);
  }

  const handleEdit = (documentId, documentName) => {
    setDocumentName(documentName)
    setDocumentId(documentId)
    setIsOpenUpdateDocument(!isOpenUpdateDocument);
  }

  const handleDelete = async (documentIds) => {
    const result = await documentsDeleteAPI({ token: userInfo.userInfo.token, documentIds: documentIds })
    if (result.data.success) {
      setRefresh((prev) => !prev);
      setSelectedDocuments([])
      setCurrentPage(1)
    }
  }

  const handleDeleteAll = async () => {
    const result = await documentsDeleteAllAPI({ token: userInfo.userInfo.token })
    if (result.data.success) {
      setSelectedDocuments([])
      setCurrentPage(1)
      setRefresh((prev) => !prev);
    }
  }

  const handleLimitChange = (e) => {    
    setLimit(e.target.value)
    setCurrentPage(1)
    setOffset(0)
    setRefresh((prev) => !prev);
  }

  return <>
      <div className="container mx-auto p-6">
        <DocumentActions searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleDelete={handleDelete} selectedDocuments={selectedDocuments} handleInsertDialog={handleInsertDialog} handleDeleteAll={handleDeleteAll} />
        {isLoadingSearch && (<LoadingSpinner />)}
        {isErrorSearch && (<div>Error: {errorSearch.message}</div>)}
        {!isLoadingSearch && !isErrorSearch && documentsData.results && (
          <div>
            <DocumentTable onView={handleview} onEdit={handleEdit} onDelete={handleDelete} documents={documentsData} onSelect={handleSelect} selectedDocuments={selectedDocuments} handleDeleteAll={handleDeleteAll} />
            <Pagination documents={documentsData} currentPage={currentPage} itemsPerPage={limit} changePage={changePage} handleLimitChange={handleLimitChange}/>
            <ViewDialog isOpen={isOpenDocument} onEdit={isOpenUpdateDocument} onClose={handleClose} title="View Document" url={documentUrl} />
            <UpdateDialog isOpen={isOpenUpdateDocument} onClose={handleCloseUpdateDialog} docName={documentName} docId={documentId} setRefresh={setRefresh} />
            <InsertDocumentDialog isOpenInsertDocument={isOpenInsertDocument} handleInsertDialog={handleInsertDialog} docName={documentName} docId={documentId} setRefresh={setRefresh} />
        </div>
      )}
      </div>
    </>
};

export default Documents;
