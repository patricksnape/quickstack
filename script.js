// Used for ids
var i = 0;

function toggleExpando(excerpt, full, expando) {
    $(expando).toggleClass('qscollapsed').toggleClass('qsexpanded');
    $(excerpt).fadeToggle(500);
    $(full).slideToggle(500);
}

$(document).ready(function() {
    // Currently doesn't work on summary page
    $('code').each(function() {
        var that = $(this);
        var parent = $(this).closest('.answer');
        var id;

        // If code is in answer then find correct id
        // else switch parent and set id
        if (parent.length != 0) {
            id = $(parent).attr('data-answerid');
        } else {
            parent = $(this).closest('.question');
            id = $(parent).attr('data-questionid');
        }
       
        var spans = $(that).find('span');
        
        // Only bother if it's a muli-line piece of code
        if (spans.length != 0) {
            var data = [];
            data.push(
                spans.text(),
                '\n'
            );
            
            var dialogId = 'dialog-modal' + id + '-' + i;
            
            $('body').append(
                    $('<textarea/>')
                        .attr('type', 'hidden')
                        .attr('id', dialogId)
                        .text(data)
            );
            
            $(this).dblclick(function() {
				chrome.extension.sendMessage($('#' + dialogId).text());
            });
            
            i++;
        }
    });

    $('.summary > h3').each(function () {
        // Get the summary div and id of the question
        var summary = $(this).parent('.summary').parent();
        var id = $(summary).attr('id').match('[0-9]+');

        // Create a new question div who's class matches the summary
        // Append it after the summary and hide it
        var excerpt = $(this).siblings('.excerpt');
        var full = $(excerpt).clone().html("").hide();
        $(this).after(full);

        // Don't create an expando if it's a one line question
        if ($(excerpt).text().indexOf("...") != -1) {
            // Create a button to expand and collapse the question body
            var expando = document.createElement('span');
            $(expando).html('&nbsp;&nbsp;&nbsp;&nbsp;').addClass('qscollapsed')
                .click(function () {
                    if (!$(full).html()) {
                        $.get('https://api.stackexchange.com/2.1/questions/' + id + '?key=ccT8pcgxKLVpiCDOY2E9IQ((&order=desc&sort=activity&site=stackoverflow&filter=!)5E5HksQ.(saTK-ZSUzx*9N_1mst')
                            .success(function (data) {
                                $(full).html(data.items[0].body);
                            })
                            .complete(function () {
                                toggleExpando(excerpt, full, expando);
                            });
                    } else {
                        toggleExpando(excerpt, full, expando);
                    }
                });

            $(this).append(expando);
        }
    });
});
