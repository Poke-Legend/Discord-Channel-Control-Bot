This Discord bot is designed to control channel locking and unlocking based on user roles. Here's an overview of what the bot does:

1. **Channel Locking and Unlocking:** Users with specific roles (defined by role IDs in the `.env` file) can use the `!lock` and `!unlock` commands to lock and unlock channels, respectively.

2. **Permission Checks:** The bot checks if the user issuing the command has one of the allowed roles. If not, it sends a "Permission Denied" message using an embed to notify the user that they don't have permission to use the command.

3. **Channel State Management:** When a user locks a channel (`!lock` command), the bot adds a lock emoji (`❌`) to the channel name. When unlocking (`!unlock` command), it replaces the lock emoji with an unlock emoji (`✅`).

4. **Feedback with Embeds:** The bot provides visual feedback using MessageEmbeds for actions like locking a channel, unlocking a channel, and notifying the user when a channel is already in the desired state (locked or unlocked).

5. **Logging and Console Output:** The bot logs its activities to the console, including when it's ready and online, and when channel locking/unlocking actions are performed.

Overall, the bot enhances channel management by allowing authorized users to control channel access through simple commands while providing clear feedback and notifications.
