import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Blog, Blogs } from '../models/categories.model';
import { BlogService } from '../services/blog.service';

@Component({
  selector: 'app-full-blog',
  templateUrl: './full-blog.component.html',
  styleUrls: ['./full-blog.component.scss'],
})
export class FullBlogComponent implements OnInit {
  entityNo = Number(this.route.snapshot.params['id']);
  blogs$: Observable<Blogs> = this.api.getAllBlogs();
  filteredBlogs$: Observable<Blogs> = this.blogs$;
  blog$: Observable<Blog> = this.api.getBlog(this.entityNo);
  scrollPosition = 0;
  scrollStep = 436;

  scroll(direction: 'left' | 'right'): void {
    if (direction === 'left') {
      if (this.scrollPosition != 0) this.scrollPosition += this.scrollStep;
    } else {
      this.scrollPosition -= this.scrollStep;
    }
  }

  constructor(private route: ActivatedRoute, private api: BlogService) {}
  ngOnInit(): void {
    this.blog$
      .pipe(
        map((blog) => [
          blog.id,
          ...blog.categories.map((category) => category.id),
        ])
      )
      .subscribe((blogInfo) => {
        console.log('Blog ID:', blogInfo[0]);
        console.log('Category IDs:', blogInfo.slice(1));
        this.filteredBlogs$ = this.blogs$.pipe(
          map((blogs) => {
            console.log(blogs);

            const [blogId, ...categoryIds] = blogInfo;

            return {
              data: blogs.data?.filter(
                (blog) =>
                  blogId !== blog.id &&
                  categoryIds.some((filterId) =>
                    blog.categories.some((category) => category.id === filterId)
                  )
              ),
            };
          })
        );
      });
  }
}
