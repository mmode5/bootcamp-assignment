import { HttpClient } from '@angular/common/http';
import { Component, HostListener, NgIterable, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  MinValidator,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Categories, Category } from '../models/categories.model';
import { georgianCharsValidator } from '../models/georgianChars.validator';
import { minTwoWordsValidator } from '../models/minTwoWords.validator';
import { CategoriesService } from '../services/categories.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormDataService } from '../services/form-data.service';

@Component({
  selector: 'app-new-blog-form',
  templateUrl: './new-blog-form.component.html',
  styleUrls: ['./new-blog-form.component.scss'],
})
export class NewBlogFormComponent implements OnInit {
  form: FormGroup | undefined;
  isTyping: boolean = false;
  categories$: Observable<Categories> = this.api.getCategories();

  dropdownList: Category[] = [];
  selectedItems: Category[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private fb: FormBuilder,
    private api: CategoriesService,
    private formDataService: FormDataService
  ) {}
  ngOnInit(): void {
    this.categories$ = this.api.getCategories();

    this.categories$.subscribe((categories) => {
      this.dropdownList = categories.data;
    });
    this.dropdownSettings = {
      idField: 'id',
      textField: 'title',
    };
    this.selectedItems = [];
    this.form = this.fb.group({
      image: [null],
      author: [
        '',
        [
          Validators.required,
          minTwoWordsValidator(),
          georgianCharsValidator(),
          this.minLengthValidator4,
        ],
      ],
      title: ['', [Validators.required, this.minLengthValidator2]],
      description: ['', [Validators.required, this.minLengthValidator2]],
      publish_date: [null, Validators.required],
      email: ['', [Validators.email, this.redberryEmailValidator]],
      categories: ['', Validators.required, this.selectedItems],
    });
    this.form.valueChanges.subscribe(() => {
      this.isFormDirty = true;
    });

    // const savedValuesString = localStorage.getItem('formValues');
    // const savedValues = savedValuesString ? JSON.parse(savedValuesString) : {};
    // this.form.patchValue(savedValues);
  }

  isFormDirty: boolean = false;
  minLengthValidator2 = this.minLengthValidator(2);
  minLengthValidator4 = this.minLengthValidator(4);
  minLengthValidator(minLength: number) {
    return (control: AbstractControl) => {
      const trimmedValue = (control.value || '').trim();

      if (trimmedValue.length >= minLength) {
        return null;
      }

      return { minChar: true, requiredLength: minLength };
    };
  }

  redberryEmailValidator(control: AbstractControl) {
    const email = control.value;
    if (!email || email.endsWith('@redberry.ge')) {
      return null;
    } else {
      return { invalidRedberryEmail: true };
    }
  }

  onInput() {
    this.isTyping = true;
  }

  onBlur() {
    this.isTyping = false;
  }

  onImagePicked(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const imageFile = inputElement.files[0];
      console.log('Selected image file:', imageFile);
      if (this.form?.patchValue) {
        this.form.patchValue({ image: imageFile });
      }
    }
  }
  onSubmit() {
    this.form?.markAsPristine();
    this.isFormDirty = false;
    localStorage.setItem('formValues', JSON.stringify(this.form?.value));
    console.log(this.form?.value);

    if (this.form?.valid) {
      const formData = new FormData();
      const categoryIds = (this.form?.value['categories'] as Category[]).map(
        (category) => category.id
      );

      Object.keys(this.form?.value).forEach((key) => {
        if (key === 'categories') {
          formData.append(key, JSON.stringify(categoryIds));
        } else {
          formData.append(key, this.form?.value[key]);
        }
      });
      console.log(JSON.stringify(this.form.value.image));

      this.formDataService.createBlog(formData).subscribe(
        (response) => {
          console.log('Blog created successfully:', response);
        },
        (error) => {
          console.error('Error creating blog:', error);
        }
      );
    }
  }

  // @HostListener('window:beforeunload', ['$event'])
  // unloadNotification($event: any): void {
  //   if (this.isFormDirty) {
  //     $event.returnValue = true; // Standard for most browsers
  //   }
  // }
}
