import { RecipesService } from './../../recipes.service';
import { Recipe } from './../../recipe.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css',
})
export class RecipeItemComponent implements OnInit {
  constructor() {}

  @Input() index: number;
  @Input() recipe: Recipe;

  onClick() {}
  ngOnInit(): void {
    console.log(this.index);
  }
}
