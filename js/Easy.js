//დაპაუზება გაგრძელება რეკლამები //
//ცაკეცვისას ხმაც უნდა გავუთიშო//
var isAppForeground = true;
var appFold = true;


//დაჯილდოვება //
var rewardBtn = document.getElementById("reward");
var adText = document.getElementById("adText");

//ინტერნეტი//
var dataFileEntry;

function createSomeData() {

    window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {

        console.log('file system open: ' + fs.name);
        // Creates a new file or returns an existing file.
        fs.root.getFile("data.txt", { create: true, exclusive: false }, function(fileEntry) {

            dataFileEntry = fileEntry;

        }, onErrorCreateFile);

    }, onErrorLoadFs);
}

function initAds() {
    if (admob) {
        var adPublisherIds = {
            android: {
                banner: "ca-app-pub-9420860145754788/1884671316",
                interstitial: "ca-app-pub-9420860145754788/8258507970",
                rewarded: "ca-app-pub-9420860145754788/4127691278"
            }
        };

        var admobid = (/(android)/i.test(navigator.userAgent)) ? adPublisherIds.android : adPublisherIds.ios;

        admob.setOptions({
            publisherId: admobid.banner,
            interstitialAdId: admobid.interstitial,
            rewardedAdId: admobid.rewarded,
            // publisherId: "ca-app-pub-3940256099942544/6300978111",  // Required
            //interstitialAdId: "ca-app-pub-3940256099942544/1033173712",  // Optional 
            autoShowBanner: true,
            autoShowInterstitial: false,
            autoShowRewarded: false,
        });

        registerAdEvents();

    } else {
        alert('AdMobAds plugin not ready');
    }
}


function onAdLoaded(e) {
    if (isAppForeground) {
        if (e.adType === admob.AD_TYPE.AD_TYPE_BANNER) {
            console.log("New banner received");
        } else if (e.adType === admob.INTERSTITIAL) {
            console.log("An interstitial has been loaded and autoshown. If you want to automatically show the interstitial ad, set 'autoShowInterstitial: true' in admob.setOptions() or remove it");
        } else if (e.adType === admob.AD_TYPE_REWARDED) {
            console.log("New rewarded ad received");

        }
    }

}
const insideGamePlay = document.getElementById("insideGame");
const hideScreen = document.getElementById("hideScreen");


function onPause() {
    if (isAppForeground) {
        admob.destroyBannerView();
        isAppForeground = false;
    }
    stopInterval();
    appFold = false;
    //ხმების მოშორება თამაშის დაპაუზებისას//
    heartSnd.pause();
    chooseSnd.pause();
    correctSnd.pause();
}

function onResume() {
    if (!isAppForeground) {
        setTimeout(admob.createBannerView, 1);
        setTimeout(admob.requestInterstitialAd, 1);
        setTimeout(admob.requestRewardedAd, 1);
        isAppForeground = true;
    }
    intervalTime();

}

var isRewardedVideo = true;

function onAdClosed(e) {
    if (isAppForeground) {
        if (e.adType === admob.INTERSTITIAL) {
            isInterstitialReady = false;
            admob.requestInterstitialAd();
        }
    }
    clearInterval(rwdinterval);
    appFold = true;
    turnOffReward();
}


// optional, in case respond to events
function registerAdEvents() {
    document.addEventListener(admob.events.onAdLoaded, onAdLoaded);
    document.addEventListener(admob.events.onAdClosed, onAdClosed);
    /*
        document.addEventListener(admob.events.onAdFailedToLoad, function (e) { });
        
       document.addEventListener(admob.events.onAdOpened, function (e) { });
     
       document.addEventListener(admob.events.onAdLeftApplication, function (e) { }); */
    document.addEventListener("pause", onPause, false);
    document.addEventListener("resume", onResume, false);
    //ინტერნეტის შემოწმება//
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
}



function onDeviceReady() {
    document.removeEventListener('deviceready', onDeviceReady, false);

    initAds();

    screen.orientation.lock('portrait');
    // display a banner at startup
    admob.createBannerView();;
    // request an interstitial ad
    admob.requestInterstitialAd();

    // request a rewarded ad
    admob.requestRewardedAd();

}


function onOffline() {
    rewardBtn.style.display = "none";
    adText.innerText = "no internet connection";
}


function onOnline() {
    rewardBtn.style.display = "block";
    setTimeout(() => {
        rewardBtn.innerText = "continue";
        rewardBtn.style.backgroundColor = "white";
        adText.innerText = "contain ads";
        rewardBtn.style.opacity = 1;
        rewardBtn.addEventListener("click", rwdVideo);
    }, 1000 * 60 * 2); //
    adText.style.display = "block";
}

//ინტერნეტი//


var counter = 0;
var btncounter = 0;
//რეკლამა ყოველ 55 კლიკში//
window.addEventListener("click", counterClick);

function counterClick() {
    if (counter == 78) {
        counter++;
        counter = 0;
        admob.showInterstitialAd();
    } else {
        counter++;
    }
}

//რელამა ყოველ 5 რესტარტზე ან 10ზე //
function btncounterClick() {
    if (btncounter == 7) {
        btncounter = 0;
        admob.showInterstitialAd();
    }
}

document.addEventListener("deviceready", onDeviceReady, false);

//სიმაღლე და სიგანე //
var w = window.innerWidth;
var h = window.innerHeight;

//მარცხენა და მარჯვენა ბურთები//
//მარცხენა//
var ballleft1 = document.getElementById("ballleft1");
var ballleft2 = document.getElementById("ballleft2");
var ballleft3 = document.getElementById("ballleft3");
var ballleft4 = document.getElementById("ballleft4");
var ballleft5 = document.getElementById("ballleft5");

//მარჯვენა//
var ballright1 = document.getElementById("ballright1");
var ballright2 = document.getElementById("ballright2");
var ballright3 = document.getElementById("ballright3");
var ballright4 = document.getElementById("ballright4");
var ballright5 = document.getElementById("ballright5");



//ფერები მხოლოდ მარცხენა//
var leftColor1 = ballleft1.style.backgroundColor;
var leftColor2 = ballleft2.style.backgroundColor;
var leftColor3 = ballleft3.style.backgroundColor;
var leftColor4 = ballleft4.style.backgroundColor;
var leftColor5 = ballleft5.style.backgroundColor;
//ფერები მხოლოდ მარჯვენა//
var rightColor1 = ballright1.style.backgroundColor;
var rightColor2 = ballright2.style.backgroundColor;
var rightColor3 = ballright3.style.backgroundColor;
var rightColor4 = ballright3.style.backgroundColor;
var rightColor5 = ballright3.style.backgroundColor;




//სწორი პასუხების თვლა//
var counterDisplayElem = document.getElementById("score");
var levelText = document.getElementById("level");

//ქულა ტური დრო//
let count = 0;
let level = 1;
let timer = 0; //30 წამი საკმარისია 9 ლეველის გასავლელად//


//ცისარტყელა ტაიმერი და მზე //
const rainbow = document.getElementById("rainbow");
const sun = document.getElementById("sun");
var timerText = document.getElementById("timer");
//ამეების მოხსნის მერე ტაიმერი ირთვება ჩვეულებრივ//


insideGamePlay.style.display = "none";
var interCount = 0;

function intervalTime() {
    if (interCount == 0 && insideGamePlay.style.display == "block") {
        intervalTiming = setInterval(timing, 1000);
        interCount = 1;
    }
}



function stopInterval() {
    interCount = 0;
    clearInterval(intervalTiming);
}


//საცდელი//
var pauseGame = document.getElementById("pausgame");
var resumeGame = document.getElementById("resgame");


pauseGame.addEventListener("click", pauseInterval);

function pauseInterval() {
    stopInterval();
}

resumeGame.addEventListener("click", resumeInterval);

function resumeInterval() {
    intervalTime();

}



function timing() {
    timer = timer - 1;
    rainbow.style.width = timer * w / 26 + "px";
    timerText.innerText = "Time : " + timer;
    if (timer < 8) {
        timerText.style.animation = "timerAnim 1s infinite";
        if (sounding == true) {
            heartSnd.play();
        }
    } else {
        timerText.style.animation = "";
        heartSnd.pause();
    }
    if (timer == 0) {
        stopInterval();
        gameOver();
    }

}

//რო გამოჩნდეს გარეთ ქულები//
counterDisplayElem.innerText = "score : " + count;

function updateDisplay() {
    counterDisplayElem.innerText = "score " + count;
    //დაკლიკების მოშორება დანარჩენ ბურთებზე//
    ballleft1.removeEventListener("click", select1);
    ballleft2.removeEventListener("click", select2);
    ballleft3.removeEventListener("click", select3);
    ballleft4.removeEventListener("click", select4);
    ballleft5.removeEventListener("click", select5);

}

//ქლიქი მარცხენა ბურთზე//
function selecting() {
    ballleft1.addEventListener("click", select1);
    ballleft2.addEventListener("click", select2);
    ballleft3.addEventListener("click", select3);
    ballleft4.addEventListener("click", select4);
    ballleft5.addEventListener("click", select5);

}


//პასუხების სისწორის შემოწმება და შემდეგ ლეველზე გადასვლა//
var correct1An = false;
var correct2An = false;
var correctAn3 = false;
var correctAn4 = false;
var correctAn5 = false;

//ტურიდან ტურში გადასვლა//

var pass = false;


//იდეაში ეს აღარ მჭირდება იმიტო რო სწორი პასუხების თვლით ცვლის ტურს//
function correct() {
    if (correct1An == true && correct2An == true && correctAn3 == true && correctAn4 == true && correctAn5 == true) {
        //nextLevel.innerText = "LVL 2";
        correct1An = false;
        correct2An = false;
        correctAn3 = false;
        pass = true;

    }
    if (sounding == true) {
        correctSnd.play();
    }
    //აქ შემდეგი ტურში გადასვლის ხმა შემიძლია დავამატო //
    lvlUp();
}


var bodyGame = document.getElementById("gameBody");


function lvlUp() {
    //შემიძლია ფონის შეცვლა დავამატო//
    if (count == 0) {
        Lvl1();
    }
    if (count == 5) {
        lvlSnd();
        Lvl2();

    }
    if (count == 10) {
        lvlSnd();
        Lvl3();
    }
    if (count == 15) {
        lvlSnd();
        Lvl4();
    }
    if (count == 20) {
        lvlSnd();
        Lvl5();
    }
    if (count == 25) {
        lvlSnd();
        Lvl6();
    }
    if (count == 30) {
        lvlSnd();
        Lvl7();
    }
    if (count == 35) {
        lvlSnd();
        Lvl8();
    }
    if (count == 40) {
        lvlSnd();
        Lvl9();

    }
    if (count == 45) {
        lvlSnd();
        Lvl10();
    }
    if (count == 50) {
        lvlSnd();
        Lvl11();
    }
    if (count == 55) {

        lvlSnd();
        Lvl12();
    }
    if (count == 60) {
        lvlSnd();
        Lvl13();
    }
    if (count == 65) {
        lvlSnd();
        Lvl14();
    }
    if (count == 70) {
        lvlSnd();
        Lvl15();
    }
    if (count == 75) {
        lvlSnd();
        Lvl16();
    }
    if (count == 80) {
        lvlSnd();
        Lvl17();
    }
    if (count == 85) {
        lvlSnd();
        Lvl18();
    }
    if (count == 90) {
        lvlSnd();
        Lvl19();
    }
    if (count == 95) {
        lvlSnd();
        Lvl20();
    }
    if (count == 100) {
        lvlSnd();
        Lvl21();
    }
    if (count == 105) {
        lvlSnd();
        Lvl22();
    }
    if (count == 110) {
        lvlSnd();
        Lvl23();
    }
    if (count == 115) {
        lvlSnd();
        Lvl24();
    }
    if (count == 120) {
        lvlSnd();
        Lvl25();
    }
    if (count == 125) {
        lvlSnd();
        Lvl26();
    }
    if (count == 130) {
        lvlSnd();
        Lvl27();
    }
    if (count == 135) {
        lvlSnd();
        Lvl28();
    }
    if (count == 140) {
        lvlSnd();
        Lvl29();
    }
    if (count == 145) {
        lvlSnd();
        Lvl30();
    }
    if (count == 150) {
        lvlSnd();
        Lvl31();
    }
    if (count == 155) {
        lvlSnd();
        Lvl32();
    }
    if (count == 160) {
        lvlSnd();
        Lvl33();
    }
    if (count == 165) {
        lvlSnd();
        Lvl34();
    }
    if (count == 170) {
        lvlSnd();
        Lvl35();
    }
    if (count == 175) {
        lvlSnd();
        Lvl36();
    }
    if (count == 180) {
        lvlSnd();
        Lvl37();
    }
    if (count == 185) {
        lvlSnd();
        Lvl38();
    }
    if (count == 190) {
        lvlSnd();
        Lvl39();
    }
    if (count == 195) {
        lvlSnd();
        Lvl40();
    }
    if (count == 200) {
        lvlSnd();
        Lvl41();
    }
    if (count == 205) {
        lvlSnd();
        Lvl42();
    }
    if (count == 210) {
        lvlSnd();
        Lvl43();
    }
    if (count == 215) {
        lvlSnd();
        Lvl44();
    }
    if (count == 220) {
        lvlSnd();
        Lvl45();
    }
    if (count == 225) {
        lvlSnd();
        Lvl46();
    }
    if (count == 230) {
        lvlSnd();
        Lvl47();
    }
    if (count == 235) {
        lvlSnd();
        Lvl48();
    }
    if (count == 240) {
        lvlSnd();
        Lvl49();
    }
    if (count == 245) {
        lvlSnd();
        Lvl50();
        //დასასრული უნდა დავამტო//
        allLvlPass();
    }

}


