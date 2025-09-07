import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

type AvatarProps = {
  name: string;
  size?: number;
  backgroundColor?: string;
};

const Avatar: React.FC<AvatarProps> = ({ name, size = 80, backgroundColor }) => {
const getColor = (name:string) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const getInitials = (name:string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };


  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: getColor(name),
        },
      ]}
    >
          <Text style={{ fontSize: size * 0.4, color: 'white', fontWeight: 'bold' }}>
        {getInitials(name)}
      </Text>

    </View>
  );
};

// Example usage


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // Add a subtle shadow for better appearance
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'System', // Use system font for consistency
  },
  showcase: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Avatar;