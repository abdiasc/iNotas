import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'notes-list',
    pathMatch: 'full'
  },
  {
    path: 'notes-list',
    loadChildren: () => import('./pages/notes-list/notes-list.module').then(m => m.NotesListPageModule)
  },
  {
    path: 'note-detail/:id',
    loadChildren: () => import('./pages/note-detail/note-detail.module').then(m => m.NoteDetailPageModule)
  },
  {
    path: 'note-detail',
    loadChildren: () => import('./pages/note-detail/note-detail.module').then(m => m.NoteDetailPageModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
