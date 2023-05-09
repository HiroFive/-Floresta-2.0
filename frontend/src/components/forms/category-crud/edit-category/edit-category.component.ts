import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseCategory } from 'src/app/common/classes';
import { ICategory } from 'src/app/common/interfaces';
import { CategoryService } from 'src/app/services';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['../add-category.component.scss'],
})
export class EditCategoryComponent implements OnInit {
  categoryInfo!: ICategory;
  submitted: boolean = false;
  categoryFormGroup!: FormGroup;
  allCategories!: ICategory[];
  requestErrorMessage!: { massage: string };

  constructor(
    private InjCategory: BaseCategory,
    private categoryService: CategoryService,
  ) {
    this.categoryInfo = this.InjCategory;

    this.categoryFormGroup = new FormGroup({
      title: new FormControl(this.categoryInfo.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      hidden: new FormControl(this.categoryInfo.hidden),
      parentId: new FormControl(this.categoryInfo.parentId),
    });
  }

  get title() {
    return this.categoryFormGroup.get('title');
  }

  ngOnInit(): void {
    this.categoryService.categoryForMenuContent.subscribe(
      (categories) => (this.allCategories = categories),
    );
    this.categoryService.categoryErrorMessage.subscribe(
      (message: { massage: string }) => (this.requestErrorMessage = message),
    );

    this.categoryService.setErrorMessage('');
  }

  public submittedFalse(): void {
    this.submitted = false;
  }
  public submit = (): void => {
    console.log(this.categoryFormGroup.value)
    this.categoryService.updateCategory(
      this.categoryInfo.id,
      this.categoryFormGroup.value,
      this.submittedFalse,
    );
  };
}
