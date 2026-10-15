# BUỔI 6 – DOCKER HUB MULTI-CONTAINER

## Câu 1. Mở trình duyệt web và truy cập Render Dashboard

Đã truy cập Render Dashboard để kiểm tra các Web Service đã triển khai từ Buổi 5.

## Câu 2. Kiểm tra trạng thái hoạt động của 2 Web Service

Đã kiểm tra 2 Web Service trên Render:

- mern-backend-236167
- mern-frontend-236167

Kết quả: cả hai Web Service đều ở trạng thái Deployed.

Render hiển thị:
"All services are up and running."

## Câu 3. Truy cập ứng dụng Frontend qua Public URL

Đã truy cập Public URL của Frontend.

Ứng dụng Frontend hoạt động và hiển thị danh sách sinh viên.

## Câu 4. Mở Logs của Backend Service

Đã mở tab Logs của Web Service mern-backend-236167 trên Render để kiểm tra nhật ký hoạt động và kết nối.

Kết quả: Backend hoạt động bình thường.

## Câu 5. Mở Terminal trên máy local

Đã mở Terminal trên máy local và di chuyển vào thư mục dự án cloud-lab.

## Câu 6. Kiểm tra branch Git và cập nhật code

Đã kiểm tra branch Git hiện tại và cập nhật code mới nhất từ GitHub bằng lệnh:

git pull origin main

## Câu 7. Kiểm tra Docker và đăng nhập Docker Hub

Đã kiểm tra phiên bản Docker bằng lệnh:

docker --version

Đã đăng nhập Docker Hub bằng lệnh:

docker login

## Câu 8. Kiểm tra Docker Image

Đã kiểm tra các Docker Image hiện có trên máy local bằng lệnh:

docker images

## Câu 9. Kiểm tra Repository trên Docker Hub

Đã kiểm tra 2 Repository trên Docker Hub:

- mern-backend
- mern-frontend

## Câu 10. Mục tiêu nâng cấp của Buổi 6

Buổi 6 tập trung vào các mục tiêu:

- Tự động hóa triển khai (CD)
- Thống nhất Domain qua Nginx Reverse Proxy
- Rolling Update
- Monitoring hệ thống
