import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FileUploadModule } from 'primeng/fileupload';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    DialogModule,
    PaginatorModule,
    ProgressSpinnerModule,
    FileUploadModule,
    ButtonModule, InputTextModule, ConfirmDialogModule, ToastModule, ButtonModule, FloatLabelModule,],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css',
  providers: [ConfirmationService, MessageService]
})
export default class FoodComponent implements OnInit {

  constructor(private productService: ProductService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  products: Product[] = [];
  foodLength: number = 0;
  ngOnInit(): void {
    this.getAllProducts();
  }

  product: Product = { productMenu: '' } as Product;
  selectedFile: File | null = null;

  onSubmit(form: any) {
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('price', form.value.price);
    formData.append('productMenu', form.value.productMenu);
    formData.append('description', form.value.description);
    formData.append('stock', form.value.stock);
    formData.append('image', this.product.image);
    console.log(this.product.image);
    this.saveProduct(formData);
  }

  showSucess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added successfully' });
  }

  showSucessProductUpdate() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product update successfully' });
  }


  onFileSelected(event: any) {
    if (event.files && event.files.length > 0) {
      this.product.image = event.files[0];
    }
  }

  saveProduct(formData: FormData) {
    this.productService.saveProduct(formData).subscribe(
      (response: any) => {
        this.getAllProducts()
        console.log(response);
        this.showSucess()
        this.isAddNewProductDialogVisible = false
      },
      (error) => {
        console.log(error);
      }
    )
  }
  loading: boolean = false;

  getAllProducts() {
    this.loading = true;
    this.productService.getAllProducts(this.first / this.rows, this.rows).subscribe(
      (response: any) => {
        this.products = response.content;
        this.loading = false;
        this.foodLength = response.totalElements
        console.log(response);

      }, (error) => {
        console.log(error);
      }
    )
  }


  deleteProductById(id: number) {
    this.productService.deleteProductById(id).subscribe(
      response => {
        this.getAllProducts()
      },
      error => {
        console.log(error);
      }
    )
  }

  viewProduct: Product = {} as Product;
  getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      (response: any) => {
        this.viewProduct = response
      },
      error => {
        console.log(error);
      }
    )
  }

  onSubmitToUpdate(form: any) {
    const formData = new FormData();
    formData.append('id', form.value.id);
    formData.append('name', form.value.name);
    formData.append('price', form.value.price);
    formData.append('productMenu', form.value.productMenu);
    formData.append('description', form.value.description);
    formData.append('stock', form.value.stock);
    formData.append('image', this.product.image);
    // Convert FormData to an object for easier viewing
    const formDataObj: any = {};
    formData.forEach((value, key) => {
      formDataObj[key] = value;
    });
    this.updateProduct(formData);
  }

  updateProduct(formData: FormData) {
    this.productService.updateProduct(formData).subscribe(
      (response: any) => {
        this.getAllProducts()
        this.showSucessProductUpdate()
        this.isUpdateProductDialogVisible = false
      },
      error => {
        console.log(error);
      }
    )
  }


  isAddNewProductDialogVisible: boolean = false;
  isUpdateProductDialogVisible: boolean = false;

  showAddNewProductDialog() {
    this.isAddNewProductDialogVisible = true;
  }

  showUpdateProductDialog(id: number) {
    this.getProductById(id);
    this.isUpdateProductDialogVisible = true;
  }


  onClickedDeleteProduct(event: Event, product: Product) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to delete ${product.name}?`,
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "focus:outline-none focus:shadow-none text-white inline-flex items-center bg-gradient-to-br from-[#FB72BD] to-[#FBB371] font-medium rounded-lg text-sm px-5 py-2.5 text-center",
      rejectButtonStyleClass: "focus:outline-none focus:shadow-none text-gradient bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ",
      acceptIcon: "none",
      rejectIcon: "none",
      key: 'delete',
      accept: () => {
        this.deleteProductById(product.id)
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  first: number = 0;
  rows: number = 7;

  onPageChange(event: PageEvent) {
    this.first = event.first;
    this.rows = event.rows;
    this.getAllProducts()
  }






}
