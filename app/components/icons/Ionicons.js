import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';

export default function Ionicons({name, size, touched}) {
  return <Icon name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />;
}
