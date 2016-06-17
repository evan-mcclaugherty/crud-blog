exports.seed = function(knex, Promise) {
    return knex.raw('TRUNCATE comment, post, person RESTART IDENTITY CASCADE')
        .then(function() {
            return Promise.all([
                knex('person').insert({
                    name: 'Evan McClaugherty'
                }).returning('id'),
                knex('person').insert({
                    name: 'Zach Zimmerman'
                }).returning('id'),
                knex('person').insert({
                    name: 'Steven Lawson'
                }).returning('id')
            ]);
        })
        .then(function(ids) {
            console.log(ids);
            var evan = ids[0][0],
                zach = ids[1][0],
                steven = ids[2][0];
            return Promise.join(
                knex('post').insert({
                    name: 'Node',
                    blog: 'This node sticker is really fucking cool, i got one.',
                    image: 'http://ih1.redbubble.net/image.109336620.1604/sticker,220x200-pad,220x200,ffffff.u1.jpg',
                    user_id: evan
                }).returning('id'),
                knex('post').insert({
                    name: 'Postgres',
                    blog: 'I want one and elephants are awesome!',
                    image: 'http://devstickers.com/assets/img/pro/7vhj.png',
                    user_id: zach
                }).returning('id'),
                knex('post').insert({
                    name: 'NPM',
                    blog: 'I love it when the progress bar is loading and it\'s doing a bunch of cute little computer stuff',
                    image: 'http://ih0.redbubble.net/image.44254680.7046/sticker,375x360.png',
                    user_id: steven
                }).returning('id')
            ).then(function(postIds) {
                return {
                    posts: {
                        zero: postIds[0][0],
                        one: postIds[1][0],
                        two: postIds[2][0]
                    },
                    users: {
                        evan: evan,
                        zach: zach,
                        steven: steven
                    }
                };
            });
        })
        .then(function(data) {
            return Promise.join(
                knex('comment').insert({
                    comment: 'Why am I commenting on yours?',
                    user_id: data.users.zach,
                    post_id: data.posts.zero
                }),
                knex('comment').insert({
                    comment: 'Evan is the wind beneath my wings!',
                    user_id: data.users.steven,
                    post_id: data.posts.one
                }),
                knex('comment').insert({
                    comment: 'Very, very interesting...',
                    user_id: data.users.evan,
                    post_id: data.posts.two
                })
            );
        });
};
