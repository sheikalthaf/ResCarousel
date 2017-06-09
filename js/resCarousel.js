//resCarousel
$(document).ready(function() {
    $('.leftRs, .rightRs').click(function() {
        // alert("btnClick");
        resCarouselBtn(this);
    });
    ResCarouselSize();
});


function resCarouselBtn(element) {
    var cond = $(element).hasClass("leftRs");
    cond ? click(0, element) : click(1, element)
}

$(window).resize(function() {
    ResCarouselSize();
});

//It is used to get some elements from btn
function click(flag, ee) {
    var Parent = "#" + $(ee).parent().attr("id");
    var slide = $(Parent).attr("data-slide");
    ResCarousel(flag, Parent, parseInt(slide));
}

//this function define the size of the items
function ResCarouselSize() {

    var incno = 0;
    var id = 0;
    var itemWidth = "";
    var sampwidth = $('.resCarousel').width();
    var itemsDiv = ('.resCarousel-inner');
    var bodyWidth = $('body').width();
    $(itemsDiv).each(function() {
        id = id + 1;
        var divValue = parseInt($(this).parent().attr('value'));
        var itemNumbers = $(this).find('item').length;
        var itemsSplit = $(this).parent().attr("data-items").split(',');
        var parnid = $(this).parent().attr("id", "ResSlid" + id);
        //$(this).css({ 'transition': '' });

        if (bodyWidth >= 1200) {
            incno = itemsSplit[3];
        } else if (bodyWidth >= 992) {
            incno = itemsSplit[2];
        } else if (bodyWidth >= 768) {
            incno = itemsSplit[1];
        } else {
            incno = itemsSplit[0];
        }
        itemWidth = sampwidth / incno;

        //$(this).find(itemClass).each(function(){
        //	$(this).outerWidth(itemWidth);
        //});

        $(this).find("style").remove();
        $(this).append("<style>#ResSlid" + id + " .item {width: " + itemWidth + "px}</style>");
        $(this).attr("data-width", itemWidth)
        console.log(itemWidth);
        // value available
        var val = $(this).parent().attr('value');
        if (val) {
            $(this).scrollLeft(val * itemWidth);

            // $(this).css("transform", "translateX(-" + divValue * itemWidth + "px)");
        } else {
            //$(this).css('transform', 'translateX(0px)');
            $(this).parent().attr("value", "0");
        }
        //$(this).slideDown(200);
        //$(this).css({ 'width': itemWidth * itemNumbers, 'transition': '.6s ease all' });

        $(this).parent().attr("data-slide", incno);
        $(".leftRs").addClass("outt");
        $(".rightRs").removeClass("outt");

    });
}

//this function used to move the items
function ResCarousel(flag, element, slide) {
    var leftBtn = $(element).find('.leftRs'),
        rightBtn = $(element).find('.rightRs'),
        itemsDiv = $(element).find('.resCarousel-inner'),
        divValue = parseInt($(element).attr('value')),
        itemWidth = itemsDiv.attr("data-width"),
        itemSpeed = parseInt($(element).attr("data-speed")),
        translateXval = '',
        currentSlide = ""
        //var itemWidth123 = $(element).find('.item').outerWidth();
    itemSpeed = !isNaN(itemSpeed) ? itemSpeed : 400;
    var itemLenght = $(element).find(".item").length;

    if (flag == 0) {

        currentSlide = divValue - slide;
        translateXval = currentSlide * itemWidth
        rightBtn.removeClass("outt");

        var MoveSlide = currentSlide + slide;

        var itemFilled = leftBtn.attr("data-filled");
        console.log(itemFilled);
        if (itemFilled == 0) {
            //currentSlide = currentSlide - (MoveSlide - itemLenght);
            currentSlide = itemLenght - slide;
            translateXval = currentSlide * itemWidth;

            console.log(currentSlide + "," + translateXval);
            leftBtn.attr("data-filled", 1);
        } else if (slide >= MoveSlide) {
            currentSlide = translateXval = 0;
            leftBtn
            //.addClass("outt")
                .attr("data-filled", 0);
        }

    } else if (flag == 1) {
        currentSlide = divValue + slide;
        translateXval = currentSlide * itemWidth
        leftBtn.removeClass("outt");

        currentSlide = divValue + slide;
        var MoveSlide = currentSlide + slide;

        console.log(itemLenght + "," + MoveSlide);
        var itemFilled = rightBtn.attr("data-filled");
        if (itemFilled == 0) {
            currentSlide = translateXval = 0;
            rightBtn.attr("data-filled", 1);
        } else
        if (itemLenght <= MoveSlide) {
            currentSlide = currentSlide - (MoveSlide - itemLenght);
            //currentSlide = itemLenght;
            translateXval = currentSlide * itemWidth;
            // rightBtn.addClass("outt");
            rightBtn.attr("data-filled", 0);
        }
    }
    //console.log(itemsDiv.scrollLeft() + "," + translateXval)
    console.log(itemSpeed);
    itemsDiv.animate({ scrollLeft: translateXval }, itemSpeed);

    $(element).attr("value", currentSlide);
}