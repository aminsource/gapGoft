import { ContentLayout } from '@/components/layouts';
import { AdvertiserChatForm } from '@/features/advertise/component/advertise-chat-form';

export const advertise = () => {
  return (
    <ContentLayout title="تبلیغ ساز">
      <AdvertiserChatForm />
    </ContentLayout>
  );
};
