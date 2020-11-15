const Users = require('../models/Users');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const e = require('express');
mongoose.set('useFindAndModify', false);
const Listings = require('../models/Listings')
module.exports = app =>{
  app.get('/', (req,res) =>{
      res.render("start.ejs")
  })
  app.get('/signup' , (req,res) =>{
    res.render("signup.ejs")
  })
  app.post('/signup', async(req,res)=>{
    try{
      discord = req.body.discord;
      password = bcrypt.hashSync(req.body.password,14);
      email = req.body.email;
      const newUser = new Users();
      newUser.discord = discord;
      newUser.password = password;
      newUser.email = email;
      newUser.profileImg = "https://i.imgur.com/oCi5GCM.png";
      const user = await newUser.save();
      res.render('start.ejs');
    }
    catch(err){
      res.send(err)
    }
   
  })
  app.get('/dashboard', async(req,res) =>{
    res.render("dashboard.ejs")
  })

  app.post('/login', async(req,res) =>{
    try{

      Users.findOne({email : req.body.email}, (err,user)=>{
      
        if(!user){
          res.sendStatus(404)
        }else{
          if(err || !bcrypt.compareSync(req.body.password, user.password)){
            res.sendStatus(404);
          }
          else{
            res.render("/dashboard");
          }
        }
  
      });
    }
    catch(err){
      console.log("Trig");
      res.sendStatus(404);
    }

  })

  app.get('/addItem', (req,res) =>{
    res.render('addItem.ejs')
  })
  app.get('/afterAdd', async(req,res) =>{
    res.render("afterAdd.ejs")
  })

  app.post('/addItem', async(req,res) =>{
    // console.log("Wroking")
    let img = req.body.img;
    let email = req.body.email;
    let aw = req.body.aw;
    let sb = req.body.sb;
    if(aw == ""){
      aw = "N/A";
    }
    if(sb == ""){
      sb = "0";
    }
    newList = new Listings();
    newList.img = img;
    newList.price = sb;
    newList.autowin = aw;
    let List = await newList.save();
   
    if(List){
      let id = List._id;
      console.log(id)
      try{
       let user = await Users.findOne({"email":email} );
       console.log(user._id)
       let list = await Listings.findByIdAndUpdate(id, {"owner" : user._id})
      
       const ello = await Users.findByIdAndUpdate(user._id, {"$push" :{"item": id}});
       
        res.status(200).send(list);
        
  
       
      } catch(err){
        res.sendStatus(404);
   
      }
    }



  })

  app.get("/lookFor" , async(req,res) =>{
    index = req.params.index;
    itemsLol = []
    owner = []
    co = []
    by = []
    aw = []
    itemId = []
    discordOwner = []
    let itemsToShow = await Listings.find({})
    console.log(index)

    for(i = 0; i<itemsToShow.length; i++){
      console.log(i)
      itemsLol.push(itemsToShow[i].img)
      co.push(itemsToShow[i].price)
      by.push(itemsToShow[i].offerby)
      aw.push(itemsToShow[i].autowin)
      itemId.push(itemsToShow[i]._id)
      let user = await Users.findById(itemsToShow[i].owner);
      discordOwner.push(user.discord)
    }
   
   
    console.log(itemsLol)
    res.render("items.ejs", {items : itemsLol, co:co, discordOwner : discordOwner, index: 4, itemId:itemId})
  })

  app.post("/updateItem", async(req,res) =>{
    offerBy  = req.body.offerBy
    offerAmt = req.body.offerAmt
    
    id = req.body.id

    let user = await Users.findOne({"email":offerBy} );

    let listing = await Listings.findByIdAndUpdate(id, {"offerby":user.discord, "price":offerAmt})
    listing.offerby = user.discord
    listing.price = offerAmt
    res.send(listing)
  })

  app.get("/settings", async(req,res) =>{
    email = req.query.email
    console.log(email)
    itemsLol = []
    owner = []
    co = []
    by = []
    aw = []
    itemId = []
    discordOwner = []
    let itemsToShow = await Listings.find({})


    for(i = 0; i<itemsToShow.length; i++){
      let user = await Users.findById(itemsToShow[i].owner);
      if(user.email == email){
        
      itemsLol.push(itemsToShow[i].img)
      co.push(itemsToShow[i].price)
      by.push(itemsToShow[i].offerby)
      aw.push(itemsToShow[i].autowin)
      itemId.push(itemsToShow[i]._id)
      discordOwner.push(user.discord)
      }
      
    }
   
    res.render("setting.ejs", {items : itemsLol, co:co, discordOwner : discordOwner, itemId:itemId})
  
  })

  app.post("/deleteItem", async(req,res) =>{
    try{
      email = req.body.owner
      item = req.body.id
      const ello = await Users.findOneAndUpdate({"email":email}, {"$pull" :{"item": item}});
      const delSuc = await Listings.findByIdAndDelete(item);
      res.send(item)
    }catch(err){
      res.send(err)
    }
  })
}
