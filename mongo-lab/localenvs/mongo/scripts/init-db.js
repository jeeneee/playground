const chat = db.getSiblingDB("chat");

chat.createCollection("conversation");
chat.createCollection("message");

chat.message.createIndex({ conversationId: "hashed", _id: 1 }, { name: "ix_shardkey" });

const admin = db.getSiblingDB("admin");

try {
    admin.runCommand({ enableSharding: "chat" });
    admin.runCommand({
        shardCollection: "chat.message",
        key: { conversationId: "hashed", _id: 1 }
    });
    print("✅ Sharding enabled and shard key applied");
} catch (e) {
    print("❌ Error during sharding setup: " + e.message);
}