//ხმები //
var soundOn = document.getElementById("soundon");
var soundOff = document.getElementById("soundoff");

var sounding = true;

//არჩევა//
var chooseSnd = new Audio();
chooseSnd.src = "./sound/choose2.wav";
chooseSnd.loop = true;

//სწორი პასუხი//
var correctSnd = new Audio();
correctSnd.src = "./sound/correct.wav";


//გულის ფეთქვა//
var heartSnd = new Audio();
heartSnd.src = "./sound/heart1.wav";
//heartSnd.loop = true;

//ჭექა-ქუხილი//
var thunders = new Audio();
thunders.src = "./sound/thunder.wav";

//კლიკის ხმა//
var buttonSnd = new Audio();
buttonSnd.src = "buttons.mp3";

//ტური//
var levelSnd = new Audio();
levelSnd.src = "level.wav";
//ფუნქცცია ლეველების ხმის//
function lvlSnd() {
    if (sounding == true) {
        levelSnd.play();
    }
}

function btsHear() {
    if (sounding == true) {
        buttonSnd.play();
    }
}

//local storage დამახსოვრება //

soundOn.addEventListener("click", sndOn);
soundOff.addEventListener("click", sndOFF);

function sndOn() {
    // soundOn.addEventListener("click", () => {
    soundOn.style.display = "none";
    soundOff.style.display = "block";
    sounding = false;
    localStorage.setItem("off", JSON.stringify(soundOn)); //sounding
    localStorage.removeItem("on");
    //});

}



function sndOFF() {
    //soundOff.addEventListener("click", () => {
    soundOn.style.display = "block";
    soundOff.style.display = "none";
    sounding = true;
    localStorage.setItem("on", JSON.stringify(soundOff));
    localStorage.removeItem("off");
    //დაკლიკების ხმა//
    btsHear();

}

function soundReadyToGo() {
    if (sounding == true) {
        soundOn.style.display = "block";
    }
    if (localStorage.getItem("off") != null) {
        soundOn.style.display = "none";
        soundOff.style.display = "block";
        sounding = false;
    }
    if (localStorage.getItem("on") != null) {
        soundOn.style.display = "block";
        soundOff.style.display = "none";
    }
}

soundReadyToGo();


//ხმების უშვალოდ გამოცემა//
function soundHear() {
    if (sounding == true) {
        chooseSnd.play();
    }
}

function soundNotHear() {
    chooseSnd.pause();
}



