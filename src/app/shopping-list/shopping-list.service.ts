import { Ingredient } from './../shared/ingredient.modal';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor() {}

  public ingredientAdded = new EventEmitter<Ingredient>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Chicken Breast', 2),
    new Ingredient('Tomato', 3),
  ];
  public get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients = [...this._ingredients, ingredient];
  }
  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
  }
}
