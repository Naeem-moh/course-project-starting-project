import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.modal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private _recipes: Recipe[] = [];
  //   new Recipe(
  //     'Cordon blue',
  //     'Chicken meat filled with white sauce and mushroom',
  //     'https://th.bing.com/th/id/OIP.y2I_lQzXdZWIL1W07ZjLzwHaF-?rs=1&pid=ImgDetMain',
  //     [new Ingredient('mushroom', 4), new Ingredient('chicken breast', 2)]
  //   ),
  //   new Recipe(
  //     'Shawarma',
  //     'Grilled chicken meat sandwich',
  //     'https://img.freepik.com/free-photo/side-view-shawarma-with-fried-potatoes-board-cookware_176474-3215.jpg',
  //     [new Ingredient('tomato', 2)]
  //   ),
  // ];

  onRecipesEdit$: Subject<null> = new Subject();

  public get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  public set recipes(recipes: Recipe[]) {
    this._recipes = recipes;
    this.onRecipesEdit$.next();
  }

  constructor() {}

  getRecipe(index: number) {
    return this._recipes[index];
  }

  addRecipe(newRecipe: Recipe) {
    this._recipes.push(newRecipe);
  }

  editRecipe(index: number, newRecipe: Recipe) {
    this._recipes[index] = newRecipe;
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
  }
}