//თამაშის ძრავი//
//პირველი ბურთის მონიშვნა და შედარება //
//ბურთების არჩევა მარცხნიდან//
function select1() {
    //სტაილები balltoshow ფუნქციაში უნდა შევცვალო რო საწყის მდგომარეობას დაუბრუნდეს//    
    /* ballleft1.style.animation = "cimcimi 0.7s infinite";
 
     if (h <= 470) {
         ballleft1.style.animation = "cimcimires 0.6s infinite";
     }
     if (h <= 335) {
         ballleft1.style.animation = "cimcimires1 0.6s infinite";
     }
 */
    //ანიმაციის წაშლა შემდეგი ანიმაციის დასამატებლად //
    rmUkanamodzraoba();
    ballleft1.classList.add("animationstr");
    if (h <= 470) {
        ballleft1.classList.add("animationstr1");
    }
    if (h <= 335) {
        ballleft1.classList.add("animationstr2");
    }

    //ხმა გულის//
    soundHear();

    //მარჯვნიდან არჩევა//
    //1.ვარიანტი პირველი ბურთის//
    ballright1.addEventListener("click", equel1);

    function equel1() {
        if (leftColor1 === rightColor1) {
            //გაქრობა როცა ტოლია//
            ballleft1.style.animation = "marcxenaModzraoba1 2s forwards";
            ballright1.style.animation = "marjvenaModzraoba1 1.5s forwards";
            //სხვა ბურთის არჩევის დამატება//
            addEquel();
            //სხვა ბურთებზე დაკლიკების წაშლა როცა სწორია//
            removeEquel();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correct1An = true;
            correct();
            console.log("equel");
            //დროზე დამატება 1წამის//
            timer++;
        } else {
            removeEquel();
            gameOver();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();
    }

    //2.ვარიანტი//
    ballright2.addEventListener("click", equel2);

    function equel2() {
        if (leftColor1 === rightColor2) {
            //გაქრობა როცა ტოლია//
            ballleft1.style.animation = "marcxenaModzraoba1 2s forwards";
            ballright2.style.animation = "marjvenaModzraoba2 1.5s forwards";
            //სხვა ბურთის არჩევის დამატება//
            addEquel();
            //სხვა ბურთებზე დაკლიკების წაშლა როცა სწორია//
            removeEquel();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correct1An = true;
            correct();
            //დროზე დამატება 1წამის//
            timer++;

            console.log("equel");
        } else {
            removeEquel();
            gameOver();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }


    //3.ვარიანტი//
    ballright3.addEventListener("click", equel3);

    function equel3() {
        if (leftColor1 === rightColor3) {
            //გაქრობა როცა ტოლია//
            ballleft1.style.animation = "marcxenaModzraoba1 2s forwards";
            ballright3.style.animation = "marjvenaModzraoba3 1.5s forwards";

            //სხვა ბურთებზე დაკლიკების წაშლა როცა სწორია//
            removeEquel();

            //სხვა ბურთის არჩევის დამატება//
            addEquel();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correct1An = true;
            correct();


            //დროზე დამატება 1წამის//
            timer++;
            console.log("equel");
        } else {
            removeEquel();
            gameOver();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //4.ვარიანტი//
    ballright4.addEventListener("click", equel4);

    function equel4() {
        if (leftColor1 === rightColor4) {
            //გაქრობა როცა ტოლია//
            ballleft1.style.animation = "marcxenaModzraoba1 2s forwards";
            ballright4.style.animation = "marjvenaModzraoba4 1.5s forwards";

            //სხვა ბურთებზე დაკლიკების წაშლა როცა სწორია//
            removeEquel();

            //სხვა ბურთის არჩევის დამატება//
            addEquel();

            // სისწორე და შემდეგ ტურში გადასვლა //
            correct1An = true;
            correct();


            //დროზე დამატება 1წამის//
            timer++;
            console.log("equel");
        } else {
            removeEquel();
            gameOver();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();
    }

    //5.ვარიანტი//
    ballright5.addEventListener("click", equel5);

    function equel5() {
        if (leftColor1 === rightColor5) {
            ballleft1.style.animation = "marcxenaModzraoba1 2s forwards";
            ballright5.style.animation = "marjvenaModzraoba5 1.5s forwards";

            //სხვა ბურთებზე დაკლიკების წაშლა როცა სწორია//
            removeEquel();
            //სხვა ბურთის არჩევის დამატება//
            addEquel();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correct1An = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("equel");
        } else {
            removeEquel();
            gameOver();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    count++;
    updateDisplay();
    //სხვა ბურთებზე დაკლიკების წაშლა როცა სწორია//

    function removeEquel() {
        //დანარჩენ ბურთებზე დაკლიკების წაშლა თუ სწორია//
        ballright1.removeEventListener("click", equel1);
        ballright2.removeEventListener("click", equel2);
        ballright3.removeEventListener("click", equel3);
        ballright4.removeEventListener("click", equel4);
        ballright5.removeEventListener("click", equel5);
    }

    function addEquel() {
        ballleft2.addEventListener("click", select2);
        ballleft3.addEventListener("click", select3);
        ballleft4.addEventListener("click", select4);
        ballleft5.addEventListener("click", select5);
    }
    ballleft1.classList.add("animationstr");
}

//მეორე ბურთის მონიშვნა და შედარება //
function select2() {
    /* ballleft2.style.animation = "cimcimi 0.7s infinite";
     if (h <= 470) {
         ballleft2.style.animation = "cimcimires 0.6s infinite";
     }
     if (h <= 335) {
         ballleft2.style.animation = "cimcimires1 0.6s infinite";
     } */

    //ანიმაციის წაშლა შემდეგი ანიმაციის დასამატებლად //
    rmUkanamodzraoba();
    ballleft2.classList.add("animationstr");;


    if (h <= 470) {
        ballleft2.classList.add("animationstr1");
    }
    if (h <= 335) {
        ballleft2.classList.add("animationstr2");
    }


    //ხმა გულის//
    soundHear();
    //მარჯვნიდან არჩევა//
    //1.ვარიანტი//
    ballright1.addEventListener("click", compare1);

    function compare1() {
        if (leftColor2 === rightColor1) {

            //გაქრობა როცა ტოლია//
            ballleft2.style.animation = "marcxenaModzraoba2 2s forwards";
            ballright1.style.animation = "marjvenaModzraoba1 1.5s forwards";

            //მარჯვნიდან არჩევის წაშლა თუ სწორია//
            removeCompare();
            //სხვა ბურთის არჩევის დამატება//
            addSelect();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correct2An = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball2 equel");
        } else {
            gameOver();
            removeCompare();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }


    //2.ვარიანტი//
    ballright2.addEventListener("click", compare2);

    function compare2() {
        if (leftColor2 === rightColor2) {
            //გაქრობა როცა ტოლია//
            ballleft2.style.animation = "marcxenaModzraoba2 2s forwards";
            ballright2.style.animation = "marjvenaModzraoba2 1.5s forwards";
            // ballleft2.style.display = "none";


            //მარჯვნიდან არჩევის წაშლა თუ სწორია//
            removeCompare();
            //სხვა ბურთის არჩევის დამატება//
            addSelect();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correct2An = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball2 equel");
        } else {
            gameOver();
            removeCompare();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //3.ვარიანტი//
    ballright3.addEventListener("click", compare3);

    function compare3() {
        if (leftColor2 === rightColor3) {
            //გაქრობა როცა ტოლია//
            ballleft2.style.animation = "marcxenaModzraoba2 2s forwards";
            ballright3.style.animation = "marjvenaModzraoba3 1.5s forwards";

            //მარჯვნიდან არჩევის წაშლა თუ სწორია//
            removeCompare();
            //სხვა ბურთის არჩევის დამატება//
            addSelect();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correct2An = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball2 equel esaa");
        } else {
            gameOver();
            removeCompare();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //4.ვარიანტი//
    ballright4.addEventListener("click", compare4);

    function compare4() {
        if (leftColor2 === rightColor4) {
            ballleft2.style.animation = "marcxenaModzraoba2 2s forwards";
            ballright4.style.animation = "marjvenaModzraoba4 1.5s forwards";
            //მარჯვნიდან არჩევის წაშლა თუ სწორია//
            removeCompare();
            //სხვა ბურთის არჩევის დამატება//
            addSelect();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correct2An = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball2 equel esaa");
        } else {
            gameOver();
            removeCompare();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }
    //5.ვარიანტი//
    ballright5.addEventListener("click", compare5);

    function compare5() {
        if (leftColor2 === rightColor5) {
            ballleft2.style.animation = "marcxenaModzraoba2 2s forwards";
            ballright5.style.animation = "marjvenaModzraoba5 1.5s forwards";
            removeCompare();
            //სხვა ბურთის არჩევის დამატება//

            addSelect();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correct2An = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball2 equel esaa");
        } else {
            gameOver();
            removeCompare();

        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }


    count++;
    updateDisplay();

    //მარჯვნიდან არჩევის წაშლა თუ სწორია//
    function removeCompare() {
        ballright1.removeEventListener("click", compare1);
        ballright2.removeEventListener("click", compare2);
        ballright3.removeEventListener("click", compare3);
        ballright4.removeEventListener("click", compare4);
        ballright5.removeEventListener("click", compare5);
    }

    //სხვა ბურთის არჩევის დამატება//
    function addSelect() {
        ballleft1.addEventListener("click", select1);
        ballleft3.addEventListener("click", select3);
        ballleft4.addEventListener("click", select4);
        ballleft5.addEventListener("click", select5);
    }


}


//მესამე ბურთის მონიშვნა და შედარება //
function select3() {

    /*  ballleft3.style.animation = "cimcimi 0.7s infinite";
      if (h <= 470) {
          ballleft3.style.animation = "cimcimires 0.6s infinite";
      }
      if (h <= 335) {
          ballleft3.style.animation = "cimcimires1 0.6s infinite";
      } */


    //ანიმაციის წაშლა შემდეგი ანიმაციის დასამატებლად //
    rmUkanamodzraoba();
    ballleft3.classList.add("animationstr");


    if (h <= 470) {
        ballleft3.classList.add("animationstr1");
    }
    if (h <= 335) {
        ballleft3.classList.add("animationstr2");
    }

    //ხმა გულის//
    soundHear();
    //1.ვარიანტი//
    ballright1.addEventListener("click", equelball1);

    function equelball1() {
        if (leftColor3 === rightColor1) {
            //გაქრობა როცა ტოლია//
            ballleft3.style.animation = "marcxenaModzraoba3 2s forwards";
            ballright1.style.animation = "marjvenaModzraoba1 1.5s forwards";


            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall();

            //სხვა ბურთის არჩევის დამატება//
            addSelect1();

            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn3 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 3 equel");
        } else {
            removeEquelBall();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }


    //2.ვარიანტი//
    ballright2.addEventListener("click", equelball2);

    function equelball2() {
        if (leftColor3 === rightColor2) {
            //გაქრობა როცა ტოლია//
            ballleft3.style.animation = "marcxenaModzraoba3 2s forwards";
            ballright2.style.animation = "marjvenaModzraoba2 1.5s forwards";

            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall();

            //სხვა ბურთის არჩევის დამატება//
            addSelect1();

            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn3 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 3 equel");
        } else {
            removeEquelBall();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }


    //3.ვარიანტი//
    ballright3.addEventListener("click", equelball3);

    function equelball3() {
        if (leftColor3 === rightColor3) {
            //გაქრობა როცა ტოლია//
            ballleft3.style.animation = "marcxenaModzraoba3 2s forwards";
            ballright3.style.animation = "marjvenaModzraoba3 1.5s forwards";


            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall();

            //სხვა ბურთის არჩევის დამატება//
            addSelect1();

            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn3 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 3 equel");
        } else {
            removeEquelBall();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //4.ვარიანტი//
    ballright4.addEventListener("click", equelball4);

    function equelball4() {
        if (leftColor3 === rightColor4) {
            ballleft3.style.animation = "marcxenaModzraoba3 2s forwards";
            ballright4.style.animation = "marjvenaModzraoba4 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall();
            //სხვა ბურთის არჩევის დამატება//
            addSelect1();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn3 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 3 equel fafaf");
        } else {
            removeEquelBall();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //5.ვარიანტი//
    ballright5.addEventListener("click", equelball5);

    function equelball5() {
        if (leftColor3 === rightColor5) {
            ballleft3.style.animation = "marcxenaModzraoba3 2s forwards";
            ballright5.style.animation = "marjvenaModzraoba5 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall();
            //სხვა ბურთის არჩევის დამატება//
            addSelect1();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn3 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 3 equel");
        } else {
            removeEquelBall();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    count++;
    updateDisplay();

    //დაკლიკების წაშლა თუ სწორია//
    function removeEquelBall() {
        ballright1.removeEventListener("click", equelball1);
        ballright2.removeEventListener("click", equelball2);
        ballright3.removeEventListener("click", equelball3);
        ballright4.removeEventListener("click", equelball4);
        ballright5.removeEventListener("click", equelball5);
    }
    //დაკლიკების დამატება//
    function addSelect1() {
        ballleft1.addEventListener("click", select1);
        ballleft2.addEventListener("click", select2);
        ballleft4.addEventListener("click", select4);
        ballleft5.addEventListener("click", select5);
    }

}


//მეოთხე ბურთის მონიშვნა და შედარება//
function select4() {

    /*
        ballleft4.style.animation = "cimcimi 0.7s infinite";
        if (h <= 470) {
            ballleft4.style.animation = "cimcimires 0.6s infinite";
        }
        if (h <= 335) {
            ballleft4.style.animation = "cimcimires1 0.6s infinite";
        } */

    //ანიმაციის წაშლა შემდეგი ანიმაციის დასამატებლად //
    rmUkanamodzraoba();
    ballleft4.classList.add("animationstr");

    if (h <= 470) {
        ballleft4.classList.add("animationstr1");
    }
    if (h <= 335) {
        ballleft4.classList.add("animationstr2");
    }


    //ხმა გულის//
    soundHear();
    //1.ვარიანტი//
    ballright1.addEventListener("click", toli1);

    function toli1() {
        if (leftColor4 === rightColor1) {
            //გაქრობა როცა ტოლია//
            ballleft4.style.animation = "marcxenaModzraoba4 2s forwards";
            ballright1.style.animation = "marjvenaModzraoba1 1.5s forwards";

            //წაშლა დაკლიკების თუ სწორია //

            removeEquelBall1();
            //სხვა ბურთის არჩევის დამატება//

            addSelect2();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn4 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;

            console.log("ball 4 equel");
        } else {
            removeEquelBall1();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }
    //2.ვარიანტი//
    ballright2.addEventListener("click", toli2);

    function toli2() {
        if (leftColor4 === rightColor2) {
            //გაქრობა როცა ტოლია//
            ballleft4.style.animation = "marcxenaModzraoba4 2s forwards";
            ballright2.style.animation = "marjvenaModzraoba2 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall1();

            //სხვა ბურთის არჩევის დამატება//

            addSelect2();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn4 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 4 equel");
        } else {
            removeEquelBall1();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //3.ვარიანტი//
    ballright3.addEventListener("click", toli3);

    function toli3() {
        if (leftColor4 === rightColor3) {
            //გაქრობა როცა ტოლია//          
            ballleft4.style.animation = "marcxenaModzraoba4 2s forwards";
            ballright3.style.animation = "marjvenaModzraoba3 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall1();

            //სხვა ბურთის არჩევის დამატება//
            addSelect2();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn4 = true;
            correct();


            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 4 equel");
        } else {
            removeEquelBall1();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //4.ვარიანტი//
    ballright4.addEventListener("click", toli4);

    function toli4() {
        if (leftColor4 === rightColor4) {
            //გაქრობა როცა ტოლია//           
            ballleft4.style.animation = "marcxenaModzraoba4 2s forwards";
            ballright4.style.animation = "marjvenaModzraoba4 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall1();

            //სხვა ბურთის არჩევის დამატება//

            addSelect2();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn4 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 4 equel");
        } else {
            removeEquelBall1();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //5.ვარიანტი//
    ballright5.addEventListener("click", toli5);

    function toli5() {
        if (leftColor4 === rightColor5) {
            //გაქრობა როცა ტოლია//           
            ballleft4.style.animation = "marcxenaModzraoba4 2s forwards";
            ballright5.style.animation = "marjvenaModzraoba5 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall1();
            //სხვა ბურთის არჩევის დამატება//
            addSelect2();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn4 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 4 equel");
        } else {
            removeEquelBall1();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    count++;
    updateDisplay();


    //დაკლიკების წაშლა თუ სწორია//
    function removeEquelBall1() {
        ballright1.removeEventListener("click", toli1);
        ballright2.removeEventListener("click", toli2);
        ballright3.removeEventListener("click", toli3);
        ballright4.removeEventListener("click", toli4);
        ballright5.removeEventListener("click", toli5);
    }
    //დაკლიკების დამატება//
    function addSelect2() {
        ballleft1.addEventListener("click", select1);
        ballleft2.addEventListener("click", select2);
        ballleft3.addEventListener("click", select3);
        ballleft5.addEventListener("click", select5);
    }

}


//მეხუთე ბურთის მონიშვნა და შედარება//
function select5() {

    /*  ballleft5.style.animation = "cimcimi 0.7s infinite";
  
      if (h <= 470) {
          ballleft5.style.animation = "cimcimires 0.6s infinite";
      }
      if (h <= 335) {
          ballleft5.style.animation = "cimcimires1 0.6s infinite";
      } */

    //ანიმაციის წაშლა შემდეგი ანიმაციის დასამატებლად //
    rmUkanamodzraoba();
    ballleft5.classList.add("animationstr");


    if (h <= 470) {
        ballleft5.classList.add("animationstr1");
    }
    if (h <= 335) {
        ballleft5.classList.add("animationstr2");
    }

    //ხმა გულის//
    soundHear();
    //1.ვარიანტი//
    ballright1.addEventListener("click", toloba1);

    function toloba1() {
        if (leftColor5 === rightColor1) {
            //გაქრობა როცა ტოლია//
            ballleft5.style.animation = "marcxenaModzraoba5 2s forwards";
            ballright1.style.animation = "marjvenaModzraoba1 1.5s forwards";

            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall3();

            //სხვა ბურთის არჩევის დამატება//

            addSelect3();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn5 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 5 equel");
        } else {
            removeEquelBall3();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }
    //2.ვარიანტი//
    ballright2.addEventListener("click", toloba2);

    function toloba2() {
        if (leftColor5 === rightColor2) {
            //გაქრობა როცა ტოლია//
            ballleft5.style.animation = "marcxenaModzraoba5 2s forwards";
            ballright2.style.animation = "marjvenaModzraoba2 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall3();

            //სხვა ბურთის არჩევის დამატება//
            addSelect3();

            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn5 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 5 equel");
        } else {
            removeEquelBall3();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //3.ვარიანტი//
    ballright3.addEventListener("click", toloba3);

    function toloba3() {
        if (leftColor5 === rightColor3) {
            //გაქრობა როცა ტოლია//
            ballleft5.style.animation = "marcxenaModzraoba5 2s forwards";
            ballright3.style.animation = "marjvenaModzraoba3 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall3();

            //სხვა ბურთის არჩევის დამატება//
            addSelect3();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn5 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 5 equel");
        } else {
            removeEquelBall3();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //4.ვარიანტი//
    ballright4.addEventListener("click", toloba4);

    function toloba4() {
        if (leftColor5 === rightColor4) {
            //გაქრობა როცა ტოლია//
            ballleft5.style.animation = "marcxenaModzraoba5 2s forwards";
            ballright4.style.animation = "marjvenaModzraoba4 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall3();
            //სხვა ბურთის არჩევის დამატება//

            addSelect3();
            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn5 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 5 equel");
        } else {
            removeEquelBall3();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    //5.ვარიანტი//
    ballright5.addEventListener("click", toloba5);

    function toloba5() {
        if (leftColor5 === rightColor5) {
            //გაქრობა როცა ტოლია//
            ballleft5.style.animation = "marcxenaModzraoba5 2s forwards";
            ballright5.style.animation = "marjvenaModzraoba5 1.5s forwards";
            //წაშლა დაკლიკების თუ სწორია //
            removeEquelBall3();

            //სხვა ბურთის არჩევის დამატება//
            addSelect3();

            // სისწორე და შემდეგ ტურში გადასვლა //
            correctAn5 = true;
            correct();

            //დროზე დამატება 1წამის//
            timer++;
            console.log("ball 5 equel");
        } else {
            removeEquelBall3();
            gameOver();
        }
        //ხმის გულის გამორთვა//
        soundNotHear();

    }

    count++;
    updateDisplay();

    //დაკლიკების წაშლა თუ სწორია//
    function removeEquelBall3() {
        ballright1.removeEventListener("click", toloba1);
        ballright2.removeEventListener("click", toloba2);
        ballright3.removeEventListener("click", toloba3);
        ballright4.removeEventListener("click", toloba4);
        ballright5.removeEventListener("click", toloba5);
    }
    //დაკლიკების დამატება//
    function addSelect3() {
        ballleft1.addEventListener("click", select1);
        ballleft2.addEventListener("click", select2);
        ballleft3.addEventListener("click", select3);
        ballleft4.addEventListener("click", select4);
    }
}



//მარჯვენა და ამრცხენა ბურთების გამოჩენა შემდეგ ლვლეზე გადასვლისას//
function rmcimcimi() {
    ballleft1.classList.remove("animationstr");
    ballleft2.classList.remove("animationstr");
    ballleft3.classList.remove("animationstr");
    ballleft4.classList.remove("animationstr");
    ballleft5.classList.remove("animationstr");

    //h<=470//
    ballleft1.classList.remove("animationstr1");
    ballleft2.classList.remove("animationstr1");
    ballleft3.classList.remove("animationstr1");
    ballleft4.classList.remove("animationstr1");
    ballleft5.classList.remove("animationstr1");

    //h<=335//
    ballleft1.classList.remove("animationstr2");
    ballleft2.classList.remove("animationstr2");
    ballleft3.classList.remove("animationstr2");
    ballleft4.classList.remove("animationstr2");
    ballleft5.classList.remove("animationstr2");



}


function ballToShow() {
    ballleft1.style.display = "block";
    ballleft2.style.display = "block";
    ballleft3.style.display = "block";
    ballleft4.style.display = "block";
    ballleft5.style.display = "block";

    ballright1.style.display = "block";
    ballright2.style.display = "block";
    ballright3.style.display = "block";
    ballright4.style.display = "block";
    ballright5.style.display = "block";

    //საწყისი მდგომარეობა//
    ballleft1.style.animation = "";
    ballleft2.style.animation = "";
    ballleft3.style.animation = "";
    ballleft4.style.animation = "";
    ballleft5.style.animation = "";
    //საწყისი მდგომარეობა//
    ballright1.style.animation = "";
    ballright2.style.animation = "";
    ballright3.style.animation = "";
    ballright4.style.animation = "";
    ballright5.style.animation = "";

    rmcimcimi();
}

//ბურთების ფერის დასმა backgroundze//
function ballColor() {
    //ფერები რო გამოაჩინოს ბაქგროუნდზე//
    ballleft1.style.backgroundColor = leftColor1;
    ballleft2.style.backgroundColor = leftColor2;
    ballleft3.style.backgroundColor = leftColor3;
    ballleft4.style.backgroundColor = leftColor4;
    ballleft5.style.backgroundColor = leftColor5;
    //ფერები მხოლოდ მარჯვენა ბაქგრაუნდზე//
    ballright1.style.backgroundColor = rightColor1;
    ballright2.style.backgroundColor = rightColor2;
    ballright3.style.backgroundColor = rightColor3;
    ballright4.style.backgroundColor = rightColor4;
    ballright5.style.backgroundColor = rightColor5;
}

//შემდეგ ტურებში გადასვლის ანიმაცია//
function ukanModzraoba() {
    //მარცხენა ბურთების უკან დაბრუნების ანიმაცია//
    /* ballleft1.style.animation = "ukanmarcxena1 1.2s forwards";
     ballleft2.style.animation = "ukanmarcxena2 1.5s forwards";
     ballleft3.style.animation = "ukanmarcxena3 1s forwards";
     ballleft4.style.animation = "ukanmarcxena4 0.8s forwards";
     ballleft5.style.animation = "ukanmarcxena5 0.5s forwards";
     //მარჯვენა ბურთების უკან დაბრუნების ანიმაცია//
     ballright1.style.animation = "ukanmarjvena1 1.2s forwards";
     ballright2.style.animation = "ukanmarjvena2 1.5s forwards";
     ballright3.style.animation = "ukanmarjvena3 1s   forwards";
     ballright4.style.animation = "ukanmarjvena4 0.8s forwards";
     ballright5.style.animation = "ukanmarjvena5 0.5s forwards"; */



    //მარცხენა ბურთების უკან დაბრუნების ანიმაცია//
    ballleft1.classList.add("ukumarcxena1");
    ballleft2.classList.add("ukumarcxena2");
    ballleft3.classList.add("ukumarcxena3");
    ballleft4.classList.add("ukumarcxena4");
    ballleft5.classList.add("ukumarcxena5");

    //მარჯვენა ბურთების უკან დაბრუნების ანიმაცია//
    ballright1.classList.add("ukumarjvena1");
    ballright2.classList.add("ukumarjvena2");
    ballright3.classList.add("ukumarjvena3");
    ballright4.classList.add("ukumarjvena4");
    ballright5.classList.add("ukumarjvena5");
}

function rmUkanamodzraoba() {
    ballleft1.classList.remove("ukumarcxena1");
    ballleft2.classList.remove("ukumarcxena2");
    ballleft3.classList.remove("ukumarcxena3");
    ballleft4.classList.remove("ukumarcxena4");
    ballleft5.classList.remove("ukumarcxena5");
}

//ტურები//
//LVL 1//
function Lvl1() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(255, 99, 71)";
    leftColor2 = "rgb(241, 141, 120)";
    leftColor3 = "yellow";
    leftColor4 = "rgb(252, 153, 132)";
    leftColor5 = "red";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(255, 99, 71)";
    rightColor2 = "rgb(241, 141, 120)";
    rightColor3 = "red";
    rightColor4 = "yellow";
    rightColor5 = "rgb(252, 153, 132)";

    //ბურთების გამოჩენა და მონიშვნა//
    ballColor();
    selecting();
    ballToShow();
    //ტური//
    updateLevel();
    level++;
    //დრო//
    /*
        ballleft1.style.width = "100px";
        ballleft1.style.height = "50px";
        ballleft1.style.borderRadius = 0; */
}
//LVL2//
function Lvl2() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "pink";
    leftColor2 = "black";
    leftColor3 = "blue";
    leftColor4 = "rgb(255, 35, 71)";
    leftColor5 = "rgb(255, 35, 106)";


    //მარჯვენა ბურთები//
    rightColor1 = "black";
    rightColor2 = "rgb(255, 35, 106)";
    rightColor3 = "blue";
    rightColor4 = "pink";
    rightColor5 = "rgb(255, 35, 71)";



    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    ballColor();
    selecting();
    /*pass=false */
    console.log("lvl2");
    //ტური//
    updateLevel();
    level++;

    ukanModzraoba();
};
//LVL3//
function Lvl3() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(131, 99, 167)";
    leftColor2 = "rgb(131, 162, 167)";
    leftColor3 = "rgb(219, 162, 167)";
    leftColor4 = "rgb(82, 35, 106)";
    leftColor5 = "rgb(82, 74, 111)";

    //მარჯვენა ბურთები//
    rightColor1 = "rgb(131, 162, 167)";
    rightColor2 = "rgb(82, 74, 111)";
    rightColor3 = "rgb(82, 35, 106)";
    rightColor4 = "rgb(131, 99, 167)";
    rightColor5 = "rgb(219, 162, 167)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//

    ballToShow();
    selecting();
    ballColor();
    console.log("lvl3");
    //ტური//
    updateLevel();
    level++;

    ukanModzraoba();
}
//Lvl4//
function Lvl4() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(249, 162, 0)";
    leftColor2 = "rgb(129, 99, 71)";
    leftColor3 = "rgb(129, 162, 0)";
    leftColor4 = "rgb(82, 195, 111)";
    leftColor5 = "rgb(131, 195, 111)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(82, 195, 111)";
    rightColor2 = "rgb(131, 195, 111)";
    rightColor3 = "rgb(129, 99, 71)";
    rightColor4 = "rgb(129, 162, 0)";
    rightColor5 = "rgb(249, 162, 0)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    ballColor();
    selecting();
    //ტური//
    updateLevel();
    level++;
    console.log("lvl4");

    ukanModzraoba();

}

//Lvl5//
function Lvl5() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(207, 235, 151)";
    leftColor2 = "rgb(212, 244, 166)";
    leftColor3 = "rgb(106, 236, 228)";
    leftColor4 = "rgb(187, 241, 154)";
    leftColor5 = "rgb(174, 249, 245)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(212, 244, 166)";
    rightColor2 = "rgb(174, 249, 245)";
    rightColor3 = "rgb(187, 241, 154)";
    rightColor4 = "rgb(207, 235, 151)";
    rightColor5 = "rgb(106, 236, 228)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl5");

    ukanModzraoba();

}
//Lvl6//
function Lvl6() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(208, 184, 226)";
    leftColor2 = "rgb(106, 106, 106)";
    leftColor3 = "rgb(121, 95, 142)";
    leftColor4 = "rgb(156, 155, 155)";
    leftColor5 = "rgb(127, 8, 221)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(127, 8, 221)";
    rightColor2 = "rgb(156, 155, 155)";
    rightColor3 = "rgb(121, 95, 142)";
    rightColor4 = "rgb(106, 106, 106)";
    rightColor5 = "rgb(208, 184, 226)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl6");

    ukanModzraoba();
}
//Lvl7//
function Lvl7() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(252, 242, 125)";
    leftColor2 = "rgb(239, 0, 0)";
    leftColor3 = "rgb(252, 219, 70)";
    leftColor4 = "rgb(250, 21, 56)";
    leftColor5 = "rgb(249, 29, 43)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(250, 21, 56)";
    rightColor2 = "rgb(252, 242, 125)";
    rightColor3 = "rgb(249, 29, 43)";
    rightColor4 = "rgb(239, 0, 0)";
    rightColor5 = "rgb(252, 219, 70)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl7");

    ukanModzraoba();
}
//Lvl8//
function Lvl8() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(157,152,152)";
    leftColor2 = "rgb(208,203,203)";
    leftColor3 = "rgb(232,198,191)";
    leftColor4 = "rgb(235,163,147)";
    leftColor5 = "rgb(135,133,133)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(208,203,203)";
    rightColor2 = "rgb(135,133,133)";
    rightColor3 = "rgb(157,152,152)";
    rightColor4 = "rgb(232,198,191)";
    rightColor5 = "rgb(235,163,147)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl8");

    ukanModzraoba();
}

function Lvl9() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(255, 187, 71)";
    leftColor2 = "rgb(255, 212, 71)";
    leftColor3 = "rgb(255, 212, 124)";
    leftColor4 = "rgb(117, 212, 124)";
    leftColor5 = "rgb(208, 212, 124)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(255, 212, 124)";
    rightColor2 = "rgb(255, 212, 71)";
    rightColor3 = "rgb(255, 187, 71)";
    rightColor4 = "rgb(208, 212, 124)";
    rightColor5 = "rgb(117, 212, 124)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl9");

    ukanModzraoba();
}

function Lvl10() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(208, 230, 124)";
    leftColor2 = "rgb(29, 230, 147)";
    leftColor3 = "rgb(49, 230, 147)";
    leftColor4 = "rgb(189, 230, 147)";
    leftColor5 = "rgb(208, 230, 147)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(29, 230, 147)";
    rightColor2 = "rgb(208, 230, 124)";
    rightColor3 = "rgb(208, 230, 147)";
    rightColor4 = "rgb(189, 230, 147)";
    rightColor5 = "rgb(49, 230, 147)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl10");

    ukanModzraoba();
}


function Lvl11() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(29, 158, 147)";
    leftColor2 = "rgb(117, 133, 100)";
    leftColor3 = "rgb(117, 133, 120)";
    leftColor4 = "rgb(117, 133, 147)";
    leftColor5 = "rgb(29, 133, 147)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(117, 133, 100)";
    rightColor2 = "rgb(29, 133, 147)";
    rightColor3 = "rgb(117, 133, 120)";
    rightColor4 = "rgb(29, 158, 147)";
    rightColor5 = "rgb(117, 133, 147)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl11");

    ukanModzraoba();
}


function Lvl12() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(196, 52, 0)";
    leftColor2 = "rgb(162, 52, 0)";
    leftColor3 = "rgb(162, 79, 0)";
    leftColor4 = "rgb(162, 79, 255)";
    leftColor5 = "rgb(162, 79, 30)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(196, 52, 0)";
    rightColor2 = "rgb(162, 52, 0)";
    rightColor3 = "rgb(162, 79, 30)";
    rightColor4 = "rgb(162, 79, 255)";
    rightColor5 = "rgb(162, 79, 0)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl12");

    ukanModzraoba();
}

function Lvl13() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(0, 0, 255)";
    leftColor2 = "rgb(0, 255, 255)";
    leftColor3 = "rgb(0, 106, 44)";
    leftColor4 = "rgb(0, 106, 62)";
    leftColor5 = "rgb(0, 90, 84)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(0, 0, 255)";
    rightColor2 = "rgb(0, 255, 255)";
    rightColor3 = "rgb(0, 90, 84)";
    rightColor4 = "rgb(0, 106, 62)";
    rightColor5 = "rgb(0, 106, 44)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl13");

    ukanModzraoba();
}

function Lvl14() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(182, 255, 78)";
    leftColor2 = "rgb(148, 203, 78)";
    leftColor3 = "rgb(148, 201, 84)";
    leftColor4 = "rgb(148, 255, 78)";
    leftColor5 = "rgb(148, 201, 143)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(148, 255, 78)";
    rightColor2 = "rgb(148, 201, 84)";
    rightColor3 = "rgb(148, 201, 143)";
    rightColor4 = "rgb(148, 203, 78)";
    rightColor5 = "rgb(182, 255, 78)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl14");

    ukanModzraoba();
}

function Lvl15() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(148, 201, 158)";
    leftColor2 = "rgb(58, 88, 55)";
    leftColor3 = "rgb(148, 213, 158)";
    leftColor4 = "rgb(58, 88, 45)";
    leftColor5 = "rgb(148, 201, 165)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(58, 88, 55)";
    rightColor2 = "rgb(148, 201, 165)";
    rightColor3 = "rgb(148, 201, 158)";
    rightColor4 = "rgb(58, 88, 45)";
    rightColor5 = "rgb(148, 213, 158)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl15");

    ukanModzraoba();
}

function Lvl16() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(58, 50, 45)";
    leftColor2 = "rgb(58, 39, 45)";
    leftColor3 = "rgb(58, 30, 45)";
    leftColor4 = "rgb(223, 30, 88)";
    leftColor5 = "rgb(58, 30, 88)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(58, 39, 45)";
    rightColor2 = "rgb(58, 50, 45)";
    rightColor3 = "rgb(58, 30, 45)";
    rightColor4 = "rgb(223, 30, 88)";
    rightColor5 = "rgb(58, 30, 88)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl16");

    ukanModzraoba();
}

function Lvl17() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(223, 30, 88)";
    leftColor2 = "rgb(156, 59, 99)";
    leftColor3 = "rgb(223, 59, 99)";
    leftColor4 = "rgb(130, 59, 99)";
    leftColor5 = "rgb(223, 30, 99)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(130, 59, 99)";
    rightColor2 = "rgb(223, 59, 99)";
    rightColor3 = "rgb(223, 30, 99)";
    rightColor4 = "rgb(223, 30, 88)";
    rightColor5 = "rgb(156, 59, 99)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl17");

    ukanModzraoba();
}

function Lvl18() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(255, 255, 255)";
    leftColor2 = "rgb(255, 255, 224)";
    leftColor3 = "rgb(232, 242, 224)";
    leftColor4 = "rgb(130, 242, 224)";
    leftColor5 = "rgb(255, 242, 224)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(232, 242, 224)";
    rightColor2 = "rgb(255, 242, 224)";
    rightColor3 = "rgb(255, 255, 255)";
    rightColor4 = "rgb(130, 242, 224)";
    rightColor5 = "rgb(255, 255, 224)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl18");

    ukanModzraoba();
}

function Lvl19() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(255, 255, 73)";
    leftColor2 = "rgb(255, 77, 73)";
    leftColor3 = "rgb(25, 75, 73)";
    leftColor4 = "rgb(255, 83, 73)";
    leftColor5 = "rgb(255, 83, 224)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(25, 75, 73)";
    rightColor2 = "rgb(255, 83, 224)";
    rightColor3 = "rgb(255, 83, 73)";
    rightColor4 = "rgb(255, 255, 73)";
    rightColor5 = "rgb(255, 77, 73)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl19");

    ukanModzraoba();
}

function Lvl20() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(22, 21, 158)";
    leftColor2 = "rgb(136, 136, 136)";
    leftColor3 = "rgb(148, 148, 148)";
    leftColor4 = "rgb(156, 156, 156)";
    leftColor5 = "rgb(32, 31, 158)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(22, 21, 158)";
    rightColor2 = "rgb(156, 156, 156)";
    rightColor3 = "rgb(32, 31, 158)";
    rightColor4 = "rgb(136, 136, 136)";
    rightColor5 = "rgb(148, 148, 148)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl20");

    ukanModzraoba();
}

function Lvl21() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(255, 153, 71)";
    leftColor2 = "rgb(255, 165, 71)";
    leftColor3 = "rgb(232, 165, 71)";
    leftColor4 = "rgb(232, 165, 89)";
    leftColor5 = "rgb(211, 174, 89)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(255, 165, 71)";
    rightColor2 = "rgb(255, 153, 71)";
    rightColor3 = "rgb(232, 165, 89)";
    rightColor4 = "rgb(211, 174, 89)";
    rightColor5 = "rgb(232, 165, 71)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl21");

    ukanModzraoba();
}

