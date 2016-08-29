var router = require('koa-router')();
var fetch = require('node-fetch');

router.get('/:id', async function (ctx, next) {

    let params = ctx.params;
    let id = params.id.substring(2,10);

    let requestBody = {
      "query": {
       "match":{
         "_id":id
       }
      }
    };

        let responseData = await fetch('http://128.199.96.159:9200/nico/data/_search',{
                  method: 'POST',
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(requestBody)
        });

        let data = await responseData.json();

          let hits = data.hits;

        ctx.state = {
          data:hits
        };

    await
    ctx.render('detail', {});

  }
)
module.exports = router;
