import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';

const routerConfig: Routes = [
  { path: '/recipes', component: RecipesComponent },
  { path: '/shopping-list', component: ShoppingListComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routerConfig, { useHash: false })],
  exports: [RouterModule],
})
export class RoutingModule {}
