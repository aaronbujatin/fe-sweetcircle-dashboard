import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../../model/product.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) { }

  private readonly API_URL = 'http://localhost:8080/api/v1/products';

  public getAllProducts(page: number, size: number){
    return this.httpClient.get(`${this.API_URL}?page=${page}&size=${size}`);
  }

  public getProductById(id : number){
    return this.httpClient.get(`${this.API_URL}/${id}`)
  }

  public saveProduct(formData : FormData){
    return this.httpClient.post(`${this.API_URL}`, formData)
  }

  public updateProduct(formData : FormData){
    return this.httpClient.put(`${this.API_URL}`, formData)
  }

  public deleteProductById(id:number){
    return this.httpClient.delete(`${this.API_URL}/${id}`)
  }


}
