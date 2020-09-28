import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { NewTaskPage } from '../new-task/new-task';

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

  constructor(public navCtrl: NavController,public alertCtrl: AlertController , public storage:Storage) {
  }


  goToPage()  {

    this.navCtrl.push(NewTaskPage);

  }

  delete(index){
    this.storage.get("key").then((val)=>{
      //let i
      //for(i=0;i<val.length;i++)
      //{
      //  if(val[i].title==title) {
      //    val.splice(i,1);
      //    console.log(val[i]); }
      //}
      this.task.splice(index,1)
      this.storage.set("key",val)
    })
    
  }

  update(index){
    let alert=this.alertCtrl.create({
      title:'Update Task?',
      message: 'Type in your new task to update...',
      inputs: [{ name: 'editTitle', placeholder: 'Title'},{ name: 'editDescription', placeholder: 'Description'}],
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
      this.task.push(val)
    })

  }


}