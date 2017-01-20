var pathname = window.location.pathname; // Returns path only
var url      = window.location.href;     // Returns full URL

function expandAll(){
  $(".collapsible-header").addClass("active");
  $(".collapsible").collapsible({accordion: false});
}

function expandQ(q){
  $("li.q"+q+" .collapsible-header").addClass("active");
  $(".collapsible").collapsible({accordion: false});
}

function collapseAll(){
  $(".collapsible-header").removeClass(function(){
    return "active";
  });
  $(".collapsible").collapsible({accordion: true});
  $(".collapsible").collapsible({accordion: false});
}

function showMessage(message) {
  $('.top.message h3').text(message);
  $('.top.message').sidebar('setting', 'transition', 'overlay').sidebar('show')
    .delay(2000)
    .queue(function(){
      $('.top.message').sidebar('hide')
      .dequeue();
    });
}

function reloadPage() {
  location.reload();
}

function removeElement(element) {
    $( element ).transition('fade out')
    .delay(1000)
    .queue(function(){
      $( element ).remove()
      .dequeue();
    });
}

function removePrevElement(element) {
    $( element ).prev().transition('fade out')
    .delay(1000)
    .queue(function(){
      $( element ).prev().remove()
      .dequeue();
    });
}

function loadElement(getElement,targetElement) {
  $.ajax({
    url: pathname,  //Pass URL here 
    type: "GET", //Also use GET method
    success: function(data) {
        var input = $(data).find(getElement).prev().prev()[0].outerHTML;
        var option = $(data).find(getElement).prev()[0].outerHTML;
        $(targetElement).before(input);
        $(targetElement).before(option);
    }
  });
}



//loadElement(".options."+78+" #puto", "#puto");


// $().on($.modal.OPEN, function(event, modal) {
//   $(input).focus();
// });




// $('.create-question').click(function(){
//     var qnid = $(this).parent().data('qnid');
//     var text = $('input.qn'+qnid).val();

//     var success_message = "Success";
//     console.log(qnid);
//     console.log(text);

//     $.ajax
//     ({ 
//         url: '/questions/'+qnid+'/create',
//         data: {"qnid": qnid, "text": text},
//         type: 'get',
//         success: function(result)
//         {
//           $.modal.close();
//           $(".questions").load(pathname+" .questions");
//         }
//     });
// });




// $('.delete-question').click(function(){
//       var qid = $(this).parent().data('qid');
//       var qnid = $(this).parent().data('qnid');
//       var success_message = '<i class="material-icons">edit</i>';

//       $.ajax
//       ({ 
//           url: '/questions/'+qid+'/delete',
//           data: {"qnid": qnid},
//           type: 'get',
//           success: function(result)
//           {
//             $(".o"+qid).prev().remove();
//             $(".q"+qid).remove();
//             $(".questions").load(pathname+" .questions")
//             $.modal.close();
//             location.reload();
//           }
//       });
// });




// $('.create-option').click(function(){
//     var qid = $(this).parent().data('qid');
//     var qnid = $(this).parent().data('qnid');
//     var text = $('input.q'+qid).val();

//     $.ajax
//     ({ 
//         url: '/options/'+qid+'/create',
//         data: {"qnid": qnid, "qid": qid, "text": text},
//         type: 'get',
//         success: function(result)
//         {
//           //location.reload();
//           $.modal.close();
//           $("div.options-q"+qid).load(pathname+" div.options-q"+qid)
//           expandQ(qid);
//         }
//     });
// });





// $('.delete-option').click(function(){
//       var oid = $(this).parent().data('oid');
//       var qid = $(this).parent().data('qid');
//       var qnid = $(this).parent().data('qnid');

//       $.ajax
//       ({ 
//           url: '/options/'+oid+'/delete',
//           data: {"qnid": qnid},
//           type: 'get',
//           success: function(result)
//           {
//             $(".o"+oid).prev().remove();
//             $(".o"+oid).remove();
//             $.modal.close();
//             //location.reload();
//             console.log( "ready!" );
//             expandQ(qid);
//             status = "Q: " + qid + " O: "+oid; 
//             console.log(status);
//           }
//       });

// });//end func








