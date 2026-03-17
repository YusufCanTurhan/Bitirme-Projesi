 Kapsamlı Seyahat Bütçesi ve Rota Planlayıcı

Bu proje, kullanıcıların seyahat rotalarını interaktif bir şekilde planlayabildiği ve harcamalarını gerçek zamanlı olarak takip edebildiği modern bir front-end web uygulamasıdır. Gelişmiş sürükle-bırak (drag & drop) dinamikleri ve gerçekçi veri setleriyle profesyonel bir seyahat acentesi deneyimi sunmayı hedefler. 

##  Öne Çıkan Özellikler

* **Etkileşimli Rota Planlama:** Kullanıcılar, gezilecek mekanları "Sürükle-Bırak" (Drag & Drop) mantığıyla günlere atayarak kendi özel seyahat takvimlerini oluşturabilirler.
* **Gerçek Zamanlı Bütçe Hesaplama:** Plana eklenen her yeni aktivitenin fiyatı, ekranın üst kısmındaki dinamik bütçe paneline anında milisaniyeler içinde yansır.
* **Gerçekçi Veri Seti (Kaggle Entegrasyonu):** API limitlerine takılmamak adına, mekan görselleri, puanlamalar (rating) ve fiyatlandırmalar Kaggle verilerinden derlenmiş statik bir JSON veritabanı üzerinden çekilmektedir.
* **Modern ve Şık Arayüz:** Uygulama tamamen Tailwind CSS ile tasarlanmış olup; cam efekti (backdrop-blur), görsel hiyerarşi ve akıcı animasyonlarla zenginleştirilmiştir.

##  Kullanılan Teknolojiler

* **Core:** React.js, Vite
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS
* **Etkileşim:** @hello-pangea/dnd (Drag and Drop)
* **Backend/API:** JSON-Server (Mock API)
* **Araçlar:** Concurrently (Tek komutla çoklu sunucu yönetimi)
