$(document).ready(function () {

    // const text = document.querySelectorAll('.text-box');


    // $('.link-btn').click(function (e) {
    //     e.preventDefault();
    //     $('.link-group').toggleClass('open');
    // });

    $('.start').click(function (e) {
        e.preventDefault();
        $(this).removeClass('show');
        document.getElementById('a1').pause();
    });

    $('.menu-btn').click(function (e) {
        e.preventDefault();
        $('.video-menu-group').toggleClass('open');
    });

    // 靜音按鈕
    $('.mute-video').click(function () {
        if ($('video').prop('muted')) {
            $('video').prop('muted', false);
            $('.play').addClass('active');
            $('.pause').removeClass('active');
        } else {
            $('video').prop('muted', true);
            $('.pause').addClass('active');
            $('.play').removeClass('active');
        }
    });

    $('.video-btn').click(function (e) {
        e.preventDefault();
        const src = $(this).data('src');
        var video = document.getElementById(src);
        // video.setAttribute("src", src);
        // video.load();
        if ($('.text-box').hasClass('show')) {
            $('.text-box').removeClass('show');
            setTimeout(() => {
                $('.text-box').addClass('show');
            }, 16000);
        }
        $('.start').removeClass('show');

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

        $('#' + src).addClass('display');
        $('#' + src).siblings().removeClass('show');
        $('.' + src).addClass('display');
        $('.' + src).siblings().removeClass('show');
        setTimeout(() => {
            video.play();
            $('#' + src).addClass('show');
            $('#' + src).siblings().removeClass('display');
            $('.' + src).addClass('show');
            $('.' + src).siblings().removeClass('display');
        }, 500);
    });

    // modal btn
    $('.modal-btn').click(function () {
        const id = $(this).data('id');

        $('#' + id).slideDown(0).siblings('.modal-content').slideUp(0);
        $('.blocker').addClass('show_1');
        setTimeout(() => {
            $('.blocker').addClass('show_2');
        }, 100);
    })

    $('.blocker').click(function (e) {
        const $target = $(e.target);

        if ($target.closest('.modal').length && $('.blocker').is(":visible")) {
            return
        }
        $('.blocker').removeClass('show_2');
        setTimeout(() => {
            $('.blocker').removeClass('show_1');
        }, 500);
    });

    $('.close-modal').click(function (e) {
        e.preventDefault();
        $('.blocker').removeClass('show_2');
        setTimeout(() => {
            $('.blocker').removeClass('show_1');
        }, 500);
    });
});

// swiper
const swiper = new Swiper('.swiper.menu', {
    // Optional parameters
    // direction: 'vertical',
    // loop: true,
    slidesPerView: 5,
    spaceBetween: 15,
    // centeredSlides: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
const swiperEdm = new Swiper('.swiper.edm', {
    // Optional parameters
    // direction: 'vertical',
    // loop: true,
    slidesPerView: 5, // or 'auto'
    spaceBetween: 30,
    preventClicks: true,
    grid: {
        rows: 2,
    },
    // centeredSlides: true,
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    // scrollbar: {
    //     el: '.swiper-scrollbar',
    // },
});

// img可直接使用svg
$(function () {
    jQuery('img.svg').each(function () {
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, else we gonna set it if we can.
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });


    $(window).on('load', function () {
        var $win = $(window),
            $ad = $('.fixed_tag').css('opacity', 0).show(), // 讓廣告區塊變透明且顯示出來
            _width = $ad.width(),
            _height = $ad.height(),
            _diffY = 670,
            _diffX = 25, // 距離右及下方邊距
            _moveSpeed = 800; // 移動的速度

        // 先把 #abgne_float_ad 移動到定點
        $ad.css({
            top: $(document).height(),
            left: $win.width() - _width - _diffX,
            opacity: 1
        });

        // 幫網頁加上 scroll 及 resize 事件
        $win.bind('scroll resize', function () {
            var $this = $(this);

            //max修改  縮減fixedmenu 上方距離至與RWD同步
            if ($win.width() >= 1024) {
                $top = 0;
                // console.log($('.fixed_tag').scrollTop());

                $ad.stop().animate({
                    top: $this.scrollTop() + (100)
                }, _moveSpeed);

                //max新增 pad寬度下的 上方空間
            } else if ($win.width() >= 768) {
                $ad.stop().animate({
                    top: $this.scrollTop() + (80)
                }, _moveSpeed);

            } else {
                $ad.stop().animate({
                    // top: $this.scrollTop() + ($win.height() - 100)
                    top: $this.scrollTop() + (80)
                }, _moveSpeed);
            }
        }).scroll(); // 觸發一次 scroll()



    });

});

if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    $('video').attr('playsinline', 'true');
    $('video').removeAttr('autoplay');
    $('.text-box').css('z-index', 999);
    $('.text-box').css('transition', 'none');
    // $('.text-box').addClass('show');
    alert('請將手機螢幕轉為橫向以欣賞影片!');
} else {
    setTimeout(() => {
        $('.text-box').addClass('show');
    }, 16000);
}