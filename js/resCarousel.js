//resCarousel
$(document).ready(function() {
    $(document).on('click', '.leftRs, .rightRs', function() {
        ResCarousel(this);
    });
    $(document).on("mouseenter", ".ResHover", function() {
        $(this).addClass("ResHovered");
    });

    $(document).on("mouseleave", ".ResHover", function() {
        $(this).removeClass("ResHovered");
    });
    ResCarouselSize();
    ResCarouselSlide();
});

$(window).resize(function() {
    //ResCarouselSize();
    ResCarouselResize();
});

// Rescarousel Auto Slide
function ResCarouselSlide() {
    $(".resCarousel").each(function() {
        var thiss = $(this).find(".rightRs");
        var dataInterval = $(this).attr('data-interval');
        !isNaN(dataInterval) && $(this).addClass("ResHover") && setInterval(function() {
            !(thiss.parent().hasClass("ResHovered")) && ResCarousel(thiss);
            //console.log(thiss.parent().hasClass("ResHovered"))
        }, parseInt(dataInterval));
    });
}

function ResCarouselResize() {
    var it = 0,
        r = $('body').width();
    $('.resCarousel').each(function() {
        var itemsSplit = $(this).attr("data-items").split(',');
        var divValue = $(this).attr('data-value');
        var itemWidth = $(this).find('.item').width();
        $(this).find(".resCarousel-inner").scrollLeft(divValue * itemWidth);
        it = r >= 1200 ? itemsSplit[3] : r >= 992 ? itemsSplit[2] : r >= 768 ? itemsSplit[1] : itemsSplit[0];
        $(this).attr("data-itm", it);
    });
}

//this function define the size of the items
function ResCarouselSize() {
    //var t0 = performance.now();
    var it = 0,
        r = $('body').width(),
        styleCollector = styleCollector0 = styleCollector1 = styleCollector2 = styleCollector3 = "";

    $('.resCarousel').each(function(index) {
        var itemsSplit = $(this).attr("data-items").split(',');
        $(this).addClass("ResSlid" + index);

        for (var i = 0; i < 4; i++) {
            if (i == 0) {
                styleCollector0 += ".ResSlid" + index + " .item {width: " + 100 / itemsSplit[i] + "%}";
            } else if (i == 1) {
                styleCollector1 += ".ResSlid" + index + " .item {width: " + 100 / itemsSplit[i] + "%}";
            } else if (i == 2) {
                styleCollector2 += ".ResSlid" + index + " .item {width: " + 100 / itemsSplit[i] + "%}";
            } else if (i == 3) {
                styleCollector3 += ".ResSlid" + index + " .item {width: " + 100 / itemsSplit[i] + "%}";
            }
        }

        $(this).attr("data-value", "0");
        $(this).find(".leftRs").attr("data-loop", 0);
        it = r >= 1200 ? itemsSplit[3] : r >= 992 ? itemsSplit[2] : r >= 768 ? itemsSplit[1] : itemsSplit[0];
        $(this).attr("data-itm", it);
    });

    styleCollector = "@media (max-width:767px){" + styleCollector0 + "}" +
        "@media (min-width:768px){" + styleCollector1 + "}" +
        "@media (min-width:992px){" + styleCollector2 + "}" +
        "@media (min-width:1200px){" + styleCollector3 + "}";


    //console.log(styleCollector);
    $("body").append("<div class=\"ResStyleManager\"></div>")
    $('.ResStyleManager').html(null).append("<style>" + styleCollector + "</style>");
    //var t1 = performance.now();
    //console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to Size');
}

//this function used to move the items
function ResCarousel(Btn) {
    //var t0 = performance.now();
    var parent = $(Btn).parent(),
        leftBtn = parent.find('.leftRs'),
        rightBtn = parent.find('.rightRs'),
        slide = parseInt(parent.attr("data-slide")),
        itemsDiv = parent.find('.resCarousel-inner'),
        divValue = parseInt(parent.attr('data-value')),
        itemSpeed = parseInt(parent.attr("data-speed")),
        translateXval = '',
        currentSlide = "",
        itemLenght = itemsDiv.find(".item").length,
        itemWidth = itemsDiv.find('.item').outerWidth(),
        dataItm = parseInt(parent.attr("data-itm")),
        cond = $(Btn).hasClass("leftRs");
    //console.log(cond);
    itemSpeed = !isNaN(itemSpeed) ? itemSpeed : 400;
    slide = slide < dataItm ? slide : dataItm;

    if (cond) {

        currentSlide = divValue - slide;
        translateXval = currentSlide * itemWidth;
        var MoveSlide = currentSlide + slide;

        var itemloop = leftBtn.attr("data-loop");
        rightBtn.attr("data-loop", 1);
        //console.log(itemloop);
        if (itemloop == 0) {
            currentSlide = itemLenght - slide;
            translateXval = currentSlide * itemWidth;
            currentSlide = itemLenght - dataItm;
            itemSpeed = 400;
            //console.log(currentSlide + "," + translateXval);
            leftBtn.attr("data-loop", 1);
            rightBtn.attr("data-loop", 0);
        } else if (slide >= MoveSlide) {
            currentSlide = translateXval = 0;
            leftBtn.attr("data-loop", 0);

        }

    } else {
        currentSlide = divValue + slide;
        translateXval = currentSlide * itemWidth;
        leftBtn.attr("data-loop", 1);
        var MoveSlide = currentSlide + slide;

        //console.log(itemLenght + "," + (MoveSlide + "," + slide + "," + dataItm));
        //console.log(itemLenght + "," + (MoveSlide - slide + dataItm));
        var itemloop = rightBtn.attr("data-loop");

        if (itemloop == 0) {
            currentSlide = translateXval = 0;
            rightBtn.attr("data-loop", 1);
            leftBtn.attr("data-loop", 0);
            itemSpeed = 400;
        } else if (itemLenght <= (MoveSlide - slide + dataItm)) {
            currentSlide = itemLenght - slide;
            translateXval = currentSlide * itemWidth;
            currentSlide = itemLenght - dataItm;

            rightBtn.attr("data-loop", 0);
        }
    }
    //console.log(itemsDiv.scrollLeft() + "," + translateXval)
    //console.log(itemSpeed);

    itemsDiv.animate({ scrollLeft: translateXval }, itemSpeed);
    parent.attr("data-value", currentSlide);

    //var t1 = performance.now();
    //console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate');
}