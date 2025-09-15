import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { XStack, YStack, Text, Button, Spinner, Form, Input, Label, Separator } from 'tamagui';

import { Modal } from '@/components/Modal/Modal';

import { auth } from '@/infra/firebase/firebase';

import { CreateTransactionDto } from '../model/CreateTransactionDto';

import {
  createTransaction,
  updateTransaction,
  uploadReceipt
} from '../services/transactions.service';

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  editId?: string;
  defaultValues?: Partial<CreateTransactionDto>;
}

export function TransactionModal({ open, onClose, editId, defaultValues }: TransactionModalProps) {
  const [uploading, setUploading] = useState(false);
  const [receiptLocalUri, setReceiptLocalUri] = useState<string | undefined>();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset
  } = useForm<CreateTransactionDto>({
    resolver: classValidatorResolver(CreateTransactionDto),
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      type: (defaultValues?.type as any) ?? 'Saída',
      category: (defaultValues?.category as any) ?? 'Outros',
      paymentMethod: (defaultValues?.paymentMethod as any) ?? 'PIX',
      amount: (defaultValues?.amount as any) ?? undefined,
      date: defaultValues?.date ?? new Date().toISOString().slice(0, 10),
      receiptUrl: defaultValues?.receiptUrl
    }
  });

  function handleCloseModal() {
    onClose();
    reset();
    setReceiptLocalUri(undefined);
  }

  async function pickReceipt() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Toast.show({ type: 'error', text1: 'Permissão negada ao rolo da câmera.' });
      return;
    }
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    if (!res.canceled && res.assets?.length) {
      setReceiptLocalUri(res.assets[0].uri as string);
    }
  }

  async function onHandle(data: CreateTransactionDto) {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) throw new Error('Usuário não autenticado.');

      let receiptUrl = data.receiptUrl;
      if (receiptLocalUri) {
        setUploading(true);
        receiptUrl = await uploadReceipt(uid as string, receiptLocalUri);
        setUploading(false);
      }

      const payload = { ...data, receiptUrl };

      if (editId) {
        await updateTransaction(uid as string, editId, payload);
        Toast.show({ type: 'success', text1: 'Transação atualizada.' });
      } else {
        await createTransaction(uid as string, payload);
        Toast.show({ type: 'success', text1: 'Transação criada.' });
      }
    } catch (err: any) {
      const message = err?.message || 'Erro ao salvar transação.';
      Toast.show({ type: 'error', text1: message });
    }
    handleCloseModal();
  }

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <Form width={380} padding={24} onSubmit={handleSubmit(onHandle)} gap="$3">
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
          <Text fontSize={20} fontWeight="bold" color="$primary400">
            {editId ? 'Editar Transação' : 'Nova Transação'}
          </Text>

          <Form.Trigger asChild disabled={isSubmitting || uploading}>
            <Button backgroundColor="$primary200" disabled={isSubmitting || uploading}>
              {isSubmitting || uploading ? (
                <Spinner size="small" color="$gray100" />
              ) : (
                <Text fontWeight="bold" color="$gray100">
                  {editId ? 'Salvar' : 'Criar'}
                </Text>
              )}
            </Button>
          </Form.Trigger>
        </XStack>

        <YStack gap="$2">
          <Label>Título</Label>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Input {...field} onChangeText={field.onChange} placeholder="Ex: Almoço" />
            )}
          />
          {errors.title && (
            <Text color="red" fontSize={12}>
              {errors.title.message}
            </Text>
          )}

          <Label>Descrição</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChangeText={field.onChange}
                placeholder="Opcional"
                multiline
                numberOfLines={3}
              />
            )}
          />

          <XStack gap="$2">
            <YStack flex={1}>
              <Label>Tipo</Label>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Input {...field} onChangeText={field.onChange} placeholder="Entrada ou Saída" />
                )}
              />
              {errors.type && (
                <Text color="red" fontSize={12}>
                  {errors.type.message}
                </Text>
              )}
            </YStack>

            <YStack flex={1}>
              <Label>Categoria</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Input {...field} onChangeText={field.onChange} placeholder="Ex: Alimentação" />
                )}
              />
              {errors.category && (
                <Text color="red" fontSize={12}>
                  {errors.category.message}
                </Text>
              )}
            </YStack>
          </XStack>

          <XStack gap="$2">
            <YStack flex={1}>
              <Label>Pagamento</Label>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <Input {...field} onChangeText={field.onChange} placeholder="PIX/Crédito/..." />
                )}
              />
              {errors.paymentMethod && (
                <Text color="red" fontSize={12}>
                  {errors.paymentMethod.message}
                </Text>
              )}
            </YStack>

            <YStack flex={1}>
              <Label>Valor</Label>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={
                      field.value !== undefined && field.value !== null ? String(field.value) : ''
                    }
                    onChangeText={field.onChange}
                    keyboardType="decimal-pad"
                    placeholder="ex: 125.90"
                  />
                )}
              />
              {errors.amount && (
                <Text color="red" fontSize={12}>
                  {errors.amount.message}
                </Text>
              )}
            </YStack>
          </XStack>

          <YStack>
            <Label>Data (yyyy-mm-dd)</Label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <Input {...field} onChangeText={field.onChange} placeholder="2025-09-15" />
              )}
            />
            {errors.date && (
              <Text color="red" fontSize={12}>
                {errors.date.message}
              </Text>
            )}
          </YStack>

          <Separator marginVertical="$2" />

          <XStack gap="$2" alignItems="center">
            <Button onPress={pickReceipt} variant="outlined">
              <Text>{receiptLocalUri ? 'Trocar Recibo' : 'Anexar Recibo'}</Text>
            </Button>
            {receiptLocalUri && (
              <Text numberOfLines={1} flex={1}>
                {receiptLocalUri.split('/').pop()}
              </Text>
            )}
          </XStack>
        </YStack>
      </Form>
    </Modal>
  );
}
