import { ISubscribe } from '@/app/types/isubscribe';
import Pusher from 'pusher-js';
import { toast } from 'react-hot-toast';
import { fetchUserByIdApi } from './api/authApi';
import { INotification } from '@/app/types/isubscribe';

export const subscribe = async (subscriber: ISubscribe) => {
  const pusher = new Pusher(subscriber.key, {
    cluster: subscriber.cluster,
  });

  const channel = pusher.subscribe('meetmate-channel');
  channel.bind("new-notification", (data: {message: {
    title: string;
    startTime: Date;
    endTime: Date;
  }, organizer: string}) => {
    fetchUserByIdApi(data.organizer).then((user) => {
      if (user) {
        toast(
          `${data.message.title} scheduled by ${user.username} at ${new Date(data.message.startTime).toLocaleTimeString()} - ${new Date(data.message.endTime).toLocaleTimeString()}`,
        );
      }
    }
    ).catch((error) => {
      console.error("Error fetching user by ID:", error);
      toast.error("Error fetching user details");
    });
    
    subscriber.setNotifications((prev: INotification[]) => {
      const newNotification = data as INotification; 
      return [...prev, newNotification];
    });
  });

  return () => {
    channel.unbind_all();
    channel.unsubscribe();
  };
}