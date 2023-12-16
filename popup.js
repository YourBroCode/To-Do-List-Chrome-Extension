
 //fetched Quotes
 fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    // console.log(data);
  });

//get the quotes
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://type.fit/api/quotes",
    "method": "GET"
  }
  
  let quote = document.getElementById("M_qote");
let auth = document.getElementById("author");

//selected the new quote every day and displayed on the screen

  $.ajax(settings).done(function (response) {
    const data = JSON.parse(response);
    console.log(data);
var date = new Date();
var day = date.getDate();

var month = date.getMonth();
var totaldays =( (month)*30)+day;
console.log(totaldays);
    const quot = data[totaldays].text;
    const authr = data[totaldays].author;
    // console.log(quot);
    quote.innerHTML = quot;
   auth.innerHTML = "~"+authr;
  });


//printed new date and day daily.
const date = new Date();

let day = date.getDate();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const dayname = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let days = dayname[date.getDay()];

let month = months[date.getMonth()];
let year = date.getFullYear();
let new_date = days+"   "+ day + " " + month + " " + year;
console.log(new_date);
let current_date = document.getElementById("date");
current_date.innerHTML = new_date;  





//got the input from user
let submit = document.getElementById("sbmit"); 

let description = document.getElementById('task');

 var urgency = document.getElementById("pr");

    let time = document.getElementById('tim');
    

//  let descrb = description.value;
// console.log(descrb);
 

//reloaded the page and displayed the items on the popup page.
window.onload = function () {
  let storedvalues = localStorage.getItem('itemsJson');
  let items = JSON.parse(storedvalues);
  let tablebody = document.getElementById("table");
  
  
  let string = "";

  items.forEach((element, index) => {
  
      string +=
  
          `<tr id="${index}">
           <th scope="row">${index+1}</th>
           <td>${element[0]}</td>
           <td>${element[1]}</td>
           <td>${element[2]}</td>
           <td><button class="btn btn-success deleting" data-index="${index}">Delete</button></td>
           </tr>`
          });
          tablebody.innerHTML = string; 
          var  deleteButtons = document.querySelectorAll('.deleting');

deleteButtons.forEach(button => {

    console.log(deleteButtons)
  button.addEventListener('click', function() {

    var index = this.dataset.index;

    // console.log(index)
    userdata = localStorage.getItem('itemsJson');

    data = JSON.parse(userdata);

    data.splice(index, 1);

    console.log(data)
    
    localStorage.setItem('itemsJson',JSON.stringify(data));


    
   function showResult() {
    document.location.reload();
   };
   showResult();
  });
})
};
submit.addEventListener("click", function(){

    let des = description.value;

    let t= time.value;
    
    let u = urgency.value;

    if (des == "" || t == "" || u == "") {
        alert("Please fill in all fields.");
    }

// Save the task in local storage
else {


if (localStorage.getItem("itemsJson") == null) {

    let data = [];

    data.push([u,des,t]);

    localStorage.setItem('itemsJson',JSON.stringify(data));
}
else {
   let userdata = localStorage.getItem('itemsJson');

   data = JSON.parse(userdata);

//    console.log(userdata)
   data.push([u,des,t]);

   localStorage.setItem('itemsJson',JSON.stringify(data)); 
};

    // update table rows
  let tablebody = document.getElementById("table");

  let string = "";

data.forEach((element, index) => {

    string +=

        `<tr id="${index}">
         <th scope="row">${index+1}</th>
         <td>${element[0]}</td>
         <td>${element[1] });}</td>
         <td>${element[2]}</td>
         <td><button class="btn btn-success deleting" data-index="${index}">Delete</button></td>
         </tr>`
        });

tablebody.innerHTML = string;
document.location.reload();

chrome.notifications.create('main', {
  type: 'basic',
  iconUrl: 'logo2.png',
  title: 'notification title',
  message: 'notification message',
  priority: 2
});




// adding event listener for delete buttons

var  deleteButtons = document.querySelectorAll('.deleting');

deleteButtons.forEach(button => {

    console.log(deleteButtons)
  button.addEventListener('click', function() {

    var index = this.dataset.index;

    // console.log(index)
    userdata = localStorage.getItem('itemsJson');

    data = JSON.parse(userdata);

    data.splice(index, 1);

    console.log(data)
    document.location.reload();
    localStorage.setItem('itemsJson',JSON.stringify(data));
   
  });
});
}

});


// let ele = document.getElementById("Alarm")
//  ele.addEventListener("click", () => {
//      chrome.runtime.sendMessage({ time: "1" }, function (response) {
//          // console.log(response);
//      });
//  });

// Connect to the background page
// const port = chrome.runtime.connect({ name: "myPort" });

// // Handle button click event
// let ele = document.getElementById("Alarm")
// ele.addEventListener("click", () => {
//   // Send a message to the background page
//   port.postMessage({time: "1"},function (response) {
//     console.log(response);
//   });
// });
// content.js

// Establish a connection with the background script
const port = chrome.runtime.connect();

// Define a function that wraps port.postMessage and adds an event listener
function sendMessage(message) {
  port.postMessage(message);

  // Check if the message is a request to schedule a notification
  if (message.scheduleNotification) {
    // Send a message to the background script to schedule the notification
    port.postMessage({ type: 'scheduleNotification' });
  }
}

// Find the button element and add an event listener to it
let ele = document.getElementById("Alarm")
ele.addEventListener('click', () => {
  // Use the sendMessage function to send a message to the background script to schedule a notification
  sendMessage({ scheduleNotification: true });
});





//start
//   function launch() {
//     chrome.app.window.create('index.html', {
//       id: 'main',
//       bounds: { width: 620, height: 500 }
//     });
//   }

//   // chrome.app.runtime.onLaunched.addListener(launch);

//   const sound= new Audio(chrome.runtime.getURL("duck.mp3"))
//   function showNotification(descrb) {
  

   
//     sound.play()
//       alert("check your tasks");
  
//     if (descrb.length>0) {
//       // Now created the notification
//       chrome.notifications.create('reminder', {
//           type: 'basic',
//           iconUrl: 'logo2.png',
//           title: 'important notification',
//           message: 'You have '+ descrb +' things to do. Wake up, dude!'
//        }, () => { });
//     }
//   }

// //   let ntf = document.getElementById("main").value;
// //   // let ntf = n0tif.value;
// //   userdata = localStorage.getItem('itemsJson');
// //   data = JSON.parse(userdata);
// //  data.push(ntf);
// //  localStorage.setItem('itemsJson', JSON.stringify(data));
// //  chrome.app.runtime.addListener(function (){
// //   launch();
// //  });

//   chrome.alarms.onAlarm.addListener(function( alarm ) {
//     console.log("Got an alarm!", alarm);
//     userdata = localStorage.getItem('itemsJson');
//      data = JSON.parse(userdata);
     
//     chrome.storage.local.get("itemsJson", showNotification);
//   });

//   chrome.notifications.onClicked.addListener(function() {
//     launch();
//   });
//   // localStorage.setItem('itemsJson', JSON.stringify(data));
  