function Lvl22() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(255, 0, 0)";
    leftColor2 = "rgb(240, 20, 0)";
    leftColor3 = "rgb(240, 80, 13)";
    leftColor4 = "rgb(222, 20, 30)";
    leftColor5 = "rgb(240, 40, 30)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(255, 0, 0)";
    rightColor2 = "rgb(240, 20, 0)";
    rightColor3 = "rgb(222, 20, 30)";
    rightColor4 = "rgb(240, 40, 30)";
    rightColor5 = "rgb(240, 80, 13)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl22");

    ukanModzraoba();
}

function Lvl23() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(131, 20, 30)";
    leftColor2 = "rgb(136, 136, 136)";
    leftColor3 = "rgb(131, 24, 41)";
    leftColor4 = "rgb(61, 33, 41)";
    leftColor5 = "rgb(61, 24, 41)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(61, 24, 41)";
    rightColor2 = "rgb(61, 33, 41)";
    rightColor3 = "rgb(131, 24, 41)";
    rightColor4 = "rgb(131, 20, 30)";
    rightColor5 = "rgb(136, 136, 136)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl23");

    ukanModzraoba();
}

function Lvl24() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(22, 21, 158)";
    leftColor2 = "rgb(136, 136, 136)";
    leftColor3 = "rgb(148, 148, 148)";
    leftColor4 = "rgb(156, 156, 156)";
    leftColor5 = "rgb(32, 31, 158)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(22, 21, 158)";
    rightColor2 = "rgb(156, 156, 156)";
    rightColor3 = "rgb(32, 31, 158)";
    rightColor4 = "rgb(136, 136, 136)";
    rightColor5 = "rgb(148, 148, 148)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl24");

    ukanModzraoba();
}

