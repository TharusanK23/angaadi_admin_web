
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  pageHeading = 'Create Product';
  productForm: any = new FormGroup({});

  submitted = false;

  vendors: any = [
    {
      id: '1',
      name: 'vendor1'
    },
    {
      id: '2',
      name: 'vendor2'
    },
    {
      id: '3',
      name: 'vendor3'
    },
  ];

  customNgModel: any = {
    status: 'Active',
  };

  // IMAGE
  imageUploadClickLoading = false;
  productImage: any = [];
  productThum: any = [];
  imageRatio: any = 'size-4-3';
  imageChangedEvent: any = '';
  croppedImage: any = {
    productImage: '',
  };
  apiImageFile: any = {
    productImage: '',
  };
  compressImage = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      id: null,
      vendorId: [null, [Validators.required]],
      isActive: true,
      name: ['', [Validators.required]],
      desc: ['', [Validators.required, Validators.maxLength(750)]],
      moreInfo: [''],
      images: [null, [Validators.required]],
      thumbs: [null, [Validators.required]],
      productCategory: [null, [Validators.required]],
      productSubCategory: [null, [Validators.required]],
      netPrice: [0.0, [Validators.required]],
      discount: [0.0],
      grossPrice: [0.0, [Validators.required]],
      qty: [0, [Validators.required]],
      minOrderQty: [0, [Validators.required]],
      maxOrderQty: [0, [Validators.required]],
    });
  }

  // SET GROSS PRICE
  fromNetPrice(): void {
    const netPrice = this.productForm.get('netPrice').value;
    const discount = this.productForm.get('discount').value == null ? 0 : this.productForm.get('discount').value;

    const grossPrice = netPrice - ((netPrice * discount) / 100);
    this.productForm.get('grossPrice').patchValue(grossPrice);
  }

  fromDiscount(): void {
    const netPrice = this.productForm.get('netPrice').value == null ? 0 : this.productForm.get('netPrice').value;
    const discount = this.productForm.get('discount').value;

    const grossPrice = netPrice - ((netPrice * discount) / 100);
    this.productForm.get('grossPrice').patchValue(grossPrice);
  }

  // IMAGE RELATED FUNCTION
  openImageCropper(): void {
    this.imageChangedEvent = '';
    this.croppedImage = {
      productImage: '',
      thumbnail: ''
    };
    this.compressImage = false;
  }

  fileChangeEvent(event: any): void {
    console.log(event);

    this.imageChangedEvent = event;
  }

  ProductImageCropped(event: ImageCroppedEvent): void {
    this.croppedImage.productImage = event.base64;
    const base64 = this.croppedImage.productImage.split(',')[1];

    const imageBlob = this.dataURItoBlob(base64);
    this.apiImageFile.productImage = new File([imageBlob], 'productImage.jpeg', { type: 'image/jpeg' });
  }

  dataURItoBlob(dataURI: any): any {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/jpeg' });
    return blob;
  }

  productImageRemove(event: any, imageIndex: any): void {
    const index = this.productThum.indexOf(event);
    this.productImage.splice(index, 1);
    this.productThum.splice(index, 1);
  }

  productImageUpload(): void {
    if (this.croppedImage.thumbnail && this.croppedImage.productImage) {
      this.imageUploadClickLoading = true;
      const thumbnailImage = new FormData();
      thumbnailImage.append('Images', this.apiImageFile.thumbnail);
      this.http.post('https://angaadi-test-server.herokuapp.com/api/image/upload', thumbnailImage).subscribe((data: any) => {
        console.log(data);
        this.imageUploadClickLoading = false;
        this.productThum.push(data.result);
        const element: HTMLElement = document.getElementById('closeModel') as HTMLElement;
        element.click();
      }, error => {
        this.imageUploadClickLoading = false;
        this.toastr.error(error.error.error.detail, 'Error');
      });

    }
  }

}
