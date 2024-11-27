
# การติดตั้ง Express.js และการสร้าง API ด้วย Docker

## 1. ติดตั้ง Express.js
### ขั้นตอนการติดตั้ง
1. ตรวจสอบว่าติดตั้ง **Node.js** และ **npm** แล้ว โดยใช้คำสั่ง:
   ```bash
   node -v
   npm -v
   ```

2. สร้างโฟลเดอร์สำหรับโปรเจกต์:
   ```bash
   mkdir my-express-app
   cd my-express-app
   ```

3. เริ่มต้นโปรเจกต์ด้วย **npm**:
   ```bash
   npm init -y
   ```

4. ติดตั้ง **Express.js**:
   ```bash
   npm install express
   ```

## 2. เขียนตัวอย่าง API
สร้างไฟล์ `index.js` และวางโค้ดต่อไปนี้:

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Docker!');
});

app.listen(3000, () => {
    console.log('API running on port 3000');
});
```

## 3. การเขียน Dockerfile
สร้างไฟล์ `Dockerfile` และวางโค้ดต่อไปนี้:

```dockerfile
FROM node:lts-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["node", "index.js"]
EXPOSE 3000
```

## 4. คำสั่ง Docker พื้นฐาน

### 4.1 Build Docker Image
สร้าง Docker image:
```bash
docker build -t my-express-app .
```

### 4.2 Tag Docker Image
เพิ่ม tag ให้ image:
```bash
docker tag my-express-app myusername/my-express-app:latest
```

### 4.3 Push Docker Image
อัพโหลด image ไปยัง Docker Hub:
```bash
docker push myusername/my-express-app:latest
```

### 4.4 Pull Docker Image
ดึง image จาก Docker Hub:
```bash
docker pull myusername/my-express-app:latest
```

### 4.5 Run Docker Container
รัน container จาก image:
```bash
docker run -p 3000:3000 my-express-app
```

## 5. การทดสอบ API
เมื่อ container รันสำเร็จแล้ว คุณสามารถเข้าถึง API ได้ที่:
```
http://localhost:3000
```

หากทุกอย่างถูกต้อง คุณจะเห็นข้อความ:
```
Hello from Docker!
```

---