// semantic
  $(document)
    .ready(function() {

      // fix menu when passed
      $('.masthead')
        .visibility({
          once: false,
          onBottomPassed: function() {
            $('.fixed.menu').transition('fade in');
          },
          onBottomPassedReverse: function() {
            $('.fixed.menu').transition('fade out');
          }
        })
      ;

      // fix menu when passed
      $('.masthead2')
        .visibility({
          once: false,
          onBottomPassed: function() {
            $('.fixed.menu').transition('fade in');
          },
          onBottomPassedReverse: function() {
            $('.fixed.menu').transition('fade out');
          }
        })
      ;

      // create sidebar and attach to menu open
      $('.ui.vertical.sidebar')
        .sidebar('attach events', '.toc.item')
      ;

    })
  ;




$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;



$('.tag .delete')
  .on('click', function() {
    $(this)
    .closest('.tag')
    .transition('fade')
    .delay(1000)
    .queue(function(){
      $(this).closest('.tag').remove()
      .dequeue();
    });
  });



$('.ui.dropdown')
  .dropdown({
    allowAdditions: true
  })
;

// $('.ui.accordion')
//   .accordion()
// ;



$('.ui.accordion')
  .accordion({
    selector: {
      trigger: ('.title label', '.title .icon')
    }
  })
;

// $('table .button')
//   .popup({
//     position : 'right center',
//     // title   : 'Popup Title',
//     content : 'Create new',
//     boundary: 'table'
//   })
// ;



$('.create-question').click(function(){
    var qnid = $(this).parent().data('qnid');
    //var text = $('input.qn'+qnid).val();
    var mode = "question";
    console.log(qnid);
    //console.log(text);



    $('.basic.new.modal')
      .modal({
        closable  : false,
        onDeny    : function(){
          //window.alert('Wait not yet!');
          $(this).modal('hide');
          showMessage("Cancelled");
          return false;
        },
        onShow : function() {
          console.log("modal shown");
        },
        onApprove : function() {
          // window.alert('Approved!');
          var text = $('input.enter').val();
          console.log(text);
          $.ajax
          ({ 
              url: '/questions/'+qnid+'/create',
              data: {"qnid": qnid, "text": text, "type":  "text"},
              type: 'get',
              success: function(result)
              {
                // $.modal.close();
                // $(".questions").load(pathname+" .questions");
                showMessage("Question '" + text + "' created successfully");
                //setTimeout(reloadPage, 2100);
                $("#putq").before(function(){
                  $(this).load(pathname+" .ui.styled.accordion div.question:last");
                })
              }
          });//end ajax
          
        }
      })
      .modal('show');
      $('#qnid').text(qnid);
});


$('.create-option').click(function(){
    var qid = $(this).parent().data('qid');
    var qnid = $(this).parent().data('qnid');
    //var text = $('input.qn'+qnid).val();
    var mode = "Option";
    console.log("qnid: "+qnid+" qid: "+qid);

    $('.basic.new.modal')
      .modal({
        closable  : false,
        onDeny    : function(){
          //window.alert('Wait not yet!');
          $(this).modal('hide');
          showMessage("Cancelled");
          return false;
        },
        onShow : function() {
          console.log("modal shown");
          $(this).find("span#mode").text(mode);
          $(this).find("input.enter").attr('placeholder', mode);
        },
        onApprove : function() {
          // window.alert('Approved!');
          var text = $('input.enter').val();
          console.log(text);
          $.ajax
          ({ 
              url: '/options/'+qid+'/create',
              data: {"qnid": qnid, "qid": qid, "text": text},
              type: 'get',
              success: function(result)
              {
                showMessage("Option '" + text + "' added successfully");

                // loadElement(".options."+qid+" div:last", "#puto");
                loadElement(".options."+qid+" #puto", "#puto");

                // $(".options.container."+qid).load(pathname+" .options.container."+qid)
                $(document).scrollTop( $("#qanch"+qid).offset().top );  
              }
          });//end ajax
        }
      })
      .modal('show');
      $('#qnid').text(qnid);
});







