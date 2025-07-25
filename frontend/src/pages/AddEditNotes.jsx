/* eslint-disable react/prop-types */
import { MdClose } from "react-icons/md";
import TagInput from "../components/TagInput";
import { useState } from "react";
import axios from "axios";
// import { UserContext } from "../UserContextWrapper";
import { BASE_URL } from "../utils/constants";

const AddEditNotes = ({ noteData, type, getAllNotes, onClose, showToastMessage }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState( noteData?.content || "");
  const [tags, setTags] = useState( noteData?.tags ||[]);
  const [error, setError] = useState(null);

  // const {user} = useContext(UserContext)

  const addNewNote = async () => {
    try {
      const response = await axios.post(`${BASE_URL}note/create-note`, {
        title,
        content,
        tags,
      }, {withCredentials: true});

      if (response.status === 201) {
        showToastMessage("Note added successfully");
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.error);
      }
    }
  };


  const editNote = async () => {
    const noteId = Number(noteData.id)
    try {
      const response = await axios.put(`${BASE_URL}note/edit-note/${noteId}`, {
        title,
        content,
        tags,
      }, {withCredentials: true});

      if (response.status === 200) {
        showToastMessage("Note Updated successfully")
        getAllNotes();
        onClose();
      }
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.error);
      }
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

  return (
    <div className="relative">
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to gym at 5"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(null);
          }}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setError(null);
          }}
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      {error && <p className="text-xs text-red-500 pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === 'edit' ? 'UPDATE' :'ADD'}
      </button>
    </div>
  );
};

export default AddEditNotes;
