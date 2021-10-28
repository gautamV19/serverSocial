exports.verifyJWT = (token) => {
    return jwt.verify(token, process.env.jwt_secrete_key);
};

exports.creatJWT = (_id) => {
    return jwt.sign({ _id: _id }, process.env.jwt_secrete_key, { expiresIn: "30 days" });
};
exports.errorResponse = (massage, statusCode = 500) => {
    return { 
        success: false,
        statusCode,
        error: {
            code: statusCode,
            massage: massage,
        },
    };
};
exports.successResponse = (data, massage, statusCode = 200) => {
    return {
        success: true,
        massage,
        statusCode,
        data,
    };
};