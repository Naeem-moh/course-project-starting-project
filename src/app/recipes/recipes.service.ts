import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.modal';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor() {}

  private _recipes: Recipe[] = [
    new Recipe(
      'Cordon blue',
      'Chicken meat filled with white sauce and mushroom',
      'https://th.bing.com/th/id/OIP.y2I_lQzXdZWIL1W07ZjLzwHaF-?rs=1&pid=ImgDetMain',
      [new Ingredient('mushroom', 4), new Ingredient('chicken breast', 2)]
    ),
    new Recipe(
      'Shawarma',
      'Grilled chicken meat sandwich',
      'https://img.freepik.com/free-photo/side-view-shawarma-with-fried-potatoes-board-cookware_176474-3215.jpg',
      [new Ingredient('tomato', 2)]
    ),
  ];
  public recipeSelected = new EventEmitter<Recipe>();

  public get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  getRecipe(index: number) {
    return this._recipes[index];
  }
}
