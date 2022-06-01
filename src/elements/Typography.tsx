import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface TypographyProps {
  value: string;
  type?: 'default' | 'title' | 'subtitle';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Typography: React.FC<TypographyProps> = props => {
  const { type = 'default', value, containerStyle, textStyle } = props;

  let myStyle;

  if (type == 'default') {
    myStyle = styles.default;
  } else if (type == 'title') {
    myStyle = styles.title;
  } else if (type == 'subtitle') {
    myStyle = styles.subTitle;
  }

  return <Text style={[myStyle, containerStyle, textStyle]}>{value}</Text>;
};

const styles = StyleSheet.create({
  default: {
    fontSize: 12,
    color: '#333333',
    fontWeight: '400',
    textAlign: 'center',
  },
  title: {
    fontSize: 26,
    color: '#333333',
    fontWeight: '700',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  subTitle: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default Typography;
