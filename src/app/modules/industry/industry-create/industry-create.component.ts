import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { Store } from '@ngrx/store';
import { Image, Error } from 'src/app/models';
import { uploadImage } from 'src/app/+store/action/image.action';
import { selectImage, selectImageError } from 'src/app/+store/selectors/image.selector';
import { selectCreateIndustry, selectCreateIndustryError } from 'src/app/+store/selectors/industry.selector';
import { createIndustry } from 'src/app/+store/action/industry.action';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-industry-create',
  templateUrl: './industry-create.component.html',
  styleUrls: ['./industry-create.component.scss']
})
export class IndustryCreateComponent implements OnInit {
  pageHeading = 'Create Industry';
  industryForm: any = new FormGroup({});
  submitted = false;

  // IMAGE
  imageUploadClickLoading = false;
  industryImage: any = [];
  industryThum: any = [];
  imageRatio: any = 'size-4-3';
  imageChangedEvent: any = '';
  croppedImage: any = {
    industryImage: '',
  };
  apiImageFile: any = {
    industryImage: '',
  };
  compressImage = false;
  image?: Image;
  error?: Error;
  color = '#EF3651';
  isButtonLoading = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initIndustryForm();
  }

  initIndustryForm(): void {
    this.industryForm = this.fb.group({
      industryName: [null, [Validators.required]],
      iconUrl: ['', [Validators.required]],
      color: ['', [Validators.required]],
      type: [0, [Validators.required]],
    });
  }

  // IMAGE RELATED FUNCTION
  openImageCropper(): void {
    this.imageChangedEvent = '';
    this.croppedImage.industryImage = '';
    this.compressImage = false;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  industryImageCropped(event: ImageCroppedEvent): void {
    this.croppedImage.industryImage = event.base64;
    const base64 = this.croppedImage.industryImage.split(',')[1];

    const imageBlob = this.dataURItoBlob(base64);
    this.apiImageFile.industryImage = new File([imageBlob], 'industryImage.png', { type: 'image/png' });
  }

  dataURItoBlob(dataURI: any): any {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }

  industryImageRemove(event: any, imageIndex: any): void {
    const index = this.industryThum.indexOf(event);
    this.industryImage.splice(index, 1);
    this.industryThum.splice(index, 1);
  }

  industryImageUpload(): void {
    if (this.croppedImage.industryImage) {
      this.imageUploadClickLoading = true;
      const thumbnailImage = new FormData();
      thumbnailImage.append('Images', this.apiImageFile.industryImage);
      this.store.dispatch(uploadImage({ params: thumbnailImage }));
      this.uploadImageSelector();
    }
  }

  uploadImageSelector(): void {
    this.store.select(selectImage).subscribe(data => {
      this.image = data ?? undefined;
      if (this.image) {
        this.industryThum = [];
        this.industryThum.push(data?.imageUrl);
        this.imageUploadClickLoading = false;
        const element: HTMLElement = document.getElementById('closeModel') as HTMLElement;
        element.click();
      }
    });

    this.store.select(selectImageError).subscribe(error => {
      if (error) {
        this.error = error;
        this.imageUploadClickLoading = false;
      }
    });
  }

  createIndustry(): void {
    this.submitted = true;
    this.industryForm.get('color').patchValue(this.color);
    this.industryForm.get('iconUrl').patchValue(this.industryThum[0]);

    if (this.industryForm.valid) {
      this.isButtonLoading = true;
      this.store.dispatch(createIndustry({ params: this.industryForm.value }));
      this.createIndustrySelector();
    }

  }

  createIndustrySelector(): void {
    this.store.select(selectCreateIndustry).subscribe(data => {
      if (data) {
        this.isButtonLoading = false;
        this.toastr.success('Industry successfully created', 'Success!');
        this.industryForm.reset();
        this.submitted = false;
        this.industryThum = [];
        this.color = '#EF3651';
      }
    });

    this.store.select(selectCreateIndustryError).subscribe(error => {
      if (error) {
        this.error = error;
        this.toastr.error(this.error.error?.detail, 'Failed!');
        this.isButtonLoading = false;
      }
    });
  }

}
