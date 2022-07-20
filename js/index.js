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
    $.ajax({
        url:"https://dapi.kakao.com/v3/search/book",
        method:"GET",
        data:{query:"2022 선재국어 세트"},
        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
    })
    .done(function(data){
        $('#today_box>div').eq(0).find('img').prop('src',data.documents[0].thumbnail)
        $('#today_box>div').eq(0).find('h2').text(data.documents[0].title)
        $('#today_box>div').eq(0).find('p').text(data.documents[0].contents.slice(0,23))
        $('#today_box>div').eq(0).find('span').text(data.documents[0].authors+' | '+data.documents[0].publisher)
    })
    $.ajax({
        url:"https://dapi.kakao.com/v3/search/book",
        method:"GET",
        data:{query:"2023 이동기 영어 기본서 세트"},
        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
    })
    .done(function(data){

        $('#today_box>div').eq(1).find('img').prop('src',data.documents[0].thumbnail)
        $('#today_box>div').eq(1).find('h2').text(data.documents[0].title.slice(0,18))
        $('#today_box>div').eq(1).find('p').text(data.documents[0].contents.slice(0,17))
        $('#today_box>div').eq(1).find('span').text(data.documents[0].authors+' | '+data.documents[0].publisher)
    })
    $.ajax({
        url:"https://dapi.kakao.com/v3/search/book",
        method:"GET",
        data:{query:"2023 문동균 한국사"},
        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
    })
    .done(function(data){
        $('#today_box>div').eq(2).find('img').prop('src',data.documents[0].thumbnail)
        $('#today_box>div').eq(2).find('h2').html(data.documents[0].title.slice(0,13)+'<br>'+data.documents[0].title.slice(13))
        $('#today_box>div').eq(2).find('p').text(data.documents[0].contents.slice(0,25))
        $('#today_box>div').eq(2).find('span').text(data.documents[0].authors+' | '+data.documents[0].publisher)
    })
    $.ajax({
        url:"https://dapi.kakao.com/v3/search/book",
        method:"GET",
        data:{query:"2023 써니 행정법총론"},
        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
    })
    .done(function(data){
        $('#today_box>div').eq(3).find('img').prop('src',data.documents[0].thumbnail)
        $('#today_box>div').eq(3).find('h2').html(data.documents[0].title.slice(0,13)+'<br>'+data.documents[0].title.slice(13))
        $('#today_box>div').eq(3).find('p').text(data.documents[0].contents.slice(1,26))
        $('#today_box>div').eq(3).find('span').text(data.documents[0].authors+' | '+data.documents[0].publisher)
    })

    $.ajax({
        url:"https://dapi.kakao.com/v3/search/book",
        method:"GET",
        data:{query:"에스티유니타스"},
        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
    })
    .done(function(data){
        for(let i in data.documents){
            $('.best1 li').eq(i).find('img').prop('src',data.documents[i].thumbnail)
            data.documents[i].title.length>20?$('.best1 li').eq(i).find('h3').html(data.documents[i].title.slice(0,20)+'...'):$('.best1 li').eq(i).find('h3').html(data.documents[i].title)
            $('.best1 li').eq(i).find('p').html(data.documents[i].authors+' 지음')
            $('.best1 li').eq(i).find('span').html(data.documents[i].publisher)
        }
    })
    $('#best>ul>li').click(function(){
        $('#best>div>ul').innerHeight()>715?$('#best>div>ul').css({overflowY:'scroll'}):$('#best>div>ul').css({overflowY:'auto'});
        $('#best>ul>li').css({
            color: '#535353',
            border: '1px solid #dadada',
            background: '#fff'
        })
        $(this).css({
            color: '#fff',
            border: '1px solid #464B6F',
            background: '#464B6F'
        })
    })
    $.ajax({
        url: "~/../js/best.json",
        dataType: "json",
    })
        .done(function (data) {
            $('#best>div>ul>li').remove();
            for (let i in data[0]) {
                $('#best>div>ul').append(
                    $('<li/>').text(data[0][i]).click(function () {
                        $(this).siblings().css('border-bottom', '1px solid #dadada')
                        $(this).css('border-bottom', '3px solid #464B6F')
                    })
                )
            }
            for (let x in data) {
                $('#best>ul>li').eq(x).click(function () {
                    $('#best>div>ul>li').remove();
                    for (let i in data[x]) {
                        $('#best>div>ul').append(
                            $('<li/>').text(data[x][i]).click(function () {
                                $(this).siblings().css('border-bottom', '1px solid #dadada')
                                $(this).css('border-bottom', '3px solid #464B6F')
                            })
                        )
                    }
                })
            }
        })
    $.ajax({
        url: "https://dapi.kakao.com/v3/search/book",
        method: "GET",
        data: { query: "공부", size: 7 },
        headers: { Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42" }
    })
        .done(function (data) {
            for (let i in data.documents) {
                $('#work>ul>li').eq(i).find('img').prop('src', data.documents[i].thumbnail)
                data.documents[i].title.length > 20 ?
                    $('#work>ul>li').eq(i).find('h3').text(data.documents[i].title.slice(0, 20) + '...') :
                    $('#work>ul>li').eq(i).find('h3').text(data.documents[i].title)
                $('#work>ul>li').eq(i).find('p').text(data.documents[i].authors)
                $('#work>ul>li').eq(i).find('span').text(data.documents[i].publisher)
            }
        })
     $.ajax({
        url:"https://dapi.kakao.com/v3/search/book",
        method:"GET",
        data:{query:"2023",size:7},
        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
    })
    .done(function(data){
        for(let i in data.documents){
            $('#new>ul>li').eq(i).find('img').prop('src',data.documents[i].thumbnail)
            data.documents[i].title.length>20?
            $('#new>ul>li').eq(i).find('h3').text(data.documents[i].title.slice(0,20)+'...'):
            $('#new>ul>li').eq(i).find('h3').text(data.documents[i].title)
            $('#new>ul>li').eq(i).find('p').text(data.documents[i].authors)
            $('#new>ul>li').eq(i).find('span').text(data.documents[i].publisher)
        }
    })
    $.ajax({
        url:"https://dapi.kakao.com/v2/search/image",
        method:"GET",
        data:{query:"유발하라리",size:7},
        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
    })
    .done(function(data){
        console.log(data)
    })

});