function Lvl25() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(154, 162, 59)";
    leftColor2 = "rgb(140, 162, 59)";
    leftColor3 = "rgb(0, 175, 140)";
    leftColor4 = "rgb(0, 175, 59)";
    leftColor5 = "rgb(143, 175, 59)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(0, 175, 59)";
    rightColor2 = "rgb(143, 175, 59)";
    rightColor3 = "rgb(154, 162, 59)";
    rightColor4 = "rgb(0, 175, 140)";
    rightColor5 = "rgb(140, 162, 59)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl25");

    ukanModzraoba();
}

function Lvl26() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(0, 195, 174)";
    leftColor2 = "rgb(10, 141, 174)";
    leftColor3 = "rgb(10, 141, 160)";
    leftColor4 = "rgb(10, 195, 174)";
    leftColor5 = "rgb(10, 141, 255)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(10, 141, 160)";
    rightColor2 = "rgb(10, 141, 255)";
    rightColor3 = "rgb(0, 195, 174)";
    rightColor4 = "rgb(10, 195, 174)";
    rightColor5 = "rgb(10, 141, 174)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl26");

    ukanModzraoba();
}

function Lvl27() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(10, 182, 255)";
    leftColor2 = "rgb(10, 182, 235)";
    leftColor3 = "rgb(25, 182, 245)";
    leftColor4 = "rgb(25, 182, 228)";
    leftColor5 = "rgb(255, 99, 71)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(25, 182, 245)";
    rightColor2 = "rgb(25, 182, 228)";
    rightColor3 = "rgb(10, 182, 255)";
    rightColor4 = "rgb(10, 182, 235)";
    rightColor5 = "rgb(255, 99, 71)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl27");

    ukanModzraoba();
}


function Lvl28() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(255, 99, 71)";
    leftColor2 = "rgb(15, 255, 70)";
    leftColor3 = "rgb(15, 0, 70)";
    leftColor4 = "rgb(15, 0, 228)";
    leftColor5 = "rgb(15, 255, 228)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(15, 0, 228)";
    rightColor2 = "rgb(15, 255, 228)";
    rightColor3 = "rgb(255, 99, 71)";
    rightColor4 = "rgb(15, 255, 70)";
    rightColor5 = "rgb(15, 0, 70)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl28");

    ukanModzraoba();
}

function Lvl29() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(233, 15, 70)";
    leftColor2 = "rgb(233, 15, 47)";
    leftColor3 = "rgb(220, 51, 47)";
    leftColor4 = "rgb(233, 51, 47)";
    leftColor5 = "rgb(233, 0, 70)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(233, 15, 70)";
    rightColor2 = "rgb(233, 0, 70)";
    rightColor3 = "rgb(233, 51, 47)";
    rightColor4 = "rgb(233, 15, 47)";
    rightColor5 = "rgb(220, 51, 47)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl29");

    ukanModzraoba();
}

function Lvl30() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(161, 92, 16)";
    leftColor2 = "rgb(150, 101, 16)";
    leftColor3 = "rgb(150, 111, 16)";
    leftColor4 = "rgb(150, 111, 131)";
    leftColor5 = "rgb(161, 101, 16)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(150, 111, 131)";
    rightColor2 = "rgb(150, 111, 16)";
    rightColor3 = "rgb(150, 101, 16)";
    rightColor4 = "rgb(161, 92, 16)";
    rightColor5 = "rgb(161, 101, 16)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl30");

    ukanModzraoba();
}

