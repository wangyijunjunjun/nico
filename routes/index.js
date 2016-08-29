var router = require('koa-router')();
var fetch = require('node-fetch');
var render = require('ejs');

router.get('/', async function (ctx, next) {


    let data, hits;

    let queryBody = ctx.request.query;

    //queryBody非空判断
    let bool = true;

    for (let p in queryBody) {
        bool = false;
    }

    if (bool) {

        //看起来只能重定向了
        ctx.redirect('/query?title=&category=&tags=&author_nickname='
            + '&nico_filetime_gt=&nico_filetime_lt=&nico_filesize_gt=&nico_filesize_lt=&nico_pixels_gt=&nico_pixels_lt='+'&nico_posttime_gt=2015-08-27&nico_posttime_lt=2016-08-28&submit=Search');

        // let responseData = await fetch('http://128.199.96.159:9200/nico/data/_search');
        //
        // data = await responseData.json();
        //
        // hits = data.hits;
        //
        // ctx.state = {
        //   data:hits
        // };
        //
        // await
        // ctx.render('index', {});
        // ctx.response.body = hits;

    } else {

        let url = queryBody.url;
        let vip = queryBody.vip_url;


        ctx.state = {
            url: url,
            vip: vip
        };

        await
        ctx.render('download', {});

    }

    // let responseData = await fetch('http://128.199.96.159:9200/nico/data/_search');
    //
    // data = await responseData.json();
    //
    // hits = data.hits;
    //
    // ctx.state = {
    //   data:hits
    // };
    //
    // await
    // ctx.render('index', {});
}
)
module.exports = router;


// {
//     "_index": "nico",
//     "_type": "data",
//     "_id": "29452962",
//     "_score": 1,
//     "_source": {
//         "height": 480,
//         "thread_id": [
//             1471265449,
//             1471265446
//         ],
//         "is_official": false,
//         "main_genre": "game",
//         "category": "Games",
//         "view_count": 36,
//         "errors": {
//             "once": true
//         },
//         "author": {
//             "nickname": "Fさん♂（実況）",
//             "stamp_exp": 85,
//             "id": 15374748
//         },
//         "is_r18": false,
//         "content": "新実況だああああああ！！！<s>（予定より１０日以上遅れた）</s><br />先にこれ終わらします。（夏休みが終わっちゃう…）<br />このゲームは友人に勧められたのでやったぜい！<br /><br />ＯＰ…↑THE HIGH-LOWS↓（ザ・ハイロウズ）/夏なんだな<br /><br />どもども。<u><font size=\"4\" color=\"#ff0000\"><b>F</b></font>と申すものです。</u><br /><br /><font color=\"#3300cc\">Twitter</font>　 [https://goo.gl/UJmCO4]　<br /><font color=\"#cc0099\">Youtube</font>　[https://goo.gl/Ytr7vk]<br /><br /><font size=\"3\" color=\"#ff0000\"><b>ニコニコミュニティ</b></font>「<a href=\"http://com.nicovideo.jp/community/co3187882\" target=\"_blank\">co3187882</a>」<br />現在ドラクエ４を実況生放送しております。<br />次の予定はクロノトリガーと思ってます。<br /><br />part１→これ　次→まだ<br /><br />ぼくなつマイリス→<a href=\"http://www.nicovideo.jp/mylist/56697253\" target=\"_blank\">mylist/56697253</a>",
//         "width": 854,
//         "comment_count": 0,
//         "length": 1156,
//         "get_at": "2016-08-15T12:52:31.691000",
//         "type": "sm",
//         "my_list_count": 1,
//         "tags": [
//             {
//                 "dic": true,
//                 "id": null,
//                 "name": "Games"
//             }
//         ],
//         "is_public": true,
//         "pixels": 409920,
//         "is_deleted": false,
//         "language": "ja-jp",
//         "country": "jp",
//         "created_at": "2016-08-15T12:50:45",
//         "area": "jp",
//         "is_monetized": false,
//         "__v": 30,
//         "urls": [
//             {
//                 "type": "mp4",
//                 "vip": false,
//                 "cookie": "sm29452962:1471308561:1471308561:60fcce12e4a35d4b:1",
//                 "get_at": "2016-08-16T00:51:01.544000",
//                 "value": "http://smile-fnl11.nicovideo.jp/smile?m=29452962.86217"
//             },
//             {
//                 "cookie": "sm29452962:1471265485:1471265485:c29d980f5e191f1f:1",
//                 "get_at": "2016-08-15T12:53:04.829000",
//                 "type": "mp4",
//                 "vip": true,
//                 "value": "http://smile-pow14.nicovideo.jp/smile?m=29452962.86217"
//             }
//         ],
//         "title": "[ぼくなつ2]☆エンジョイ♪ing「ぼくらのなつやすみ２」2016inサマー＃１"
//     }
// }
