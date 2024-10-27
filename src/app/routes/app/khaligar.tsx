import React from 'react';

import { ContentLayout } from '@/components/layouts';
import { KhaligarChatForm } from '@/features/khaligar/components/khaligar-chat-form';

export const khaligar = () => {
  return (
    <ContentLayout title="آشپز">
      <KhaligarChatForm />
    </ContentLayout>
  );
};
