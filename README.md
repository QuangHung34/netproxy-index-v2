# 🌐 NetProxy Index V2

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)

**Landing Page hiện đại cho dịch vụ Proxy**

[🚀 Demo](https://netproxy-index-v2.pages.dev) • [🛒 Seller Portal](https://seller.prx.network/)

</div>

---

## ⚡ Quick Start

```bash
# Clone
git clone https://github.com/lebachhiep/netproxy-index-v2.git
cd netproxy-index-v2

# Install
pnpm install

# Config
cp .env.example .env.local

# Run
pnpm dev
```

Truy cập [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deploy Cloudflare Pages

### Bước 1: Kết nối GitHub

1. Vào [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages**
2. **Create** → **Pages** → **Connect to Git**
3. Chọn repo `lebachhiep/netproxy-index-v2`

### Bước 2: Cấu hình Build

| Setting | Value |
|---------|-------|
| Framework | `Next.js` |
| Build command | `npx @cloudflare/next-on-pages@1` |
| Output directory | `.vercel/output/static` |

### Bước 3: Environment Variables

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | `https://api.prx.network` |
| `NODE_VERSION` | `18` |

### Bước 4: Deploy

Click **Save and Deploy** → Đợi 2-5 phút → Done! 🎉

---

## 🛒 Hệ thống Đại lý

Sử dụng **[Seller Portal](https://seller.prx.network/)** để:

- 📊 Quản lý đơn hàng & khách hàng
- 💰 Tạo gói proxy với giá riêng
- 🏷️ White-label thương hiệu
- 🔌 API tích hợp tự động

```
Landing Page (Index V2) → Seller Portal → PRX API
```

---

## 📁 Cấu trúc

```
├── app/[locale]/     # Routes đa ngôn ngữ
├── components/       # UI Components
├── messages/         # i18n translations (vi, en, ...)
└── public/           # Static assets
```

---

## 🛠️ Tech Stack

| | |
|---|---|
| ⚛️ Next.js 16 | 🎨 Tailwind CSS 4 |
| 📱 React 19 | 🎬 Framer Motion |
| 📝 TypeScript | 🌍 next-intl |

---

## 📞 Liên hệ

- 📧 Email: ketoan@upgo.io
- 💬 Telegram: [@NetProxy_Support](https://t.me/NetProxy_Support)
- 🛒 Seller Portal: [seller.prx.network](https://seller.prx.network/)

---

<div align="center">

**Made with ❤️ by NetProxy Team**

</div>
