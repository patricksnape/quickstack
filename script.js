$('.summary > h3').each(function () {
    // Get the summary div and id of the question
    var summary = $(this).parent('.summary').parent();
    var id = $(summary).attr('id').match('[0-9]+');

    // Create a new question div who's class matches the summary
    // Append it after the summary and hide it
    var question = document.createElement('div');
    $(question).addClass($(summary).attr("class")).css('background-color', '#B2FFFF').hide();
    $(summary).after($(question));

    // Create a button to expand and collapse the question body
    var expando = document.createElement('span');
    $(expando).html('&nbsp;&nbsp;&nbsp;&nbsp;').addClass('qscollapsed')
        .click(function () {
            if (!$(question).html()) {
                $.get('https://api.stackexchange.com/2.1/questions/' + id + '?key=ccT8pcgxKLVpiCDOY2E9IQ((&order=desc&sort=activity&site=stackoverflow&filter=!)5E5HksQ.(saTK-ZSUzx*9N_1mst')
                    .success(function (data) {
                        $(question).html(data.items[0].body);
                    })
                    .complete(function () {
                        toggleExpando(question, expando);
                    });
            } else {
                toggleExpando(question, expando);
            }
        });

    $(this).append(expando);
});

function toggleExpando(question, expando) {
    $(expando).toggleClass('qscollapsed').toggleClass('qsexpanded');
    $(question).slideToggle(500);
}
