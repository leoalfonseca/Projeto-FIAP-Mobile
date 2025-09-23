// TransactionModal.tsx
import { classValidatorResolver } from '@hookform/resolvers/class-validator';
import { ChevronDown } from '@tamagui/lucide-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { XStack, YStack, Text, Button, Spinner, Form, Input, Label, Separator } from 'tamagui';

import { Modal } from '@/components/Modal/Modal';
import { Select } from '@/components/Select/Select';
import { auth } from '@/infra/firebase/firebase';

import { CreateTransactionDto } from '../model/CreateTransactionDto';
import type { Transaction } from '../model/Transaction';

import { uploadReceiptSupabase } from '../services/storage.supabase';
import { createTransaction, updateTransaction } from '../services/transactions.service';

type TransactionModalProps = {
  open: boolean;
  onClose: () => void;
  onSaved?: () => void;
  transaction?: Transaction | null;
};

const baseDefaults: Partial<CreateTransactionDto> = {
  title: '',
  description: '',
  type: 'Saída' as any,
  category: 'Outros' as any,
  paymentMethod: 'PIX' as any,
  amount: undefined,
  date: new Date().toISOString().slice(0, 10),
  receiptUrl: undefined
};

function toFormDefaults(
  tx?: Transaction | Partial<CreateTransactionDto> | null
): Partial<CreateTransactionDto> {
  if (!tx) return { ...baseDefaults };

  if ((tx as any).id) {
    const t = tx as Transaction;
    const d = t.date instanceof Date ? t.date : new Date(t.date as string);
    return {
      title: t.title ?? '',
      description: t.description ?? '',
      type: t.type as any,
      category: t.category as any,
      paymentMethod: t.paymentMethod as any,
      amount: Number(t.amount),
      date: d.toISOString().slice(0, 10),
      receiptUrl: t.receiptUrl
    };
  }

  return { ...baseDefaults, ...(tx as Partial<CreateTransactionDto>) };
}

export function TransactionModal({ open, onClose, onSaved, transaction }: TransactionModalProps) {
  const [uploading, setUploading] = useState(false);
  const [receiptLocalUri, setReceiptLocalUri] = useState<string | undefined>();

  const initial = useMemo(() => toFormDefaults(transaction ?? null), [transaction?.id]);

  const isEditing = !!transaction?.id;
  const currentEditId = transaction?.id;

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset
  } = useForm<CreateTransactionDto>({
    resolver: classValidatorResolver(CreateTransactionDto),
    defaultValues: initial
  });

  useEffect(() => {
    if (open) {
      reset(initial);
      setReceiptLocalUri(undefined);
    }
  }, [open, initial, reset]);

  function handleCloseModal() {
    onClose();
    reset(baseDefaults);
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
        try {
          receiptUrl = await uploadReceiptSupabase(uid, receiptLocalUri);
        } finally {
          setUploading(false);
        }
      }

      const payload = { ...data, receiptUrl };

      if (isEditing && currentEditId) {
        await updateTransaction(uid, currentEditId, payload);
        Toast.show({ type: 'success', text1: 'Transação atualizada.' });
      } else {
        await createTransaction(uid, payload);
        Toast.show({ type: 'success', text1: 'Transação criada.' });
      }

      onSaved?.();
      handleCloseModal();
    } catch (err: any) {
      const code = err?.code || 'unknown';
      const message = err?.message || 'Erro ao salvar transação.';
      console.log('[tx] save error', code, message, err);
      Toast.show({ type: 'error', text1: message, text2: code });
    }
  }

  return (
    <Modal open={open} onClose={handleCloseModal}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <Form width={380} padding={24} onSubmit={handleSubmit(onHandle)} gap="$3">
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
            <Text fontSize={20} fontWeight="bold" color="$primary400">
              {isEditing ? 'Editar Transação' : 'Nova Transação'}
            </Text>

            <Form.Trigger asChild disabled={isSubmitting || uploading}>
              <Button backgroundColor="$primary200" disabled={isSubmitting || uploading}>
                {isSubmitting || uploading ? (
                  <Spinner size="small" color="$gray100" />
                ) : (
                  <Text fontWeight="bold" color="$gray100">
                    {isEditing ? 'Salvar' : 'Criar'}
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
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={onChange}
                      placeholder="Tipo"
                      variant="outlined"
                      iconAfter={ChevronDown as any}
                      options={[
                        { label: 'Entrada', value: 'Entrada' },
                        { label: 'Saída', value: 'Saída' }
                      ]}
                      disablePreventBodyScroll
                    />
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
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={onChange}
                      placeholder="Categoria"
                      variant="outlined"
                      iconAfter={ChevronDown as any}
                      options={[
                        { label: 'Alimentação', value: 'Alimentação' },
                        { label: 'Transporte', value: 'Transporte' },
                        { label: 'Salário', value: 'Salário' },
                        { label: 'Lazer', value: 'Lazer' },
                        { label: 'Outros', value: 'Outros' }
                      ]}
                      disablePreventBodyScroll
                    />
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
                  render={({ field: { value, onChange } }) => (
                    <Select
                      value={value}
                      onValueChange={onChange}
                      placeholder="Pagamento"
                      variant="outlined"
                      iconAfter={ChevronDown as any}
                      options={[
                        { label: 'PIX', value: 'PIX' },
                        { label: 'Crédito', value: 'Crédito' },
                        { label: 'Débito', value: 'Débito' },
                        { label: 'Boleto', value: 'Boleto' },
                        { label: 'Dinheiro', value: 'Dinheiro' }
                      ]}
                      disablePreventBodyScroll
                    />
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
                <Text>
                  {receiptLocalUri
                    ? 'Trocar Recibo'
                    : initial.receiptUrl
                      ? 'Trocar Recibo'
                      : 'Anexar Recibo'}
                </Text>
              </Button>
              {(receiptLocalUri || initial.receiptUrl) && (
                <Text numberOfLines={1} flex={1}>
                  {receiptLocalUri
                    ? receiptLocalUri.split('/').pop()
                    : (initial.receiptUrl?.split('?')[0].split('/').pop() ?? 'recibo.jpg')}
                </Text>
              )}
            </XStack>
          </YStack>
        </Form>
      </KeyboardAvoidingView>
    </Modal>
  );
}
