import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function FontAwesome5({name, size, touched}) {
  return <Icon name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />;
}
