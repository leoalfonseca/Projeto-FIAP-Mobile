// services
import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system/legacy'; // 👈 use a API legacy p/ Base64
import * as ImageManipulator from 'expo-image-manipulator';

import { supabase } from '@/infra/supabase/supabase';

export async function uploadReceiptSupabase(uid: string, localUri: string) {
  console.log('[sup-upload] step=manipulate src=', localUri);

  const manip = await ImageManipulator.manipulateAsync(localUri, [], {
    compress: 0.8,
    format: ImageManipulator.SaveFormat.JPEG
  });

  console.log('[sup-upload] step=read uri=', manip.uri);

  const base64 = await FileSystem.readAsStringAsync(manip.uri, {
    encoding: FileSystem.EncodingType.Base64 // 👈 evita o erro "Base64 undefined"
  });

  console.log('[sup-upload] step=decode len=', base64.length);

  const bytes = decode(base64); // ArrayBuffer
  const path = `${uid}/${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`; // 👈 sem "receipts/"

  const { error } = await supabase.storage
    .from('receipts')
    .upload(path, bytes, { contentType: 'image/jpeg', upsert: false });

  if (error) {
    console.log('[sup-upload] upload error', error);
    throw error;
  }

  const { data } = supabase.storage.from('receipts').getPublicUrl(path);
  return data.publicUrl; // URL pública (bucket Public)
}
