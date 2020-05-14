module.exports = postmarkLog;

const Client = require('postmark');
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


function getDateRange(days) {
  const to = new Date();
  const from = new Date();
  from.setDate(to.getDate() - days);

  return {
    fromdate: from.toISOString(),
    todate: to.toISOString()
  };
}


function postmarkLog({ serverKey, days }) {
  let offset = 0;
  let total = 0;

  const client = new Client(serverKey);
  const { fromdate, todate } = getDateRange(days);

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
