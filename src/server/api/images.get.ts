export default handleHttpRequest({
    handler: (request, reply) => {
        console.log("test");
        return request.user;
    },
});
