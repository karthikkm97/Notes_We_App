import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/EmptyCard/EmptyCard";
import AddNoteImg from "../../assets/images/add-notes.jpg";
import NoDataImg from "../../assets/images/add-notes.jpg";


const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg ] = useState({
    isShown: false,
    message:"",
    type:"add",
  });



  const [ allNotes, setAllNotes ] = useState([]);
  const [ userInfo, setUserInfo ] = useState(null);
  const navigate = useNavigate();
  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, data: noteDetails, type:"edit" });

  };

  // const showToastMessage = (message, type) => {
  //   setShowToasctMsg({
  //     isShown: true,
  //     message,
  //     type,
  //   });
  // };

  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message, type });
    setTimeout(() => {
      setShowToastMsg({ isShown: false, message: "", type: "" });
    }, 2000);
  };
  

  const handleCloseToast = () => {
    setShowToastMsg({
      isShown: false, message: "", type: ""
    });
  };

  //Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if(response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
      
    }
    catch (error) {
      if(error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get all notes
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if(response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    }
    catch (error) {
      console.log("An Unexpected error occured. Please try again.")
    }
  };

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = data._id;
    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);
      if (response.data && !response.data.error) {
        // Show only one toast message for deletion success
        showToastMessage("Note Deleted Successfully", 'delete');
        setAllNotes(allNotes.filter(note => note._id !== noteId));
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log("An Unexpected error occured. Please try again.");
        // Show error toast message
        showToastMessage("Error deleting note", 'error');
      }
    }
  };

  //Search for notes
  const onSearchNotes = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: {query},
      });

      if(response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    }
    catch(error) {
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };


  //Update pinned
  const updateIsPinned = async (noteData) => {
      const noteId = noteData._id;
      try {
        const response = await axiosInstance.put("/update-note-pinned/" + noteId,
          {
            isPinned: !noteData.isPinned,
          }
        );
        if (response.data && !response.data.error) {
          showToastMessage("Note Pinned  Successfully");
        }
      }
      catch(error) {
        console.log(error);
      }
  };

  useEffect(() => {
    getAllNotes();
    getUserInfo();
    return () => {};
    });
  
  return (
    <>
      <Navbar userInfo={userInfo} onSearchNotes={onSearchNotes} handleClearSearch={handleClearSearch} />
      <div className="container mx-auto ">
        {allNotes.length > 0 ? ( <div className="grid grid-cols-3 gap-4 mt-8">
        {allNotes.map((item) => {
         return (
          <NoteCard
            key={item._id}
            title={item.title}
            date={item.createdOn}
            content={item.content}
            tags={item.tags}
            isPinned={item.isPinned}
            onEdit={() => handleEdit(item)}
            onDelete={() => deleteNote(item)}
            onPinNote={() => updateIsPinned(item)}
          />
        );
      })}

        </div> 
      ) : ( 
      <EmptyCard  imgSrc={isSearch ? NoDataImg : AddNoteImg} message={isSearch ? `Oops! No Notes found matching your search.` : `Start creating your first Note! Click the 'Add' button to write down your thoughts, ideas and remainders. Let's get started!` } /> 
      )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={() => {
          setOpenAddEditModal({ isShown: false, type: "add", data: null });
        }}
        getAllNotes={getAllNotes}
        showToastMessage={showToastMessage}
      />

      </Modal>

      <Toast
      isShown={showToastMsg.isShown}
      message={showToastMsg.message}
      type={showToastMsg.type}
      onClose = {handleCloseToast}
      showToastMessage={showToastMessage}
      />
    </>
  );
};

export default Home;
