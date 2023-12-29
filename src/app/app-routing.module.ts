import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullBlogComponent } from './full-blog/full-blog.component';
import { HomeComponent } from './home/home.component';
import { NewBlogFormComponent } from './new-blog-form/new-blog-form.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'newblog',
    component: NewBlogFormComponent,
  },
  {
    path: 'blog/:id',
    component: FullBlogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
