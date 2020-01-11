document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.materialboxed');
  var instances = M.Materialbox.init(elems, {});
});

function set_images(page){
  $('.img_target').each(function(index){
    let id = page*14-14+index+440
    let res = $(this).attr('data-res');
    let src = `https://picsum.photos/id/${id}/${res}`;
    $(this).attr("src", src); 
  });
  
  $('#loader_container').fadeIn(300);
  $('#img_container').css('max-height','0');
  $('#img_container').imagesLoaded( function() {
    setTimeout(function(){
      $('#loader_container').fadeOut(300);
      $('#img_container').css('max-height','10000px');  
    },2500)
  });
}

function set_page(page){
  window.localStorage.setItem('page',page);
  set_images(page);
  $('.page_num').each(function(){
    $(this).parent().removeClass('active');
  });
  $('.page_num:contains('+page+')').parent().addClass('active');


  $('.page_left').removeClass('disabled');
  $('.page_right').removeClass('disabled');
  if(page==1){
    $('.page_left').addClass('disabled');
  }
  if(page==5){
    $('.page_right').addClass('disabled')
  }
  if(page>1 && page<5){
    $('.page_left').removeClass('disabled');
    $('.page_right').removeClass('disabled');
  }
}
function img_error(element){
  let res = $(element).attr('data-res').replace('/','x');
  let src = `https://dummyimage.com/${res}/000/fff`;
  $(element).attr('src',src)
}

$(document).ready(function(){

  // сохранение ночной темы
  let theme = window.localStorage.getItem('theme');
  console.log(theme);
  if(theme==''){
    console.log('Сохранена ночная тема')
    $('#night_switch').prop('checked',false);
    $('.body__background').css('background-color','#dbdbdb');
    $('.night_label').css('color','#171717');
    $('.pulsate').css('color','#171717');
  }else if(theme=='night'){
    console.log('Сохранена ночная тема')
    $('#night_switch').prop('checked',true);
    $('.body__background').css('background-color','#171717')
    $('.night_label').css('color','#dbdbdb');
    $('.pulsate').css('color','#171717');
  }else{
    window.localStorage.setItem('theme','day');
    $('#night_switch').prop('checked',false);
    $('.body__background').css('background-color','#dbdbdb');
    $('.night_label').css('color','#171717');
    $('.pulsate').css('color','#171717');
  }

  setTimeout(function(){
    $('.loader').fadeOut(500);
  },2500);
  let page = window.localStorage.getItem('page');
  console.log(page);
  if(page != undefined){
    console.log('loaded');
    set_page(page);
  }else{
    window.localStorage.setItem('page',1);
    page = 1;
    set_page(page);
  }
  
  $('.page_num').click(function(e){
    e.preventDefault();
    if($(this).html() != page){
      page =  $(this).html();
      set_page(page);
    }
  });
  $('.page_left').click(function(e){
    e.preventDefault();
    if(!$(this).hasClass('disabled')){
      page-=1;
      set_page(page)
    }
  });
  $('.page_right').click(function(e){
    e.preventDefault();
    if(!$(this).hasClass('disabled')){
      page+=1;
      set_page(page)
    }
  })


  $('.materialboxed').materialbox();
  $('#night_switch').change(function(){
    if(!$(this).prop('checked')) { 
      window.localStorage.setItem('theme','day');
      $('.body__background').css('background-color','#dbdbdb');
      $('.night_label').css('color','#171717');
      $('.pulsate').css('color','#171717');
    }else{ 
      window.localStorage.setItem('theme','night');
      $('.body__background').css('background-color','#171717')
      $('.night_label').css('color','#dbdbdb');
      $('.pulsate').css('color','#dbdbdb');
    }
  })
});



M.AutoInit();