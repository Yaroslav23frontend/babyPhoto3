import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function FontAwesome({name, size, touched}) {
  return <Icon name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />;
}
