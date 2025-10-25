import React from 'react';
import { View } from 'react-native';

// Simple SVG-like icons using React Native components
export const RefreshCcw = ({ size = 24, color = '#000' }) => (
  <View style={{
    width: size,
    height: size,
    borderWidth: 2,
    borderColor: color,
    borderRadius: size / 2,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '45deg' }]
  }} />
);

export const DollarSign = ({ size = 24, color = '#000' }) => (
  <View style={{
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <View style={{
      width: size * 0.8,
      height: 2,
      backgroundColor: color,
      position: 'absolute'
    }} />
    <View style={{
      width: 2,
      height: size * 0.6,
      backgroundColor: color,
      position: 'absolute'
    }} />
    <View style={{
      width: size * 0.6,
      height: 2,
      backgroundColor: color,
      position: 'absolute',
      top: size * 0.3
    }} />
  </View>
);

export const Cpu = ({ size = 24, color = '#000' }) => (
  <View style={{
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
  }}>
    {/* Outer chip body */}
    <View style={{
      width: size * 0.7,
      height: size * 0.7,
      borderWidth: 2,
      borderColor: color,
      borderRadius: 3,
      backgroundColor: 'transparent',
    }}>
      {/* Inner circuit pattern */}
      <View style={{
        position: 'absolute',
        top: '25%',
        left: '25%',
        width: '50%',
        height: '50%',
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: 2,
      }} />
    </View>
    
    {/* Pins - top */}
    <View style={{
      position: 'absolute',
      top: 0,
      left: size * 0.3,
      width: size * 0.15,
      height: size * 0.2,
      backgroundColor: color,
    }} />
    <View style={{
      position: 'absolute',
      top: 0,
      right: size * 0.3,
      width: size * 0.15,
      height: size * 0.2,
      backgroundColor: color,
    }} />
    
    {/* Pins - bottom */}
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: size * 0.3,
      width: size * 0.15,
      height: size * 0.2,
      backgroundColor: color,
    }} />
    <View style={{
      position: 'absolute',
      bottom: 0,
      right: size * 0.3,
      width: size * 0.15,
      height: size * 0.2,
      backgroundColor: color,
    }} />
    
    {/* Pins - left */}
    <View style={{
      position: 'absolute',
      left: 0,
      top: size * 0.3,
      width: size * 0.2,
      height: size * 0.15,
      backgroundColor: color,
    }} />
    <View style={{
      position: 'absolute',
      left: 0,
      bottom: size * 0.3,
      width: size * 0.2,
      height: size * 0.15,
      backgroundColor: color,
    }} />
    
    {/* Pins - right */}
    <View style={{
      position: 'absolute',
      right: 0,
      top: size * 0.3,
      width: size * 0.2,
      height: size * 0.15,
      backgroundColor: color,
    }} />
    <View style={{
      position: 'absolute',
      right: 0,
      bottom: size * 0.3,
      width: size * 0.2,
      height: size * 0.15,
      backgroundColor: color,
    }} />
  </View>
);
