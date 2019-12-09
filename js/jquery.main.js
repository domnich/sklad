jQuery(window).on('load', function(){
    initPricesTabs();
});

function initPricesTabs() {
    var holder = jQuery('#prices'),
        tabs = holder.find('.prices-tabs li'),
        activeClass = 'active';
    
    jQuery.each(tabs, function( index, li ) {
        var item = jQuery(this),
            link = item.find('a');
        link.on('click', function(e) {
            animateNumber(tabs.filter('.active'), item);
            hideTab(tabs.filter('.active'));
            showTab(item);
            
            e.preventDefault();
        });
    });

    function showTab(el) {
        el.addClass(activeClass);
        var href = el.find('a').attr('href');
        jQuery('#' + href).css({
            display: 'flex'
        });
    }
    function hideTab(el) {
        el.removeClass(activeClass);
        var href = el.find('a').attr('href');
        jQuery('#' + href).css({
            display: 'none'
        });
    }

    function animateNumber(fromObj, toObj) {
        var fromHref = fromObj.find('a').attr('href'),
            toHref = toObj.find('a').attr('href'),
            fromItem =  jQuery('#' + fromHref).find('.txt .price span'),
            toItem =  jQuery('#' + toHref).find('.txt .price span'),
            startIndex = fromItem.text()*1,
            endIndex = toItem.text()*1,
            intervalListener;

        if (startIndex < endIndex) {
            intervalListener = setInterval(function () {
                startIndex += 150;
                if (startIndex > endIndex) {
                    toItem.text(endIndex);
                    startIndex = endIndex;
                } else {
                    toItem.text(startIndex);
                }
                if (startIndex >= endIndex) {
                    window.clearInterval(intervalListener);
                }
            }, 10);
        } else {
            intervalListener = setInterval(function () {
                startIndex -= 50;
                if (startIndex < endIndex) {
                    toItem.text(endIndex);
                    startIndex = endIndex;
                } else {
                    toItem.text(startIndex);
                }
                if (startIndex <= endIndex) {
                    window.clearInterval(intervalListener);
                }
            }, 10);
        }
    }
}