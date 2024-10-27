// File path: src/hooks/useCreateChat.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { api } from '@/lib/api-client';
import { MutationConfig } from '@/lib/react-query';

// Define the input schema using zod
export const createChatInputSchema = z.object({
  userId: z.string().min(1, 'Message is required'),
  message: z.string().min(1, 'Message is required'),
  systemMessageParams: z.object({
    role: z.string().min(1, 'Role is required'),
    tone: z.string().min(1, 'Tone is required'),
    content: z.string().min(1, 'Content is required'),
  }),
  useDocument: z.boolean(),
});

// Define the input type
export type CreateChatInput = z.infer<typeof createChatInputSchema>;

// Create the API function to make the POST request
export const createChat = ({
  data,
}: {
  data: CreateChatInput;
}): Promise<any> => {
  return api.post(`/api/v1/openai/chat/${data.userId}`, data, {
    headers: {
      Authorization: localStorage.getItem('authToken'),
    },
  });
};

// Define the custom hook options type
type UseCreateChatOptions = {
  mutationConfig?: MutationConfig<typeof createChat>;
};

// Create the custom hook using useMutation
export const useSendPrompt = ({
  mutationConfig,
}: UseCreateChatOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Optionally, invalidate queries or perform other actions after success
      queryClient.invalidateQueries({
        queryKey: ['chat-messages'], // Adjust this to match the actual query you might be using
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createChat,
  });
};
