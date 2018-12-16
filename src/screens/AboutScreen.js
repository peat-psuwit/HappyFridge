import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

const aboutText = `\
        Happy Fridge เป็นแอปพลิเคชันที่ช่วยจัดการวัตถุดิบในตู้เย็น โดยการแสดง\
วัตถุดิบเรียงตามวันหมดอายุ แล้วจึงนำเสนอเมนูอาหารที่จะช่วยทำให้วัตถุดิบที่คุณเลือกได้ถูก\
นำไปปรุงอาหาร ทำให้ทุกคนไม่จำเป็นจะต้องทิ้งของในตู้เย็นอีกต่อไป

        Happy Fridge เป็นส่วนหนึ่งของรายวิชา 242-438 Modern mobile \
appplication development ตามหลักสูตรปริญญาวิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรม\
คอมพิวเตอร์ คณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์\
`;

const contributorText = `\
1. นายเฉลิม แซ่หวาง รหัสนักศึกษา 5810110058
2. นายรัชนันท์ ศรีรัตนเมธ รหัสนักศึกษา 5810110280
3. นายสิรวิชญ์ ดาดวน รหัสนักศึกษา 5810110346
4. นายสุทธิกิจ เจริญวงศ์กิจ รหัสนักศึกษา 5810110353
5. นายอัษฎาเทพ วิริยะนรอนันต์ รหัสนักศึกษา 5810110390
`;

function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headText}>Happy Fridge</Text>
      <Text style={styles.bodyText}>{aboutText}</Text>

      <Text style={styles.subHeadText}>ผู้จัดทำ</Text>
      <Text style={styles.bodyText}>{contributorText}</Text>
    </ScrollView>
  );
}

AboutScreen.navigationOptions = {
  title: 'เกี่ยวกับ',
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',

    paddingHorizontal: 16,
  },
  headText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',

    marginVertical: 16,
  },
  subHeadText: {
    fontSize: 24,
    fontWeight: 'bold',

    marginVertical: 16,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 16 * 1.5,
  }
});

export default AboutScreen;
