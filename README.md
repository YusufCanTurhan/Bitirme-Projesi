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

PROJE İLERLEME RAPORU
Projenin Amacı ve Altyapı: React.js ve Tailwind CSS kullanılarak geliştirilen "Gezi Mimarı", kullanıcıların seyahat rotalarını sürükle-bırak (drag-and-drop) yöntemiyle planlayabildikleri bir web uygulamasıdır. Veri yönetimi, sistemin bağımsız ve hızlı çalışabilmesi için statik JSON altyapısıyla kurgulanmıştır.

Ana Sayfa Geliştirmeleri (Home.jsx): Modern web standartlarına uygun, cam efekti barındıran temiz bir arayüz tasarlanmış ve küresel şehirlerin listelendiği dinamik bir destinasyon galerisi oluşturulmuştur.

Planlama Motoru (Planla.jsx): Seçilen şehre ait mekanların listelendiği, anlık bütçe hesaplaması, tarih seçimi ve kategori filtrelemesi yapabilen işlevsel bir planlama panosu geliştirilmiştir.

Teknik İyileştirmeler: Sürükle-bırak kütüphanesi ile CSS özellikleri arasındaki katman (z-index) çakışmaları ve görsel kayma hataları tespit edilerek düzeltilmiş, fizik motoru stabil hale getirilmiştir. Ayrıca JSON veritabanı yeni şehirlerle genişletilmiştir.

Anlık Bütçe Takibi: Kullanıcı bir mekanı gün planına sürüklediğinde, o mekanın maliyetinin genel bütçeye anlık olarak yansıması sağlanmıştır.

Arama ve Filtreleme: Gezilecek yerler listesi içinde anlık metin araması yapabilen ve kategoriye (Müze, Aktivite, Yemek vb.) göre filtreleme sunan fonksiyonlar kodlanmıştır.

Tarih Yönetimi: Gidiş ve dönüş tarihlerinin seçilebileceği HTML5 entegreli kullanıcı girdileri eklenmiştir.
