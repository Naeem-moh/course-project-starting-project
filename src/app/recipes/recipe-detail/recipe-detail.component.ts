import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  @Input() selectedRecipe: Recipe;

  onClick() {
    this.shoppingListService.addIngredients(this.selectedRecipe.ingredients);
    this.shoppingListService.ingredientAdded.emit();
  }
}
