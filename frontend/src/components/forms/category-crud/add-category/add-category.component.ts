import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services';

@Component({
  selector: 'app-add-category',
  templateUrl: '../add-category.component.html',
  styleUrls: ['../add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  categoryFormGroup!: FormGroup;
  submitted: boolean = false;
  requestErrorMessage!: { massage: string };
  constructor(private categoryService: CategoryService) {
    this.categoryFormGroup = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      hidden: new FormControl(false),
    });
  }
  get title() {
    return this.categoryFormGroup.get('title');
  }
  ngOnInit(): void {
    this.categoryService.currentErrorMessage.subscribe(
      (message: { massage: string }) => (this.requestErrorMessage = message),
    );
    this.categoryService.setErrorMessage('');
  }
  
  public submittedFalse(): void {
    this.submitted = false;
  }

  public submit = (): void => {
    this.categoryFormGroup.value.parentId = null;
    console.log(this.categoryFormGroup);
    this.categoryService.addCategory(
      this.categoryFormGroup.value,
      this.submittedFalse,
    );
  };
}
