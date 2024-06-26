const express = require('express')
const app = express()

const errorHandler = (err, req, res, next)=> {
    if (err.status) {
        // If the error has a status code, return it
        res.status(err.status).json({error: err.message});
    } else {
        // Otherwise, return a generic 500 status code
        res.status(500).json({error: "Internal Server Error"});
    }
}
// Middleware to parse JSON request body
app.use(express.json());

app.all('/timeout',(req,res)=>{
    console.log("timeout")
});


app.use(errorHandler);
// const indexRouter = require('./errorR');

// app.all('/', (req, res) => {
//     console.log("Just got a request!")
//     res.send('Yo just visit /error')
// })

// Function to get error message based on error code

/*app.all('/', (req, res) =>
{
    console.log("working in error==>",req.body );

    let { code, with_res, body } = req.body; // Assuming the error code, with_res flag, and body are sent in the request body
    console.log("code: ", code, "with_res", with_res);

        try {
            if (body !== undefined) {
                // If the body is provided, send it as the response
                res.status(code).json(body);
            }

            if(with_res === undefined){
                res.status(code).end();
            }

            if (with_res === true) {
                // Sending response with error code and description
                res.status(code).json({ message: getErrorMessage(code) });
            } else  {
                // Setting status code without sending any response body
                res.status(code).end();
            }
        } catch (e) {
            // Handling any exceptions and setting status code without sending any response body
            res.status(400).json({message:"input proper request"}).end();
        }


}

);*/

app.all('/', (req, res) => {
    console.log("working in error==>", req.body);

    const {code, with_res, data} = req.body;

    try {
        if (code === undefined || isNaN(code)) {
            console.log("code is not defined");
            res.status(400).json({message: "code must be provided."});
        }

        if (data !== undefined) {
            console.log("body is defined")
            // If the body is provided, send it as the response
            res.status(code).json(data);
        }

        if (with_res !== undefined) {
            console.log("with_ref is defined")
            if (with_res === true) {
                console.log("with_ref is true")
                // Sending response with error code and description
                res.status(code).json({message: getErrorMessage(code)});
            } else {
                console.log("with_ref is false")
                // Setting status code without sending any response body
                res.status(code).end();
            }
        } else {
            res.status(code).end();
        }


    } catch (e) {
        // Handling any exceptions and setting status code without sending any response body
        console.error("Error:", e.message);
        res.status(code).json({message: getErrorMessage(code)}).end();
    }
});





app.all('/error', (req, res) => {
    const {code} = req.body;
    // Some code that might throw an error
    throwHTTPError(code);
});


app.all('/doc', (req, res) => {
    const githubRepoURL = "https://github.com/babaRanchordDas/starter-express-api/blob/main/README.md";
    res.redirect(githubRepoURL);
});



// app.listen(process.env.PORT || 3000)


module.exports = app;



function getErrorMessage(code) {
    switch (code) {
        case 100:
            return "Continue";
        case 101:
            return "Switching Protocols";
        case 102:
            return "Processing";
        case 103:
            return "Early Hints";
        case 200:
            return "OK";
        case 201:
            return "Created";
        case 202:
            return "Accepted";
        case 203:
            return "Non-Authoritative Information";
        case 204:
            return "No Content";
        case 205:
            return "Reset Content";
        case 206:
            return "Partial Content";
        case 207:
            return "Multi-Status";
        case 208:
            return "Already Reported";
        case 226:
            return "IM Used";
        case 300:
            return "Multiple Choices";
        case 301:
            return "Moved Permanently";
        case 302:
            return "Found";
        case 303:
            return "See Other";
        case 304:
            return "Not Modified";
        case 305:
            return "Use Proxy";
        case 307:
            return "Temporary Redirect";
        case 308:
            return "Permanent Redirect";
        case 400:
            return "Bad Request";
        case 401:
            return "Unauthorized";
        case 402:
            return "Payment Required";
        case 403:
            return "Forbidden";
        case 404:
            return "Not Found";
        case 405:
            return "Method Not Allowed";
        case 406:
            return "Not Acceptable";
        case 407:
            return "Proxy Authentication Required";
        case 408:
            return "Request Timeout";
        case 409:
            return "Conflict";
        case 410:
            return "Gone";
        case 411:
            return "Length Required";
        case 412:
            return "Precondition Failed";
        case 413:
            return "Payload Too Large";
        case 414:
            return "URI Too Long";
        case 415:
            return "Unsupported Media Type";
        case 416:
            return "Range Not Satisfiable";
        case 417:
            return "Expectation Failed";
        case 418:
            return "I'm a teapot";
        case 421:
            return "Misdirected Request";
        case 422:
            return "Unprocessable Entity";
        case 423:
            return "Locked";
        case 424:
            return "Failed Dependency";
        case 425:
            return "Too Early";
        case 426:
            return "Upgrade Required";
        case 428:
            return "Precondition Required";
        case 429:
            return "Too Many Requests";
        case 431:
            return "Request Header Fields Too Large";
        case 451:
            return "Unavailable For Legal Reasons";
        case 500:
            return "Internal Server Error";
        case 501:
            return "Not Implemented";
        case 502:
            return "Bad Gateway";
        case 503:
            return "Service Unavailable";
        case 504:
            return "Gateway Timeout";
        case 505:
            return "HTTP Version Not Supported";
        case 506:
            return "Variant Also Negotiates";
        case 507:
            return "Insufficient Storage";
        case 508:
            return "Loop Detected";
        case 510:
            return "Not Extended";
        case 511:
            return "Network Authentication Required";
        default:
            return "Unknown Error Code";
    }
}
function throwHTTPError(code) {
    switch (code) {
        case 500:
            throw new Error("Internal Server Error");
        case 501:
            throw new Error("Not Implemented");
        case 502:
            throw new Error("Bad Gateway");
        case 503:
            throw new Error("Service Unavailable");
        case 504:
            throw new Error("Gateway Timeout");
        case 505:
            throw new Error("HTTP Version Not Supported");
        case 506:
            throw new Error("Variant Also Negotiates");
        case 507:
            throw new Error("Insufficient Storage");
        case 508:
            throw new Error("Loop Detected");
        case 510:
            throw new Error("Not Extended");
        case 511:
            throw new Error("Network Authentication Required");
        default:
            throw new Error("Unknown Error");
    }
}
