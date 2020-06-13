var amqp = require('amqplib/callback_api');
const CONN_URL = `amqp://${process.env.USER_QUEUE_HOST}`

function start(onMessageCallback) {
    console.log('[AMQP] Connecting to ' + CONN_URL)
    amqp.connect(CONN_URL, function (err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function (err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function () {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });
        console.log("[AMQP] connected");


        function startWorker() {
            console.log('[AMQP] Starting Worker')
            conn.createChannel(function (err, ch) {
                ch.on("error", function (err) {
                    console.error("[AMQP] channel error", err.message);
                });
                ch.on("close", function () {
                    console.log("[AMQP] channel closed");
                });

                ch.consume("new-user-queue", (msg) => {
                    console.log('[AMQP] - User created message received')
                    onMessageCallback(msg)
                    ch.ack(msg)
                }, { noAck: false });
                console.log("[AMQP] Worker is started");
            });
        }

        startWorker()
    });
}


module.exports = {
    start
}