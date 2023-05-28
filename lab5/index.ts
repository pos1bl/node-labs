import Database from './src/database';
import Queries from './src/queries';

async function executeQueries(): Promise<void> {
  const database = new Database();
  const queries = new Queries(database);

  try {
    const usersWithChannels = await queries.getUsersWithChannels();
    console.log('Список усіх користувачів із їхніми каналами:', usersWithChannels);

    const topLikedVideos = await queries.getTopLikedVideos();
    console.log('Дані про 5 відео, які найбільше сподобалися:', topLikedVideos);

    const videosFromUserSubscription = await queries.getVideosFromUserSubscription('Stephanie Bulger');
    console.log('Список відео взятий із підписок користувача Stephanie Bulger:', videosFromUserSubscription);

    const channelSubscribers = await queries.getChannelSubscribers('79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76');
    console.log('Дані каналу з ідентифікатором "79f6ce8f-ee0c-4ef5-9c36-da06b7f4cb76" і кількість його підписників:', channelSubscribers);

    const topRatedVideos = await queries.getTopRatedVideos();
    console.log('Список із 10 найбільш оцінюваних відео (позитивні/негативні оцінки із тбл. likes), починаючи з вересня 2021 року, серед тих відео, що мають понад 4 позитивні оцінки:', topRatedVideos);

    const userSubscriptions = await queries.getUserSubscriptions('Ennis Haestier');
    console.log('Список даних взятий з підписок користувача Ennis Haestier:', userSubscriptions);
  } catch (error) {
    console.error('Error executing queries:', error);
  } finally {
    database.close();
  }
}

executeQueries();
