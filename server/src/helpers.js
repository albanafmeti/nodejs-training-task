class Helpers {

    jsonResponse(response, success, data = null, message = "") {
        return response.json({
            success: success,
            data: data,
            message: message
        });
    }

    validate(type, value) {
        switch (type) {
            case 'required':
                return !(value == null || value == "");
                break;
        }
    }

    randomString(n = 10) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < n; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}

module.exports = new Helpers;