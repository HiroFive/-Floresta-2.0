import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseCategory } from 'src/app/common/classes';
import { ICategory } from 'src/app/common/interfaces';
import { CategoryService } from 'src/app/services';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: '../add-category.component.html',
  styleUrls: ['../add-category.component.scss'],
})
export class AddSubCategoryComponent implements OnInit {
  parentCategory!: ICategory;
  submitted: boolean = false;
  categoryFormGroup: FormGroup;
  requestErrorMessage!: { massage: string };

  constructor(
    private InjCategory: BaseCategory,
    private categoryService: CategoryService,
  ) {
    this.parentCategory = this.InjCategory;
    this.categoryFormGroup = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      hidden: new FormControl(this.parentCategory.hidden),
    });
  }
  get title() {
    return this.categoryFormGroup.get('title');
  }

  ngOnInit(): void {
    this.categoryService.categoryErrorMessage.subscribe(
      (message: { massage: string }) => (this.requestErrorMessage = message),
    );
    this.categoryService.setErrorMessage('');
  }
  public submittedFalse(): void {
    this.submitted = false;
  }

  public submit = (): void => {
    const newCategory: ICategory = {
      ...this.categoryFormGroup.value,
      parentId: this.parentCategory.id,
    };
    this.categoryService.addCategory(newCategory, this.submittedFalse);
  };
}
