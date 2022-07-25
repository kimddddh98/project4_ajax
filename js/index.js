$(function(){
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
            const bestQuery=[
                ["에스티유니타스","문학,","인문","경제","계발","어린이","수험"],
                ["그림","웹툰,","장편","연극","연휴","시리즈","에세이","소설","방송","사랑","스타","노벨문학상","어른","젊은","시집","여름","추리","셀럽","원작","반려동물","퇴근","고전","소장","소설","연애"],
                ["일력","교양","마케팅","온난화","우주","기후","지식","AI","어휘","이해","책방",'맛','대학','미술','역사','철학','한국사'],
                ['재테크','경제전망','재테크 비결','삼프로','코로나 경제','블록체인','코로나19','주식','부린이','내 집마련','언택트','투자','기업','인사이트','경제위기','돈','마케팅','밀레니얼','창업','경제트렌드','저축'],
                ['원어민 영어','대학교재','국가 자격증','기출문제','NCS','수험서','2021수험','스펙','2022수험','초시생','한국사능력','자소서','시간관리','모의고사'],
                ['취미','MZ','에코라이프','가스라이팅','유튜버','레벨업','여행','자존감','자기계발','새해맞이','다이어리','동기부여','취미','현대인','나만의 속도','면접','대리여행','취미','정리','극복','공부노하우','나이','청춘','더 나은','슬럼프','성장','여행'],
                ['반려동물','드로잉','지속가능','홈카페','면역력','가벼운몸','도시락','에어프라이어','텃밭','요리','홈트','집콕','바이러스','건강관리','환경','스트레스','다이어트']
            ]
            for (let x in data) {
                $('#best>div>ul>li').on('click',function(){
                    $.ajax({
                        url:"https://dapi.kakao.com/v3/search/book",
                        method:"GET",
                        data:{query:bestQuery[0][$(this).index()]},
                        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
                    })
                    .done(function(data){
                       for(let i=0;i<10;i++){
                            $('.best1 li').eq(i).find('img').prop('src',data.documents[i].thumbnail);
                            data.documents[i].title.length>20?$('.best1 li').eq(i).find('h3').html(data.documents[i].title.slice(0,20)+'...'):$('.best1 li').eq(i).find('h3').html(data.documents[i].title);
                            String(data.documents[i].authors).length>18?$('.best1 li').eq(i).find('p').html(String(data.documents[i].authors).slice(0,18)+'... 지음'):$('.best1 li').eq(i).find('p').html(data.documents[i].authors+' 지음');
                           $('.best1 li').eq(i).find('span').html(data.documents[i].publisher);
                           
                       }
                    })
                })
                $('#best>ul>li').eq(x).click(function () {
                    $.ajax({
                        url:"https://dapi.kakao.com/v3/search/book",
                        method:"GET",
                        data:{query:bestQuery[x][0]},
                        headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
                    })
                    .done(function(data){
                       for(let i=0;i<10;i++){
                            $('.best1 li').eq(i).find('img').prop('src',data.documents[i].thumbnail)
                            data.documents[i].title.length>20?$('.best1 li').eq(i).find('h3').html(data.documents[i].title.slice(0,20)+'...'):$('.best1 li').eq(i).find('h3').html(data.documents[i].title)
                            String(data.documents[i].authors).length>18?$('.best1 li').eq(i).find('p').html(String(data.documents[i].authors).slice(0,18)+'... 지음'):$('.best1 li').eq(i).find('p').html(data.documents[i].authors+' 지음');

                           $('.best1 li').eq(i).find('span').html(data.documents[i].publisher)
                           console.log()
                       }
                    })
                    $('#best>div>ul>li').remove();
                    for (let i in data[x]) {
                        $('#best>div>ul').append(
                            $('<li/>').text(data[x][i]).click(function () {
                                $(this).siblings().css('border-bottom', '1px solid #dadada')
                                $(this).css('border-bottom', '3px solid #464B6F');
                            })
                        )
                    }
                    $('#best>div>ul>li').on('click',function(){
                        $.ajax({
                            url:"https://dapi.kakao.com/v3/search/book",
                            method:"GET",
                            data:{query:bestQuery[x][$(this).index()]},
                            headers:{Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42"}
                        })
                        .done(function(data){
                           for(let i=0;i<10;i++){
                                $('.best1 li').eq(i).find('img').prop('src',data.documents[i].thumbnail)
                                data.documents[i].title.length>20?$('.best1 li').eq(i).find('h3').html(data.documents[i].title.slice(0,20)+'...'):$('.best1 li').eq(i).find('h3').html(data.documents[i].title)
                                String(data.documents[i].authors).length>18?$('.best1 li').eq(i).find('p').html(String(data.documents[i].authors).slice(0,18)+'... 지음'):$('.best1 li').eq(i).find('p').html(data.documents[i].authors+' 지음');

                               $('.best1 li').eq(i).find('span').html(data.documents[i].publisher)
                           }
                        })
                    })
                    
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
    const authorsCon=document.getElementById('authors_con')
    const authorsItem=$('#authors_con>div')
    authorsCon.style.width=authorsItem.outerWidth(true)*authorsItem.length+'px'
    function authorsLeft(){
        $('#authors_con').animate({marginLeft:-authorsItem.outerWidth(true)},3000,"linear",function(){
            $('#authors_con>div:first').appendTo('#authors_con')
            $('#authors_con').css({marginLeft:0})
        })
    }
    authorsLeft();
    setInterval(authorsLeft,3000)
    const authors=[
        {p:"유발하라리",span:"사피엔스",src:"./img/authors1.png"},
        {p:"이선재",span:"국어",src:"./img/authors2.png"},
        {p:"김중규",span:"행정학",src:"./img/authors3.png"},
        {p:"민준호",span:"사회",src:"./img/authors4.png"},
        {p:"이동기",span:"영어",src:"./img/authors5.png"},
        {p:"문동균",span:"한국사",src:"./img/authors6.png"},
        {p:"고혜원",span:"국어",src:"./img/authors7.png"},
        {p:"신영식",span:"한국사",src:"./img/authors8.png"},
        {p:"말콤글래드웰",span:"타인의 해석",src:"./img/authors9.png"},
        {p:"정세랑",span:"시선으로부터",src:"./img/authors10.png"},
        {p:"김연수",span:"일곱해의 마지막",src:"./img/authors11.png"},
        {p:"정재승",span:"열두 발자국",src:"./img/authors12.png"},
        {p:"백희나",span:"알사탕",src:"./img/authors13.png"},
        {p:"김미경",span:"김미경의 리부트",src:"./img/authors14.png"},
    ]
    for(let i in authors){
        $('#authors_con>div').eq(i).append(
            $(`<img src="">`).prop('src',authors[i].src),
            $('<p/>').text(authors[i].p),
            $('<span/>').text(authors[i].span)
        )
    }
    const popupColor=['#8044ff','#cbe2cf','#c0e8ff']
    let popupIndex=0
    $('#popup ul').click(function(){
        popupIndex++
        if(popupIndex>=3){
            popupIndex=0
        }        
        $('#popup').css({backgroundColor:popupColor[popupIndex]})
        $(this).animate({marginLeft:-1150},0,function(){
            $('#popup ul>li:first').appendTo('#popup ul');
            $('#popup ul').css({marginLeft:0})
        })
    })
    $('#content_next').click(function(){
        $('#sBox').stop().animate({left:-2300},function(){
            $('#sBox>li').eq(0).appendTo($('#sBox'))
            $('#sBox>li').eq(0).appendTo($('#sBox'))
            $('#sBox').css({left:-1150})
        })
    })
    $('#content_prev').click(function(){
        $('#sBox>li:last').prependTo($('#sBox'))
        $('#sBox>li:last').prependTo($('#sBox'))
        $('#sBox').css({left:-2300})
        $('#sBox').stop().animate({left:-1150})


    })
    $('.blur').css({width:($('#content_box').innerWidth()-$('#content_box>div').eq(1).innerWidth())/2})
    $('#content_box').hover(function(){
        $('#content_box>div').eq(1).children('div').css('display','block')
    },
    function(){
        $('#content_box>div').eq(1).children('div').css('display','none')
    })
    const reviewCon=document.getElementById('review_con');
    const reviewItem=$('#review_con>li');
    reviewCon.style.width=reviewItem.outerWidth(true)*reviewItem.length+'px'
    $('#review_next').click(function(){
        $('#review_con').stop().animate({marginLeft:-reviewItem.outerWidth(true)},function(){
            $('#review_con>li').eq(0).appendTo($('#review_con'))
            $('#review_con').css({marginLeft:0})
        })
    })
    $('#review_prev').click(function(){
        $('#review_con>li:last').prependTo($('#review_con'))
        $('#review_con').css({marginLeft:-reviewItem.outerWidth(true)})
        $('#review_con').stop().animate({marginLeft:0})
        
    })
});