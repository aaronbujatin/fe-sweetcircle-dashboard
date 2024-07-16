import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../model/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.css'
})
export default class FoodComponent implements OnInit{

  constructor(private productService : ProductService){}

  products: Product[] = [];
  foodLength : number = 0;
  ngOnInit(): void {
    console.log("Food component init");
    
    this.productService.getAllProducts().subscribe(
      (response : any) => {
        this.products = response;
        this.foodLength = this.products.length
        console.log(this.products);
        
      }, (error) => {
        console.log(error);
      }
    )

    
  }

  buttonClicked(){
    console.log("Button Clicked");
    
  }


  


}
