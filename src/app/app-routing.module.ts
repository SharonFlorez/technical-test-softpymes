import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ProductsListComponent } from './products-list/products-list.component';
import { AppRouterComponent } from './app-router.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsBillComponent } from './products-bill/products-bill.component';

const routes: Routes = [
  {
    path: '',
    component: AppRouterComponent,
    children: [
      { path: '', title: 'Login', component: LoginComponent },
      { path: 'register', title: 'Register', component: RegisterComponent },
      {
        path: 'productos',
        title: 'Productos',
        component: ProductsListComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/'])),
      },
      {
        path: 'factura',
        title: 'Factura',
        component: ProductsBillComponent,
        ...canActivate(() => redirectUnauthorizedTo(['/'])),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
