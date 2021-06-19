import React, { useEffect } from 'react';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import ProfileInfosForm from '../components/forms/ProfileInfosForm';

/**
 * app settings screen
 * 
 * @param {object} navigation for routing 
 * @returns 
 */
export default function ProfilSettingsScreen({navigation, isEdit= false}) {

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