import { RecipesService } from './../recipes.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from '../../shared/ingredient.modal';
import { Recipe } from '../recipe.model';

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
    private recipesService: RecipesService,
    private router: Router
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
      if (recipe.ingredients[0]) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          recipeIngredient.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^(0*[1-9]\d*)$/),
              ]),
            })
          );
        });
      }
    }

    this.form = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredient,
    });
  }

  getArrayControls() {
    return (<FormArray>this.form.get('ingredients')).controls;
  }

  onAddIngredient() {
    //crucial -> ts doesn't know what is the return of the get method! so when we append a method, it doesn't know if the method shall be used on the product.
    (<FormArray>this.form.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^(0*[1-9]\d*)$/),
        ]),
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(index);
  }

  onSubmit() {
    //use this when the both object the argument and parameter have the same structure, same keys.
    const newRecipe: Recipe = this.form.value;
    //use this approach with type assertion if the structure is not the same, the keys are not the same
    //tuple ???
    //there is an error here but i'm sure what is it, maybe the arrangement of the properties is wrong, or not spread in the desired order.
    const newRecipe2: Recipe = new Recipe(
      ...(Object.values(this.form.value) as [
        string,
        string,
        string,
        Ingredient[]
      ])
    );

    if (this.editMode) {
      this.recipesService.editRecipe(this.id, newRecipe);
    } else {
      this.recipesService.addRecipe(newRecipe);
    }

    this.recipesService.onRecipesEdit$.next();
    this.router.navigate(['../'], { relativeTo: this.route });
    console.log(this.form);
    console.log(this.recipesService.recipes);
  }
}

//the names given to the array form controls are the indexes.
