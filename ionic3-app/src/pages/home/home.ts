import { Component } from "@angular/core";
import { NavController, AlertController, LoadingController, PopoverController, NavParams, } from 'ionic-angular';
import { Http, /*Headers*/ } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

import { Auth } from '../../providers/auth';
// import { Config } from '../../config'

import { TabsPage } from '../tabs/tabs'
import { LinkPage } from '../link-page/link-page'
import { LoginPage } from '../login-page/login-page'
import { SumWeekPage } from '../sum-week-page/sum-week-page';
@Component({
  selector: 'home-page',
  templateUrl: 'home.html',
})
export class HomePage {
  loading: any;
  uid : string;
  item_list: Array<{title: string, component: any, icon : string}>;
  card_list: Array<{value_left:string,value_right:string, img_left:string, img_right : string}>;

  constructor(public http : Http,public navCtrl: NavController,public alertCtrl: AlertController, 
    public authService: Auth, public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, 
    public navParams : NavParams, public storage : Storage) {
      
      this.uid = this.authService.profile['_id'];
      this.item_list = [
        { title: 'Body Measurements', component: LoginPage, icon: 'body' },
        { title: 'Health Records', component: LoginPage, icon: 'stats' },
      ]
      this.card_list = [
        { value_left: "Height", value_right: "Bloodpressure", img_left: 'assets/icon/height2.jpg', img_right: 'assets/icon/bp.jpeg' },
        { value_left: "Heartrate", value_right: "Temperature", img_left: 'assets/icon/hr2.png', img_right: 'assets/icon/temp.png' },
      ]
  }

  ionViewCanEnter() {  //will trigger as soon as the page is loaded
                      //Check if already authenticate
    this.authService.checkAuthentication().then((res) => {
    }, (err) => {
      this.navCtrl.setRoot(LoginPage);
    });
  }    
  
  showMenu(myEvent){
    let popover = this.popoverCtrl.create(LinkPage);
    popover.present({
      ev: myEvent
    });
  }

  goAnotherPage(page){

  }

  goSummaryPage(value){
    let data={
      type : value
    };
    console.log(value);
    this.navCtrl.push(SumWeekPage, data);
    // let data = {
    //   type : value,
    //   uid : this.uid
    // }
    // // console.log(value);
    // this.navCtrl.push(TabsPage, data);
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authorization'
    });
 
    this.loading.present();
 
  }

}