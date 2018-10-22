import { Injectable } from '@angular/core';
import * as mobilenet from '@tensorflow-models/mobilenet';


@Injectable({
  providedIn: 'root'
})
export class MobileNetService {
  model;

  constructor() { }


  async classifyImg(img: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, topk?: number): Promise<any> {

    this.model = await mobilenet.load();


// Classify the image.
    return this.model.classify(img, topk);
  }
}
