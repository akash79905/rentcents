import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import {PageEvent} from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Product } from '../services/product.model';
import { Realestate_category_service } from '../services/realestate_category.service';

import { Router } from '@angular/router';
export interface product {

  Name: string;
}

@Component ({
  selector: 'app-realestate',
  templateUrl: './realestate.component.html',
  styleUrls: ['./realestate.component.css']
})
export class RealestateComponent implements OnInit, OnDestroy{
  searchterm: string;
  search: string;
  posts: Product[] = [];
  private postsSub: Subscription;
  totalPosts=10;
  postsPerPage=4;
  currentPage = 1;
  pageSizeOptions = [4,8,12];

  constructor(public postsService: Realestate_category_service,private router: Router) {

  }

  ngOnInit() {
    // console.log('1) ');

    this.postsService.getRealestatePosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((productData: {posts: Product[], postCount: number}) => {
        this.posts = productData.posts;
        this.totalPosts = productData.postCount;
        //console.log(this.posts);
      });
    //   console.log('2) ');
    // console.log('homeComponent ', this.posts);
  }

  onChangedPage(pageData: PageEvent){
    console.log(pageData);
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getRealestatePosts(this.postsPerPage,this.currentPage);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  viewProduct(id: string){
    this.router.navigate(['/viewproduct'], { state: { product_id: id } });
  }

  book() {

  }

  gotoRealestate(){
    this.router.navigate(['/realestate']);
  }

  gotoVehicles(){
    this.router.navigate(['/vehicles']);
  }

  gotoElectronics(){
    this.router.navigate(['/electronics']);
  }

  gotoSports(){
    this.router.navigate(['/sports']);
  }

  gotoFurniture(){
    this.router.navigate(['/furniture']);
  }

  gotoBooks(){
    this.router.navigate(['/books']);
  }

  gotoEducational(){
    this.router.navigate(['/educational']);
  }

  gotoHobby(){
    this.router.navigate(['/hobby']);
  }

  gotoClothing(){
    this.router.navigate(['/clothing']);
  }

  gotoOthers(){
    this.router.navigate(['/others']);
  }
}
