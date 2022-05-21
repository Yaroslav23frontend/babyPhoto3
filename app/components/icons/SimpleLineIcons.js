import React from 'react';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

export default function SimpleLineIcons({name, size, touched}) {
  return <Icon name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />;
}
