try {
    rs.initiate({
        _id: "shard2ReplSet",
        members: [
            { _id: 0, host: "mongo-shard2-1:27017" },
            { _id: 1, host: "mongo-shard2-2:27017" },
            { _id: 2, host: "mongo-shard2-3:27017" }
        ]
    })
    print("✅ Shard2 replica set initiated.")
} catch (e) {
    print("⚠️ Shard2 already initiated or error: " + e.message)
}
