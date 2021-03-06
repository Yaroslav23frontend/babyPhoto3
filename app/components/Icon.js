import React from 'react';
import SimpleLineIcons from './icons/SimpleLineIcons';
import FontAwesome from './icons/FontAwesome';
import FontAwesome5 from './icons/FontAwesome5';
import MaterialCommunityIcons from './icons/MaterialCommunityIcons';
import MaterialIcons from './icons/MaterialIcons';
import Feather from './icons/Feather';
import Entypo from './icons/Entypo';
import Ionicons from './icons/Ionicons';
export default function Icon({type, name, size, touched}) {
  if (type == 'SimpleLineIcons') {
    return (
      <SimpleLineIcons
        name={name}
        size={size}
        color={touched ? '#fff' : '#AB9CBE'}
      />
    );
  } else if (type == 'FontAwesome') {
    return (
      <FontAwesome
        name={name}
        size={size}
        color={touched ? '#fff' : '#AB9CBE'}
      />
    );
  } else if (type == 'FontAwesome5') {
    return (
      <FontAwesome5
        name={name}
        size={size}
        color={touched ? '#fff' : '#AB9CBE'}
      />
    );
  } else if (type == 'MaterialIcons') {
    return (
      <MaterialIcons
        name={name}
        size={size}
        color={touched ? '#fff' : '#AB9CBE'}
      />
    );
  } else if (type == 'MaterialCommunityIcons') {
    return (
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={touched ? '#fff' : '#AB9CBE'}
      />
    );
  } else if (type == 'Feather') {
    return (
      <Feather name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />
    );
  } else if (type == 'Ionicons') {
    return (
      <Ionicons name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />
    );
  } else if (type == 'Entypo') {
    return (
      <Entypo name={name} size={size} color={touched ? '#fff' : '#AB9CBE'} />
    );
  }
}
