import {Injectable} from '@angular/core';
import {Facebook as ngFacebook} from 'ionic-native';
import './fbsdk.ts';

declare var cordova:any;

@Injectable()
export class Facebook
{
    constructor()
    {
        // only browser
        if (typeof cordova === "undefined") {
            (<any>window).fbAsyncInit = function () {
                FB.init(
                    {
                        appId: '【input your facebook appID】',
                        xfbml: false,
                        version: 'v2.5'
                    }
                );
            };
            (function(d, s, id){
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                //js.src = "//connect.facebook.net/en_US/sdk/debug.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    }

    login()
    {
        return new Promise(function(resolve, reject) {
            if (typeof cordova === "undefined") {
                if( navigator.userAgent.match('CriOS') ){
                    alert("don't work chrome for iOS.you should use safari.");
                } else {
                    console.log("start login");
                    FB.login(
                        function(response) {
                            console.log("login is resolve");
                            resolve(response);
                        },
                        {scope:'public_profile,user_friends,email'});
                }
            } else {
                // using native
                ngFacebook.login(['email','public_profile','user_friends']).then(
                    (response) => {
                        resolve(response);
                    },
                    (failed) => {
                        reject(failed);
                    }
                );
            }
        });
    }

}