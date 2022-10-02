const express=require('express');
const app = express();
const AWS=require('aws-sdk');
const exhbs=require('express-handlebars');
const port=3000;
app.engine('hbs',exhbs.engine());
app.set('view engine', 'hbs');
const config =new AWS.Config({
    accessKeyId:'AKIAYN4WGNE3IQC4IIUC',
    secretAccessKey:'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',
    region:'ap-southeast-1'
});
const multer=require('multer');
const upload=multer();
AWS.config=config;
const docClient=new AWS.DynamoDB.DocumentClient();
const tableName='Bao2';
app.get('/', (req, res)=>{
    const params={TableName:tableName};
    docClient.scan(params, (err, data)=>{ 
        if (err) throw err;
        else {
            return res.render('home',{sanPham:data.Items});
        }
    });   
});
app.post('/',upload.fields([]),(req, res)=>{
    const  {maBao,tenbao,tentacgia} = req.body;
    const params={TableName:tableName,Item:{maBao,tenbao,tentacgia}}
    console.log(params);
    docClient.put(params,(err, data)=>{
        if (err) throw err;
        else {return res.redirect('/');}
    });
});
app.post('/del',upload.fields([]),(req, res)=>{

    const listitem=Object.keys(req.body);
    
    if(listitem.length===0){
        return res.redirect('/');
    }
    console.log(listitem);
    function deleteItems(index){

    const params={TableName:tableName,Key:{'maBao':listitem[index]}}
    console.log(params);docClient.delete(params,(err,data)=>{
        if (err){
            
            return res.send(err);
        }
        else{
            if(index >0){
                deleteItem(index-1);
            }else{
                return res.redirect('/');
            }
        }
    });
    }
    deleteItems(listitem.length-1);
})
app.listen(port,()=>{console.log('listening on port '+port)});