module.exports = postmarkLog;

var Client = require('postmark');
var moment = require('moment');
var async = require('async');

var serverKey = process.env.PM_SERVER_KEY;
var client = new Client(serverKey);


var todate = moment().toISOString();
var fromdate = moment().subtract(3, 'days').toISOString();


console.error(`Log sent emails between ${fromdate} - ${todate}`);


function dumpMessage(msg) {
  var r = {
    _id: msg.MessageID,
    tag: msg.Tag,
    time: msg.ReceivedAt,
    to: msg.To[0].Email,
    subject: msg.Subject
  };
  if (!r.tag) {
    delete r.tag;
  }
  console.log(JSON.stringify(r));
  return r;
}

function postmarkLog() {
  var offset = 0,
    total = 0;

  function getMessages(fn) {
    console.error(`Querying from ${offset}...`);
    client.getOutboundMessages({
      count: 500, // 500 is maximum
      offset,
      fromdate,
      todate
    }, function(err, messages) {
      if (err) { return fn(err); }
      if (!total) {
        total = messages.TotalCount;
      }
      messages.Messages.forEach(dumpMessage);
      offset += messages.Messages.length;
      fn(null, offset);
    });
  }

  async.doUntil(
    getMessages,
    offset => offset >= total,
    err => console.error(err || 'Done!')
  );
}
