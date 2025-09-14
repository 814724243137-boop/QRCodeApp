import React from 'react';
import { SvgXml } from 'react-native-svg';

const logoXml = `
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background Circle -->
  <circle cx="100" cy="100" r="95" fill="#3498db" />
  
  <!-- QR Code Frame -->
  <rect x="50" y="50" width="100" height="100" rx="10" fill="white" />
  
  <!-- QR Code Elements -->
  <!-- Top Left Corner -->
  <rect x="60" y="60" width="25" height="25" rx="3" fill="#2c3e50" />
  <rect x="65" y="65" width="15" height="15" rx="2" fill="white" />
  <rect x="70" y="70" width="5" height="5" rx="1" fill="#2c3e50" />
  
  <!-- Top Right Corner -->
  <rect x="115" y="60" width="25" height="25" rx="3" fill="#2c3e50" />
  <rect x="120" y="65" width="15" height="15" rx="2" fill="white" />
  <rect x="125" y="70" width="5" height="5" rx="1" fill="#2c3e50" />
  
  <!-- Bottom Left Corner -->
  <rect x="60" y="115" width="25" height="25" rx="3" fill="#2c3e50" />
  <rect x="65" y="120" width="15" height="15" rx="2" fill="white" />
  <rect x="70" y="125" width="5" height="5" rx="1" fill="#2c3e50" />
  
  <!-- Additional QR Code Elements -->
  <rect x="95" y="60" width="10" height="10" rx="2" fill="#2c3e50" />
  <rect x="95" y="80" width="10" height="10" rx="2" fill="#2c3e50" />
  <rect x="115" y="95" width="10" height="10" rx="2" fill="#2c3e50" />
  <rect x="95" y="115" width="10" height="10" rx="2" fill="#2c3e50" />
  <rect x="115" y="115" width="10" height="10" rx="2" fill="#2c3e50" />
  <rect x="125" y="125" width="10" height="10" rx="2" fill="#2c3e50" />
  <rect x="60" y="95" width="10" height="10" rx="2" fill="#2c3e50" />
  <rect x="80" y="95" width="10" height="10" rx="2" fill="#2c3e50" />
  
  <!-- Scan Line Animation -->
  <rect x="50" y="95" width="100" height="3" fill="#e74c3c" />
</svg>
`;

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 100, height = 100 }) => {
  return <SvgXml xml={logoXml} width={width} height={height} />;
};

export default Logo;