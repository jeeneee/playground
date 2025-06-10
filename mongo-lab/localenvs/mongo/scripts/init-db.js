const chat = db.getSiblingDB("chat");

chat.createCollection("conversation");
chat.createCollection("message");

chat.message.createIndex({ conversationId: 1, _id: 1 }, { name: "ix_shardkey" });

const admin = db.getSiblingDB("admin");

try {
    admin.runCommand({ enableSharding: "chat" });
    admin.runCommand({
        shardCollection: "chat.message",
        key: { conversationId: 1, _id: 1 }
    });
    print("✅ Sharding enabled and shard key applied");
} catch (e) {
    print("❌ Error during sharding setup: " + e.message);
}
