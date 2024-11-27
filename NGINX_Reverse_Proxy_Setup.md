
# การตั้งค่า NGINX บน Ubuntu เพื่อใช้ Reverse Proxy ไปหา Docker Container

## 1. ติดตั้ง NGINX บน Ubuntu
1. อัปเดตแพ็กเกจและติดตั้ง **NGINX**:
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. ตรวจสอบสถานะของ NGINX:
   ```bash
   sudo systemctl status nginx
   ```

## 2. ตั้งค่า Reverse Proxy ใน NGINX
1. แก้ไขไฟล์การตั้งค่า NGINX:
   ```bash
   sudo nano /etc/nginx/sites-available/default
   ```

2. เพิ่มการตั้งค่าดังนี้:
   ```nginx
   server {
       listen 80;

       location /docker {
           proxy_pass http://localhost:3000/;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

           # ตรวจสอบ API Key
           if ($http_x_api_key != "your-secure-api-key") {
               return 401;
           }
       }
   }
   ```

3. บันทึกไฟล์และออกจากโปรแกรมแก้ไข (ใน **Nano** กด `CTRL + O` เพื่อบันทึกและ `CTRL + X` เพื่อออก)

4. ตรวจสอบการตั้งค่า NGINX:
   ```bash
   sudo nginx -t
   ```

5. รีโหลดการตั้งค่า NGINX:
   ```bash
   sudo systemctl reload nginx
   ```

## 3. ตั้งค่า Docker Container
1. สร้างและรัน Docker Container ที่พอร์ต 3000:
   ```bash
   docker run -p 3000:3000 my-express-app
   ```

## 4. ทดสอบ Reverse Proxy
เปิดเบราว์เซอร์และเข้าใช้งาน:
```
http://your-server-ip/docker
```

### หากตั้งค่าถูกต้อง จะเห็นข้อความ:
```
Hello from Docker!
```

## 5. การตั้งค่าเพิ่มเติม (Optional)
### 5.1 เพิ่มความปลอดภัยด้วย HTTPS (SSL)
1. ติดตั้ง **Certbot** สำหรับจัดการ SSL:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. ขอใบรับรอง SSL:
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

3. ตั้งค่า SSL อัตโนมัติสำหรับ NGINX และรีโหลด:
   ```bash
   sudo systemctl reload nginx
   ```

---
