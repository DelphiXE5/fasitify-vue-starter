export default handleHttpRequest({
    handler: (request, reply) => {
        console.log("test");
        reply.send("123");
    },
});
