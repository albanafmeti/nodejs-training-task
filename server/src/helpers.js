class Helpers {

    simple_response(response, success, data = null, message = "") {
        return response.json({
            success: success,
            data: data,
            message: message
        });
    }
}

module.exports = new Helpers;