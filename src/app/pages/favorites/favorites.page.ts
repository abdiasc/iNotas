import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoriteNotes$?: Observable<Note[]>;

  constructor(private noteService: NoteService, private navCtrl: NavController) {}

  ngOnInit() {
    this.favoriteNotes$ = this.noteService.getFavoriteNotes();
  }

  editNote(id: string) {
    this.navCtrl.navigateForward(`/note-detail/${id}`);
  }

  deleteNote(id: string) {
    this.noteService.deleteNote(id);
  }
}

