import { ShoppingListService } from './../shopping-list.service';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.modal';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent {
  constructor(private shoppingListService: ShoppingListService) {}

  @ViewChild('nameReference') ingredientName: ElementRef<HTMLInputElement>;
  @ViewChild('amountReference') ingredientAmount: ElementRef<HTMLInputElement>;

  addIngredient() {
    this.shoppingListService.addIngredient(
      new Ingredient(
        this.ingredientName.nativeElement.value,
        +this.ingredientAmount.nativeElement.value
      )
    );
    this.shoppingListService.ingredientAdded.emit();
  }
}
//shopping list consists of ingredients.
