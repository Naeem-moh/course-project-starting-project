import { RecipesService } from './../../recipes.service';
import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent {
  constructor(private recipesService: RecipesService) {}

  @Input() recipe: Recipe;

  onClick() {
    this.recipesService.recipeSelected.emit(this.recipe);
  }
}
