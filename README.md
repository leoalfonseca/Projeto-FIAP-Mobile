# Finance App – Firebase + Supabase (Expo)

Este app permite criar e listar **transações** (Firestore) e **anexar recibos** (Supabase Storage), com **download para a galeria** do dispositivo.

> **Por que Supabase para recibos?** O Firebase Storage pode gerar custos dependendo do uso. Aqui optamos por **Supabase Storage** (gratuito no tier inicial) para armazenar as imagens dos recibos.

---

## Stack

- **Expo/React Native** (Tamagui, React Hook Form, class-validator)
- **Firebase**: Auth + Firestore
- **Supabase**: Storage (bucket `receipts`)
- **expo-media-library**, **expo-image-picker**, **expo-image-manipulator**

---

## 1) Crie os projetos

### Firebase

1. Crie um projeto no **Firebase Console**.
2. **Authentication** → habilite o provedor usado (ex.: Email/Password).
3. **Firestore Database** → crie o banco em **Production**.
4. Regras de segurança sugeridas:
   ```txt
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{uid}/transactions/{id} {
         allow read, write: if request.auth != null && request.auth.uid == uid;
       }
     }
   }
   ```
5. Pegue as credenciais do app (apiKey, authDomain, projectId, etc.).
6. **storageBucket** pode ser o padrão (`<seu-projeto>.appspot.com`).  
   > Observação: **não** usamos o Firebase Storage para recibos neste projeto.

### Supabase

1. Crie um projeto no **Supabase**.
2. Em **Storage**, crie um bucket chamado **`receipts`**.
3. Escolha **uma** opção:
   - **Público (mais simples)**: marque o bucket como **Public**.
   - **Privado (mais seguro)**: deixe **Private** e crie políticas (RLS) para `storage.objects`:
     ```sql
     -- ler apenas do próprio usuário
     create policy "read own objects"
       on storage.objects for select
       to authenticated
       using (bucket_id = 'receipts' and name like auth.uid() || '/%');

     -- escrever apenas no próprio prefixo {uid}/
     create policy "upload to own folder"
       on storage.objects for insert
       to authenticated
       with check (bucket_id = 'receipts' and name like auth.uid() || '/%');
     ```
     > Se usar bucket **privado**, troque `getPublicUrl` por **signed URL** no código.
4. Em **Settings → API**, copie:
   - **Project URL** → `EXPO_PUBLIC_SUPABASE_URL`
   - **anon public key** → `EXPO_PUBLIC_SUPABASE_ANON_KEY` (pode ficar no app cliente)

---

## 2) Variáveis de ambiente

Crie um **.env** na raiz:

```bash
# Firebase
EXPO_PUBLIC_FB_API_KEY=...
EXPO_PUBLIC_FB_AUTH_DOMAIN=...
EXPO_PUBLIC_FB_PROJECT_ID=...
EXPO_PUBLIC_FB_STORAGE_BUCKET=... # ex: meu-projeto.appspot.com
EXPO_PUBLIC_FB_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FB_APP_ID=...

# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://XXXXX.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> Dica: adicione um **.env.example** com as chaves vazias para quem for clonar.

No **app.config.(ts|js)** (ou `app.json` via `extra`), garanta:

```ts
export default {
  expo: {
    // ...
    extra: {
      EXPO_PUBLIC_FB_API_KEY: process.env.EXPO_PUBLIC_FB_API_KEY,
      EXPO_PUBLIC_FB_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
      EXPO_PUBLIC_FB_PROJECT_ID: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
      EXPO_PUBLIC_FB_STORAGE_BUCKET: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
      EXPO_PUBLIC_FB_MESSAGING_SENDER_ID: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
      EXPO_PUBLIC_FB_APP_ID: process.env.EXPO_PUBLIC_FB_APP_ID,
      EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
      EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
    }
  }
}
```

---

## 3) Permissões (salvar recibo na galeria)

Inclua o plugin e as mensagens de permissão no **app.json**:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-media-library",
        {
          "photosPermission": "Permitir que o app salve recibos na sua Biblioteca de Fotos."
        }
      ]
    ],
    "ios": {
      "infoPlist": {
        "NSPhotoLibraryAddUsageDescription": "Precisamos salvar o recibo na sua Biblioteca de Fotos."
      }
    }
  }
}
```

No iOS (incluindo Expo Go), a permissão será solicitada quando tentar salvar pela primeira vez.

---

## 4) Rodando o projeto

1. Instale as dependências:
   ```bash
   yarn
   # ou
   npm i
   ```

2. Copie e preencha o `.env`:
   ```bash
   cp .env.example .env
   ```

3. Inicie o app:
   ```bash
   yarn start:dev
   # ou
   npx expo start
   # limpar cache:
   npx expo start -c
   ```

> Se `yarn start:dev` não existir, adicione no `package.json`:
> ```json
> { "scripts": { "start:dev": "expo start" } }
> ```

---

## 5) Dicas & Solução de Problemas

- **Filtros no Firestore**: ao combinar vários `where` com `orderBy('date')`, pode ser necessário criar **índices compostos**. O console do Firebase oferece o link direto.
- **Uploads de recibo (Supabase)**: salvamos em `receipts/{uid}/{timestamp-random}.jpg`.  
  - Bucket **público**: use `getPublicUrl`.
  - Bucket **privado**: use `createSignedUrl` para gerar URL temporária.
- **Chave anon do Supabase** é pública (cliente). **Não** use a `service_role` no app.
- **Expo Go**: o fluxo de salvar na galeria funciona no Expo Go, desde que as permissões e o plugin `expo-media-library` estejam configurados.

---

## 6) Scripts úteis

```json
{
  "scripts": {
    "start": "expo start",
    "start:dev": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "clean": "expo start -c"
  }
}
```

---

## 7) Estrutura (resumo)

```
src/
  components/
  infra/
    firebase/        # init do Firebase
    supabase/        # init do Supabase
  modules/transactions/
    components/
    hooks/
    model/
    services/        # Firestore e upload para Supabase
    utils/           # downloadReceipt
```

---

## Licença

MIT
