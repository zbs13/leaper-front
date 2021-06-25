import React, { useEffect } from 'react';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import ProfileInfosForm from '../components/forms/ProfileInfosForm';

/**
 * profile settings screen
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function ProfileSettingsScreen({navigation}) {

    const  {selectors} = useApp();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: t(selectors.getLang()).profilSettings.PROFILE
        });
    }, [])

    return (
      <ProfileInfosForm isEdit />
    );
  }