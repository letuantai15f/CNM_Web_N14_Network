
const AmazonCognito = require('amazon-cognito-identity-js');
// global.fetch=require('node-fetch');
// const UserpoolId="ap-southeast-1_4569dWlPf";
// const ClientId="3chmfgl5l8chccrkcb2n0gjv39";
const pool_region = 'us-east-1';
const CognitoUserPool = AmazonCognito.CognitoUserPool;
const PoolData={
  UserPoolId:"ap-southeast-1_4569dWlPf"
  ,ClientId:"7abfg36fgf8mf8o5mua275qaj2"
};
const userPool= new AmazonCognito.CognitoUserPool(PoolData) 


//
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port = 3000;
app.use(express.static('resources'));
app.engine('hbs', exphbs.engine());
app.set('view engine', 'hbs');


app.get('/', (req, res) => {
  res.render('dangnhap');
});
app.get('/trangchu', (req, res) => {
  res.render('trangchu');
});


const firebaseConfig = {
  apiKey: "AIzaSyDDape3Y1CAzsBUW-_1OKqwc3nIoLdz9oY",
  authDomain: "test-b9918.firebaseapp.com",
  projectId: "test-b9918",
  storageBucket: "test-b9918.appspot.com",
  messagingSenderId: "557719769064",
  appId: "1:557719769064:web:77b7b398e0c4c74c3c1e5d",
  measurementId: "G-KFEMXYW0TR"
};
const multer= require('multer');
const upload=multer();

// app.post('/sign',upload.fields([]), async (req, res )=>{
//   const account={email:req.body.email,password:req.body.password};
//   console.log(account);
//   userPool.signUp(account, attributeList, null, function(err, result){
//     if (err) {
//         console.log(err);
//         return;
//     }
//     cognitoUser = result.user;
//     console.log('user name is ' + cognitoUser.getUsername());
// });
  
  // });
  app.post('/sign',upload.fields([]),(req, res)=>{
    console.log('signing user');
    // const account={email:req.body.email,password:req.body.password};
    const{email,password} = req.body;
  // console.log(account);
  let userAtt=[];
  userAtt.push({Name:"name",Value:"tai"});
 
   
    console.log(userAtt,email);

userPool.signUp(email, password, userAtt, null, function(err, result){
    if (err) {
        // alert(err);
        console.log(err);
        return;
    }
    cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
    res.redirect('/');
});
});
  





app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})