var handlers=require("./handlers");
var router={
hello:handlers.hello,
notFound:handlers.notFound
}


module.exports=router;
