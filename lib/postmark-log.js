module.exports = postmarkLog;

const Client = require('postmark');
const moment = require('moment');
const async = require('async');

function dumpMessage(msg) {
  const r = {
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

function postmarkLog(opts) {
  let offset = 0;
  let total = 0;

  const client = new Client(opts.serverKey);
  const todate = moment().toISOString();
  const fromdate = moment().subtract(opts.days, 'days').toISOString();

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

  console.error(`Log sent emails between ${fromdate} - ${todate}`);

  async.doUntil(
    getMessages,
    offset => offset >= total,
    err => console.error(err || 'Done!')
  );
}
