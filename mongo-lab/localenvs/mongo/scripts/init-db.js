const chat = db.getSiblingDB("chat");

chat.createCollection("conversations");
chat.createCollection("messages");

chat.messages.createIndex({ conversationId: "hashed", _id: 1 }, { name: "ix_shardkey" });

const admin = db.getSiblingDB("admin");

try {
    admin.runCommand({ enableSharding: "chat" });
    admin.runCommand({
        shardCollection: "chat.messages",
        key: { conversationId: "hashed", _id: 1 }
    });
    print("✅ Sharding enabled and shard key applied");
} catch (e) {
    print("❌ Error during sharding setup: " + e.message);
}
