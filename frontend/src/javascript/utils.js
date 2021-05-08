export const getPosition = async () => {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
//# sourceMappingURL=utils.js.map