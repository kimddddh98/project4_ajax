$(function(){
    $('#open img').click(function(){
        $(this).hide()
        $('#left_menu').show()
        $('#left_menu').animate({left:0})
    })
    $('#close').click(function(){
        $('#left_menu').animate({left:-200},function(){
            $('#left_menu').hide()
        })
        $('#open img').show();
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
        data.documents[i].title.length>23?
        $('#ad_two .ad_right>div>p').eq(i).text(data.documents[i].title.slice(0,23)+'...'):
        $('#ad_two .ad_right>div>p').eq(i).text(data.documents[i].title);
        $('#ad_two .ad_right>div>h4').eq(i).text(`${data.documents[i].sale_price} 원`);
        $('#ad_two .ad_right>div>span').eq(i).text(`${(data.documents[i].price-data.documents[i].sale_price)/(data.documents[i].price/100)}%`)
        $('#ad_two .ad_right input').eq(i).val(data.documents[i].sale_price)
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
    const review = [
        [
            { title: "좋은책 감사합니다", id: "c16165017954***", date: "2022-07-26", src: "../img/sub/review1.jpeg", comment: "완강을 위해 달려보겠습니다^_^" },
            { title: "2023 이동기 영어 기본서", id: "dkes***", date: "2022-07-26", src: "../img/sub/review2.jpg", comment: "이 교재로 열심히 공부 하겠습니다." },
            { title: "좋아요", id: "ksin5***", date: "2022-07-26", src: null, comment: "빠른배송으로 잘 도착했습니다~ 감사합니다!" },
            { title: "마음에 들어요 추천합니다", id: "danj***", date: "2022-07-26", src: "../img/sub/review4.jpg", comment: "마음에 들어요 추천합니다" },
            { title: "이동기 강사님 영어 기본서", id: "c16514613985***", date: "2022-07-26", src: "../img/sub/review5.jpeg", comment: "이동기 강사님 영어 기본서로 2023 합격까지~!!" }
        ],
        [
            { title: "열심히 공부할게용", id: "c16576924425***", date: "2022-07-25", src: "../img/sub/review6.jpeg", comment: "분철도 깔끔하고 책도 깔끔해서 왔습니다! 열심히 공부하겠습니다~" },
            { title: "좋아요", id: "c16441303214***", date: "2022-07-25", src: "../img/sub/review7.jpeg", comment: "배송도 빠르고 깔끔하고 좋습니다." },
            { title: "굿굿", id: "c16561130781***", date: "2022-07-24", src: null, comment: "안에 내용들도 공부하기 쉽고 좋네요" },
            { title: "영어는 역시 동기쌤", id: "c16572532562***", date: "2022-07-23", src: "../img/sub/review9.jpg", comment: "진짜 공시에서 유명한 동기쌤 올인원 역시 그냥 유명한게 아니에요!! 진짜 추천" },
            { title: "깔끔해요", id: "c16532723502***", date: "2022-07-22", src: null, comment: "책이 깔끔하고 배송도 빨라요" }
        ],
        [
            { title: "좋아요 열심히 공부하겠습니다.", id: "qhd***", date: "2022-07-22", src: "../img/sub/review11.jpg", comment: "좋아요 열심히 공부하겠습니다." },
            { title: "좋아요!", id: "c16575052123***", date: "2022-07-22", src: "../img/sub/review12.jpg", comment: "분철해서 편하고, 내용도 좋아요" },
            { title: "영어", id: "c16203489587***", date: "2022-07-22", src: "../img/sub/review13.jpeg", comment: "영단어까지 분철 되어 넘 좋고 열심히 공부하겠습니다!" },
            { title: "이동기 영어 기본서 리뷰", id: "c16580409642***", date: "2022-07-22", src: "../img/sub/review14.jpeg", comment: "분철 깔끔하고 좋아요!! 열심히 공부할게요~!!" },
            { title: "좋아요!", id: "c16568462237***", date: "2022-07-22", src: "../img/sub/review15.jpeg", comment: "철도 깔끔하고 배송도 빠르게 와서 좋았어요~" }
        ],
        [
            { title: "이동기 올인원", id: "c16103390970***", date: "2022-07-21", src: "../img/sub/review16.jpeg", comment: "문법 독해 단어까지 다 들어가 있어서 좋습니다 :)" },
            { title: "디자인이 깔끔하고 좋아요.", id: "chouw***", date: "2022-07-21", src: null, comment: "공부가 더 잘 될 것 같아요." },
            { title: "좋아요", id: "c16139685599***", date: "2022-07-21", src: "../img/sub/review18.jpg", comment: "문제도 좋고 두께도 적당합니다." },
            { title: "영어", id: "c16572918187***", date: "2022-07-21", src: "../img/sub/review19.jpg", comment: "교재가 얇아서 분철안해도 굿!! 잘 사용하겠습니다~" },
            { title: "리뷰", id: "c16346431156***", date: "2022-07-20", src: "../img/sub/review20.jpeg", comment: "배송도 빠르고 분철 깔끔해요 책 좋아요 ㅎㅎ" }
        ]
    ]
    for (let x = 0; x < $('.page_number').length; x++) {
        $('.page_number').eq(x).on('click', function () {
            for (let i = 0; i < $('.review_item').length; i++) {
                $('.review_item>h3').eq(i).text(review[x][i].title)
                $('.review_item>.review_id').eq(i).text(`${review[x][i].id} | ${review[x][i].date}`);
                review[x][i].src == null ? $('.review_item>div').eq(i).css({height:0}) :
                $('.review_item>div').eq(i).css('background-image', `url(${review[x][i].src})`).css('height','130px');
                $('.review_item>p').eq(i).text(review[x][i].comment);
            };
        });
    };
    for (let i = 0; i < $('.review_item').length; i++) {
        $('.review_item>h3').eq(i).text(review[0][i].title)
        $('.review_item>.review_id').eq(i).text(`${review[0][i].id} | ${review[0][i].date}`);
        review[0][i].src == null ? $('.review_item>div').eq(i).css({height:0}) :
            $('.review_item>div').eq(i).css('background-image', `url(${review[0][i].src})`).css('height','130px');
        $('.review_item>p').eq(i).text(review[0][i].comment);

    };
    $('.page_number:first').css({fontWeight:'bold',color:'#464B6F'})
    $('.page_number').click(function(){
        $(this).siblings().css({fontWeight:'normal',color:'#9e9e9e'})
        .end().css({fontWeight:'bold',color:'#464B6F'})
    })
    document.getElementById('review_total').innerHTML=`총 ${review.length*review[0].length}개`
    // $('#review_option').change(function(){

    //     console.log($('.review_item>div').eq(2).css('height'))
    //     console.log($('.review_item>div').eq(2))
    //     if($('.review_item>div').eq(2).css('height')=='0px'){
    //     $('.review_item').eq(2).remove()
    //     }

    // })
    // let asd=[];
    // review[0][0]
    // asd.push(review[0][0])
    // console.log(asd)
});