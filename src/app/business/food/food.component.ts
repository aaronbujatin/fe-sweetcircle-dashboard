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
import { FileUploadEvent } from 'primeng/fileupload';
import { FileSelectEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    DialogModule,
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

  confirmSaveProduct(event: Event) {
    // this.confirmationService.confirm({
    //   target: event.target as EventTarget,
    //   message: `Do you want to save ${form.product.name}?`,
    //   header: 'Add Product Confirmation',
    //   icon: 'pi pi-info-circle',
    //   acceptButtonStyleClass: "focus:outline-none focus:shadow-none text-white inline-flex items-center bg-gradient-to-br from-[#FB72BD] to-[#FBB371] font-medium rounded-lg text-sm px-5 py-2.5 text-center",
    //   rejectButtonStyleClass: "focus:outline-none focus:shadow-none text-gradient bg-white font-medium rounded-lg text-sm px-5 py-2.5 text-center ",
    //   acceptIcon: "none",
    //   rejectIcon: "none",
    //   key : 'save',
    //   accept: () => {
    //     this.saveProduct(formData);
    //     this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
    //   },
    //   reject: () => {
    //     this.confirmationService.close();
    //   }
    // });
    console.log();

  }

  onFileSelected(event: any) {
    if (event.files && event.files.length > 0) {
      this.product.image = event.files[0];
    }
  }

  saveProduct(formData: FormData) {
    this.productService.saveProduct(formData).subscribe(
      (response: any) => {
        console.log(response);
        this.showSucess()
        this.visible = false
        this.getAllProducts()
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe(
      (response: any) => {
        this.products = response;
        this.foodLength = this.products.length
        console.log(this.products);
      }, (error) => {
        console.log(error);
      }
    )
  }


  deleteProductById(id: number) {
    this.productService.deleteProductById(id).subscribe(
      response => {
        this.getAllProducts()
        console.log(response);
      },
      error => {
        console.log(error);
      }
    )
  }


  visible: boolean = false;

  showDialog() {
    this.visible = true;
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
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }






}
