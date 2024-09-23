import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private notes$ = new BehaviorSubject<Note[]>([]);
  private storageReady = new BehaviorSubject<boolean>(false);

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    const storedNotes = await this.storage.get('notes');
    if (storedNotes) {
      this.notes$.next(storedNotes);
    }
    this.storageReady.next(true);
  }

  getNotes() {
    return this.notes$.asObservable();
  }

  getNoteById(id: string): Note | undefined {
    return this.notes$.getValue().find(note => note.id === id);
  }

  async addNote(note: Note) {
    const currentNotes = this.notes$.getValue();
    const updatedNotes = [...currentNotes, note];
    this.notes$.next(updatedNotes);
    await this.storage.set('notes', updatedNotes);
  }

  async updateNote(id: string, updatedNote: Partial<Note>) {
    const currentNotes = this.notes$.getValue();
    const noteIndex = currentNotes.findIndex(note => note.id === id);
    if (noteIndex > -1) {
      const note = { ...currentNotes[noteIndex], ...updatedNote };
      currentNotes[noteIndex] = note;
      this.notes$.next([...currentNotes]);
      await this.storage.set('notes', currentNotes);
    }
  }

  async deleteNote(id: string) {
    const currentNotes = this.notes$.getValue();
    const updatedNotes = currentNotes.filter(note => note.id !== id);
    this.notes$.next(updatedNotes);
    await this.storage.set('notes', updatedNotes);
  }

  getFavoriteNotesCount() {
    return this.notes$.asObservable().pipe(
      map(notes => notes.filter(note => note.isFavorite).length)
    );
  }

  async toggleFavorite(id: string) {
    const currentNotes = this.notes$.getValue();
    const noteIndex = currentNotes.findIndex(note => note.id === id);
    if (noteIndex > -1) {
      const note = currentNotes[noteIndex];
      note.isFavorite = !note.isFavorite;
      currentNotes[noteIndex] = note;
      this.notes$.next([...currentNotes]);
      await this.storage.set('notes', currentNotes);
    }
  }

  getFavoriteNotes() {
    return this.notes$.asObservable().pipe(
      map(notes => notes.filter(note => note.isFavorite))
    );
  }



  
}