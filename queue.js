function connect() {
    return require('amqplib').connect("amqp://localhost")
        .then(conn => conn.createChannel());
}

function createQueue(channel, queue) {
    return new Promise((resolve, reject) => {
        try {
            channel.assertQueue(queue, { durable: false });
            resolve(channel);
        }
        catch (err) { reject(err) }
    });
}

function consume(queue, callback) {
    connect()
        .then(channel => createQueue(channel, queue))
        .then(channel => channel.consume(queue, callback, { noAck: true }))
        .catch(err => console.log(err));
}

module.exports = {
    consume
}
