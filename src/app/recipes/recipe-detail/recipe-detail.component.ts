import { RecipesService } from './../recipes.service';
import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  selectedRecipe: Recipe;
  id: number;

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.selectedRecipe = this.recipesService.recipes[+params.id];
    });
  }

  onClick() {
    this.shoppingListService.addIngredients(this.selectedRecipe.ingredients);
    this.shoppingListService.ingredientAdded.next();
  }
  navigateEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
