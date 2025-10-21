import { icons } from "@/constants/icons";
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

type ProfileInputProps = {
    placeholder: string;
}

const ProfileInput = ({ placeholder }: ProfileInputProps) => {
    const [profileName, setProfileName] = useState('');
    const [displayName, setDisplayName] = useState('');

    const handlePress = () => {
        setDisplayName(profileName);
    };

    return (
        <View>
            <TouchableOpacity 
                onPress={handlePress}
                className="flex-row items-center bg-black rounded-full px-5 py-4"
            >
                <Image source={icons.person} className="size-5" resizeMode="contain" tintColor="#A8B5DB" />
                <TextInput
                    placeholder={placeholder}
                    value={profileName}
                    onChangeText={setProfileName}
                    placeholderTextColor="#A8B5DB"
                    className="flex-1 ml-2 text-white"
                />
            </TouchableOpacity>
            {displayName ? (
                <Text className="text-white text-lg mt-4 text-center">
                    {displayName}
                </Text>
            ) : null}
        </View>
    )
}
export default ProfileInput