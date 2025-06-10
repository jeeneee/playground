try {
    sh.addShard("shard1ReplSet/mongo-shard1-1:27017,mongo-shard1-2:27017,mongo-shard1-3:27017")
    sh.addShard("shard2ReplSet/mongo-shard2-1:27017,mongo-shard2-2:27017,mongo-shard2-3:27017")
    print("✅ Shards added to cluster.")
} catch (e) {
    print("⚠️ Error adding shards: " + e.message)
}
