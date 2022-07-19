$(function(){
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
        })
    }
    // $('#slider_text li').on('mouseover',function(){
    //     $('#slider_book').show()
    // })
    function book(){
        $('#book_con').animate({marginLeft:-510},10000,function(){
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
        for(let i in $('.book_img')){
            $('.book_img').eq(i).find('img').prop('src',data.documents[i].thumbnail)
            $('.book_title>div>span').eq(i).text(`${data.documents[i].authors} 지음`)
            $('.book_title>div>p').eq(i).text(`${data.documents[i].title}`)
        }
    })

    for(let x in $('#slider_text li')){
        $('#slider_text li').eq(x).on('mouseover',function(){
            $('#slider_book').show()
            const title=['수험서','참고서','외국어','대학교','에세이','자기계발','문구']
            $.ajax({
                url:"https://dapi.kakao.com/v3/search/book",
                method:"GET",
                data:{query:title[x],size:6},
                headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
            })
            .done(function(data){
                for(let i in $('.book_img')){
                    $('.book_img').eq(i).find('img').prop('src',data.documents[i].thumbnail)
                    $('.book_title>div>span').eq(i).text(`${data.documents[i].authors} 지음`)
                    $('.book_title>div>p').eq(i).text(`${data.documents[i].title}`)
                }
            })
        })
    }
    $.ajax({
        url:"https://dapi.kakao.com/v3/search/book",
        method:"GET",
        data:{query:"2022 선재국어 세트"},
        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
    })
    .done(function(data){
        $('#today_box>div').eq(0).find('img').prop('src',data.documents[0].thumbnail)
        $('#today_box>div').eq(0).find('h2').text(data.documents[0].title)
        $('#today_box>div').eq(0).find('span').text(data.documents[0].authors+' | '+data.documents[0].publisher)
    })
});