/**
 * Created by andyliu on 16-6-13.
 */
function updateUser(id) {
    $('#' + ('delupdate' + id)).attr('action', '/updateview');
    $('#' + ('delupdate' + id)).submit();
}

function setDelid(id) {
    $('#del_id').attr('value', id);

}
function delUser() {
    $('#delform').attr('action', '/delete');
    $('#delform').submit();

}

function insertUser() {
    $('#inform').submit();
}
function insertNameGetfocus() {
    $('#insert_name').select();
    $('#insert_name').focus();
}
/****************分页*********************/
var goPage = function (pageNumber) {
    var thisPageCount = 10;
    $('#thisPageCount').attr('value', 10);
    $('#pageNumber').attr('value', pageNumber);
    $('#searchform').submit();
};




// (function($){
//     var ms = {
//         init:function(totalsubpageTmep,args){
//             return (function(){
//                 ms.fillHtml(totalsubpageTmep,args);
//                 ms.bindEvent(totalsubpageTmep,args);
//             })();
//         },
//         //Ìî³ähtml
//         fillHtml:function(totalsubpageTmep,args){
//             return (function(){
//                 totalsubpageTmep="";
//                 /************************START*********************/
//                 if(args.currPage > 1){
//                     totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >prev</a></li>";
//                 }else{
//                     totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >prev</a></li>";
//                 }
//
//                 // Ò³ÂëŽóÓÚµÈÓÚ4µÄÊ±ºò£¬ÌíŒÓµÚÒ»žöÒ³ÂëÔªËØ
//                 if(args.currPage!=1 && args.currPage>=4 && args.totalPage!=4) {
//                     totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+1+"</a></li>";
//                 }
//                 /* µ±Ç°Ò³Âë>4, ²¢ÇÒ<=×ÜÒ³Âë£¬×ÜÒ³Âë>5£¬ÌíŒÓ¡°¡€¡€¡€¡±*/
//                 if(args.currPage-2>2 && args.currPage<=args.totalPage && args.totalPage>5) {
//                     totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_' data-go='' >...</a></li>";
//                 }
//                 /* µ±Ç°Ò³ÂëµÄÇ°ÁœÒ³ */
//                 var start = args.currPage-2;
//                 /* µ±Ç°Ò³ÂëµÄºóÁœÒ³ */
//                 var end = args.currPage+2;
//
//                 if((start>1 && args.currPage<4) || args.currPage==1) {
//                     end++;
//                 }
//                 if(args.currPage>args.totalPage-4 && args.currPage>=args.totalPage) {
//                     start--;
//                 }
//
//                 for(; start<=end; start++) {
//                     if(start<=args.totalPage && start>=1) {
//                         if(start != args.currPage) {
//                             totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+start+"</a></li>";
//                         }else{
//                             totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+start+"</a></li>";
//                         }
//                     }
//                 }
//
//                 if(args.currPage+2<args.totalPage-1 && args.currPage>=1 && args.totalPage>5) {
//                     totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_' data-go='' >...</a></li>";
//                 }
//
//                 if(args.currPage!=args.totalPage && args.currPage<args.totalPage-2 && args.totalPage!=4) {
//                     totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >"+args.totalPage+"</a></li>";
//                 }
//
//                 if(args.current < args.totalPage){
//                     totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >next</a></li>";
//                 }else{
//                     totalsubpageTmep += "<li class='ali'><a href='javascript:void(0);' class='geraltTb_pager' data-go='' >next</a></li>";
//                 }
//                 $(".pagination").html(totalsubpageTmep);
//             })();
//         },
//         //°ó¶šÊÂŒþ
//         bindEvent:function(totalsubpageTmep,args){
//             return (function(){
//                 totalsubpageTmep.on("click","a.geraltTb_pager",function(event){
//                     var current = parseInt($(this).text());
//                     ms.fillHtml(totalsubpageTmep,{"currPage":current,"totalPage":args.totalPage,"turndown":args.turndown});
//                     if(typeof(args.backFn)=="function"){
//                         args.backFn(current);
//                     }
//                 });
//                 //ÉÏÒ»Ò³
//                 /*
//                  totalsubpageTmep.on("click",".geraltTb_pager",function(){
//                  var current = parseInt($(".geraltTb_pager a").text());
//                  ms.fillHtml(totalsubpageTmep,{"currPage":current-1,"pageCount":args.pageCount,"turndown":args.turndown});
//                  if(typeof(args.backFn)=="function"){
//                  console.log("b:"+current-1);
//                  args.backFn(current-1);
//                  }
//                  });
//                  //ÏÂÒ»Ò³
//                  totalsubpageTmep.on("click",".geraltTb_pager",function(){
//                  var current = parseInt($(".geraltTb_pager a").text());
//                  ms.fillHtml(totalsubpageTmep,{"currPage":current+1,"pageCount":args.pageCount,"turndown":args.turndown});
//                  if(typeof(args.backFn)=="function"){
//                  console.log("c:"+current+1);
//                  args.backFn(current+1);
//                  }
//                  });
//                  */
//             })();
//         }
//     }
//     $.fn.createPage = function(options){
//         ms.init(this,options);
//     }
// })(jQuery);
/****************分页*********************/

$(function () {


    //监控回车键
    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            if ($('#addModal').css('display') == 'block') {
                $('#user_insert_btn').click();
            } else if ($('#delModal').css('display') == 'block') {
                $('#user_del_btn').click();
            } else {
                $('#user_search_btn').click();
                $('#user_update_btn').click();
            }
        }
    });
});
