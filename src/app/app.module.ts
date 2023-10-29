import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { MaterialModule } from './material';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRouterComponent } from './app-router.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { ProductsBillComponent } from './products-bill/products-bill.component';
import { LoadingComponent } from './loading/loading.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-productt/update-product.component';
import { ModalService } from 'src/services/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductsBillComponent,
    LayoutComponent,
    NavigationMenuComponent,
    AppRouterComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    LoadingComponent,
    CreateProductComponent,
    UpdateProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
