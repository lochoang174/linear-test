#   Aptos Token Transfer DApp

Project Linear cho phép người dùng transfer token trên blockchain Aptos, được xây dựng với React.
link: https://linear-six.vercel.app/
## Tổng quan

- **Kết nối ví**: Hỗ trợ Petra Wallet, Martian Wallet và các ví Aptos phổ biến khác
- **Transfer Token**: Chuyển các loại token trên mạng Aptos
- **Token Balance**: Xem số dư các loại token trong ví
- **Transaction History**: Theo dõi lịch sử giao dịch
- **Multi-token Support**: Hỗ trợ APT và các token khác trên Aptos

## Công nghệ sử dụng

- React 18
- TypeScript
- Vite
- TailwindCSS
- Aptos Web3 SDK
- Wallet Adapters

## Yêu cầu hệ thống

- Node.js 16+ 
- Một trong các ví Aptos (Petra, Martian, etc.)
- Testnet/Mainnet APT để thanh toán gas fee

## Hướng dẫn cài đặt

1. Clone repository:
```bash
https://github.com/lochoang174/linear-test.git
```

2. Cài đặt dependencies:
```bash
npm install
```


3. Chạy ứng dụng ở môi trường development:
```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

## Cách sử dụng

1. Kết nối ví Aptos của bạn với ứng dụng
2. Faucet cho account nếu chưa có token, Link faucet: https://www.aptosfaucet.com/
3. Nhập địa chỉ ví người nhận
4. Nhập số lượng token
5. Xác nhận giao dịch qua ví của bạn
## Video demo
https://github.com/user-attachments/assets/10b0e556-1047-4f3d-a7ca-d1d1e76cccc7

