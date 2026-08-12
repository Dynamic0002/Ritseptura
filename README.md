# Meat City — Next.js versiyasi

Retseptura va tannarx dasturi. Bu yangi (Next.js) versiyaning **birinchi bosqichi**: tannarx
hisob yadrosi ishlaydi. Qolgan bo'limlar (retseptura, reseptlar, xabarnomalar, sozlamalar)
keyingi bosqichlarda ko'chiriladi.

## Vercel'ga joylash (kompyuterda npm ishlatish shart emas)

1. Bu papkadagi barcha fayllarni GitHub'da yangi repozitoriyga yuklang.
2. vercel.com → **Add New → Project** → o'sha repozitoriyni tanlang.
3. **Environment Variables** bo'limiga ikkitasini qo'shing:
   - `NEXT_PUBLIC_SUPABASE_URL` = sizning Supabase URL manzilingiz
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sizning anon (public) kalitingiz
4. **Deploy** ni bosing. Vercel loyihani o'zi yig'adi (build) va ochadi.

> Eslatma: kalitlar endi kod ichida emas, Vercel sozlamalarida turadi — bu xavfsizroq.

## Mahalliy ishga tushirish (ixtiyoriy, terminal kerak)

```bash
npm install
npm run dev
```

Keyin brauzerda http://localhost:3000 ochiladi.
