import {Component, OnInit} from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import {loadFrozenModel} from '@tensorflow/tfjs-converter';

const MODEL_URL = 'https://.../mobilenet/web_model.pb';
const WEIGHTS_URL = 'https://.../mobilenet/weights_manifest.json';
const PREPROCESS_DIVISOR = tf.scalar(255 / 2);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angularAi';
  MODEL_URL = '/assets/tensorflowjs_model.pb';

  WEIGHTS_URL = '/assets/weights_manifest.json';
  model;
  result: string;
  image;
  time: string;
  MOBILENET_MODEL_PATH =
    // tslint:disable-next-line:max-line-length
    'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
  mobileNet;
  IMAGENET_CLASSES = {
    0: 'handskar',
    1: 'hörlurar',
    2: 'jacka',
    3: 'laddare',
    4: 'mobil',
    5: 'nycklar',
    6: 'plånbok',
    7: 'väska',
  };
  constructor() {}

  ngOnInit(): void {
    this.loadModel();
  }

  async loadModel() {
    this.model = await loadFrozenModel(this.MODEL_URL, this.WEIGHTS_URL);
    //this.mobileNet = await tf.loadModel(this.MOBILENET_MODEL_PATH);
  }

  async classifyImg(imgData: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, topk?: number): Promise<any> {
    /* let img = tf.fromPixels(imgData);
     img = tf.image.resizeNearestNeighbor(img, [224, 224]);
     console.log(img.size);
     img = img.reshape([-1, 224, 224, 3]);
     img = tf.cast(img, 'float32');
     await console.log(img.size);
     const output = model.execute({Placeholder: img}) as any;

     const predictionList = [];
     const values = output.dataSync();
     console.log(values);
     return predictionList;*/


    return await tf.tidy(() => {

     // console.log(imgData);
      let img = tf.fromPixels(imgData);
      img = img.resizeNearestNeighbor([224, 224]).toFloat();
      // img = img.reshape([-1, 224, 224, 3]);
      const offset = tf.scalar(127.5);
      img = img.sub(offset)
        .div(offset)
        .expandDims();

      // Make and format the predications
      const output = this.model.execute({Placeholder: img}, 'final_result') as any;

      const values = output.dataSync();
      let predictionList = [];
      for (let i = 0; i < values.length; i++) {
        predictionList.push({value: values[i], index: i});
      }
      predictionList = predictionList
        .sort((a, b) => {
          return b.value - a.value;
        })
        .slice(0, 5);
      predictionList = predictionList.map(x => {
        return {label: this.IMAGENET_CLASSES[x.index], value: x.value};
      });
      return predictionList;
    });
  }

  onFileSelect(filelist: FileList) {
    const startTime = performance.now();
    console.log(filelist);
    const file = filelist.item(0);
    const that = this;
    const reader = new FileReader();
    const img = new Image();
    this.image = null;
    this.result = null;
    this.time = null;
    reader.onload = (e) => {
      img.src = e.target.result;
      img.onload = () => {
        this.classifyImg(img).then(res => {
          this.result = res[0].label;
          this.image = img.src;

          console.log(res[0]);
          const totalTime = performance.now() - startTime;
          this.time = `Done in ${Math.floor(totalTime)}ms`;
          console.log(`Done in ${Math.floor(totalTime)}ms`);
        });
      };
    };
    reader.readAsDataURL(file);
  }


}
