/* eslint-disable react-hooks/exhaustive-deps */
import { MdAdd } from "react-icons/md";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";
import AddEditNotes from "./AddEditNotes";
import { useState, useEffect } from "react";
import Modal from "react-modal";
// import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import EmptyCard from "../components/EmptyCard";
import CreateNoteImg from "../assets/files.png";
import NoDataImg from "../assets/sticky-notes_8756218.png";
import { BASE_URL } from "../utils/constants";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../UserContextWrapper";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showToastMsg, setShowToastMsg] = useState({
    isShown: false,
    message: "",
    type: "add",
  });
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  // const {user} = useContext(UserContext)

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const showToastMessage = (message, type) => {
    setShowToastMsg({ isShown: true, message: message, type: type });
  };

  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "", type: "add" });
  };


  //Get All Notes
  const getAllNotes = async () => {
    try {
      // const userId = Number(user.id)
      const response = await axios.get(`${BASE_URL}note/`, {
        withCredentials: true
      });

      if (response.data && response.data.AllNotes) {
        setAllNotes(response.data.AllNotes);
      }

      
    } catch (error) {
      if(error.status === 401){
        navigate('/')
      }
      console.log("An unexpected error occured. Please try again.", error);
    }
  };

  //Delete Note
  const deleteNote = async (data) => {
    const noteId = Number(data.id);
    try {
      const response = await axios.delete(`${BASE_URL}note/delete-note/${noteId}`, {withCredentials: true});

      if (response.data && !response.data.error) {
        showToastMessage("Note deleted successfully", "delete");
        getAllNotes();
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        console.log("An unexpected error occured. Please try again.");
      }
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}note/search-notes`, {
        params: { query },
        withCredentials: true
      }, );

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

//   const updateIsPinned = async (noteData) => {
//   try {
//     const response = await axios.put(
//       `${BASE_URL}note/update-ispinned/${noteData.id}`,
//       { isPinned: !noteData.isPinned },
//       { withCredentials: true }
//     );

//     if (response.data && !response.data.error) {
//       showToastMessage(
//         response.data.message || "Pinned status updated",
//         "edit"
//       );
//       getAllNotes();
//     }
//   } catch (error) {
//     console.log(error);
//     showToastMessage("Failed to update pinned status", "error");
//   }
// };


  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <Navbar
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="mx-20">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8 px-13">
            {allNotes.map((note) => (
              <NoteCard
                key={note.id}
                title={note.title}
                date={note.createdOn}
                content={note.content}
                tags={note.tags}
                // isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => deleteNote(note)}
                // onPinNote={() => updateIsPinned(note)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : CreateNoteImg}
            message={
              isSearch
                ? "Oops! No notes found matching your search."
                : `Start creating your first note! Click the 'Add' button to jot down your thoughts, ideas, and reminders. Let's get started!`
            }
          />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <MdAdd
          className="text-[32px] text-white"
        />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 "
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({
              isShown: false,
              type: "add",
              data: null,
            });
          }}
          getAllNotes={getAllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default Home;
