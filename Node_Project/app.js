
var express=require('express');
var app=express();
var router = express.Router();
var path = __dirname;
app.use(express.static(__dirname + '/library'));
app.use("/",router);

var graphdb = require('./library/_graphDB');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mysql=require('mysql');


var connection=mysql.createPool({
  connectionLimit:50,
  host:'localhost',    //// add database host
  user:'root',         //// add username
  password:'',         //// add password
  database:'sitedb'    //// add database name
});


var DB= new graphdb('http://neo4j:n@localhost:7474');



router.get("/",function(req,res){
  res.sendFile(path+"/hel.html");
});

/////////////////////////////////////////////////////  use to register users  /////////////////////////////////////////////////////////

router.get('/ui_submission', function(req, res, next) {
    add_UI_components_to_graphDB(req.query.child_ids,req.query.parent_ID);
    
});

router.post('/Registration',urlencodedParser,function(req, res, next) {
    console.log( req.body.uname);
    
});

register_user('/Registration_process',"developer");
Login_user('/Login_process',"developer");

function register_user(url_of_post_method,table_name){
  router.post(url_of_post_method,urlencodedParser,function (req, res){
     connection.getConnection(function(error,tempConnection){
      if(!!error){      ///// database connect error 
        tempConnection.release();  
        console.log('Error');
      }else{  ////////// database connection is succssed /////////////
          
          var user = {first_name: req.body.uname,email:req.body.email,password:req.body.password };
          
          var uniq_id=req.body.email; //////// give unique user identifier ///////////////////////

          tempConnection.query("INSERT INTO "+table_name+" SET?",user,function(error,rows,fields){
            
          if(!!error){
            console.log('Error!');
          }else{
            if(rows.length==0){  ////// query is not executed 
              console.log("query not executed ");
              //console.log(uniq_id);
              //DB.create_User_Node_and_Connect_to_all_uiComponents();
            }
            else{               ////// query is executed 
                console.log("query executed");  
                //console.log(uniq_id); 
                DB.create_User_Node_and_Connect_to_all_uiComponents(uniq_id);   
            }
                  
          }
        });
        
      }
    });
  });
}

//MATCH (u:Site_User)-[r:Used]->(ui:UI_Component) WHERE u.id='r' RETURN r

function Login_user(url_of_post_method,table_name){
  router.post(url_of_post_method,urlencodedParser,function (req, res){
     connection.getConnection(function(error,tempConnection){
      if(!!error){      ///// database connect error 
        tempConnection.release();  
        console.log('Error');
      }else{  ////////// database connection is succssed /////////////
          
          tempConnection.query("SELECT * FROM "+table_name+" WHERE email=? AND password=?",[req.body.email,req.body.password],function(error,rows,fields){
          //console.log(req.body.email);
          if(!!error){
            console.log('Error!');
          }else{
            if(rows.length==0){  ////// query is not executed 
              console.log("query not executed ");
              
            }
            else{               ////// query is executed 
                console.log("query executed");
                DB.getUser_used_uiComponent_Details(req.body.email); 
                //console.log(uniq_id); 
                //DB.create_User_Node_and_Connect_to_all_uiComponents(uniq_id);   
            }
                  
          }
        });
        
      }
    });
  });
}

function add_UI_components_to_graphDB(id_list,parent_id){
  for(i=0;i<id_list.length;i++){
    DB.create_UI_component(id_list[i],parent_id);
  }
}



app.listen(8083);