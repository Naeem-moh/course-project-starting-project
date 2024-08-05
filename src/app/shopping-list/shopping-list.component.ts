import { ShoppingListService } from './shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modal';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}

  public ingredients: Ingredient[];

  ngOnInit(): void {
    //works too!
    this.ingredients = this.shoppingListService.ingredients;

    this.shoppingListService.ingredientAdded.subscribe(() => {
      this.ingredients = this.shoppingListService.ingredients;
    });
  }
}
