import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Storage} from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-new-task',
  templateUrl: 'new-task.html',
})
export class NewTaskPage {

  title:any;
  description:any;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storage:Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTaskPage');
  }

  saveTask() {

    let data = {
      title:this.title,
      description:this.description
    }

    this.storage.set('key',data);

    this.navCtrl.pop();

  }

}
