import { getUserItems, getUserItemById } from "./_db.js";

export async function _getUsers() {
    const { resources } = await getUserItems().readAll().fetchAll();
    return resources;
}

export async function _getUserByUsername(username) {
    const querySpec = {
        query: "SELECT * FROM c WHERE c.username = @username",
        parameters: [{ name: "@username", value: username }],
    };
    const { resources } = await getUserItems().query(querySpec).fetchAll();
    return resources[0];
}

export async function _getUserById(userId) {
    const { resource } = await getUserItemById(userId).read();
    return resource;
}

export async function _createUser(user) {
    const { resource } = await getUserItems().create(user);
    return resource;
}

export async function _updateUser(user) {
    const { resource } = await getUserItems().upsert(user);
    return resource;
}

// export async function getRandomUser(userId, chatUserIds) {
//     let query = `SELECT c.id, c.username FROM c WHERE c.id != "${userId}" `;
//     if (chatUserIds?.length > 0) {
//         query += `AND c.id NOT IN (${chatUserIds
//             .map((item) => `"${item}"`)
//             .join(", ")}) `;
//     }
//     query += `OFFSET 0 LIMIT 5`;
//     const { resources } = await getUserItems().query({ query }).fetchAll();
//     const length = resources.length;
//     const randomIndex = Math.floor(Math.random() * length);
//     return resources[randomIndex];
// }

// export async function addChatToUser(userId, partner, chatId, isUser1) {
//     const { resource: user } = await getUserById(userId).read();
//     if (!user.chats) {
//         user.chats = [];
//     }
//     user.chats.push({ chatId, partnerName: partner.username, isUser1 });
//     if (!user.chatUserIds) {
//         user.chatUserIds = [];
//     }
//     user.chatUserIds.push(partner.id);
//     const { resource } = await getUserById(userId).replace(user);
//     return resource;
// }

// Question DAO
