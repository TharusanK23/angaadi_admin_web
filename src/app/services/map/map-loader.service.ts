import { Injectable } from '@angular/core';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class MapLoaderService {
  private static promise: Promise<any>;
  map: any;
  circleManager: any;
  circleLatLog: any;

  public static load(): Promise<any> {
    const browserKey = 'AIzaSyDeYieR5QS_8QoAjU7gRe_Yr8fwh6GkVGM';
    const map = {
      URL: 'https://maps.googleapis.com/maps/api/js?libraries=places,drawing,geometry&key=' + browserKey + '&callback=__onGapiLoaded',
    };
    if (!this.promise) {

      // Make promise to load
      this.promise = new Promise(resolve => {
        this.loadScript(map.URL);
        // Set callback for when google maps is loaded.
        window.__onGapiLoaded = ($event: any) => {
          resolve('google maps api loaded');
        };
      });
    }

    return this.promise;
  }

  static loadScript(src: any, callback?: any): void {
    // tslint:disable-next-line: one-variable-per-declaration
    let s: any,
      r: any,
      t: any;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function(): any {
      // console.log( this.readyState ); //uncomment this line to see which ready states are called.
      if (!r && (!this.readyState || this.readyState === 'complete')) {
        r = true;
        if (typeof callback === 'function') {
          callback();
        }
      }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }

}
