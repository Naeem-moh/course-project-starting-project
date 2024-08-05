import { RecipesService } from './../recipes.service';
import {
  Component,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class RecipeListComponent implements OnInit {
  constructor(private recipesservies: RecipesService) {}

  public recipes: Recipe[];

  ngOnInit(): void {
    this.recipes = this.recipesservies.recipes;
  }
}
