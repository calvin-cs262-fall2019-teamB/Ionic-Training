import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'recipe/:id', loadChildren: './recipe-detail/recipe-detail.module#RecipeDetailPageModule' },
  { path: 'category/:id', loadChildren: './recipe-list/recipe-list.module#RecipeListPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
