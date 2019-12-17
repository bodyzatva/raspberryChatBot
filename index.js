global.XMLHttpRequest = require('xhr2');
global.WebSocket = require('ws');

const { DirectLine } = require('botframework-directlinejs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("Starting DirectLine");
var directLine = new DirectLine({
    secret: "insert secret",
    pollingInterval: 1000,
});

readline.setPrompt('User> ');
readline.prompt();

readline.on('line', function (line) {
    switch (line.trim()) {
        case 'hello':
            console.log('world!');
            break;
        default:
            directLine.postActivity({
                from: { id: 'myUserId', name: 'myUserName' }, // required (from.name is optional)
                type: 'message',
                text: line.toString()
            }).subscribe(
                //id => console.log("Posted activity, assigned ID ", id),
                //error => console.log("Error posting activity", error)
            );
            break;
    }
    //readline.prompt();
}).on('close', function () {
    console.log('Have a great day!');
    process.exit(0);
});

directLine.activity$
    .subscribe(
        activity => {
            console.log(activity);
            if (activity.type.toString() == "message") {
                console.log("SaraAS> ", activity.text.toString());
                readline.setPrompt('User> ');
            }
        });

