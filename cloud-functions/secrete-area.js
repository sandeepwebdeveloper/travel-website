exports.handler = function(event, context, callback) {
    let body
    const secretContent = `
        <h3>Welcome To The Secret Area</h3>
        <p>Here we can tell you the sky is <strong>blue</strong>, and two plus two equal to four.</p>
    `

    if(event.body) {
        body = JSON.parse(event.body)
    } else {
        body = {}
    }
    if(body.password == "javascript") {
        callback(null, {
            statusCode: 300,
            body: secretContent
        })
    } else { 
        callback(null, {
            statusCode: 401
        })
    }
}