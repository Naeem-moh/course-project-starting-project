import { ShoppingListService } from './../shopping-list.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.modal';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css',
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  selectedIngredientIndex: number;
  editMode = false;
  indexSubscription: Subscription;
  editItem: Ingredient;

  @ViewChild('form') form: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddIngredient(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, +form.value.amount);
    if (this.editMode) {
      this.shoppingListService.editIngredient(
        this.selectedIngredientIndex,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.form.reset();
    this.editMode = false;

    this.shoppingListService.ingredientAdded.next();
  }

  ngOnInit(): void {
    this.indexSubscription = this.shoppingListService.editSubject$.subscribe(
      (index) => {
        this.editMode = true;
        this.selectedIngredientIndex = index;
        this.editItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.indexSubscription.unsubscribe();
  }

  onFormReset() {
    this.form.reset();
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.selectedIngredientIndex);
    this.shoppingListService.ingredientAdded.next();
    this.form.reset();
    this.editMode = false;
  }
}
//shopping list consists of ingredients.
