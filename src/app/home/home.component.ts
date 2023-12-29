import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Blogs, Categories } from '../models/categories.model';
import { BlogService } from '../services/blog.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  blogs$: Observable<Blogs> = this.api.getAllBlogs();
  categories$: Observable<Categories> = this.api2.getCategories();
  filterIds: number[] = [];
  filteredBlogs$: Observable<Blogs> = this.blogs$;
  isPopupVisible = false;

  constructor(private api: BlogService, private api2: CategoriesService) {}

  closePopup(): void {
    this.isPopupVisible = false;
  }

  onClick(id: number | undefined) {
    if (id) {
      if (this.filterIds.includes(id)) {
        const index = this.filterIds.indexOf(id);
        this.filterIds.splice(index, 1);
      } else {
        this.filterIds.push(id);
      }
    }
    this.filterBlogs();
  }

  private filterBlogs() {
    if (this.filterIds.length == 0) {
      this.filteredBlogs$ = this.blogs$;
      return;
    }
    this.filteredBlogs$ = this.blogs$.pipe(
      map((blogs) => {
        return {
          data: blogs.data?.filter((blog) =>
            this.filterIds.some((filterId) =>
              blog.categories.some((category) => category.id === filterId)
            )
          ),
        };
      })
    );
  }
  handleLoginFormOpen(): void {
    this.isPopupVisible = true;
    console.log('Login form opened in parent component');
  }
  ngOnInit(): void {}
}
