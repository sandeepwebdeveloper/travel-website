exports.handler = function(event, context, callback) {
    console.log ("This is Testing" + event)
    
    callback(null, {
        statusCode: 200,
        body: "Welcome to the super secret area."
    })
}