const config = {};

config.dbHost = process.env.DB_HOST;
config.dbAuthKey = process.env.DB_AUTH_KEY;
config.databaseId = "Sharevana";
config.userContainer = "Users";
config.storyContainer = "Story";
config.chatContainer = "Chats";

config.nodeEnv = process.env.NODE_ENV || "development";
config.jwtSecret = process.env.JWT_SECRET || "thereIsNoSecret";
config.port = process.env.PORT || "3001";
config.azurePsConnStr = process.env.AZURE_PS_CONN_STR;
config.azurePsHub = process.env.AZURE_PS_HUB;
config.adminKey = process.env.ADMIN_KEY;

export default config;