function Lvl31() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(97, 99, 71)";
    leftColor2 = "rgb(138, 110, 85)";
    leftColor3 = "rgb(138, 110, 70)";
    leftColor4 = "rgb(97, 110, 71)";
    leftColor5 = "rgb(97, 110, 85)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(138, 110, 70)";
    rightColor2 = "rgb(97, 110, 85)";
    rightColor3 = "rgb(138, 110, 85)";
    rightColor4 = "rgb(97, 110, 71)";
    rightColor5 = "rgb(97, 99, 71)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl31");

    ukanModzraoba();
}

function Lvl32() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(244, 26, 255)";
    leftColor2 = "rgb(224, 26, 70)";
    leftColor3 = "rgb(224, 46, 255)";
    leftColor4 = "rgb(224, 26, 100)";
    leftColor5 = "rgb(224, 26, 255)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(224, 26, 100)";
    rightColor2 = "rgb(224, 46, 255)";
    rightColor3 = "rgb(244, 26, 255)";
    rightColor4 = "rgb(224, 26, 255)";
    rightColor5 = "rgb(224, 26, 70)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl32");

    ukanModzraoba();
}

function Lvl33() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(147, 0, 113)";
    leftColor2 = "rgb(147, 0, 133)";
    leftColor3 = "rgb(127, 0, 113)";
    leftColor4 = "rgb(0, 0, 113)";
    leftColor5 = "rgb(0, 0, 143)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(147, 0, 113)";
    rightColor2 = "rgb(127, 0, 113)";
    rightColor3 = "rgb(0, 0, 143)";
    rightColor4 = "rgb(0, 0, 113)";
    rightColor5 = "rgb(147, 0, 133)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl33");

    ukanModzraoba();
}

function Lvl34() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(100, 137, 174)";
    leftColor2 = "rgb(100, 137, 154)";
    leftColor3 = "rgb(100, 57, 174)";
    leftColor4 = "rgb(80, 137, 174)";
    leftColor5 = "rgb(100, 37, 174)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(100, 137, 154)";
    rightColor2 = "rgb(100, 57, 174)";
    rightColor3 = "rgb(80, 137, 174)";
    rightColor4 = "rgb(100, 137, 174)";
    rightColor5 = "rgb(100, 37, 174)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl34");

    ukanModzraoba();
}

function Lvl35() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(255, 22, 76)";
    leftColor2 = "rgb(255, 42, 56)";
    leftColor3 = "rgb(255, 0, 0)";
    leftColor4 = "rgb(240, 52, 56)";
    leftColor5 = "rgb(255, 32, 66)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(240, 52, 56)";
    rightColor2 = "rgb(255, 0, 0)";
    rightColor3 = "rgb(255, 32, 66)";
    rightColor4 = "rgb(255, 22, 76)";
    rightColor5 = "rgb(255, 42, 56)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl35");

    ukanModzraoba();
}

function Lvl36() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(73, 128, 56)";
    leftColor2 = "rgb(73, 138, 65)";
    leftColor3 = "rgb(150, 111, 16)";
    leftColor4 = "rgb(253, 223, 0)";
    leftColor5 = "rgb(253, 203, 0)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(150, 111, 16)";
    rightColor2 = "rgb(253, 203, 0)";
    rightColor3 = "rgb(73, 128, 56)";
    rightColor4 = "rgb(253, 223, 0)";
    rightColor5 = "rgb(73, 138, 65)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl36");

    ukanModzraoba();
}

function Lvl37() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(253, 184, 0)";
    leftColor2 = "rgb(233, 184, 0)";
    leftColor3 = "rgb(253, 164, 0)";
    leftColor4 = "rgb(283, 200, 0)";
    leftColor5 = "rgb(243, 174, 10)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(253, 164, 0)";
    rightColor2 = "rgb(243, 174, 10)";
    rightColor3 = "rgb(283, 200, 0)";
    rightColor4 = "rgb(253, 184, 0)";
    rightColor5 = "rgb(233, 184, 0)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl37");

    ukanModzraoba();
}

function Lvl38() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(253, 0, 0)";
    leftColor2 = "rgb(255, 20, 0)";
    leftColor3 = "rgb(253, 20, 40)";
    leftColor4 = "rgb(233, 10, 10)";
    leftColor5 = "rgb(253, 40, 50)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(255, 20, 0)";
    rightColor2 = "rgb(233, 10, 10)";
    rightColor3 = "rgb(253, 0, 0)";
    rightColor4 = "rgb(253, 40, 50)";
    rightColor5 = "rgb(253, 20, 40)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl38");

    ukanModzraoba();
}

function Lvl39() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(253, 255, 0)";
    leftColor2 = "rgb(70, 173, 235)";
    leftColor3 = "rgb(90, 183, 235)";
    leftColor4 = "rgb(70, 163, 225)";
    leftColor5 = "rgb(253, 255, 40)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(70, 173, 235)";
    rightColor2 = "rgb(253, 255, 40)";
    rightColor3 = "rgb(253, 255, 0)";
    rightColor4 = "rgb(90, 183, 235)";
    rightColor5 = "rgb(70, 163, 225)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl39");

    ukanModzraoba();
}

function Lvl40() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(0, 20, 255)";
    leftColor2 = "rgb(30, 0, 255)";
    leftColor3 = "rgb(0, 40, 255)";
    leftColor4 = "rgb(35, 10, 255)";
    leftColor5 = "rgb(0, 0, 255)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(35, 10, 255)";
    rightColor2 = "rgb(0, 40, 255)";
    rightColor3 = "rgb(0, 20, 255)";
    rightColor4 = "rgb(0, 0, 255)";
    rightColor5 = "rgb(30, 0, 255)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl40");

    ukanModzraoba();
}

function Lvl41() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgba(255, 183, 0, 1)";
    leftColor2 = "rgba(250, 180, 0, 0.7)";
    leftColor3 = "rgba(255, 173, 0, 0.8)";
    leftColor4 = "rgba(250, 180, 0, 0.9)";
    leftColor5 = "rgba(245, 193, 0, 1)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgba(255, 183, 0, 1)";
    rightColor2 = "rgba(250, 180, 0, 0.9)";
    rightColor3 = "rgba(250, 180, 0, 0.7)";
    rightColor4 = "rgba(255, 173, 0, 0.8)";
    rightColor5 = "rgba(245, 193, 0, 1)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl41");

    ukanModzraoba();
}

function Lvl42() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(0, 99, 71)";
    leftColor2 = "rgb(0, 105, 61)";
    leftColor3 = "rgb(0, 102, 75)";
    leftColor4 = "rgb(10, 95, 61)";
    leftColor5 = "rgb(20, 100, 78)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(10, 95, 61)";
    rightColor2 = "rgb(20, 100, 78)";
    rightColor3 = "rgb(0, 105, 61)";
    rightColor4 = "rgb(0, 99, 71)";
    rightColor5 = "rgb(0, 102, 75)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl43");

    ukanModzraoba();
}


function Lvl43() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(0, 255, 36)";
    leftColor2 = "rgb(10, 255, 36)";
    leftColor3 = "rgb(0, 235, 32)";
    leftColor4 = "rgb(0, 245, 40)";
    leftColor5 = "rgb(10, 250, 36)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(10, 255, 36)";
    rightColor2 = "rgb(10, 250, 36)";
    rightColor3 = "rgb(0, 255, 36)";
    rightColor4 = "rgb(0, 245, 40)";
    rightColor5 = "rgb(0, 235, 32)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl43");

    ukanModzraoba();
}

function Lvl44() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(10, 0, 10)";
    leftColor2 = "rgb(0, 10, 0)";
    leftColor3 = "rgb(20, 0, 10)";
    leftColor4 = "rgb(0, 10, 10)";
    leftColor5 = "rgb(25, 0, 10)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(0, 10, 10)";
    rightColor2 = "rgb(20, 0, 10)";
    rightColor3 = "rgb(10, 0, 10)";
    rightColor4 = "rgb(25, 0, 10)";
    rightColor5 = "rgb(0, 10, 0)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl45");

    ukanModzraoba();
}

function Lvl45() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(240, 240, 230)";
    leftColor2 = "rgb(245, 245, 255)";
    leftColor3 = "rgb(235, 230, 235)";
    leftColor4 = "rgb(255, 255, 255)";
    leftColor5 = "rgb(245, 235, 225)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(245, 245, 255)";
    rightColor2 = "rgb(255, 255, 255)";
    rightColor3 = "rgb(245, 235, 225)";
    rightColor4 = "rgb(240, 240, 230)";
    rightColor5 = "rgb(235, 230, 235)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl45");

    ukanModzraoba();
}

function Lvl46() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgba(117, 248, 59, 1)";
    leftColor2 = "rgba(120, 245, 65, 0.8)";
    leftColor3 = "rgba(125, 248, 59, 0.9)";
    leftColor4 = "rgba(122, 255, 50, 1)";
    leftColor5 = "rgba(120, 250, 65, 0.9)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgba(122, 255, 50, 1)";
    rightColor2 = "rgba(120, 245, 65, 0.8)";
    rightColor3 = "rgba(120, 250, 65, 0.9)";
    rightColor4 = "rgba(117, 248, 59, 1)";
    rightColor5 = "rgba(125, 248, 59, 0.9)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl46");

    ukanModzraoba();
}

function Lvl47() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(185, 92, 0)";
    leftColor2 = "rgb(205, 95, 0)";
    leftColor3 = "rgb(210, 100, 0)";
    leftColor4 = "rgb(200, 92, 10)";
    leftColor5 = "rgb(190, 90, 10)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(200, 92, 10)";
    rightColor2 = "rgb(210, 100, 0)";
    rightColor3 = "rgb(190, 90, 10)";
    rightColor4 = "rgb(185, 92, 0)";
    rightColor5 = "rgb(205, 95, 0)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl47");

    ukanModzraoba();
}

function Lvl48() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgb(255, 255, 0)";
    leftColor2 = "rgb(245, 255, 10)";
    leftColor3 = "rgb(250, 240, 0)";
    leftColor4 = "rgb(245, 255, 20)";
    leftColor5 = "rgb(255, 240, 5)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgb(255, 255, 0)";
    rightColor2 = "rgb(245, 255, 20)";
    rightColor3 = "rgb(245, 255, 10)";
    rightColor4 = "rgb(250, 240, 0)";
    rightColor5 = "rgb(255, 240, 5)";

    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl48");

    ukanModzraoba();
}

function Lvl49() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgba(117, 131, 124, 1)";
    leftColor2 = "rgba(127, 125, 134, 1)";
    leftColor3 = "rgba(117, 135, 120, 0.8)";
    leftColor4 = "rgba(120, 130, 130, 1)";
    leftColor5 = "rgba(117, 133, 125, 0.9)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgba(117, 135, 120, 0.8)";
    rightColor2 = "rgba(117, 131, 124, 1)";
    rightColor3 = "rgba(120, 130, 130, 1)";
    rightColor4 = "rgba(127, 125, 134, 1)";
    rightColor5 = "rgba(117, 133, 125, 0.9)";
    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    selecting();
    ballColor();

    //ტური//
    updateLevel();
    level++;
    console.log("lvl49");
    ukanModzraoba();
}

function Lvl50() {
    //მარცხენა და მარჯვენა ბურთების ფერები//
    //მარცხენა//
    leftColor1 = "rgba(255, 99, 71, 1)";
    leftColor2 = "rgba(250, 99, 75, 1)";
    leftColor3 = "rgba(255, 105, 72, 1)";
    leftColor4 = "rgba(250, 100, 71, 1)";
    leftColor5 = "rgba(255, 99, 81, 1)";


    //მარჯვენა ბურთები//
    rightColor1 = "rgba(255, 99, 71, 1)";
    rightColor2 = "rgba(250, 99, 75, 1)";
    rightColor3 = "rgba(255, 105, 72, 1)";
    rightColor4 = "rgba(250, 100, 71, 1)";
    rightColor5 = "rgba(255, 99, 81, 1)";
    //ბურთების გაქრობის შემდეგ გამოჩენა და ბაქგროუნდის ფერები//
    ballToShow();
    ballColor();
    selecting();
    //ტური//
    updateLevel();
    level++;
    console.log("lvl50");
    ukanModzraoba();
}

