import ProfileInput from '@/components/ProfileInput';
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import React from 'react';
import { Image, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = () => {
    return (
        <SafeAreaView className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute w-full z-0" />
            
            <View className="px-5 pt-5">
                <Image
                    source={icons.person}
                    className="size-24 self-center mb-8"
                    tintColor="#FFF"
                />
                <ProfileInput placeholder="Enter your profile name" />
            </View>
        </SafeAreaView>
    )
}
export default Profile
