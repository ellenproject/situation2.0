$(document).ready(function () {
    //影片轉換
    $(".item").click(function(e){
        const src = $(this).data('src');
        var video = document.getElementById(src);
        // e.preventDefault();
        let item = $(this).data("item");
        $(`.item--${item}`).addClass("item--active").siblings().removeClass("item--active");
        $(`.show--${item}`).addClass("show--active").siblings().removeClass("show--active");
        
        //控制影片：如果影片不等於a1時，a1暫停。意思是影片等於a2或a3時，a1暫停。
        if (src !== 'a1') {
            document.getElementById('a1').pause();
        }
        if (src !== 'a2') {
            document.getElementById('a2').pause();
        }
        if (src !== 'a3') {
            document.getElementById('a3').pause();
        }
        if (src !== 'a4') {
            document.getElementById('a4').pause();
        }
        if (src !== 'a5') {
            document.getElementById('a5').pause();
        }

        //控制音樂：影片在點擊音樂播放或暫停後，轉換場景時音樂也會自動播放或暫停
        // $('#' + src).addClass('display');
        // $('#' + src).siblings().removeClass('show');
        // $('.' + src).addClass('display');
        // $('.' + src).siblings().removeClass('show');
        setTimeout(() => {
            video.play();
            // $('#' + src).addClass('show');
            // $('#' + src).siblings().removeClass('display');
            // $('.' + src).addClass('show');
            // $('.' + src).siblings().removeClass('display');
        }, 500);
    });
    
    //影片靜音按鈕
    $(".mute-video").click(function(){
        if($("video").prop("muted")){
            $("video").prop("muted", false);
            $(".play").addClass("active");
            $(".pause").removeClass("active");
        }else{
            $("video").prop("muted",true);
            $(".pause").addClass("active");
            $(".play").removeClass("active")
        }
    });
    
    //nav 收合
    $('.nav-box-btn').click(function(e){
        $('.nav').toggleClass('open')
    })
    
});