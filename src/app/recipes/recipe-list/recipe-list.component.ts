import { RecipesService } from './../recipes.service';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[];
  public recipesSubscription: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.recipes;
    this.recipesSubscription = this.recipesService.onRecipesEdit$.subscribe(
      () => {
        this.recipes = this.recipesService.recipes;
      }
    );
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