$('.delete-question').click(function(){

      var qid = $(this).closest("div.question").data('qid');
      var qnid = $(this).closest("div.question").data('qnid');

      $('.basic.confirm.modal')
        .modal({
          closable  : false,
          onDeny    : function(){
            $(this).modal('hide');
            showMessage("Cancelled");
            return false;
          },
          onShow : function() {
            console.log($(this).find("mode"));
                  $(this).find("span#mode").text("Question");
          },
          onApprove : function() {
            // window.alert('Approved!');
            $.ajax
            ({ 
                url: '/questions/'+qid+'/delete',
                data: {"qnid": qnid},
                type: 'get',
                success: function(result)
                {
                  removePrevElement(".question.container."+qid);
                  removeElement(".question.container."+qid);
                  console.log("deleted: " + $(".question.container."+qid));
                  showMessage("Question deleted successfully");
                  //setTimeout(reloadPage, 2100);
                }
            });//end ajax
          }
        })
        .modal('show');
        $('#id').text(qid);
});



$('.delete-option').click(function(){
  var oid = $(this).closest("div.option").data('oid');
  var qid = $(this).closest("div.option").data('qid');
  var qnid = $(this).closest("div.option").data('qnid');
  var iid = $(this).closest("div.option").data('iid');
  var mode = "Option";
  console.log("qnid: "+qnid+" qid: "+qid+" oid: "+oid);

      $('.basic.confirm.modal')
        .modal({
          closable  : false,
          onDeny    : function(){
            //window.alert('Wait not yet!');
            $(this).modal('hide');
            // $(this).closest("div.question").prev().attr('type', 'text');
            // $(this).closest("div.question").attr('class', 'red');
            showMessage("Cancelled");
            return false;
          },
          onShow : function() {
            console.log($(this).find("mode"));
            $(this).find("span#mode").text(mode);
          },
          onApprove : function() {
            // window.alert('Approved!');
            $.ajax
            ({ 
                url: '/options/'+oid+'/delete',
                // url: '/',
                data: {"qnid": qnid},
                type: 'get',
                success: function(result)
                {
                  removePrevElement(".option."+oid);
                  removeElement(".option."+oid);
                  showMessage("Option deleted successfully");
                  //setTimeout(reloadPage, 2100);
                  // location.reload();
                  // $(".questions").load(pathname+" .questions")
                  //   .delay(2000).queue(function(next){
                  //     // $('.ui.accordion').accordion('open', iid);
                  //     //location.reload();
                  //     $('.ui.accordion').accordion('open', iid);
                  //     next();
                  //     console.log( "delay!" );

                  //   });
                  console.log( "ready!" );
                  // expandQ(qid);
                  
                  status = "Q: " + qid + " O: "+oid; 
                  console.log(status);
                  $(document).scrollTop( $("#qanch"+qid).offset().top );  

                }
            });//end ajax
          }
        })
        .modal('show');
        $('#id').text(oid);
        //$("#mode").text("question id: ");
        // $('#mode').text("question id: ").all;
});





$("ui.icon.button").click(function(){

  $('.shape').shape('flip up');

});



// $('.ui.accordion').accordion('open', 2);

// $('.secondary.menu .item').tab()


// $('.secondary.menu .item')
//   .on('click', function() {
//     // programmatically activating tab
//     $.tab('change tab', 'fifth')//.transition('fade out');
//   })
// ;


// TABS
$(document).ready(function () {
     // remember the tab currently active
     var previous = $('.ui.active.tab');

     $('.secondary.menu .item').tab({
         onVisible: function (e) {
             var current = $('.ui.tab.active');
             // hide the current and show the previous, so that we can animate them
             previous.show();
             current.hide();

             // hide the previous tab - once this is done, we can show the new one
             previous.transition({
                 animation: 'horizontal flip',
                 onComplete: function () {
                     // finally, show the new tab again
                     current.transition('horizontal flip');
                 }
             });

             // remember the current tab for next change
             previous = current;
         }
     });
 });



//FORM

