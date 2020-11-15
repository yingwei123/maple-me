


  var firebaseConfig = {
    apiKey: "AIzaSyCz-dYWd4Vv5gVH3WwnJ4qMa6jQAvvsGkc",
    authDomain: "maple-me-32f4f.firebaseapp.com",
    databaseURL: "https://maple-me-32f4f.firebaseio.com",
    projectId: "maple-me-32f4f",
    storageBucket: "maple-me-32f4f.appspot.com",
    messagingSenderId: "428711849223",
    appId: "1:428711849223:web:84360c88409a713ce629a2",
    measurementId: "G-PB72SGH1X7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();


function hi(){
    alert("hello")
}

function signOut(){
  
    auth.signOut();
    window.location.href = "https://maple-market-offer.herokuapp.com/"
    
    }

function addItem(){
  const file = document.getElementById("file")
  
      const formdata = new FormData()
      formdata.append("image", file.files[0])
      fetch("https://api.imgur.com/3/image/",{
          method : "post",
          headers:{
              Authorization: "Client-ID e3441af7eaad282"
          }, body : formdata
      }).then(data =>data.json()).then((data) => {  
                alert("Attempting to add!")
                data = {"email" : auth.currentUser.email, "img": data.data.link, "aw": document.getElementById("aw").value, "sb": document.getElementById("sb").value}
                fetch('/addItem', {
                  method: 'POST', // or 'PUT'
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then((data) => {
                  alert("successfully added!");
                  var x = document.createElement("FORM");
                  x.action = "/afterAdd"
                  x.method = "get"
                  document.body.appendChild(x);
                  x.submit()

                })
                .catch((error) => {
                  console.error('Error:', error);
                });

      })
  
}

function dashboard(){
  var x = document.createElement("FORM");
  x.action = "/dashboard"
  x.method = "get"
  document.body.appendChild(x);
  x.submit()
  
}
function addI(){
  var x = document.createElement("FORM");
  x.action = "/addItem"
  x.method = "get"
  document.body.appendChild(x);
  x.submit()
}

function addAnotherItem(){
  var x = document.createElement("FORM");
  x.action = "/addItem"
  x.method = "get"
  document.body.appendChild(x);
  x.submit()
}
function settings(){
  var x = document.createElement("FORM");
  x.action = "/settings"
  x.method = "get"
  var input = document.createElement("input");
  input.name = "email"
  input.value = auth.currentUser.email;
  input.setAttribute("hidden", true)
  x.append(input)
  document.body.appendChild(x);
  x.submit()
}


function offerAt(id, index){

  let offerAmt = document.getElementById("i"+index).value;
  let co = document.getElementById("co"+index).innerHTML;
  let aw = document.getElementById("aw"+index).innerHTML;
  let coa = document.getElementById("coa"+index).innerHTML;
  if(coa == "None"){
    coa = 0
  }
  else{
    coa = parseInt(coa)
  }

  offerAmt = parseInt(offerAmt)

  if(isNaN(offerAmt)){
    alert("Make a valid offer")
  }
  else{
    if(parseInt(offerAmt) < coa){
      alert("Your offer is too low")
      return;
    }
    // if(aw != "N/A"){
    //   if(co >= parseInt(aw)){
    //     alert("Offer taken :>")
    //   }
    // }
    if(coa < offerAmt){
      alert("taken")
      data = {"offerBy" : auth.currentUser.email,
               "offerAmt": offerAmt, 
               "id": id
              }

                fetch('/updateItem', {
                  method: 'POST', // or 'PUT'
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then((data) => {
                  console.log(data)
                  document.getElementById("co"+index).innerHTML = data.offerby;
                  document.getElementById("coa"+index).innerHTML = data.price;
                  let offerBy = document.getElementById("o"+index).value = ""
                  let offerAmt = document.getElementById("i"+index).value = ""

                })
                .catch((error) => {
                  console.error('Error:', error);
                });
    }
  }
}


function deleteListing(id, index){

  
  let toConfirm = confirm("Are You Sure You Want to Delete This?")
  if(toConfirm == true){
    data = {"owner" : auth.currentUser.email, 
               "id": id
              }

                fetch('/deleteItem', {
                  method: 'POST', // or 'PUT'
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                })
                .then(response => response.text())
                .then((data) => {
                  console.log(data)
                  
                  image = document.getElementById("image"+index)
                  image.remove();
                  button = document.getElementById(id)
                  button.remove();
                  div = document.getElementById("d"+index)
                  div.remove();
                  owner = document.getElementById("owner"+index)
                  owner.remove();

                })
                .catch((error) => {
                  console.error('Error:', error);
                });
  }
  else{
    return;
  }
      
    
}