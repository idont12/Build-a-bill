var BillStates = [
    { PageName: "HomeManu", BillMod: "" },
    { PageName: "updateLibrary", BillMod: "seeAllMode" },
    { PageName: "animationPage", BillMod: " animationSetting seeAllMode" },
    { PageName: "displayAnimtaion", BillMod: "RunAnimation seeAllMode" }];
var userImg = [];
var imgCountMax = 0;
var sliderDisplay = false;
var openPage = "-";
var StepUnlock = { currectStep: -1, stepTwo: false };
var imgToRemove = -1;

function centerBill() {
    var bill = document.getElementById("billCharacter");
    var billWidth = bill.offsetWidth;
    var billHight = bill.offsetHeight;
    var sidebarWidth = document.getElementsByClassName("sideMenu")[0].offsetWidth;
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var billScale = 0;

    if (windowHeight < (windowWidth - sidebarWidth)) {
        billScale = windowHeight / 350;
    }
    else {
        billScale = windowWidth / 500;
    }
    billScale = 1;
    sidebarWidth = document.getElementsByClassName("sideMenu")[0].offsetWidth;
    document.documentElement.style.setProperty("--billMaxSize", billScale);
    if (windowHeight > windowWidth) {
        /*phone mode*/
        document.documentElement.style.setProperty("--sideMenuWidth", (windowWidth-20)+"px");
        document.documentElement.style.setProperty("--sideMenuMax", "none");
        document.documentElement.style.setProperty("--scrollbarWidth", "0px");

        bill.style.marginLeft = ((windowWidth / 2) - (billWidth / 2)) + "px";

        document.body.classList.add("phoneMode");
    }
    else {
        document.documentElement.style.setProperty("--sideMenuWidth", "40vw");
        document.documentElement.style.setProperty("--sideMenuMax", "500px");
        document.documentElement.style.setProperty("--scrollbarWidth", "10px");     
        if (sliderDisplay) {
            bill.style.marginLeft = (((windowWidth - sidebarWidth) / 2) + sidebarWidth - (billWidth / 2)) + "px";
            document.getElementById("PageAll").style.width = (windowWidth - sidebarWidth) + "px";
            document.getElementById("PageAll").style.left = (sidebarWidth) + "px";
        }
        else {
            bill.style.marginLeft = ((windowWidth / 2) - (billWidth / 2)) + "px";
            document.getElementById("PageAll").style.width = "100%";
            document.getElementById("PageAll").style.left = "0px";
        }
        
        document.body.classList.remove("phoneMode");
    }

    var mainAll = document.getElementById("mainAll");
    if (sliderDisplay) {
        document.documentElement.style.setProperty("--marginMain", "15vw");
    }
    else {
        if (mainAll.offsetWidth < 600) {
            document.documentElement.style.setProperty("--marginMain", "10vw");
        }
        else if (mainAll.offsetWidth < 700) {
            document.documentElement.style.setProperty("--marginMain", "20vw");
        }
        else {
            document.documentElement.style.setProperty("--marginMain", "30vw");
        }
    }

    var titelHight = document.getElementById("textSection1").offsetHeight;
    bill.style.marginTop = (((windowHeight - titelHight) /2) - (billHight / 2)) - 10 + "px";
    document.getElementById("PageAll").style.top = (windowHeight - titelHight) + "px";
    sidebarWidth = document.getElementsByClassName("sideMenu")[0].offsetWidth;
    document.documentElement.style.setProperty("--sliderCorrectSize", ((sidebarWidth+10) * -1) + "px");   
}

function changeMode(newPage) {
    var billId = document.getElementById("billCharacter");
    var billBody = document.getElementById("billBody");
    var place = 0;

    for (j = true; place < BillStates.length && j == true; place++) {
        if (BillStates[place].PageName == newPage) {
            j = false;
        }
    }
    place--;

    billId.className = BillStates[place].BillMod;

    if (BillStates[place].BillMod == "seeAllMode") {
        applayImgToBill(imgCountMax - 1);
    }
    else if (BillStates[place].BillMod == "") {
        billBody.style.backgroundImage = "none";
    }
    else if (BillStates[place].BillMod == "RunAnimation seeAllMode") {
        changePicTiming();        
    }
}

/*uplode img*/


function userUpImg(event) {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        userImg[userImg.length] = reader.result;
        createAllCards();
       /* document.querySelector("#display-image").style.backgroundImage = `url(${userImg[userImg.length-1]})`;*/
        document.getElementById("billBody").style.backgroundImage = `url(${userImg[userImg.length - 1]})`;
    });
    reader.readAsDataURL(event.target.files[0]);
    imgCountMax += 1;
    chackUnlockStepup(0);
}

/*card macnic*/

function applayImgToBill(num) {
    document.getElementById("billBody").style.backgroundImage = `url(${userImg[num]})`;
    markSelected(num);
}

function removeImgPop(pickedImg) {
    imgToRemove = pickedImg;
    animationCondition(3);
}

