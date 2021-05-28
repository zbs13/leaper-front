import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import useApp from '../hooks/useApp';
import t from '../providers/lang/translations';
import Field from '../components/fields/Field';

/**
 * edit group/event screen
 * @returns 
 */
export default function CreateEditRoleScreen({navigation, route}) {
    const role = route.params.role;
    const isEdit = route.params.isEdit;

    const { selectors } = useApp();

    const [roleState, setRoleState] = useState({
        name: isEdit ? role.name : "",
        isError: !isEdit
    })

    useEffect(() => {
        navigation.setOptions({
            headerTitle: isEdit ? "Edit role : " + role.name : "Role"
        });
    }, [])

    return (
        <View>
            <Field 
                type="text"
                placeholder="Nom du rôle"
                defaultValue={isEdit ? role.name : null}
                isError={(error) => error ? setRoleState({...roleState, isError: true}) : setRoleState({...roleState, isError: false})}
                onChange={(name) => setRoleState({...roleState, name: name})}
            />
        </View>
    );
}

