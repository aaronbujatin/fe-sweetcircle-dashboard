import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) { }

  private readonly API_URL = 'http://localhost:8080/api/v1/products';

  public getAllProducts(){
    return this.httpClient.get(`${this.API_URL}`);
  }

  public getProductById(id : number){
    return this.httpClient.get(`${this.API_URL}/${id}`)
  }

  public saveProduct(product : Product){
    return this.httpClient.post(`${this.API_URL}`, product)
  }


}
