import { RecipesService } from './../recipes.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.modal';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    //init
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.formInit();
    });
  }

  private formInit() {
    let recipeName = '';
    let recipeImage = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([]);

    if (this.editMode) {
      let recipe = this.recipesService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDescription = recipe.description;
      recipe.ingredients.forEach((ingredient: Ingredient) => {
        recipeIngredient.push(
          new FormGroup({
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount),
          })
        );
      });
    }

    this.form = new FormGroup({
      name: new FormControl(recipeName),
      imagePath: new FormControl(recipeImage),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredient,
    });
  }

  getArrayControls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onSubmit() {
    console.log(this.form);
  }
}

//the names given to the array form controls are the indexes.
