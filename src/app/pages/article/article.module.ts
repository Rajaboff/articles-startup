import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';

const routes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
  },
  {
    path: '**',
    redirectTo: 'new',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
})
export class ArticleModule {}
