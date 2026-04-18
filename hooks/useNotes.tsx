import * as storage from '@/lib/storage';
import { Note } from '@/types';
import { createContext, ReactNode, useContext, useState } from "react";
type NotesContextType = {
    notes: Note[]
    addNote: (title: string, body: string) => Note;
};


const NotesContext = createContext<NotesContextType | null>(null)

const uid = () => Math.random().toString(36).slice(2, 10)

export const NotesProvider = ({ children }: { children: ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([]);

    const save = (note: Note) => {
        async function saveNote(note: Note) {
            storage.set(note.id, note);
        }
        saveNote(note);
    }
    const addNote = (title: string, body: string) => {
        const t = title.trim()
        const b = body.trim()
        const note: Note = {
            id: uid(),
            title: t,
            body: b,
            pinned: false,
            updatedAt: Date.now(),
        }
        setNotes(prev => [note, ...prev]);
        save(note);
        return note;
    }

    return (
        <NotesContext.Provider value={{ notes, addNote }}>
            {children}
        </NotesContext.Provider>
    )
};

export function useNotes() {
    const ctx = useContext(NotesContext)
    if (!ctx) throw new Error('useNotes must be used within NotesProvider')
    return ctx;
}