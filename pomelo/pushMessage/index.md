# pushMessage & pushMessageByUids & broadcast

## pushMessage

```

/**
 * Push message to all the members in the channel
 *
 * @param {String} route message route
 * @param {Object} msg message that would be sent to client
 * @param {Object} opts user-defined push options, optional
 * @param {Function} cb callback function
 */

var channelService = pomelo.app.get('channelService');
var channel = channelService.getChannel(channelName, false);
var params = {
    route:  'onChat',
    msg:    {},
};

channel.pushMessage(params);
```
## pushMessageByUids
```

/**
 * Push message by uids.
 * Group the uids by group. ignore any uid if sid not specified.
 *
 * @param {String} route message route
 * @param {Object} msg message that would be sent to client
 * @param {Array} uids the receiver info list, [{uid: userId, sid: frontendServerId}]
 * @param {Object} opts user-defined push options, optional 
 * @param {Function} cb cb(err)
 * @memberOf ChannelService
 */

var channelService = pomelo.app.get('channelService');

channelService.pushMessageByUids(route, msg, uids, opt, callback);

```


## broadcast

```
/**
 * Broadcast message to all the connected clients.
 *
 * @param  {String}   stype      frontend server type string
 * @param  {String}   route      route string
 * @param  {Object}   msg        message
 * @param  {Object}   opts       user-defined broadcast options, optional
 *                               opts.binded: push to binded sessions or all the sessions
 *                               opts.filterParam: parameters for broadcast filter.
 * @param  {Function} cb         callback
 * @memberOf ChannelService
 */

var channelService = pomelo.app.get('channelService');
//ex: stype -> connector
channelService.broadcast(stype, route, msg, opts, callback)

```


