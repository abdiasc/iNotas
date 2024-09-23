import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

import { Share } from '@capacitor/share';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  note: Note = { id: '', title: '', content: '' };

  constructor(private route: ActivatedRoute, private noteService: NoteService, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existingNote = this.noteService.getNoteById(id);
      if (existingNote) {
        this.note = existingNote;
      }
    }
  }

  saveNote() {
    if (this.note.id) {
      this.noteService.updateNote(this.note.id, this.note);
    } else {
      this.note.id = this.generateId();
      this.noteService.addNote(this.note);
    }
    this.router.navigate(['/notes-list']);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  // Método para compartir la nota
  async shareNote() {
    await Share.share({
      title: this.note.title,
      text: `${this.note.title}\n\n${this.note.content}`,
      dialogTitle: 'Compartir Nota',
    });
  }

}
