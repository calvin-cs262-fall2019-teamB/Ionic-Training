import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'movie-detail/:id', loadChildren: './movie-detail/movie-detail.module#MovieDetailPageModule' },
  { path: 'view-category/:id', loadChildren: './view-category/view-category.module#ViewCategoryPageModule' },
  { path: 'watch-list', loadChildren: './watch-list/watch-list.module#WatchListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
