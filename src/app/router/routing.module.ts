import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routerConfig: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('../recipes/recipes.module').then((b) => b.RecipesModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('../shopping-list/shopping-list.module').then(
        (b) => b.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then((b) => b.AuthModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routerConfig, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class RoutingModule {}

//don't ask some useless about what doesn't have a clue about
