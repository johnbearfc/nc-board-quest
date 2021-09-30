
exports.formatEndpoints = async (listedEndpoints) => {
    // log current endpoints 
                // |||||||||
                // vvvvvvvvv
    // console.log(listedEndpoints);

    const endpoints = [
        {
          path: '/api/categories',
          methods: [ 
            { GET: [] } 
          ]
        },
        {
          path: '/api/reviews',
          methods: [ 
            { GET: [
                'sort_by',
                'order',
                'category',
                'limit',
                'p'
            ] } 
          ]
        },
        {
          path: '/api/reviews/:review_id',
          methods: [ 
            { GET: [] }, 
            { PATCH: [
                'inc_votes'
            ] } 
          ]
        },
        {
          path: '/api/reviews/:review_id/comments',
          methods: [ 
            { GET: [
                'limit',
                'p'
            ] },
            { POST: [
                'username',
                'body'
            ] }
          ]
        },
        {
          path: '/api/comments/:comment_id',
          methods: [ 
            { DELETE: [] },
            { PATCH: [
                'inc_votes'
            ] }
          ]
        },
        {
          path: '/api/users',
          methods: [ 
            { GET: [] } 
          ]
        },
        {
          path: '/api/users/:username',
          methods: [ 
            { GET: [] } 
          ]
        },
        { 
          path: '/api', 
          methods: [ 
            { GET: [] } 
          ]
        }
    ]

    return endpoints;
}


