import React from 'react';

import Icon from 'react-native-vector-icons/Feather';

export default function Feather({name, size, touched}) {
  return <Icon name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />;
}
