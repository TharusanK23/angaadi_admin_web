import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MapLoaderService } from 'src/app/services/map/map-loader.service';

declare var google: any;

@Component({
  selector: 'app-vendor-create',
  templateUrl: './vendor-create.component.html',
  styleUrls: ['./vendor-create.component.scss']
})
export class VendorCreateComponent implements OnInit {
  pageHeading = 'Create Vendor';
  buttonClickLoading = false;
  submitted = false;
  vendorForm: any = new FormGroup({});

  // IMAGE
  vendorImages: any = [];
  imageUploadClickLoading = false;
  imageRatio: any = 'size-4-3';
  imageChangedEvent: any = '';
  croppedImage: any = {
    vendorImage: ''
  };
  apiImageFile: any = {
    vendorImage: ''
  };
  compressImage = false;

  // MAP VIEW
  mark: any;
  map: any;
  geoLocation: any = null;
  selectedAddress: any = null;
  address: any = {
    number: null,
    street: null,
    city: null,
    state: null,
    country: null,
    postalCode: null,
  };

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.getCurrentLocation();
    this.initVendorForm();
  }

  initVendorForm(): void {
    this.vendorForm = this.fb.group({
      id: null,
      vendorName: ['', [Validators.required]],
      desc: ['', [Validators.required, Validators.maxLength(750)]],
      imageUrls: [[]],
      moreInfo: [[], [Validators.required]],
      isFavorite: false,
      rating: 0.0,
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: this.fb.group({
        id: [''],
        number: ['', [Validators.required]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        postalCode: ['', [Validators.required]],
        country: ['', [Validators.required]],
      }),
    });
  }


  // IMAGE RELATED FUNCTION
  openImageCropper(): void {
    this.imageChangedEvent = '';
    this.croppedImage = {
      vendorImage: ''
    };
    this.compressImage = false;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  VendorImageCropped(event: ImageCroppedEvent): void {
    this.croppedImage.vendorImage = event.base64;
    const base64 = this.croppedImage.vendorImage.split(',')[1];

    const imageBlob = this.dataURItoBlob(base64);
    this.apiImageFile.vendorImage = new File([imageBlob], 'vendorImage.jpeg', { type: 'image/jpeg' });
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

  vendorImageUpload(): void {
    if (this.croppedImage.vendorImage) {
      this.imageUploadClickLoading = true;
      const thumbnailImage = new FormData();
      thumbnailImage.append('Images', this.apiImageFile.vendorImage);

    }
  }

  vendorImageRemove(event: any, imageIndex: number): void {
    const index = this.vendorImages.indexOf(event);
    this.vendorImages.splice(index, 1);
  }

  vendorCreate(): void {
    this.submitted = true;
    if (this.vendorForm.valid) {
      console.log(this.vendorForm.value);
      this.buttonClickLoading = false;
      this.submitted = false;
    }

  }

  // MAP RELATED
  loadMap(lat: any, lon: any): void {
    MapLoaderService.load().then(() => {
      this.marker(lat, lon);
    });
  }

  marker(latitude: any, longitude: any): void {
    const lat = latitude;
    const lng = longitude;
    const coordinates = new google.maps.LatLng(lat, lng);

    this.map = new google.maps.Map(document.getElementById('map'), {
      center: coordinates,
      zoom: 15,
      draggable: true,
    });

    this.mark = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.map,
      draggable: true,
    });

    this.searchMapAddress();
    this.clickMap();
    this.dragMap();
  }

  clickMap(): void {
    google.maps.event.addListener(this.map, 'click', (event: any) => {
      this.placeMarker(event.latLng);
      this.geocodePosition(this.mark.getPosition());
    });
  }

  placeMarker(location: any): void {
    if (this.mark == null) {
      this.mark = new google.maps.Marker({
        position: location,
        map: this.map
      });
    }
    else {
      this.mark.setPosition(location);
    }
  }

  searchMapAddress(): void {
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-map'), { types: ['address'] });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry === undefined || place.geometry === null) {
        return;
      }
      this.map.setCenter(new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()));
      this.placeMarker(place.geometry.location);
      this.selectedAddress = place.formatted_address;
      this.geocodePosition(place.geometry.location);
    });
  }

  dragMap(): void {
    google.maps.event.addListener(this.mark, 'dragend', (evt: any) => {
      this.geocodePosition(this.mark.getPosition());
    });
  }

  geocodePosition(pos: any): void {
    new google.maps.Geocoder().geocode({
      latLng: pos
    }, (responses: any) => {
      if (responses && responses.length > 0) {
        this.selectedAddress = responses[0].formatted_address;
        this.handleAddressChange(responses[0]);
      } else {
        console.log('Cannot determine address at this location.');
      }
    });
  }

  getCurrentLocation(isInit: boolean = true): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          const pos = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          this.loadMap(position.coords.latitude, position.coords.longitude);
          setTimeout(() => {
            this.geocodePosition({ lat: position.coords.latitude, lng: position.coords.longitude });
          }, 1000);

        },
        () => {
          this.loadMap(51.51012799999999, -0.133293);
        }
      );
    } else {
      this.loadMap(51.51012799999999, -0.133293);
    }
  }

  public handleAddressChange(address: any): void {
    this.address = {
      number: this.getStreetNumber(address),
      street: this.getStreet(address),
      city: this.getCity(address),
      state: this.getState(address),
      country: this.getCountry(address),
      postalCode: this.getPostCode(address),
    };
    this.vendorForm.get('address').patchValue(this.address);
  }

  // Google address get

  getAddrComponent(place: any, componentTemplate: any): any {
    let result;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < place.address_components.length; i++) {
      const addressType = place.address_components[i].types[0];
      if (componentTemplate[addressType]) {
        result = place.address_components[i][componentTemplate[addressType]];
        return result;
      }
    }
    return;
  }

  getStreetNumber(place: any): string {
    const COMPONENT_TEMPLATE = { street_number: 'short_name' };
    return this.getAddrComponent(place, COMPONENT_TEMPLATE);
  }

  getStreet(place: any): string {
    const COMPONENT_TEMPLATE = { route: 'long_name' };
    return this.getAddrComponent(place, COMPONENT_TEMPLATE);
  }

  getCity(place: any): string {
    const COMPONENT_TEMPLATE = { locality: 'long_name' };
    return this.getAddrComponent(place, COMPONENT_TEMPLATE);
  }

  getState(place: any): string {
    const COMPONENT_TEMPLATE = { administrative_area_level_1: 'short_name' };
    return this.getAddrComponent(place, COMPONENT_TEMPLATE);
  }

  getDistrict(place: any): string {
    const COMPONENT_TEMPLATE = { administrative_area_level_2: 'short_name' };
    return this.getAddrComponent(place, COMPONENT_TEMPLATE);
  }

  getCountryShort(place: any): string {
    const COMPONENT_TEMPLATE = { country: 'short_name' };
    return this.getAddrComponent(place, COMPONENT_TEMPLATE);
  }

  getCountry(place: any): string {
    const COMPONENT_TEMPLATE = { country: 'long_name' };
    return this.getAddrComponent(place, COMPONENT_TEMPLATE);
  }

  getPostCode(place: any): string {
    const COMPONENT_TEMPLATE = { postal_code: 'long_name' };
    return this.getAddrComponent(place, COMPONENT_TEMPLATE);
  }

}
