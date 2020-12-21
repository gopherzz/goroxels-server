const { ROLE } = require('../../constants');
const logger = require('../../logger')('ME', 'debug');

module.exports = (req, res) => {
    const me = {
        registered: false,
        role: ROLE.USER
    }

    if (req.user) {
        me.registered = true;
        me.name = req.user.name;
        me.role = ROLE[req.user.role];

        if(me.role === undefined){
            logger.warn('me.role is undefined!', JSON.stringify(me));
            me.role = ROLE.USER;
        }
    }

    res.set({
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
    });
    res.json(me);
}