//ტურის შენახვა და გაგრძელება//
function updateLevel() {
    levelText.innerText = "Level : " + level;
    if (level > localStorage.getItem("LVL")) {
        localStorage.setItem("LVL", JSON.stringify(level));
    }
}


//თამაშის დაწყება და მენიუ //
var meniuBts = document.getElementById("meniu");
var startBtn = document.getElementById("play");
var helpBtn = document.getElementById("help");
var exitBtn = document.getElementById("exit");
var startPlayBtn = document.getElementById("startPlay");

//ტურების არჩევა //
var levelBtns = document.getElementById("lvl-meniu");
var lvl1btn = document.getElementById("1lvl");
var lvl5btn = document.getElementById("5lvl");
var lvl10btn = document.getElementById("10lvl");
var lvl20btn = document.getElementById("20lvl");
var lvl30btn = document.getElementById("30lvl");
var lvl40btn = document.getElementById("40lvl");

//lvl-menu დიზაინი//
function lvlMenuDesign() {
    //ლეველების სტაილი//
    lvl5btn.style.textDecoration = "line-through";
    lvl10btn.style.textDecoration = "line-through";
    lvl20btn.style.textDecoration = "line-through";
    lvl30btn.style.textDecoration = "line-through";
    lvl40btn.style.textDecoration = "line-through";
    //ფერი//
    lvl5btn.style.color = "red";
    lvl10btn.style.color = "red";
    lvl20btn.style.color = "red";
    lvl30btn.style.color = "red";
    lvl40btn.style.color = "red";
    //ოპასითი//
    lvl5btn.style.opacity = 0.5;
    lvl10btn.style.opacity = 0.5;
    lvl20btn.style.opacity = 0.5;
    lvl30btn.style.opacity = 0.5;
    lvl40btn.style.opacity = 0.5;
}

startBtn.addEventListener("click", startGame);
leftBalls = document.getElementById("left");
rightBalls = document.getElementById("right");


//თითქმის დაწყების ფუნქციები ტურების  მიხედვით/
function level1Start() {
    ukanModzraoba();
    Lvl1();
    levelBtns.style.display = "none";
    backBtn.style.display = "none";
    level = 1;
    count = 0;
    updateLevel();
    level++;
    startPlayBtn.style.display = "block";
    //დაკლიკების ხმა//
    btsHear();

}

//მეხუთე ტური//
function level5Start() {
    ukanModzraoba();
    Lvl5();
    levelBtns.style.display = "none";
    backBtn.style.display = "none";
    //ტურიდან გასაგრძელებლად//
    level = 5;
    count = 20;
    updateLevel();
    level++;
    //დაწყება//
    startPlayBtn.style.display = "block";
    //დაკლიკების ხმა//
    btsHear();
}

//მეათე ტური//
function level10start() {
    ukanModzraoba();
    Lvl10();
    levelBtns.style.display = "none";
    backBtn.style.display = "none";
    //ტურიდან გასაგრძელებლად//
    level = 10;
    count = 45;
    updateLevel();
    level++;

    //დაწყება//
    startPlayBtn.style.display = "block";
    //დაკლიკების ხმა//
    btsHear();
}

//მეოცე ტური//
function level20Start() {
    ukanModzraoba();
    Lvl20();
    levelBtns.style.display = "none";
    backBtn.style.display = "none";
    //ტურიდან გასაგრძელებლად//
    level = 20;
    count = 95;
    updateLevel();
    level++;
    //დაწყება//
    startPlayBtn.style.display = "block";
    //დაკლიკების ხმა//
    btsHear();
}

//30 ტური//
function level30Start() {
    ukanModzraoba();
    Lvl30();
    levelBtns.style.display = "none";
    backBtn.style.display = "none";

    //ტურიდან გასაგრძელებლად//
    level = 30;
    count = 145;
    updateLevel();
    level++;
    //დაწყება//
    startPlayBtn.style.display = "block";
    //დაკლიკების ხმა//
    btsHear();
}
//40 ტური//
function level40Start() {
    ukanModzraoba();
    Lvl40();
    levelBtns.style.display = "none";
    backBtn.style.display = "none";

    //ტურიდან გასაგრძელებლად//
    level = 40;
    count = 195;
    updateLevel();
    level++;
    //დაწყება//
    startPlayBtn.style.display = "block";
    //დაკლიკების ხმა//
    btsHear();
}


//თამაშის დაწყება//
function startGame() {
    //ტური//

    lvl1btn.style.color = "green";
    meniuBts.style.animation = "meniuback 0.2s forwards";
    levelBtns.style.animation = "opasityAnime 0.3s forwards";

    endGameScreen.style.display = "none";

    // endGameScreen.style.display = "none";
    //ანიმაციიისთვის play-დან level-menu-ზე გადასასვლელად//
    setTimeout(() => {
        meniuBts.style.display = "none";
        //უკან გამოსვლა//
        backBtn.style.display = "block";
    }, 200);

    setTimeout(() => {
        levelBtns.style.display = "block";
    }, 300);

    lvlMenuDesign();

    //დაკლიკების ხმა//
    btsHear();
    backBtn.addEventListener("click", () => {
        meniuBts.style.display = "block";
        levelBtns.style.display = "none";
        backBtn.style.display = "none";
        meniuBts.style.animation = "";
        insideGamePlay.style.display = "none";
        btsHear();
    });

    //პირველი ტური //
    lvl1btn.addEventListener("click", level1Start);
    //ესენი შესაცვლელია ტურების მიხედვით//
    //თამაშის 5 ტურიდან გაგრძელება //
    if (localStorage.getItem("LVL") > 5) {
        //ლვლ გახსნა//
        lvl5btn.style.textDecoration = "none";
        lvl5btn.style.color = "green";
        lvl5btn.style.opacity = 1;
        lvl5btn.addEventListener("click", level5Start);
    }

    //თამაშის 10 ტურიდან გაგრძელება //
    if (localStorage.getItem("LVL") > 10) {
        //ლვლ გახსნა//
        lvl10btn.style.textDecoration = "none";
        lvl10btn.style.color = "green";
        lvl10btn.style.opacity = 1;
        lvl10btn.addEventListener("click", level10start);
    }

    //თამაშის 20 ტურიდან გაგრძელება //
    if (localStorage.getItem("LVL") > 20) {
        //ლვლ გახსნა//
        lvl20btn.style.textDecoration = "none";
        lvl20btn.style.opacity = 1;
        lvl20btn.style.color = "green";
        lvl20btn.addEventListener("click", level20Start);
    }

    //თამაშის 30 ტურიდან გაგრძელება//
    if (localStorage.getItem("LVL") > 30) {
        //ლვლ გახსნა//
        lvl30btn.style.textDecoration = "none";
        lvl30btn.style.opacity = 1;
        lvl30btn.style.color = "green";
        lvl30btn.addEventListener("click", level30Start);
    }
    //თამაშის 40 ტურიდან გაგრძელება//
    if (localStorage.getItem("LVL") > 40) {
        //ლვლ გახსნა//
        lvl40btn.style.textDecoration = "none";
        lvl40btn.style.opacity = 1;
        lvl40btn.style.color = "green";
        lvl40btn.addEventListener("click", level40Start);
    }
    //თამაშის დაწყება ბოლოს და ბოლოს//
    startPlayBtn.addEventListener("click", startPlayGame);
}

function startPlayGame() {
    //საცდელად //
    timer = 26;
    sun.style.display = "block";
    insideGamePlay.style.display = "block";
    // interval = setInterval(timing, 1000);
    //ბურთების გამოჩენა//
    leftBalls.style.display = "block";
    rightBalls.style.display = "block";
    levelText.style.display = "block";
    timerText.style.display = "block";
    rainbow.style.display = "block";
    //გაქრობა//
    startPlayBtn.style.display = "none";
    //ხმის იქონის გაქრობა//
    soundOn.style.display = "none";
    soundOff.style.display = "none";
    //დაკლიკების ხმა//
    btsHear();
    selecting();
    leftBalls.style.display = "block";
    rightBalls.style.display = "block";
    intervalTime();

}

//მუშაობს responsiv -ისთვის გამომადგება //
//start//
startBtn.style.left = w / 3 + "px";
startBtn.style.top = h / 3 + "px";

levelBtns.style.top = h - (h - 45) + "px"; /*აქ 20 იყო ხმის პონტში */



//დახმარება//
helpBtn.style.left = w / 3 + "px";
helpBtn.style.top = h / 2 + "px";
var helpText = document.getElementById("helping");
var sameText = document.getElementById("same");
var chooseLeftAnime = document.getElementById("chooseLeft");
var chooseRightAnime = document.getElementById("chooseRight");
var backBtn = document.getElementById("back");


helpBtn.addEventListener("click", help);

function help() {

    meniuBts.style.display = "none";
    helpText.style.display = "block";
    sameText.style.display = "block";
    backBtn.style.display = "block";
    //მარცხენა ანიმაცია//
    chooseLeftAnime.style.display = "block";
    chooseLeftAnime.style.animation = "choose1 5s infinite";
    //მარჯვენა ანიმაცია//
    chooseRightAnime.style.display = "block";
    chooseRightAnime.style.animation = "choose1 5s infinite ";
    //დაკლიკების ხმა//
    btsHear();
    //უკან დაბრუნების ღილაკი//
    backBtn.addEventListener("click", () => {
        //ტექსი და ღილაკები//
        meniuBts.style.display = "block";
        helpText.style.display = "none";
        sameText.style.display = "none";
        backBtn.style.display = "none";

        insideGamePlay.style.display = "none";
        //ანიმაციების მოშორება და ბექგრაუნდის ფერების//
        chooseRightAnime.style.animation = "";
        chooseLeftAnime.style.animation = "";
        chooseRightAnime.style.display = "none";
        chooseLeftAnime.style.display = "none";
        ballleft2.style.backgroundColor = "";
        ballright4.style.backgroundColor = "";
        ballleft2.style.animation = "";
        ballright4.style.animation = "";
        //დაკლიკების ხმა//
        btsHear();
    });

    //ბურთის ფერები//
    //მარცხენა//
    //ballleft2.style.animation = "cimcimi 0.7s infinite";
    ballleft2.style.backgroundColor = "yellow";
    ballleft2.style.animation = "marcxenaModzraoba2 2s infinite";
    //მარჯვენა//
    ballright4.style.animation = "marjvenaModzraoba4 2s infinite";
    ballright4.style.backgroundColor = "yellow";

}

//exit and quit// 
exitBtn.style.left = w / 3 + "px";
exitBtn.style.top = h / 1.5 + "px";

exitBtn.addEventListener("click", () => {
    //დაკლიკების ხმა//
    btsHear();

    navigator.app.exitApp();
});



//თამაშის დასასრული //
var endGameScreen = document.getElementById("endScreen");
var restart = document.getElementById("restart");

//adText.style.top = h / 7 + "px";

var rewardVideo = false;



//დაჯილოდების ფუნქციის გამეორება ყოველ 2 წუთში//
function turnOffReward() {
    if (isRewardedVideo == false) {
        rewardBtn.innerText = "lock";
        rewardBtn.style.opacity = 0.6;
        adText.innerText = "not avaliable";
        rewardBtn.style.backgroundColor = "black";
        rewardBtn.style.color = "black";
        //აქ იყო //
    }
}
//თავიდან lock-აჩვენოს//
rewardBtn.innerText = "lock";
rewardBtn.style.opacity = 0.6;
adText.innerText = "not avaliable";
rewardBtn.style.backgroundColor = "black";
//ტაიმერის დასაყენებლად რეკლამა რო გათიშოს//
let rwdTimer = 15;

