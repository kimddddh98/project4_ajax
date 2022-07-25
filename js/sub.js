$(function(){
    // window.scrollX
    $('#open img').click(function(){
        $('#left_menu').show()
        $('#left_menu').animate({left:0})
    })
    $('#close').click(function(){
        $('#left_menu').animate({left:-200},function(){
            $('#left_menu').hide()
        })
    })
    $('#left_main>li').click(function(){
        $(this).siblings().children('ul').slideUp()
        $(this).children('ul').slideToggle()
    })
    $(window).scroll(function () {
        e = $(window).scrollTop()
        if(e>0){
            $('#left_menu').css({borderTop:"none"})
        }
        else if(e==0){
            $('#left_menu').css({borderTop:"4px solid #192c8d"})

        }
    });
    $('#next').click(function(){
        $('#con').stop().animate({left:-176},function(){
            $('.list:first').appendTo($('#con'));
            $('#con').css('left','0')
        })
    })
    $('#prev').click(function(){
        $('.list:last').prependTo($('#con'));
        $('#con').css('left','-176px')
        $('#con').stop().animate({left:0})
    })
    for(let i=1;i<=$('.list').length;i++){
        const bgColor=['#fffefb','#4f47ea','#5f5dd5','#fff3f3','#f0fbff','#151a3f','#edeaff','#000']
        $(`#list${i}`).on('mouseover',function(){
            $('#slider_book').hide()
            $('#slider_menu').css('background-color',`${bgColor[i-1]}`)
            $('#slider_img img').prop('src',`img/slider${i}.png`)
            $(this).css('font-weight','bold')
            $(this).siblings().css('font-weight','normal')
        })
    }
 
    function book(){
        $('#book_con').animate({marginLeft:-510},10000,"linear",function(){
            $('#book_con>div:first').appendTo($('#book_con'));
            $('#book_con').css({marginLeft:0})
        })
    }
    book()
    setInterval(book,10000);
    $.ajax({
        url:"https://dapi.kakao.com/v3/search/book?target=title",
        method:"GET",
        data:{query:"수험서"},
        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
    })
    .done(function(data){
        for(let i in data.documents){
            $('.book_img').eq(i).find('img').prop('src',data.documents[i].thumbnail)
            $('.book_title>div>span').eq(i).text(`${data.documents[i].authors} 지음`)
            $('.book_title>div>p').eq(i).text(`${data.documents[i].title}`)
        }
    })
    const title=['수험서','참고서','외국어','대학교','에세이','자기계발','문구']
    for(let x in $('#slider_text li')){
        $('#slider_text li').eq(x).on('mouseover',function(){
            $('#slider_book').show()
            $.ajax({
                url:"https://dapi.kakao.com/v3/search/book",
                method:"GET",
                data:{query:title[x],size:6},
                headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
            })
            .done(function(data){
                for(let i in data.documents){
                    $('.book_img').eq(i).find('img').prop('src',`${data.documents[i].thumbnail}`);
                    $('.book_title>div>span').eq(i).text(`${data.documents[i].authors} 지음`);
                    $('.book_title>div>p').eq(i).text(`${data.documents[i].title}`);
                }
            })
        })
    }
    // $.get("./text.txt",function(data){
    //     $('#text').html(data)
    // })
});