import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Auth, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm, Controller } from 'react-hook-form';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { View, Text, YStack, Card } from 'tamagui';

import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';

import { auth } from '@/infra/firebase/firebase';

type FormValues = { email: string; password: string };

export function LoginScreen() {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({ defaultValues: { email: '', password: '' } });

  const onSubmit = async ({ email, password }: FormValues) => {
    try {
      await signInWithEmailAndPassword(auth as Auth, email.trim(), password);
      router.replace('/(tabs)/dashboard/page');
    } catch (e: any) {
      const code = e?.code || '';
      let msg = 'Falha ao entrar.';
      if (code === 'auth/invalid-credential' || code === 'auth/wrong-password')
        msg = 'Credenciais inválidas.';
      if (code === 'auth/user-not-found') msg = 'Usuário não encontrado.';
      if (code === 'auth/too-many-requests') msg = 'Muitas tentativas. Tente mais tarde.';

      Toast.show({ type: 'error', text1: msg });
    }
  };

  const email = watch('email');
  const password = watch('password');
  const canSubmit = !!email && !!password && !isSubmitting;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <LinearGradient
          colors={['#004C61', '#E0EAEA']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        >
          <View flex={1} justifyContent="center" alignItems="center">
            <Card
              marginLeft={30}
              marginRight={30}
              height={400}
              width={350}
              alignItems="center"
              justifyContent="center"
              backgroundColor="white"
              borderRadius={8}
              padding="$8"
            >
              <YStack gap={16} width="100%">
                <Image
                  source={require('../../../../assets/images/logo.png')}
                  resizeMode="contain"
                  style={{ width: 150, height: 55, alignSelf: 'center', marginBottom: 20 }}
                />

                <Text color="$gray800" fontWeight="700" fontSize={16} marginBottom={-8}>
                  Usuário
                </Text>
                <Controller
                  control={control}
                  name="email"
                  rules={{ required: 'Informe seu email' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outlined"
                      placeholder="Digite seu email"
                      placeholderTextColor="$gray600"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      autoCorrect={false}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      textContentType="username"
                      autoComplete="email"
                      returnKeyType="next"
                    />
                  )}
                />
                {!!errors.email?.message && (
                  <Text color="$red10Dark" fontSize={12}>
                    {errors.email.message}
                  </Text>
                )}

                <Text color="$gray800" fontWeight="700" fontSize={16} marginBottom={-8}>
                  Senha
                </Text>
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: 'Informe sua senha' }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outlined"
                      placeholder="Digite a senha"
                      placeholderTextColor="$gray600"
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      secureTextEntry
                      autoCorrect={false}
                      autoCapitalize="none"
                      returnKeyType="done"
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                  )}
                />
                {!!errors.password?.message && (
                  <Text color="$red10Dark" fontSize={12}>
                    {errors.password.message}
                  </Text>
                )}

                <Button
                  backgroundColor={'$primary500'}
                  color="$gray100"
                  disabled={!canSubmit}
                  onPress={handleSubmit(onSubmit)}
                >
                  {isSubmitting ? 'Entrando...' : 'Continuar'}
                </Button>
              </YStack>
            </Card>
          </View>
          <Toast />
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
