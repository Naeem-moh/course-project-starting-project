import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeDetailsDefaultComponent } from '../recipes/recipe-details-default/recipe-details-default.component';

//import { HttpTestComponent } from '../http-test/http-test.component';
import { AuthComponent } from '../auth/auth.component';

const routerConfig: Routes = [
  //{ path: 'test', component: HttpTestComponent },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routerConfig)],
  exports: [RouterModule],
})
export class RoutingModule {}
