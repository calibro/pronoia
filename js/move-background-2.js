$(document).ready(function () {
    $('#layer-one').mousemove(function (e) {
        parallax(e, this, 1);
        parallax(e, document.getElementById('layer-two'), 2);

        //parallax(e, document.getElementById('slider'), 0);
    });
});

function parallax(e, target, layer) {
    var layer_coeff = 50 / layer;
    var x = ($(window).width() - target.offsetWidth) / 2 - (e.pageX - ($(window).width() / 4)) / layer_coeff;
    var y = ($(window).height() - target.offsetHeight) / 0 - (e.pageY - ($(window).height() / 2)) / layer_coeff;
    $(target).offset({ top: y ,left : x });
};
