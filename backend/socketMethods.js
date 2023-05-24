const ArenaSockets = (io) => {
    io.on("connection", (socket) => {
        console.log("Sockets are in action " + socket.id);

        socket.on("setup", (userData) => {
            // userData has arena_id, nickname
            socket.join(userData.arena_id);
            socket.in(userData.arena_id).emit("general message", userData.nickname + " has joined");
        });

        socket.on("individual progress update", (userData) => {
            //console.log("individual progress update", userData);
            socket.to(userData.arena_id).emit("arena progress update",
                {
                    "nickname": userData.nickname,
                    "temp_id": userData.temp_id,
                    "progress": userData.progress
                })
        });

        socket.on("start game", (userData) => {
            // arena owner sends the full text
            socket.to(userData.arena_id).emit("game started", userData.fullText);
        })

        socket.on("individual finish", (userData) => {
            socket.to(userData.arena_id).emit("arena result update",
                {
                    "nickname": userData.nickname,
                    "temp_id": userData.temp_id,
                    "time_taken": userData.time_taken,
                    "accuracy": userData.accuracy
                })
        })

        socket.on("disconnect", () => {
            console.log(socket.id, " disconnected")
        })
    })
}

module.exports = { ArenaSockets };