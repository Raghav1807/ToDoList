import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NewTaskPage } from '../new-task/new-task';
import { Camera, CameraOptions } from '@ionic-native/camera';

import {Storage} from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //public  title:any;
  //public  description:any;
  //public task: Task[{title}];
  task=[]
  n=0;

  constructor(private camera: Camera, public navCtrl: NavController,public alertCtrl: AlertController , public storage:Storage) {
  }


  goToPage()  {

    this.navCtrl.push(NewTaskPage);

  }

  delete(index){
    
    if(this.n != 0){
      this.task.splice(index , 1);
      this.storage.set('key' , this.task);
    }
    
  }

  update(index){
    let alert=this.alertCtrl.create({
      title:'Update Task?',
      message: 'Type in your new task to update...',
      inputs: [{ name: 'editTitle', placeholder: 'Title',value:this.task[index].title},{ name: 'editDescription', placeholder: 'Description',value:this.task[index].description}],
      buttons: [{ text: 'Cancel', role: 'cancel'},
                { text: 'Update', handler: data => {
                  this.task[index].title=data.editTitle;
                  this.task[index].description=data.editDescription;
                }}]
    });
    alert.present();
  }

  ionViewWillEnter() {

    this.storage.get('key').then((val)=>{
      console.log("Data is: ",val);

      //this.title = val['title'];
      //this.description = val['description'];
      this.task = val;
      this.n = this.task.length;
    })

  }


}