function removeImg(event) {
    userImg.splice(event, 1);
    imgCountMax -= 1;
    chackUnlockStepup(0);
    createAllCards();
}

function createAllCards() {
    
    console.log(userImg);
    console.log(imgCountMax);
    var allCard = document.getElementById("allCards")
    allCard.innerHTML = "";
    
    for (i = 0; i < imgCountMax; i++) {
        allCard.innerHTML += '<button id="' + "img" + i + '" class="cardImg" onclick="applayImgToBill(' + i + ')" name="' + i + '"><span class="removeImg" onclick="removeImgPop(' + i +')" alt="image'+i+'"></span></button>'
        document.getElementById("img" + i).style.backgroundImage = `url(${userImg[i]})`;
    }
    allCard.innerHTML += '<button class="cardImg noOpecity"><label for="image-input">+</label></button>'
    markSelected(imgCountMax - 1);
    
}

function markSelected(theChosenOne) {  
    //if (theChosenOne === null) {
    //    theChosenOne = imgCountMax - 1;
    //}
    for (i = 0; i < imgCountMax; i++) {
        document.getElementById("img" + i).classList.remove("selected");
    }
    if (theChosenOne != -1) {
        document.getElementById("img" + theChosenOne).classList.add("selected");
    }
      
}

/*librery*/
function ChangeLibrary(idName, targetID) {
    //document.getElementById("billCharacter").classList.add("transtionAll");
    //document.getElementById("PageAll").classList.add("transtionAll");
    for (i = 0; i < document.getElementsByClassName("sideMenu").length; i++) {
        document.getElementsByClassName("sideMenu")[i].classList.add("transtionAll");
    }

    if (openPage == idName) {
        if (idName == "-") {
            sliderDisplay = true;
            centerBill();
        }
        else if (idName == "displayAnimtaion") {
            changeMode("HomeManu");
            document.documentElement.style.setProperty("--undisplayButon-onAnimation", 1);
            document.getElementById("stopAnimation").style.display = "none";
            document.getElementById("demoBotton").innerHTML = "Play demo";
            document.getElementById("demoBotton").onclick = function () { selectImgList('demo'); ChangeLibrary('-', 'displayAnimtaion'); }
        }
        else {
            document.getElementById(idName).classList.add("close");
        }

        if (targetID == "-") {
            sliderDisplay = false;
            centerBill();
        }
        else if (targetID == "displayAnimtaion") {
            sliderDisplay = false;
            centerBill();
            document.getElementById(targetID).classList.remove("close");
            changeMode(targetID);
            window.scrollTo(0, 0);
            document.getElementById("stopAnimation").style.display = "block";
            document.getElementById("demoBotton").innerHTML = "Stop animation";
            document.getElementById("demoBotton").onclick = function () { stopAnimation(); ChangeLibrary('displayAnimtaion', '-'); }
            document.documentElement.style.setProperty("--undisplayButon-onAnimation", 0.5);
        }
        else {
            window.scrollTo(0, 0);
            document.getElementById(targetID).classList.remove("close");
            changeMode(targetID);
        }
        /*מאפס את הטראנזישן של סרגל הצד*/
        setTimeout(function () {
            for (i = 0; i < document.getElementsByClassName("sideMenu").length; i++) {
                document.getElementsByClassName("sideMenu")[i].classList.remove("transtionAll");
            }
            centerBill();
        }, 500);

        openPage = targetID;
    }
    else if (openPage == "displayAnimtaion") {
        animationCondition(0);
    }
    else {
        /*שולח הודעת שגיאה של סרגל צד פתוח*/
        animationCondition(2);
    }

    /*הקוד אחראי לכך שהכפתורים בגדולים מתחת לכותרת לא יפעלו כאשר סרגל הצד פועל*/
    if (openPage == "-" ) {
        document.getElementById("demoBotton").classList.remove("blurOnAnimationDisplay");
        document.documentElement.style.setProperty("--undisplayButon-onAnimation", 1);
    }
    else if (openPage == "displayAnimtaion") {
        document.getElementById("demoBotton").classList.remove("blurOnAnimationDisplay");
    }
    else {
        document.getElementById("demoBotton").classList.add("blurOnAnimationDisplay");
        document.documentElement.style.setProperty("--undisplayButon-onAnimation", 0.5);
    }
}

/*unConver things*/

function popUpBackShow() {
    document.getElementById("PopUpBack").classList.toggle("show");
}

function phoneDisplayBill(sorceType) {
    var billclass = document.getElementById("billCharacter").classList;
    if (sorceType == "open" || billclass.contains("show")) {
        billclass.toggle("show");
        popUpBackShow();
    }    
}

function animationCondition(popupNum) {
    document.getElementById("AnimationQestion" + popupNum).classList.add("show");
    popUpBackShow();
}

