$(document).ready(function () {
    $(".btnPage").click(function () {
        let colore1 = $(this).attr("colore1");
        let colore2 = $(this).attr("colore2");
        let colore3 = $(this).attr("colore3");
        $("#horizontalFlagContainer").hide();
        $("#verticalFlagContainer").show();
        cambiaColoreBandiera(colore1, colore2, colore3);
    });

    $(".btnHorizontalPage").click(function () {
        let colore1 = $(this).attr("colore1");
        let colore2 = $(this).attr("colore2");
        let colore3 = $(this).attr("colore3");
        $("#verticalFlagContainer").hide();
        $("#horizontalFlagContainer").show();
        cambiaColoreBandieraOrizzontale(colore1, colore2, colore3);
    });
});

function cambiaColoreBandiera(colore1, colore2, colore3) {
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        slideUpDown(colore1, colore2, colore3);
    } else {
        fadeInOut(colore1, colore2, colore3);
    }
}

function slideUpDown(colore1, colore2, colore3) {
    $(".div33").slideUp(200, function () {
        $("#div1").css("background-color", colore1);
        $("#div2").css("background-color", colore2);
        $("#div3").css("background-color", colore3);
        $(".div33").slideDown(200);
    });
}

function fadeInOut(colore1, colore2, colore3) {
    $(".div33").fadeOut(200, function () {
        $("#div1").css("background-color", colore1);
        $("#div2").css("background-color", colore2);
        $("#div3").css("background-color", colore3);
        $(".div33").fadeIn(200);
    });
}

function cambiaColoreBandieraOrizzontale(colore1, colore2, colore3) {
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        slideUpDownOrizzontale(colore1, colore2, colore3);
    } else {
        fadeInOutOrizzontale(colore1, colore2, colore3);
    }
}

function slideUpDownOrizzontale(colore1, colore2, colore3) {
    $("#horizontalFlagContainer").slideUp(200, function () {
        $("#horDiv1").css("background-color", colore1);
        $("#horDiv2").css("background-color", colore2);
        $("#horDiv3").css("background-color", colore3);
        $("#horizontalFlagContainer").slideDown(200);
    });
}

function fadeInOutOrizzontale(colore1, colore2, colore3) {
    $("#horizontalFlagContainer").fadeOut(200, function () {
        $("#horDiv1").css("background-color", colore1);
        $("#horDiv2").css("background-color", colore2);
        $("#horDiv3").css("background-color", colore3);
        $("#horizontalFlagContainer").fadeIn(200);
    });
}
