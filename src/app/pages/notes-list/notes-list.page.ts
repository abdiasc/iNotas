import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../../models/note.model';
import { NoteService } from '../../services/note.service';
import { NavController,AlertController } from '@ionic/angular';
//import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.page.html',
  styleUrls: ['./notes-list.page.scss'],
  
})
export class NotesListPage implements OnInit {
  notes$?: Observable<Note[]>;
  favoriteCount$?: Observable<number>;

  constructor(
    private noteService: NoteService, 
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.noteService.getNotes().subscribe(notes => {
      this.notes$ = this.noteService.getNotes();
    });
    this.favoriteCount$ = this.noteService.getFavoriteNotesCount();
  }

  addNote() {
    this.navCtrl.navigateForward('/note-detail');
  }

  editNote(id: string) {
    this.navCtrl.navigateForward(`/note-detail/${id}`);
  }


  async confirmDelete(noteId: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // El usuario canceló, no hacemos nada
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            // Eliminar la nota si el usuario confirma
            this.noteService.deleteNote(noteId);
          }
        }
      ]
    });

    await alert.present();
  }




  deleteNote(id: string) {
    this.confirmDelete(id); // Llama a la función de confirmación antes de eliminar
  }

  toggleFavorite(id: string) {
    this.noteService.toggleFavorite(id);
  }

  goToFavorites() {
    this.navCtrl.navigateForward('/favorites');
  }

  // Function to truncate text
  truncateContent(content: string, maxLength: number = 15): string {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  }

 
  
}