function rewardTimer() {
    rwdTimer = rwdTimer - 1;
    if (rwdTimer == 0) {
        rwdTimer = 15;
        //ეს //
        endGameScreen.style.display = "none";
        rmcimcimi();
        leftBalls.style.display = "block";
        rightBalls.style.display = "block";
        levelText.style.display = "block";
        timerText.style.display = "block";
        rainbow.style.display = "block";
        //თამაშის გაგრძელება//
        // intervalTime();
        clearInterval(rwdinterval);
        selecting();
    } else if (rwdTimer != 0) {
        rewardBtn.innerText = "lock";
        adText.innerText = "not avaliable";
        rewardBtn.style.opacity = 0.6;
        rewardBtn.style.backgroundColor = "black";
    }

    isRewardedVideo = false;
    rewardBtn.removeEventListener("click", rwdVideo);
}


function rwdVideo() {
    admob.showRewardedAd();
    rewardVideo = true;
    //სხვა ყველაფრის გაქრობა//
    if (rewardVideo == true) {
        //რეკლამის ტაიმერის გაშვება//
        rwdinterval = setInterval(rewardTimer, 1000);
        //აქედან//
        rewardTimer();
        //იქიდან გაგრძელება სადაც წააგე და თუ ნაკლებია 10იდან /
        timer = timer;
        if (timer < 15) {
            timer = 15;
        }
        if (timer > 15) {
            timer = timer + 5;
        }

    }
    //ეს უნდა წავშალო//
    turnOffReward();
    rewardBtn.removeEventListener("click", rwdVideo);
}

//დარესტარტება//
function restartGame() {
    //დაკლიკების ხმა//
    timer = 21;
    btsHear();
    //აქ უნდა შევცვალო რაღაცეები//
    soundReadyToGo();
    endGameScreen.style.display = "none";
    levelBtns.style.display = "block";
    startPlayBtn.style.display = "none";
    //ხმის გამორთვა ჩართვა//

    backBtn.style.display = "block";
    //პირველი ტური //
    lvl1btn.addEventListener("click", level1Start);
    //ესენი შესაცვლელია ტურების მიხედვით//
    //თამაშის 5 ტურიდან გაგრძელება //
    if (localStorage.getItem("LVL") > 5) {
        //ლვლ გახსნა//
        lvl5btn.style.textDecoration = "none";
        lvl5btn.style.color = "green";
        lvl5btn.style.opacity = 1;
        lvl5btn.addEventListener("click", level5Start);
    }

    //თამაშის 10 ტურიდან გაგრძელება //
    if (localStorage.getItem("LVL") > 10) {
        //ლვლ გახსნა//
        lvl10btn.style.textDecoration = "none";
        lvl10btn.style.color = "green";
        lvl10btn.style.opacity = 1;
        lvl10btn.addEventListener("click", level10start);
    }

    //თამაშის 20 ტურიდან გაგრძელება //
    if (localStorage.getItem("LVL") > 20) {
        //ლვლ გახსნა//
        lvl20btn.style.textDecoration = "none";
        lvl20btn.style.opacity = 1;
        lvl20btn.style.color = "green";
        lvl20btn.addEventListener("click", level20Start);
    }

    //თამაშის 30 ტურიდან გაგრძელება//
    if (localStorage.getItem("LVL") > 30) {
        //ლვლ გახსნა//
        lvl30btn.style.textDecoration = "none";
        lvl30btn.style.opacity = 1;
        lvl30btn.style.color = "green";
        lvl30btn.addEventListener("click", level30Start);
    }
    //თამაშის 40 ტურიდან გაგრძელება//
    if (localStorage.getItem("LVL") > 40) {
        //ლვლ გახსნა//
        lvl40btn.style.textDecoration = "none";
        lvl40btn.style.opacity = 1;
        lvl40btn.style.color = "green";
        lvl40btn.addEventListener("click", level40Start);
    }
    insideGamePlay.style.display = "none";
    restart.removeEventListener("click", restartGame);

    btncounterClick();
    btncounter++;

    sun.style.display = "none";
    // clearInterval(interval);
}


function gameOver() {
    ballleft1.removeEventListener("click", select1);
    ballleft2.removeEventListener("click", select2);
    ballleft3.removeEventListener("click", select3);
    ballleft4.removeEventListener("click", select4);
    ballleft5.removeEventListener("click", select5);

    startPlayBtn.style.display = "none";
    endGameScreen.style.opacity = 1;
    endGameScreen.style.display = "block";
    timerText.style.display = "none";
    levelText.style.display = "none";
    rainbow.style.display = "none";
    //ბურთების გაქრობა//
    leftBalls.style.display = "none";
    rightBalls.style.display = "none";
    //დროის წაშლა//
    stopInterval();

    //clearInterval(interval);
    //დარესტარტება//
    restart.addEventListener("click", restartGame);

    //ხმების მოშორება თამაშის დასრულებისას//
    heartSnd.pause();
    chooseSnd.pause();
    correctSnd.pause();

    if (sounding == true) {
        thunders.play();
    }
}
//h1 game over//
var hGame = document.getElementById("hgame");
var lvlText = document.getElementById("lvlText");
//ყველა ტურის გავლის შემთხვევაში//
function allLvlPass() {
    ballleft1.removeEventListener("click", select1);
    ballleft2.removeEventListener("click", select2);
    ballleft3.removeEventListener("click", select3);
    ballleft4.removeEventListener("click", select4);
    ballleft5.removeEventListener("click", select5);

    startPlayBtn.style.display = "none";
    endGameScreen.style.opacity = 1;
    endGameScreen.style.display = "block";
    timerText.style.display = "none";
    levelText.style.display = "none";
    rainbow.style.display = "none";
    //ბურთების გაქრობა//
    leftBalls.style.display = "none";
    rightBalls.style.display = "none";
    //დროის წაშლა//
    //stopInterval();
    rewardBtn.style.display = "none";
    restart.innerText = "Meniu";
    hGame.style.display = "none";
    adText.innerText = "Congrats your have great color vulnerabilty!!! level update will be avaliable soon";
    adText.style.lineHeight = "60px";
    adText.style.textTransform = "uppercase";
    adText.style.top = "5%";
    adText.style.fontSize = "20px";
    endGameScreen.style.backgroundColor = "green";
    adText.style.color = "white";
    adText.style.fontStyle = "italic";
    restart.addEventListener("click", () => {
        location.reload();
    });

    //responsive//
    if (h < 400) {
        adText.style.lineHeight = "40px";
    }
    if (h <= 500) {
        adText.style.fontSize = "15px";

    }
    if (h >= 800 && w >= 500) {
        adText.style.fontSize = "35px";
    }

}


//რანდომი//
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}


//ღრუბლები ფონზე და კანვასი //

var canvas = document.querySelector("canvas");
c = canvas.getContext("2d");

//canva width height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


function Images(photo, x, y, dx, dy, w, h) {
    this.photo = photo;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.w = w;
    this.h = h;

    this.draw = function() {
        c.drawImage(this.photo, this.x, this.y, this.w, this.h);
    };

    this.update = function() {
        this.draw();
        //ესაა მარჯვნივ რო გაცდეს//
        if (this.x > canvas.width + 150) {
            // ეს არ უნდა იმიტო რო გაცდეს მარჯვენა კიდეს  this.dx = -this.dx; 

        }
        //ესაა მარცხნივ რო გაცდეს//
        if (this.x - 10 < 15) {
            //ესე მოდის მარცხნიდან ალბათ აქ უნდა დავამტო რამე  this.dx = -this.dx; //

        }
        //ესაა სიმაღლისთვის//
        if (this.y > canvas.height || this.y < 0) {
            // this.dy = -this.dy;
        }
        //interactivity//
        this.x += this.dx;
        this.y += this.dy;
    };
};


//პირველი ღრუბელი//
var photo = new Image();
photo.src = "./img/cl1.png";
cl1 = new Images(photo, randomIntFromRange(-350, -600), randomIntFromRange(-100, canvas.height - canvas.height / 2), Math.random(), 0, 250, 150);

//მეორე ღრუბელი//
var photo1 = new Image();
photo1.src = "./img/cl2.png";
cl2 = new Images(photo1, randomIntFromRange(-650, -1000), randomIntFromRange(-100, canvas.height / 2 + 200), Math.random(), 0, randomIntFromRange(450, 650), randomIntFromRange(300, 450));

//მესამე ღრუბელი//
var photo2 = new Image();
photo2.src = "./img/cl3.png";
cl3 = new Images(photo2, randomIntFromRange(-600, -400), randomIntFromRange(150, canvas.height - 50), Math.random(), 0, randomIntFromRange(250, 450), randomIntFromRange(150, 250));

//მეოთხე ღრუბელი//
var photo3 = new Image();
photo3.src = "./img/cl4.png";
cl4 = new Images(photo3, randomIntFromRange(-350, -600), randomIntFromRange(-100, canvas.height / 2), Math.random(), 0, randomIntFromRange(350, 550), randomIntFromRange(250, 350));

//მეხუთე ღრუბელი//
var photo4 = new Image();
photo4.src = "./img/cl5.png";
cl5 = new Images(photo4, randomIntFromRange(-350, -600), randomIntFromRange(0, canvas.height - 300), Math.random(), 0, randomIntFromRange(350, 550), randomIntFromRange(250, 350));

//მეექსვე ღრუბელი//
var photo5 = new Image();
photo5.src = "./img/cl7.png";
cl6 = new Images(photo5, randomIntFromRange(-350, -600), randomIntFromRange(0, canvas.height - 100), Math.random(), 0, randomIntFromRange(350, 550), randomIntFromRange(250, 350));

function init() {
    for (let i = 0; i < 10; i++) {
        var photo = new Image();
        photo.src = "./img/cloud1pixl.png";
        var x = randomIntFromRange(-350, -600);
        var y = randomIntFromRange(50, canvas.height - canvas.height / 2);
        var dy = Math.random();
        var dx = 5;
        var w = randomIntFromRange(150, 250);
        var h = randomIntFromRange(100, 150);
        clouds.push(new Images(photo, x, y, dx, dy, w, h));
    }

}

clouds = [];

function animate() {


    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height); //მას თუ წაიშული იწელება//
    //პირველი ღრუბელი //

    if (cl1.x > canvas.width + 250) {
        cl1 = new Images(photo, randomIntFromRange(-350, -600), randomIntFromRange(100, canvas.height - canvas.height / 2), Math.random(), 0, randomIntFromRange(150, 250), randomIntFromRange(100, 150));
    }
    if (cl2.x > canvas.width + 150) {
        cl2 = new Images(photo1, randomIntFromRange(-350, -900), randomIntFromRange(300, canvas.height), Math.random(), 0, randomIntFromRange(450, 650), randomIntFromRange(300, 450));
    }
    if (cl3.x > canvas.width + 200) {
        cl3 = new Images(photo2, randomIntFromRange(-600, -400), randomIntFromRange(150, canvas.height - 150), Math.random(), 0, randomIntFromRange(250, 450), randomIntFromRange(150, 250));
    }

    if (cl4.x > canvas.width + 190) {
        cl4 = new Images(photo3, randomIntFromRange(-350, -600), randomIntFromRange(100, canvas.height / 2), Math.random(), 0, randomIntFromRange(350, 550), randomIntFromRange(250, 350));
    }

    if (cl5.x > canvas.width + 250) {
        cl5 = new Images(photo4, randomIntFromRange(-350, -600), randomIntFromRange(150, canvas.height), Math.random(), 0, randomIntFromRange(350, 550), randomIntFromRange(250, 350));
    }
    if (cl6.x > canvas.width + 300) {
        cl6 = new Images(photo5, randomIntFromRange(-350, -600), randomIntFromRange(200, canvas.height - 100), Math.random(), 0, randomIntFromRange(350, 550), randomIntFromRange(250, 350));
    }


    cl1.update();
    cl2.update();
    cl3.update();
    cl4.update();
    cl5.update();
    cl6.update();

}

animate();