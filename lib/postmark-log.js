module.exports = postmarkLog;

const Client = require('postmark');

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
  let total = -1;

  const count = 500; // 500 is maximum
  const client = new Client(serverKey);
  const { fromdate, todate } = getDateRange(days);

  console.error(`Log sent emails between ${fromdate} - ${todate}`);
  getMessages(err => console.error(err || 'Done!'));

  function getMessages(fn) {
    console.error(`Querying from ${offset}...`);
    client.getOutboundMessages({ count, offset, fromdate, todate }, function(err, messages) {
      if (err) { return fn(err); }

      if (total === -1) {
        total = messages.TotalCount;
      }

      messages.Messages.forEach(dumpMessage);
      offset += messages.Messages.length;

      if (offset < total) {
        process.nextTick(getMessages, fn);
      } else {
        fn();
      }
    });
  }
}
