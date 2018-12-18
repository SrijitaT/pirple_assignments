var handlers={
hello:function(data,callback){
callback(406,{'message':'Hey,Welcome to my website!'});
},
notFound:function(data,callback){
callback(404,{'message':'Oops!! Page not found'});
}
}

module.exports=handlers;
