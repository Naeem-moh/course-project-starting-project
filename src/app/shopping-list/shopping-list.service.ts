import { Subject } from 'rxjs';
import { Ingredient } from './../shared/ingredient.modal';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientAdded = new Subject<null>();
  editSubject$ = new Subject<number>();

  private _ingredients: Ingredient[] = [
    new Ingredient('Chicken Breast', 2),
    new Ingredient('Tomato', 3),
  ];

  constructor() {}

  public get ingredients(): Ingredient[] {
    return this._ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this._ingredients = [...this._ingredients, ingredient];
  }
  addIngredients(ingredients: Ingredient[]) {
    this._ingredients.push(...ingredients);
  }

  getIngredient(index: number) {
    return this._ingredients[index];
  }

  editIngredient(index: number, newIngredient: Ingredient) {
    this._ingredients[index] = newIngredient;
  }
  deleteIngredient(index: number) {
    this._ingredients.splice(index, 1);
  }
}
