import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export default class FoodComponent implements OnInit {

  constructor(private productService: ProductService, private renderer: Renderer2) { }

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
    console.log(formData);

    this.saveProduct(formData);

  }

  onFileSelected(event: any) {
    this.product.image = event.target.files[0];
  }

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;

  saveProduct(formData: FormData) {
    this.productService.saveProduct(formData).subscribe(
      (response: any) => {
        console.log(response);
        this.closeModalBtn.nativeElement.click();
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

  @ViewChild('deleteButton', { static: true }) deleteButton!: ElementRef;
  onDeleteModal() {

  }

  productName: string = ""
  productIdToDelete: number = 0;
  viewProductName(product: Product) {
    this.productName = product.name
    this.productIdToDelete = product.id
    this.triggerButtonClick()
  }

  triggerButtonClick() {
    this.renderer.selectRootElement(this.deleteButton.nativeElement).click();
  }

  @ViewChild('deleteButton2') deleteButton2!: ElementRef;

  closeDeleteModal() {
    this.deleteButton2.nativeElement.click();
  }

  deleteProductById() {
    console.log("Product delete", this.productIdToDelete);
    this.productService.deleteProductById(this.productIdToDelete).subscribe(
      response => {
        this.closeDeleteModal();
        this.getAllProducts()
        console.log(response);
      },
      error => {
        console.log(error);

      }
    )


  }




}