$(document).ready(function () {
  var qid = $("div.question").data('qid');
  console.log("QID: "+qid);

  //$('.ui.form').form('has field(submission_8963)')

//set values
//   $('.ui.form')
//   .form('set values', {
//     name     : 'Jack',
//     gender   : 'male',
//     colors   : ['red', 'grey'],
//     username : 'jlukic',
//     password : 'youdliketoknow',
//     terms    : true
//   })
// ;




  // $('.ui.form')
  //   .form({
  //     on: 'blur',
  //     //inline : true,


  //     fields: {
  //       textArea: {
  //         identifier: 'submission_8963',
  //         rules: [
  //           {
  //             type   : 'empty',
  //             prompt : 'Please enter something in question'
  //           }
  //         ]
  //       },

  //       radio: {
  //         identifier: 'radio required '+93,
  //         rules: [
  //           {
  //             type   : 'checked',
  //             prompt : 'Please make a choice'
  //           }
  //         ]
  //       },

  //       skills: {
  //         identifier: 'skills',
  //         rules: [
  //           {
  //             type   : 'minCount[2]',
  //             prompt : 'Please select at least two skills'
  //           }
  //         ]
  //       },
  //       gender: {
  //         identifier: 'gender',
  //         rules: [
  //           {
  //             type   : 'empty',
  //             prompt : 'Please select a gender'
  //           }
  //         ]
  //       },
  //       username: {
  //         identifier: 'username',
  //         rules: [
  //           {
  //             type   : 'empty',
  //             prompt : 'Please enter a username'
  //           }
  //         ]
  //       },
  //       password: {
  //         identifier: 'password',
  //         rules: [
  //           {
  //             type   : 'empty',
  //             prompt : 'Please enter a password'
  //           },
  //           {
  //             type   : 'minLength[6]',
  //             prompt : 'Your password must be at least {ruleValue} characters'
  //           }
  //         ]
  //       },
  //       terms: {
  //         identifier: 'terms',
  //         rules: [
  //           {
  //             type   : 'checked',
  //             prompt : 'You must agree to the terms and conditions'
  //           }
  //         ]
  //       }
  //     }
  //   });


// $('.ui.form input[data-validate="required "]' ).each(function( index ) {
$('.ui.form input.required' ).each(function( index ) {
  console.log( index + ": " + $( this ).text() );
  console.log( index + ": " + $( this ).attr('id') );
});




  // $('.ui.form')
  //   .form({
  //     on: 'blur',
  //     inline : true,
  //     fields: {
  //       submission_8963: 'empty',
  //       gender   : 'empty',
  //       username : 'empty',
  //       password : ['minLength[6]', 'empty'],
  //       skills   : ['minCount[2]', 'empty'],
  //       'required radio'    : 'checked'
  //     }
  //   })
  // ;


// //get values
// var
//   $form = $('.ui.form')
//   // get one value
// var
//   radio = $form.form('get field', 'submission[9064]'),
//   // get list of values
//   fields = $form.form('get values', ['name', 'colors']),
//   // get all values
//   allFields = $form.form('get values')
//   validate = $form.form('is valid')
// ;
// // console.log(radio);
// // console.log(fields);
// // console.log(allFields);`


validate = $('.ui.form').form('is valid')

console.log(validate);



$('.ui.form').form('add errors', ['koko', 'mimi']);

// $('.ui.form').form('validate');







 });












// $('.basic.new.modal').modal('setting', 'closable', true).modal('show');






    //$("#progressBar").corner();  
    /*$("#progressBar").show();


    jQuery.ajax({
        url: "../Nexxus/DriveController.aspx",
        type: "GET",
        async: true,
        contentType: "application/x-www-form-urlencoded",
        //data: param,
        success: function (response) {
            //Manage your response.

            //Finished processing, hide the Progress!
            $("#progressBar").hide();
        },
        error: function (response) {
            alert(response.responseText);
            $("#progressBar").hide();

        }
    });









$(document).ready( function() {
     $('#progressBar').on('click', slideonlyone('sms_box'));

 });
*/

// $(function() {
//     $(document).scrollTop( $("#koko").offset().top );  
// });



$( document ).ready(function() {
    // console.log( "ready! " + session );
          

// $('.message.sidebar').sidebar('setting', 'transition', 'overlay').sidebar('show');

// removeElement(".question.container.65")

// console.log($(".ui.styled.accordion:last-child").text);


//works
// $('.ui.accordion').accordion('open', 0);







// works
// $("#putq").before(function(){
//   $(this).load(pathname+" .ui.styled.accordion div.question:last");
// })

// showMessage("test");






// removePrevElement("div.ui.styled.accordion div:last-child");
// removeElement("div.ui.styled.accordion div:last-child");


// $( "div.ui.styled.accordion div:last-child" )
//   .css({ color:"red", fontSize:"80%" })
//   .hover(function() {
//     $( this ).addClass( "solast" );
//   }, function() {
//     $( this ).removeClass( "solast" );
//   });


$('table').tablesort()
//expandQ(29);

});



