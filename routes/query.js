var router = require('koa-router')();
var fetch = require('node-fetch');
var http = require('http');

router.get('/', async function (ctx, next) {

    let queryBody = ctx.request.query;

    //根据 queryBody 动态地构造查询语句(must)

    let title = queryBody.title;
    let category = queryBody.category;
    let tags = queryBody.tags;
    let author = queryBody.author_nickname;
    let created_at_gt = queryBody.nico_posttime_gt;
    let created_at_lt = queryBody.nico_posttime_lt;
    let length_gt = queryBody.nico_filetime_gt;
    let length_lt = queryBody.nico_filetime_lt;
    let pixels_gt = queryBody.nico_pixels_gt;
    let pixels_lt = queryBody.nico_pixels_lt;
    let size_gt = queryBody.nico_filesize_gt;
    let size_lt = queryBody.nico_filesize_lt;
    let submit = queryBody.submit;
    let sort_query = queryBody.sort;

    //拿到 tags ,是 string ,需要转为数组
    let tags_array = new Array();
    tags_array = tags.split(",");

    let requestBody = {
        "query": {
            "bool": {
                "must": []
            }
        },
        "sort": []
    };

    let spiltArray = requestBody.query.bool.must;
    let sortArray = requestBody.sort;

    if (title != "" && typeof(title) != undefined) {
        spiltArray.push({
            "match": {
                "title": title
            }
        });
    }
    if (category != "" && typeof(category) != undefined) {
        spiltArray.push({
            "match": {
                "category": category
            }
        });
    }
    if (tags != "" && typeof(tags) != undefined) {
        //
        // let tagsQueryBody =   {
        //   "bool": {
        //     "should": [
        //     ]
        //   }
        // };
        //
        // let tags_should_array = tagsQueryBody.bool.should;
        //
        //   //遍历 tags_array
        //   for (var i = 0; i < tags_array.length; i++) {
        //       tags_should_array.push({
        //         "nested": {
        //         "path": "tags",
        //         "query": {
        //             "match": {
        //                 "tags.name": tags_array[i]
        //             }
        //         }
        //       }
        // }
        // spiltArray.push(tagsQueryBody);

        let tagsQueryBody = {
            "bool": {"should": []}
        };

        let tags_should_array = tagsQueryBody.bool.should;

        for (var i = 0; i < tags_array.length; i++) {
            tags_should_array.push(
                {
                    "nested": {
                        "path": "tags",
                        "query": {
                            "match": {
                                "tags.name": tags_array[i]
                            }
                        }
                    }
                }
            );
        }

        spiltArray.push(tagsQueryBody);

    }
    if (author != "" && typeof(author) != undefined) {
        spiltArray.push({
            "nested": {
                "path": "author",
                "query": {
                    "match": {
                        "author.nickname": author
                    }
                }
            }
        })
    }
    if (created_at_gt != "" && typeof(created_at_gt) != undefined) {
        spiltArray.push({
            "range": {
                "created_at": {
                    "gte": created_at_gt,
                    "lte": created_at_lt
                }
            }
        });
    }
    if (length_gt != "") {
        spiltArray.push({
            "range": {
                "length": {
                    "gte": length_gt,
                    "lte": length_lt
                }
            }
        });
    }
    if (pixels_gt != "" && typeof(pixels_gt) != undefined) {
        spiltArray.push({
            "range": {
                "pixels": {
                    "gte": pixels_gt,
                    "lte": pixels_lt
                }
            }
        });
    }
    if (size_gt != "" && typeof(size_gt) != undefined) {
        spiltArray.push({
            "range": {
                "size": {
                    "gte": size_gt / 1024 / 1024,
                    "lte": size_lt / 1024 / 1024
                }
            }
        });
    }

    if (sort_query) {
        switch (sort_query) {
            case "created_at":
                sortArray.push({
                    "created_at": {
                        "order": "desc"
                    }
                });
                break;
            case "pixels":

                sortArray.push({
                    "pixels": {
                        "order": "desc"
                    }
                });
                break;
            case "get_at":
                sortArray.push({
                    "get_at": {
                        "order": "desc"
                    }
                });
                break;
            case "view_count":
                sortArray.push({
                    "view_count": {
                        "order": "desc"
                    }
                });
                break;
            case "comment_count":
                sortArray.push({
                    "comment_count": {
                        "order": "desc"
                    }
                });
                break;
            case "length":
                sortArray.push({
                    "length": {
                        "order": "desc"
                    }
                });
                break;
            default:

        }

    }

    let responseData = await
    fetch('http://128.199.96.159:9200/nico/data/_search', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    let data = await
    responseData.json();

    let hits = data.hits;

    let url = ctx.url;

    ctx.state = {
        url: url,
        queryBody: queryBody,
        data: hits
    };

    if (submit == "Json") {
        // ctx.response.body = hits
        ctx.response.body = requestBody
    } else {
        await
        ctx.render('index', {});
    }
}

)
module.exports = router;
