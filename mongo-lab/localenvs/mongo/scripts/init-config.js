try {
    rs.initiate({
        _id: "configReplSet",
        configsvr: true,
        members: [{ _id: 0, host: "mongo-configsvr1:27017" }]
    })
    print("✅ Config server replica set initiated.")
} catch (e) {
    print("⚠️ Config server already initiated or error: " + e.message)
}
