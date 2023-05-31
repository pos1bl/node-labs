import Database from './database';

export default class Queries {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async getUsersWithChannels(): Promise<any[]> {
    const query = `
      SELECT users.id, users.name, users.avatar_url, channels.photo_url,
      channels.description, channels.created_at FROM Users, Channels
      WHERE Users.id = channels.user_id
      ORDER BY channels.created_at DESC;
    `;

    return this.database.query(query);
  }

  async getTopLikedVideos(): Promise<any[]> {
    const query = `
      SELECT videos.title, videos.description, COUNT(likes.video_id)
      FROM videos, likes
      WHERE videos.id = likes.video_id AND likes.positive = TRUE
      GROUP BY videos.id
      ORDER BY COUNT(likes.video_id) DESC
      LIMIT 5;
    `;

    return this.database.query(query);
  }

  async getVideosFromUserSubscription(userName: string): Promise<any[]> {
    const query = `
      SELECT videos.id, videos.title, videos.preview_url,
      videos.duration, videos.published_at
      FROM videos, users, channels
      WHERE videos.channel_id = channels.id
      AND users.id = channels.user_id
      AND users.name = $1
      ORDER BY videos.published_at DESC;
    `;

    return this.database.query(query, [userName]);
  }

  async getChannelSubscribers(channelId: string): Promise<any[]> {
    const query = `
      SELECT channels.id, channels.user_id, channels.description,
      channels.photo_url, channels.created_at,
      COUNT(subscriptions.channel_id) AS amount_of_subscribers
      FROM channels, subscriptions
      WHERE channels.id = subscriptions.channel_id 
      AND channels.id = $1
      GROUP BY channels.id;
    `;

    return this.database.query(query, [channelId]);
  }

  async getTopRatedVideos(): Promise<any[]> {
    const query = `
      SELECT v.title, COUNT(l.video_id) AS total_ratings
      FROM videos v
      INNER JOIN likes l ON v.id = l.video_id
      WHERE v.published_at >= '2021-09-01'
      GROUP BY v.id
      HAVING SUM(CASE WHEN l.positive THEN 1 ELSE 0 END) > 4
      ORDER BY total_ratings DESC
      LIMIT 10;
    `;

    return this.database.query(query);
  }

  async getUserSubscriptions(userName: string): Promise<any[]> {
    const query = `
      SELECT users.name, users.avatar_url, channels.photo_url,
      channels.description, subscriptions.level, subscriptions.subscribed_at
      FROM users
      INNER JOIN channels ON users.id = channels.user_id
      INNER JOIN subscriptions ON users.id = subscriptions.user_id
      WHERE users.name = $1
      ORDER BY CASE WHEN subscriptions.level = 'vip' THEN 1
        WHEN subscriptions.level = 'follower' THEN 2
        WHEN subscriptions.level = 'fan' THEN 3
        WHEN subscriptions.level = 'standard' THEN 4
      end, subscriptions.subscribed_at DESC;
    `;

    return this.database.query(query, [userName]);
  }
}
