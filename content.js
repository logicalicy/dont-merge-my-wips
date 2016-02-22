var commitMessages = $('.commits-list-item .commit-title .message');
var count = 0;
$.each(commitMessages, function (key, message) {
    var text = $(message).text();
    if (new RegExp("wip", "gi").exec(text)) {
        count += 1;
    }
});
if (count > 0) {
    alert('You have ' + count + ' WIPs to squash.');
}
var button = $('.js-merge-branch-action');
if (button.length === 0) {
    alert(
        'The "Don\'t merge my WIPs!" Chrome plugin cannot find the '
        + '"Merge pull request button". Please update the plugin.'
    );
}
else {
    if (count > 0) {
        $(button[0]).css('background-image', 'linear-gradient(red, darkred)');
        $(button[0]).prop('disabled', true);
    }
    $(button[0]).click(function(event) {
        if (count === 0) {
            alert('No WIPs found. Good job!');
        }
        if (count > 0) {
            var errorMessage = 'What do you think you\'re doing? You have '
                + count + ' WIPs to squash!';
            alert(errorMessage);
            event.preventDefault();
            event.stopPropagation();
            throw new Error(errorMessage);
        }
    });
}
