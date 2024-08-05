import { RecipesService } from './recipes.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { ArrowFunctionExpr } from '@angular/compiler';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit {
  constructor(private recipesService: RecipesService) {}

  public selectedRecipe: Recipe;

  ngOnInit(): void {
    this.recipesService.recipeSelected.subscribe(
      //recipe will be emitted
      (recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }
}
