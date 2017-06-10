//resCarousel
$(document).ready(function() {
    $('.leftRs, .rightRs').click(function() {
        // alert("btnClick");
        ResCarousel(this);
    });
    ResCarouselSize();
    ResAutoSlide();
});

$(window).resize(function() {
    ResCarouselSize();
});

// Rescarousel Auto Slide
function ResAutoSlide() {
    $(".resCarousel").each(function() {
        var thiss = $(this).find(".rightRs");
        var dataInterval = $(this).attr('data-interval');
        if (!isNaN(dataInterval)) {
            setInterval(function() {
                ResCarousel(thiss);
            }, parseInt(dataInterval));
        }
    });
}

//this function define the size of the items
function ResCarouselSize() {

    var incno = 0;
    var id = 0;
    var itemsDiv = ('.resCarousel-inner');
    var bodyWidth = $('body').width();
    $(itemsDiv).each(function() {
        id++;
        var sampwidth = $(this).width();

        var itemsSplit = $(this).parent().attr("data-items").split(',');

        $(this).parent().attr("id", "ResSlid" + id);

        if (bodyWidth >= 1200) {
            incno = itemsSplit[3];
        } else if (bodyWidth >= 992) {
            incno = itemsSplit[2];
        } else if (bodyWidth >= 768) {
            incno = itemsSplit[1];
        } else {
            incno = itemsSplit[0];
        }
        var itemWidth = sampwidth / incno;

        $(this).find("style").remove();
        $(this).append("<style>#ResSlid" + id + " .item {width: " + itemWidth + "px}</style>");
        //$(this).attr("data-width", itemWidth);
        //console.log(itemWidth);

        // value available
        var divValue = $(this).parent().attr('value');
        if (divValue) {
            $(this).scrollLeft(divValue * itemWidth);
        } else {
            $(this).parent().attr("value", "0");
        }

        $(this).parent().attr("data-itm", incno);

    });
}

//this function used to move the items
function ResCarousel(Btn) {
    var t0 = performance.now();
    var parent = $(Btn).parent();
    var leftBtn = parent.find('.leftRs'),
        rightBtn = parent.find('.rightRs'),
        slide = parseInt(parent.attr("data-slide")),
        itemsDiv = parent.find('.resCarousel-inner'),
        divValue = parseInt(parent.attr('value')),
        //itemWidth = itemsDiv.attr("data-width"),
        itemSpeed = parseInt(parent.attr("data-speed")),
        translateXval = '',
        currentSlide = "",
        itemLenght = itemsDiv.find(".item").length;
    var itemWidth = itemsDiv.find('.item').outerWidth();

    var dataItm = parseInt(parent.attr("data-itm"));
    var cond = $(Btn).hasClass("leftRs");
    //console.log(cond);
    if (cond) {

        currentSlide = divValue - slide;
        translateXval = currentSlide * itemWidth
        var MoveSlide = currentSlide + slide;

        var itemloop = leftBtn.attr("data-loop");
        rightBtn.attr("data-loop", 1);
        //console.log(itemloop);
        if (itemloop == 0) {
            currentSlide = itemLenght - slide;
            translateXval = currentSlide * itemWidth;
            currentSlide = itemLenght - dataItm;

            //console.log(currentSlide + "," + translateXval);
            leftBtn.attr("data-loop", 1);
            rightBtn.attr("data-loop", 0);
        } else if (slide >= MoveSlide) {
            currentSlide = translateXval = 0;
            leftBtn.attr("data-loop", 0);

        }

    } else {
        currentSlide = divValue + slide;
        translateXval = currentSlide * itemWidth
        leftBtn.attr("data-loop", 1);
        var MoveSlide = currentSlide + slide;

        //console.log(itemLenght + "," + (MoveSlide + "," + slide + "," + dataItm));
        //console.log(itemLenght + "," + (MoveSlide - slide + dataItm));
        var itemloop = rightBtn.attr("data-loop");

        if (itemloop == 0) {
            currentSlide = translateXval = 0;
            rightBtn.attr("data-loop", 1);
            leftBtn.attr("data-loop", 0);
        } else if (itemLenght <= (MoveSlide - slide + dataItm)) {
            currentSlide = itemLenght - slide;
            translateXval = currentSlide * itemWidth;
            currentSlide = itemLenght - dataItm;

            rightBtn.attr("data-loop", 0);
        }
    }
    //console.log(itemsDiv.scrollLeft() + "," + translateXval)
    //console.log(itemSpeed);
    itemSpeed = !isNaN(itemSpeed) ? itemSpeed : 400;

    itemsDiv.animate({ scrollLeft: translateXval }, itemSpeed);
    parent.attr("value", currentSlide);

    var t1 = performance.now();
    console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate');
}