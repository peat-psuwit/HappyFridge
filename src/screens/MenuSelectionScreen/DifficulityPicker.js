import React from 'react';
import { Picker } from 'react-native';

const difficulities = [
  'ง่าย',
  'ค่อนข้างง่าย',
  'ปานกลาง',
  'ค่อนข้างยาก',
  'ยาก',
];

function DifficulityPicker(props) {
  return (
    <Picker {...props}>
      <Picker.Item label="ไม่กำหนดความยาก" value={null}/>
      {difficulities.map((value) => (
        <Picker.Item key={value} label={value} value={value} />
      ))}
    </Picker>
  );
}

export default DifficulityPicker;