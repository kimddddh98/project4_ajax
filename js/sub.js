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
        $(`#list${i}`).on('mouseover',function(){
            $(this).css('font-weight','bold')
            $(this).siblings().css('font-weight','normal')
        })
    }

    $.ajax({
        url: "https://dapi.kakao.com/v3/search/book?target=title",
        method: "GET",
        data: { query: "2023 이동기 영어 기본서 세트" },
        headers: { Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42" }
    })
        .done(function (data) {
            $('#right_buy>img').prop('src', data.documents[0].thumbnail)
            $('#right_title>h3').html(data.documents[0].title)
            $('#right_title>div>span').eq(0).html(`${data.documents[0].authors} 지음`)
            $('#right_title>div>span').eq(1).html(`${data.documents[0].publisher} 퍼냄`)
            $('#right_title>div>span').eq(2).html(`출간일 : ${data.documents[0].datetime.slice(0,10)}`)
            $('#buy_price>h3').html(`합계 ${data.documents[0].sale_price} 원`)
            $('#info_right_price>h3').html(`${data.documents[0].sale_price} 원`)
            $('#buy_price>p').html(`${data.documents[0].price} 원`)
            $('#buy_price>div').append(`<span>적립</span> 적립금 ${data.documents[0].price/100} 원`)
            $('#save').text(`${data.documents[0].price/100} 원`)
            // ㅡㅡㅡㅡ가격계산
            
            let count = $('#buy_control>input').val()
            const price = data.documents[0].sale_price
            let notePrice = 2700
            let total = data.documents[0].sale_price
            $('.right_select select').change(function () {
                let noteValue = $(this).val()
                $('.right_select select').val(noteValue)
                $('#buy_price>h3').html(`합계 ${total + noteValue * notePrice} 원`)
                $('#info_right_price>h3').html(`${total + noteValue * notePrice} 원`)
            })
            $('.p').click(function () {
                let noteValue = $('#right_select select').val()
                count++
                $('#buy_control>input').val(count)
                total = count * price
                $('#buy_price>h3').html(`합계 ${total + noteValue * notePrice} 원`)
                $('#buy_price>div').html(`<span>적립</span> 적립금 ${count * data.documents[0].price/100} 원`)
                $('#info_main_right form input').val(count);
                $('#info_right_price>h3').html(`${total + noteValue * notePrice} 원`)
            })
            $('.m').click(function () {
                let noteValue = $('#right_select select').val()
                count--
                if (count == 0) {
                    count = 1
                }
                $('#buy_control>input').val(count)
                total = count * price
                $('#buy_price>h3').html(`합계 ${total + noteValue * notePrice}원`)
                $('#buy_price>div').html(`<span>적립</span> 적립금 ${count * data.documents[0].price/100} 원`)
                $('#info_main_right form input').val(count);
                $('#info_right_price>h3').html(`${total + noteValue * notePrice} 원`)
            
            })
        // ㅡㅡㅡㅡ가격계산

        })
    
    $('#all1').click(function(){
        $(this).is(':checked')==true?$('.ad_right').eq(0).find('input').prop("checked", true):$('.ad_right').eq(0).find('input').prop("checked", false)
    })
    $('#all2').click(function(){
        $(this).is(':checked')==true?$('.ad_right').eq(1).find('input').prop("checked", true):$('.ad_right').eq(1).find('input').prop("checked", false)
    })
    for(let i=0;i<$('.ad_right').length;i++){
        $('.ad_right').eq(i).find('input').click(function(){
            console.log()
            if($('.ad_right').eq(i).find('input:checked').length==$('.ad_right').eq(i).find('input').length){
               $(`#all${i+1}`).prop('checked',true) 
            }
            else{
               $(`#all${i+1}`).prop('checked',false) 
            }
        })
    }
    $.ajax({
        url: "https://dapi.kakao.com/v3/search/book",
        method: "GET",
        data: { query: "에스티유니타스" },
        headers: { Authorization: "KakaoAK cf6c35b551fb1ae4f68a9f154d6f8b42" }
    })
    .done(function(data){
        for(let i=0; i<$('#ad_two .ad_right>div>div').length;i++){
        $('#ad_two .ad_right>div>div').eq(i).css({backgroundImage:`url(${data.documents[i].thumbnail})`})
        $('#ad_two .ad_right>div>p').eq(i).text(data.documents[i].title);
        $('#ad_two .ad_right>div>h4').eq(i).text(`${data.documents[i].sale_price} 원`);
        $('#ad_two .ad_right>div>h4').eq(i).text(`${data.documents[i].sale_price} 원`);
        }
    })
    // ㅡㅡㅡ텍스트 불러오기
    $.get("./info_text.txt",function(data){
        $('#info_main_left').html(data)
        $('#info_show').click(function(){
            $('#info_main_left').css('height','auto')
            // $('#info_main_left').css('overflow','auto')
            $(this).hide();
            $('#info_hide').show();
        })
        $('#info_hide').click(function(){
            $('#info_main_left').css('height','900px')
            // $('#info_main_left').css('overflow','auto')
            $(this).hide();
            $('#info_show').show();
        })
        $('#info_review').click(function(){
            $('#info_bg li').eq(1).css('background-color','#fff');
            $('#info_bg li a').eq(1).css('font-weight','bold');
            $('#info_bg li').eq(0).css('background-color','#eee');
            $('#info_bg li a').eq(0).css('font-weight','normal');
            $('#info_main_left').hide();
            $('#info_main_review').show();
        })
    })
    $('#info_bg li a').eq(0).click(function(){
        $(this).parent().css('background-color','#fff')
        $(this).css('font-weight','bold')
        $('#info_bg li').eq(1).css('background-color','#eee');
        $('#info_bg li a').eq(1).css('font-weight','normal');
        $('#info_main_review').hide();
        $('#info_main_left').show();

    })
    $('#info_bg li a').eq(1).click(function(){
        $(this).parent().css('background-color','#fff')
        $(this).css('font-weight','bold')
        $('#info_bg li').eq(0).css('background-color','#eee');
        $('#info_bg li a').eq(0).css('font-weight','normal');
        $('#info_main_left').hide();
        $('#info_main_review').show();

    })
    
});