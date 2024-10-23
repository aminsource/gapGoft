import { Send } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, Textarea } from '@/components/ui/form';
import { useNotifications } from '@/components/ui/notifications';
import { useSendPrompt } from '@/features/common/api/send-prompt';
import { useUser } from '@/lib/auth';

// Define a message type to structure chat history
type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export const AdvertiserChatForm = () => {
  // Define starter messages for the Advertiser bot
  const starterMessages = [
    {
      role: 'system',
      content:
        '📣 "من نیاز دارم برای یک نوشیدنی انرژی‌زا که به جوانان ۱۸-۳۰ ساله هدف‌گذاری شده، یک کمپین تبلیغاتی ایجاد کنم."',
    },
    {
      role: 'system',
      content: '🗣️ "می‌توانی به من کمک کنی یک شعار تبلیغاتی قانع‌کننده بسازم؟"',
    },
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const { addNotification } = useNotifications();
  const user = useUser();

  const chatMutation = useSendPrompt({
    mutationConfig: {
      onSuccess: (data) => {
        setMessages((prev) => [...prev, { role: 'assistant', content: data }]);
      },
      onError: () => {
        addNotification({
          type: 'error',
          title: 'خطا',
          message: 'خطا در دریافت پاسخ',
        });
      },
    },
  });

  const handleSendMessage = (message: string) => {
    if (message.trim() === '') {
      addNotification({
        type: 'warning',
        title: 'پیام لازم است',
        message: 'لطفاً قبل از ارسال پیام وارد کنید.',
      });
      return;
    }

    // Add the user's message to the chat history
    setMessages((prev) => [...prev, { role: 'user', content: message }]);

    // Call the API to get the assistant's response
    chatMutation.mutate({
      data: {
        userId: user.data ? user.data?.id : '',
        message: message,
        systemMessageParams: {
          role: 'advertiser',
          tone: 'persuasive',
          content:
            'به صورت فارسی پاسخ بده و به سوالات غیر مرتبط جواب نده. شما تبلیغ‌سازی هستید که کمپین‌های تبلیغاتی برای محصولات یا خدمات ایجاد می‌کنید. مخاطبان هدف را انتخاب کنید، پیام‌های کلیدی و شعارها را توسعه دهید، رسانه‌های مناسب برای تبلیغات را انتخاب کنید، و فعالیت‌های اضافی برای دستیابی به اهداف تبلیغاتی برنامه‌ریزی کنید.',
        },
        useDocument: false,
      },
    });

    // Clear the input field
    setInputMessage('');
  };

  const handleStarterClick = (content: string) => {
    setInputMessage(content);
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col space-y-4 rounded-lg bg-white p-4 shadow-lg">
      <div className="h-64 flex-1 space-y-2 overflow-y-auto rounded-md bg-gray-50 p-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`rounded-lg p-2 ${
              msg.role === 'user'
                ? 'self-end bg-blue-500 text-white'
                : 'self-start bg-gray-200 text-gray-800'
            }`}
          >
            {msg.role === 'assistant' ? (
              <ReactMarkdown className="prose">{msg.content}</ReactMarkdown>
            ) : (
              <span>{msg.content}</span>
            )}
          </div>
        ))}
      </div>

      <Form
        onSubmit={(values) => {
          handleSendMessage(values.message);
        }}
        schema={z.object({
          message: z.string().min(1, 'پیام لازم است'),
        })}
        id="chat-form"
      >
        {({ register, formState, setValue }) => {
          // Update input field value when `inputMessage` changes
          setValue('message', inputMessage);
          return (
            <>
              <div className="flex flex-col space-y-2">
                <Textarea
                  label="پیام"
                  error={formState.errors['message']}
                  registration={register('message')}
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="پیام خود را اینجا بنویسید..."
                  className="w-full rounded-md border border-gray-300 p-3"
                />

                <Button type="submit" isLoading={chatMutation.isPending}>
                  <div className="inline-flex p-3">
                    <Send className="ml-2" />
                    ارسال
                  </div>
                </Button>
              </div>
            </>
          );
        }}
      </Form>

      {/* Starter Messages Section */}
      <div className="mt-4">
        <p className="mb-2 text-sm text-gray-600">
          بر روی پیام‌های زیر کلیک کنید تا از آنها استفاده کنید:
        </p>
        <div className="space-y-2">
          {starterMessages.map((msg, index) => (
            <div
              key={`starter-${index}`}
              className="cursor-pointer rounded-lg bg-gray-100 p-2 text-gray-800 hover:bg-gray-200"
              onClick={() => handleStarterClick(msg.content)}
            >
              <span>{msg.content}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
