import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function MaterialIcons({name, size, touched}) {
  return <Icon name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />;
}
