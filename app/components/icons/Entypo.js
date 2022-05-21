import React from 'react';

import Icon from 'react-native-vector-icons/Entypo';

export default function Entypo({name, size, touched}) {
  return <Icon name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />;
}
