import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseFood } from 'src/app/common/classes';
import { ICategory, IFood } from 'src/app/common/interfaces';
import { CategoryService, FoodService } from 'src/app/services';

@Component({
  selector: 'app-edit-food',
  templateUrl: './edit-food.component.html',
  styleUrls: ['../../product/add-product/add-product.component.scss'],
})
export class EditFoodComponent implements OnInit {
  foodFormGroup: FormGroup;
  submitted: boolean = false;
  foodInfo!: IFood;
  files: File[] = [];
  categories!: ICategory[];
  requestErrorMessage!: { massage: string };
  descriptionTextLength: number = 0;
  showDropZone: boolean = false;

  constructor(
    private InjFood: BaseFood,
    private foodService: FoodService,
    private categoryService: CategoryService,
  ) {
    this.foodInfo = this.InjFood;
    this.descriptionTextLength = this.foodInfo.description.length;
    this.foodFormGroup = new FormGroup({
      name: new FormControl(this.foodInfo.name, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      description: new FormControl(this.foodInfo.description, [
        Validators.required,
        Validators.minLength(60),
      ]),
      hidden: new FormControl(this.foodInfo.hidden),
      categoryId: new FormControl(this.foodInfo.categoryId, [
        Validators.required,
      ]),
      portions: new FormArray(
        this.foodInfo.portions.map(
          (portion) =>
            new FormGroup({
              price: new FormControl(portion.price, [
                Validators.required,
                Validators.pattern(/^([0-9]+([.][0-9]*)?|[.][0-9]+)$/),
              ]),
              weight: new FormControl(portion.weight, [
                Validators.required,
                Validators.pattern(/^([0-9]+([.][0-9]*)?|[.][0-9]+)$/),
              ]),
            }),
        ),
      ),
    });
  }
  get portions() {
    return this.foodFormGroup.controls['portions'] as FormArray;
  }

  get name() {
    return this.foodFormGroup.get('name');
  }

  get description() {
    return this.foodFormGroup.get('description');
  }

  ngOnInit(): void {
    this.categoryService
      .getChildrenCategory()
      .subscribe((children) => (this.categories = children));
    this.foodService.currentErrorMessage.subscribe((massage) => {
      this.requestErrorMessage = massage;
    });
    this.foodFormGroup.get('description')?.valueChanges.subscribe((text) => {
      this.descriptionTextLength = text.length;
      return text;
    });
    this.foodService.setErrorMessage('');
  }

  public addPortion(): void {
    const position = new FormGroup({
      price: new FormControl(1, [
        Validators.required,
        Validators.pattern(/^([0-9]+([.][0-9]*)?|[.][0-9]+)$/),
      ]),
      weight: new FormControl(1, [
        Validators.required,
        Validators.pattern(/^([0-9]+([.][0-9]*)?|[.][0-9]+)$/),
      ]),
    });
    this.portions.push(position);
  }
  public onSelect(event: any) {
    this.files.shift();
    this.files.push(...event.addedFiles);
  }

  public onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  public deletePortion(portionIndex: number): void {
    this.portions.removeAt(portionIndex);
  }

  public handlerShowDropZone(): void {
    this.showDropZone = !this.showDropZone;
  }

  public submittedFalse(): void {
    this.submitted = false;
  }

  public submit = (): void => {
    const formData = new FormData();
    const formBody = this.foodFormGroup.value;
    formBody.image = this.foodInfo.image;
    if (this.files.length !== 0) {
      formData.append('image', this.files[0]);
    }
    formData.append('data', JSON.stringify(formBody));
    this.foodService.updateFood(
      this.foodInfo.id,
      formData,
      this.submittedFalse,
    );
  };
}
