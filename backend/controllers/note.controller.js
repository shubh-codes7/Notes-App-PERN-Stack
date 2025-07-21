import prisma from "../config/db.js";

//@create new note
export const createNote = async (req, res) => {
  try {
    const {title, content, tags, userId} = req.body 

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        tags,
        userId : Number(req.user.id)
      }
    })

    return res.status(201).json({message: "Success", newNote})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error", details: error });
  }
};


//@edit note
export const editNote = async (req, res) => {
  try {
    const noteId = req.params.id
    const {title, content, tags} = req.body 

    const updatedNote = await prisma.note.update({
      where: {id: Number(noteId)},
      data: {
        title,
        content,
        tags      }
    })

    return res.status(200).json({message: "Success", updatedNote})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error", details: error });
  }
};


//@edit note
export const editPin = async (req, res) => {
  
}



//@edit note
export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id

    await prisma.note.delete({
      where: {id: Number(noteId)},
    })

    return res.status(200).json({message: "Success"})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error", details: error });
  }
};


//@get all notes  by query search
export const getSearchNotes = async (req, res) => {
  const userId = Number(req.user.id)
  const {query} = req.query
  try {
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const notes = await prisma.note.findMany({
      where: {
        userId: userId,
        OR: [
          { title: { contains: query, mode: "insensitive" } },
          { content: { contains: query, mode: "insensitive" } },
          { tags: { has: query } }
        ]
      }
    });

    return res.status(200).json({ message: "Success", notes });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error", details: error });
  }
};


//@get all notes by user
export const getUserNotes = async (req, res) => {
  try {
    const userId = req.user.id
    const AllNotes = await prisma.note.findMany({
      where: {userId: Number(userId)}
    })

    return res.status(200).json({message: "Success", AllNotes})
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error", details: error });
  }
};


