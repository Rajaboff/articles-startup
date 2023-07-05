import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleResolver } from './article.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: ArticleComponent,
    resolve: {
      data: ArticleResolver,
    },
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
    ReactiveFormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class ArticleModule {}