function answerQestion(answer) {
    for (i = 0; i < 4; i++) {
        document.getElementById("AnimationQestion"+i).classList.remove("show");
    }   
    popUpBackShow();
    if (answer) {
        removeImg(imgToRemove);
        applayImgToBill(-1);
    }
    if (imgToRemove != -1) {
        imgToRemove = -1;
    }
}

/*animation*/
var cuttectImg = 0;
var aniPro = { speed: 0.2};
var randomImgLink = ["https://images.pexels.com/photos/1684187/pexels-photo-1684187.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1164985/pexels-photo-1164985.jpeg?auto=compress&cs=tinysrgb&w=1600", "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1600", "https://images.pexels.com/photos/421927/pexels-photo-421927.jpeg?auto=compress&cs=tinysrgb&w=1600", "https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=1600","https://images.pexels.com/photos/1603650/pexels-photo-1603650.jpeg?auto=compress&cs=tinysrgb&w=1600"];
var FinalAnimation;
var currectPicList = [];

function selectImgList(imgList) {
    if (imgList == "demo") {
        currectPicList = randomImgLink;
    }
    else if (imgList =="user") {
        currectPicList = userImg;
    }
}

function changePicTiming() {
    FinalAnimation=  setInterval(changePic, aniPro.speed*1000);
}

function changePic() {
    console.log("maxImg: " + aniPro.maxImg + " cuttectImg: " + cuttectImg);
    document.getElementById("billBody").style.backgroundImage = `url(${currectPicList[cuttectImg]})`;
    /*document.getElementById("billBody").style.backgroundImage = `url(${userImg[cuttectImg]})`;  */
    if (cuttectImg < currectPicList.length-1) {
        cuttectImg++;
    }
    else {
        cuttectImg = 0;
    }
}

function stopAnimation() {
    clearInterval(FinalAnimation);
}

/*eye move*/

function mouseDitactive(event) {
    var sY = event.screenY;
    var sX = event.screenX;
}

/*processSelction*/
function processSelction(value) {
    document.documentElement.style.setProperty("--processSelctionValue", value);
    var textOption = ["<strong>Add images</strong> - The first step you need to do, if you want to create your own Bill glitch effect, is to add your own images. You do it by clicking on the plus button and then pick the image from your computer. If you want to delete an image you have a delete button as you hover your mouse over the image.",
        "<strong> Animation Settings</strong> - Once you've added your images you can try and play with the animation settings. The options that can be affected are image transition speed, glitch effect speed and glitch effect opacity. Changing the speed refers to the time each frame will be displayed.",
        "<strong>Play animation </strong>–  This is the final step, here you can look at your amazing Bill glitch effect. When you are at this step you can't change any properties. if you want you can click on the stop animation button in the top left corner of the screen."]
    document.getElementById("prosessText").innerHTML = textOption[value + 1];
}

/*change sliders*/
function changeGlitchEffectOpacity(OpacityValue) {
    document.documentElement.style.setProperty("--glitchEffectOpacity", (OpacityValue / 100));
}

function changeGlitchEffectSpeed(speedValue) {
    document.documentElement.style.setProperty("--glitchEffectSpeed", (speedValue + "s"));
}

function changeImgSpeed(speedValue) {
    document.documentElement.style.setProperty("--imageSpeed", (speedValue + "s"));
    aniPro.speed = speedValue;
}

/*unlock manu step*/
function chackUnlockStepup(lockNum) {
    if (imgCountMax > 1) {
        StepUnlock.currectStep = 0;
    }
    else {
        StepUnlock.currectStep = -1;
    }
    if ((lockNum == 1 || StepUnlock.stepTwo) && StepUnlock.currectStep == 0) {
        StepUnlock.currectStep = 1;
        StepUnlock.stepTwo = true;
    }
    updateUnlock();
}

function updateUnlock() {
    if (StepUnlock.currectStep >= 0) {
        for (i = 0; i <= StepUnlock.currectStep; i++) {
            document.getElementById("unlockManu" + i).classList.remove("lock");
        }
        
        if (StepUnlock.currectStep >= 0) {
            document.getElementById("unlockManu0").onclick = function () { ChangeLibrary('HomeManu', 'animationPage'); chackUnlockStepup(1); }
            document.getElementById("nextStep1").onclick = function () { ChangeLibrary('updateLibrary', 'animationPage'); chackUnlockStepup(1); }
            document.getElementById("nextStep1").classList.remove("lock");
        }
        if (StepUnlock.currectStep == 1) {
            document.getElementById("unlockManu1").onclick = function () { selectImgList('user'); ChangeLibrary('HomeManu', 'displayAnimtaion'); }
        }
    }
    else {
        for (i = 0; i < 2; i++) {
            document.getElementById("unlockManu" + i).classList.add("lock");
            document.getElementById("unlockManu" + i).onclick = function () { animationCondition(1); }
        }
        document.getElementById("nextStep1").onclick = function () { animationCondition(1);}
        document.getElementById("nextStep1").classList.add("lock");
    }
}

/*מסך טעינה*/
$(window).on("load", function () {
    $("#loudingScreen").fadeOut("slow");
});