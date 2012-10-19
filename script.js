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

function toggleExpando(excerpt, full, expando) {
    $(expando).toggleClass('qscollapsed').toggleClass('qsexpanded');
    $(excerpt).fadeToggle(500);
    $(full).slideToggle(500);
}
