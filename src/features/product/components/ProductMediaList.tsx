import { PlayCircle } from '@tamagui/lucide-icons';
import getVideoId from 'get-video-id';
import React, { useState } from 'react';
import { Dimensions, Linking, Pressable } from 'react-native';

import { Image } from 'react-native';
import { Text, View, XStack, YStack } from 'tamagui';

interface ProductMediaListProps {
  video?: string;
  image?: string;
}

export function ProductMediaList({ video, image }: ProductMediaListProps) {
  const [selected, setSelected] = useState<'image' | 'video'>(image ? 'image' : 'video');
  const { id, service } = getVideoId(video || '');

  let videoIntern: { embed: string; img: string } | undefined;

  if (service === 'youtube' && id) {
    videoIntern = {
      embed: `https://www.youtube.com/watch?v=${id}`,
      img: `https://img.youtube.com/vi/${id}/default.jpg`
    };
  }

  const hasImageAndVideo = videoIntern?.embed && image;
  const screenWidth = Dimensions.get('window').width;
  const mediaWidth = hasImageAndVideo ? screenWidth * 0.75 : screenWidth * 0.9;

  return (
    <YStack>
      <YStack alignItems="center">
        {selected === 'image' && image && (
          <Image
            source={{ uri: image }}
            style={{
              width: mediaWidth,
              height: mediaWidth * 0.75,
              borderRadius: 10,
              resizeMode: 'cover'
            }}
          />
        )}

        {selected === 'video' && videoIntern?.embed && (
          <Pressable
            onPress={() => Linking.openURL(videoIntern?.embed)}
            style={{
              width: mediaWidth,
              height: mediaWidth * 0.5625,
              borderRadius: 10,
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <Image
              source={{ uri: videoIntern.img }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
            <View
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              justifyContent="center"
              alignItems="center"
              backgroundColor="rgba(0,0,0,0.4)"
            >
              <PlayCircle size={24} color="white" />
            </View>
          </Pressable>
        )}

        {!image && !videoIntern?.embed && (
          <YStack
            width={mediaWidth}
            height={200}
            borderRadius={10}
            backgroundColor="$gray6"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="$gray10" fontSize={20}>
              Sem mídia disponível
            </Text>
          </YStack>
        )}
      </YStack>

      {hasImageAndVideo && (
        <XStack marginTop="$3" justifyContent="center" gap="$3">
          <Pressable
            onPress={() => setSelected('image')}
            style={{
              borderWidth: selected === 'image' ? 2 : 0,
              borderColor: '#4f46e5',
              borderRadius: 8
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: 80,
                height: 60,
                borderRadius: 8,
                resizeMode: 'cover'
              }}
            />
          </Pressable>

          <Pressable
            onPress={() => setSelected('video')}
            style={{
              borderWidth: selected === 'video' ? 2 : 0,
              borderColor: '#4f46e5',
              borderRadius: 8,
              position: 'relative'
            }}
          >
            <Image
              source={{ uri: videoIntern?.img }}
              style={{
                width: 80,
                height: 60,
                borderRadius: 8,
                resizeMode: 'cover'
              }}
            />
            <View
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              justifyContent="center"
              alignItems="center"
              backgroundColor="rgba(0,0,0,0.3)"
              borderRadius={8}
            >
              <PlayCircle size={14} color="white" />
            </View>
          </Pressable>
        </XStack>
      )}
    </YStack>
  );
}
