try {
    rs.initiate({
        _id: "shard1ReplSet",
        members: [
            { _id: 0, host: "mongo-shard1-1:27017" },
            { _id: 1, host: "mongo-shard1-2:27017" },
            { _id: 2, host: "mongo-shard1-3:27017" }
        ]
    })
    print("✅ Shard1 replica set initiated.")
} catch (e) {
    print("⚠️ Shard1 already initiated or error: " + e.message)
}
