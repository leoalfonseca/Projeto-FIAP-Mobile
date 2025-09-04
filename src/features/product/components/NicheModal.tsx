import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { XStack, YStack, Text, Button, Spinner, Form, Input } from 'tamagui';

import { Modal } from '@/components/Modal/Modal';

import { useCreateNicheSuggestions } from '../hooks/useCreateNicheSuggestions';
import { CreateNicheSuggestionsDto } from '../model/CreateNicheSuggestionsDto';

interface NicheModalProps {
  open: boolean;
  onClose: () => void;
}

export function NicheModal({ open, onClose }: NicheModalProps) {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isSubmitSuccessful, errors },
    reset
  } = useForm<CreateNicheSuggestionsDto>({
    resolver: classValidatorResolver(CreateNicheSuggestionsDto)
  });

  const createNicheSuggestions = useCreateNicheSuggestions();

  function handleCloseModal() {
    onClose();
    reset();
  }

  async function onHandleNiche(data: CreateNicheSuggestionsDto) {
    try {
      await createNicheSuggestions.mutateAsync(data);

      Toast.show({
        type: 'success',
        text1: 'Sugestão enviada com sucesso!'
      });
    } catch (err: any) {
      const message = err?.response?.data?.message || 'Erro ao enviar sugestão.';

      Toast.show({
        type: 'error',
        text1: message
      });
    }
    handleCloseModal();
  }

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Form width={380} padding={24} onSubmit={handleSubmit(onHandleNiche)}>
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={20} fontWeight="bold" color="$primary400">
            Sugerir Nicho:
          </Text>

          <Form.Trigger asChild disabled={isSubmitting}>
            <Button
              backgroundColor={'$primary200'}
              onPress={() => onHandleNiche}
              alignSelf="flex-end"
              disabled={isSubmitting || isSubmitSuccessful}
            >
              {isSubmitting ? (
                <Spinner size={'small'} color="$gray100" />
              ) : (
                <Text fontWeight="bold" color="$gray100">
                  Enviar Sugestão
                </Text>
              )}
            </Button>
          </Form.Trigger>
        </XStack>
        <YStack marginVertical={20} gap={10}>
          <Text fontWeight={500} fontSize={12} marginBottom={1} color="$gray800">
            Título
          </Text>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input
                {...field}
                onChangeText={field.onChange}
                borderWidth={1}
                borderColor={errors.title ? 'red' : '$gray700'}
                placeholder="Digite o título"
                placeholderTextColor="$gray600"
                disabled={isSubmitSuccessful}
                autoCapitalize="characters"
                keyboardType="default"
                returnKeyType="next"
              />
            )}
          />
          {errors.title && (
            <Text color="red" fontSize={12} marginTop={-8}>
              {errors.title.message}
            </Text>
          )}
          <Text fontWeight={500} fontSize={12} marginBottom={1} color="$gray800">
            Sugestões
          </Text>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChangeText={field.onChange}
                placeholder="Digite as sugestões"
                multiline
                numberOfLines={4}
                placeholderTextColor="$gray600"
                height={100}
                borderWidth={1}
                borderColor={errors.title ? 'red' : '$gray800'}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
              />
            )}
          />
          {errors.description && (
            <Text color="red" fontSize={12} marginTop={-8}>
              {errors.description.message}
            </Text>
          )}
          <Text fontWeight={500} fontSize={12} marginBottom={1} color="$gray800">
            URL
          </Text>
          <Controller
            name="urlRef"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChangeText={field.onChange}
                placeholder="Confirme sua senha"
                borderWidth={1}
                placeholderTextColor="$gray600"
                borderColor={errors.title ? 'red' : '$gray800'}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="done"
              />
            )}
          />
          {errors.urlRef && (
            <Text color="red" fontSize={12} marginTop={-8}>
              {errors.urlRef.message}
            </Text>
          )}
        </YStack>
      </Form>
    </Modal>
  );
}
