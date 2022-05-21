import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function MaterialCommunityIcons({name, size, touched}) {
  return <Icon name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />;
}
