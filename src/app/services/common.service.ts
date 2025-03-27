import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private BASE_API_URL = environment.BASE_API_URL;
  getAPI(){
    const project_url = window.location.origin;
    const firstArray =  project_url.split('/');
    const secondArray =  firstArray[2].split(':');
    let actual_base_api_url = (firstArray[0] + '//' + secondArray[0] + this.BASE_API_URL);
    return actual_base_api_url;
  }
  constructor() { }
}
