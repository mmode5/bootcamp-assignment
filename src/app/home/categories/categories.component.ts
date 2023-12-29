import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/categories.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  @Output() idClicked = new EventEmitter<number[] | undefined>();
  filterIds: number[] = [];

  constructor(private api: CategoriesService) {}
  ngOnInit(): void {}

  @Input() category: Category | undefined;
  onClick(id: number | undefined) {
    if (id) {
      this.filterIds.push(id);
      localStorage.setItem('filterIds', JSON.stringify(this.filterIds));
    }
    console.log(this.filterIds);
  }
}
