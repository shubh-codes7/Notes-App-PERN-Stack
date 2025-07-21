import {Router} from 'express'
import { createNote, deleteNote, editNote, editPin, getSearchNotes, getUserNotes } from '../controllers/note.controller.js'
import { authenticate } from '../middlewares/auth.js'

export const noteRouter = Router()

noteRouter.post('/create-note',authenticate, createNote)
noteRouter.put('/edit-note/:id',authenticate, editNote)
noteRouter.put('/update-ispinned/:id', authenticate, editPin)
noteRouter.delete('/delete-note/:id',authenticate, deleteNote)
noteRouter.get('/',authenticate, getUserNotes)
noteRouter.get('/search-notes',authenticate, getSearchNotes)