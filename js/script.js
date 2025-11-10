document.addEventListener('DOMContentLoaded', () => {

    const recipeGrid = document.getElementById('recipe-grid');
    const searchInput = document.getElementById('searchInput');

    // --- DATA LENGKAP DENGAN 12 RESEP ---
    const defaultRecipes = [
        {
            id: 1,
            name: 'Rendang Daging Sapi',
            desc: 'Hidangan daging ikonik Indonesia dengan bumbu rempah melimpah yang dimasak perlahan hingga meresap sempurna.',
            image: 'images/rendang.jpg',
            rating: 5,
            history: 'Rendang adalah mahakarya kuliner dari Minangkabau, Sumatera Barat, yang melambangkan filosofi kesabaran, kebijaksanaan, dan ketekunan. Awalnya, rendang dimasak sebagai cara untuk mengawetkan daging agar tahan lama dalam perjalanan jauh. Proses memasak yang memakan waktu berjam-jam tidak hanya mengempukkan daging, tetapi juga membuat bumbunya meresap hingga ke serat terdalam, menghasilkan cita rasa kompleks yang diakui sebagai salah satu hidangan paling lezat di dunia.',
            tools: ['Panci berdasar tebal (heavy-bottomed pot) atau wajan besar', 'Blender atau ulekan dan cobek untuk menghaluskan bumbu', 'Spatula kayu atau sendok masak tahan panas', 'Talenan dan pisau tajam'],
            ingredients: ['<strong>Bahan Utama:</strong>', '1 kg daging sapi berkualitas baik (disarankan bagian sandung lamur atau paha), potong ukuran rendang', '2 liter santan kental dari 3-4 butir kelapa tua', '<strong>Bumbu Halus (dihaluskan bersama):</strong>', '250 gr bawang merah', '100 gr bawang putih', '50 gr cabai merah keriting (atau sesuai selera)', '25 gr jahe', '30 gr lengkuas', '2 sdt ketumbar bubuk', '1 sdt merica butiran', '1/2 butir pala', '<strong>Bumbu Cemplung:</strong>', '2 lembar daun kunyit, ikat simpul', '4 lembar daun jeruk purut', '2 batang serai, memarkan', '2 buah asam kandis', 'Garam dan sedikit gula pasir secukupnya'],
            steps: ['<strong>Persiapan Bumbu:</strong> Haluskan semua bahan bumbu halus menggunakan blender atau ulekan hingga benar-benar lembut dan tercampur rata.', '<strong>Memasak Santan:</strong> Tuang santan ke dalam panci besar, masukkan bumbu halus, daun kunyit, daun jeruk, serai, dan asam kandis. Masak di atas api sedang sambil terus diaduk perlahan untuk mencegah santan pecah. Lanjutkan hingga santan mendidih dan mulai mengeluarkan minyak.', '<strong>Memasukkan Daging:</strong> Setelah santan berminyak, masukkan potongan daging sapi. Aduk rata hingga semua potongan daging terbalut bumbu. Masak hingga daging berubah warna.', '<strong>Proses Memasak Lambat (Slow Cooking):</strong> Kecilkan api ke tingkat paling rendah. Lanjutkan memasak rendang selama 3-4 jam. Aduk sesekali secara perlahan untuk memastikan bagian bawah tidak gosong. Proses ini sangat penting untuk pengempukan daging dan karamelisasi bumbu.', '<strong>Tahap Akhir:</strong> Masak terus hingga santan mengering, bumbu meresap sempurna, dan rendang berubah warna menjadi cokelat gelap. Cicipi dan koreksi rasa jika perlu.', '<strong>Penyajian:</strong> Rendang siap disajikan. Hidangan ini akan lebih nikmat jika disantap keesokan harinya setelah bumbu semakin meresap.']
        },
        {
            id: 2,
            name: 'Soto Ayam Lamongan',
            desc: 'Soto ayam dengan kuah bening kaya rempah, disajikan dengan taburan koya gurih yang menjadi ciri khasnya.',
            image: 'images/soto.jpg',
            rating: 5,
            history: 'Soto Lamongan adalah salah satu varian soto paling terkenal dari Jawa Timur. Keunikannya terletak pada kuah beningnya yang segar namun kaya akan rempah, serta penggunaan koya, bubuk gurih yang terbuat dari kerupuk udang dan bawang putih. Koya inilah yang memberikan tekstur dan dimensi rasa yang membedakannya dari soto-soto lain di nusantara.',
            tools: ['Panci besar untuk merebus kaldu', 'Wajan untuk menumis', 'Ulekan atau blender', 'Mangkuk saji'],
            ingredients: ['<strong>Bahan Utama:</strong>', '1 ekor ayam kampung, belah menjadi 4 bagian', '2.5 liter air', '3 sdm minyak untuk menumis', '<strong>Bumbu Halus:</strong>', '8 siung bawang merah', '6 siung bawang putih', '4 cm kunyit bakar', '3 butir kemiri sangrai', '1 sdt merica butiran', '<strong>Bumbu Cemplung:</strong>', '3 batang serai, memarkan', '5 lembar daun jeruk', '2 cm lengkuas, memarkan', '<strong>Bahan Koya (haluskan):</strong>', '50 gr kerupuk udang, goreng', '2 sdm bawang putih goreng', '<strong>Pelengkap:</strong>', 'Soun, tauge, irisan seledri, telur rebus, irisan kol, bawang goreng, jeruk nipis, sambal.'],
            steps: ['<strong>Membuat Kaldu:</strong> Rebus ayam dalam 2.5 liter air hingga matang dan berkaldu. Angkat ayam, saring kaldunya, dan didihkan kembali. Goreng ayam sebentar hingga berkulit, lalu suwir-suwir dagingnya.', '<strong>Menyiapkan Bumbu:</strong> Panaskan minyak, tumis bumbu halus hingga benar-benar harum dan matang. Masukkan serai, daun jeruk, dan lengkuas, aduk hingga layu.', '<strong>Memasak Kuah Soto:</strong> Masukkan tumisan bumbu ke dalam kaldu yang mendidih. Bumbui dengan garam dan gula. Masak dengan api kecil selama sekitar 20 menit agar semua rasa menyatu. Koreksi rasa.', '<strong>Membuat Koya:</strong> Haluskan kerupuk udang yang sudah digoreng bersama bawang putih goreng hingga menjadi bubuk halus.', '<strong>Penyajian:</strong> Tata soun, tauge, irisan kol, dan suwiran ayam di dalam mangkuk. Siram dengan kuah soto panas. Sajikan dengan taburan koya melimpah, seledri, bawang goreng, telur rebus, perasan jeruk nipis, dan sambal.']
        },
        {
            id: 3,
            name: 'Sate Ayam Madura',
            desc: 'Potongan daging ayam empuk yang dibakar sempurna dan disiram dengan saus kacang kental, manis, dan gurih.',
            image: 'images/sate.jpg',
            rating: 5,
            history: 'Sate Madura, berasal dari Pulau Madura, Jawa Timur, adalah ikon kuliner jalanan Indonesia. Ciri khasnya adalah saus kacang yang lebih pekat dan legit, seringkali menggunakan kemiri dan bawang merah dalam jumlah banyak. Penjualnya yang khas dengan pakaian bergaris dan gerobak sate menjadi bagian tak terpisahkan dari pengalaman menikmati hidangan ini.',
            tools: ['Tusuk sate (rendam dalam air agar tidak mudah gosong)', 'Panggangan arang atau teflon grill pan', 'Blender atau ulekan', 'Kuas untuk olesan'],
            ingredients: ['<strong>Bahan Sate:</strong>', '500 gr daging paha ayam fillet, potong dadu', '3 sdm kecap manis', '1 sdm minyak sayur', '1 buah jeruk nipis', '<strong>Bumbu Kacang:</strong>', '250 gr kacang tanah, goreng', '5 siung bawang merah', '3 siung bawang putih', '4 buah cabai merah (opsional)', '3 butir kemiri, sangrai', '50 gr gula merah, sisir halus', 'Kecap manis dan garam secukupnya', 'Air matang secukupnya', '<strong>Pelengkap:</strong>', 'Lontong atau nasi, irisan bawang merah mentah, irisan cabai rawit, jeruk limau.'],
            steps: ['<strong>Mempersiapkan Sate:</strong> Lumuri potongan ayam dengan perasan jeruk nipis, diamkan 15 menit. Bilas bersih. Campurkan dengan kecap manis dan minyak, aduk rata. Tusuk daging ayam ke tusuk sate.', '<strong>Membuat Bumbu Kacang:</strong> Haluskan kacang tanah, bawang merah, bawang putih, cabai, dan kemiri. Pindahkan ke wajan, tambahkan air, gula merah, kecap manis, dan garam. Masak dengan api kecil hingga mengental dan mengeluarkan minyak. Koreksi rasa.', '<strong>Membakar Sate:</strong> Siapkan panggangan. Ambil sebagian bumbu kacang dan campur dengan sedikit kecap manis untuk olesan. Bakar sate sambil diolesi bumbu hingga matang merata di semua sisi.', '<strong>Penyajian:</strong> Letakkan sate di atas piring, siram dengan sisa bumbu kacang. Taburi dengan irisan bawang merah dan cabai rawit. Sajikan segera dengan lontong dan perasan jeruk limau.']
        },
        {
            id: 4,
            name: 'Gudeg Jogja',
            desc: 'Hidangan nangka muda yang dimasak perlahan dengan santan dan gula aren, menghasilkan rasa manis yang otentik.',
            image: 'images/gudeg.jpg',
            rating: 4,
            history: 'Gudeg adalah jiwa dari kota Yogyakarta. Masakan ini melambangkan filosofi hidup masyarakat Jawa yang tenang dan sabar, tercermin dari proses memasaknya yang lambat dan membutuhkan ketelatenan. Warna cokelat kemerahan khas gudeg didapat dari daun jati yang ikut dimasak bersama nangka muda.',
            tools: ['Panci gerabah (kendil) untuk hasil paling otentik, atau panci berdasar tebal', 'Spatula kayu', 'Ulekan'],
            ingredients: ['<strong>Bahan Utama:</strong>', '1 kg nangka muda (gori), potong kasar', '1.5 liter santan dari 2 butir kelapa', '200 gr gula aren, sisir halus', '5 lembar daun jati (opsional, untuk warna)', '<strong>Bumbu Halus:</strong>', '12 siung bawang merah', '8 siung bawang putih', '5 butir kemiri, sangrai', '1 sdm ketumbar bubuk', '<strong>Bumbu Cemplung:</strong>', '5 lembar daun salam', '3 cm lengkuas, memarkan', 'Garam secukupnya', '<strong>Pelengkap:</strong>', 'Nasi hangat, sambal krecek, opor ayam, telur pindang.'],
            steps: ['<strong>Persiapan Panci:</strong> Alasi dasar panci dengan beberapa lembar daun salam dan daun jati.', '<strong>Memasukkan Bahan:</strong> Masukkan potongan nangka muda, bumbu halus, gula aren, lengkuas, dan sisa daun salam. Aduk perlahan.', '<strong>Memasak Gudeg:</strong> Tuang santan hingga semua bahan terendam. Masak di atas api kecil tanpa ditutup selama 4-6 jam. Jangan terlalu sering mengaduk agar tekstur nangka tidak hancur.', '<strong>Tahap Akhir:</strong> Lanjutkan memasak hingga kuah santan menyusut habis dan bumbu meresap sempurna. Gudeg yang baik memiliki tekstur kering (gudeg kering).', '<strong>Penyajian:</strong> Sajikan gudeg sebagai bagian dari nasi gudeg lengkap dengan semua pelengkapnya.']
        },
        {
            id: 5,
            name: 'Bakso Sapi Kuah',
            desc: 'Bola-bola daging sapi kenyal dan juicy, disajikan dalam kuah kaldu bening yang gurih dan menghangatkan.',
            image: 'images/bakso.jpg',
            rating: 5,
            history: 'Bakso adalah bukti nyata akulturasi budaya Tionghoa dalam kuliner Indonesia. Berasal dari kata Hokkien \'bak-so\' (daging giling), hidangan ini telah berevolusi menjadi makanan rakyat yang dicintai semua kalangan, lengkap dengan gerobak ikoniknya dan suara mangkuk yang khas.',
            tools: ['Food processor atau blender daging', 'Panci besar untuk merebus bakso dan kuah', '2 buah sendok atau ice cream scoop kecil untuk membentuk bakso'],
            ingredients: ['<strong>Adonan Bakso:</strong>', '500 gr daging sapi segar tanpa lemak, potong kecil', '100 gr tepung sagu atau tapioka', '1 butir putih telur ayam', '2 sdm bawang merah goreng', '1 sdm bawang putih goreng', '1 sdt merica bubuk', 'Garam dan penyedap rasa secukupnya', '100 gr es batu, hancurkan', '<strong>Kuah Bakso:</strong>', '2 liter air', '500 gr tulang lutut sapi', 'Bawang putih goreng, merica, garam, dan kaldu bubuk secukupnya', '<strong>Pelengkap:</strong>', 'Mie kuning, bihun, sawi hijau, tahu bakso, pangsit goreng, seledri, dan bawang goreng.'],
            steps: ['<strong>Membuat Adonan Bakso:</strong> Masukkan daging sapi dan es batu ke dalam food processor. Giling hingga halus. Tambahkan sisa bahan adonan bakso, proses kembali hingga adonan menjadi licin, kenyal, dan tercampur rata.', '<strong>Mencetak dan Merebus Bakso:</strong> Didihkan air dalam panci besar, lalu kecilkan api hingga air tidak lagi bergejolak. Ambil adonan dengan tangan dan bentuk menjadi bola-bola dengan bantuan sendok. Masukkan langsung ke dalam air panas. Rebus hingga bakso mengapung, yang menandakan sudah matang. Angkat dan tiriskan.', '<strong>Membuat Kuah:</strong> Rebus tulang sapi dengan air hingga mendidih. Buang buih dan kotoran yang mengapung. Masak terus dengan api kecil selama minimal 1 jam untuk mendapatkan kaldu yang kaya. Bumbui dengan bawang putih goreng yang sudah dihaluskan, garam, merica, dan kaldu bubuk.', '<strong>Penyajian:</strong> Tata mie, bihun, dan sawi dalam mangkuk. Tambahkan bakso, lalu siram dengan kuah panas. Taburi dengan seledri dan bawang goreng. Sajikan dengan saus, kecap, dan sambal.']
        },
        {
            id: 6,
            name: 'Ikan Bakar Jimbaran',
            desc: 'Ikan laut segar yang dibakar di atas bara arang dengan olesan bumbu khas Bali yang pedas, manis, dan aromatik.',
            image: 'images/ikan bakar.jpg',
            rating: 5,
            history: 'Ikan Bakar Jimbaran bukanlah sekadar nama resep, melainkan sebuah pengalaman kuliner. Tradisi ini lahir dari para nelayan di Teluk Jimbaran, Bali, yang membakar hasil tangkapan mereka di tepi pantai. Kini, deretan kafe seafood di sepanjang pantai Jimbaran menawarkan pengalaman makan malam romantis dengan hidangan laut segar yang dibakar dengan bumbu otentik.',
            tools: ['Panggangan arang untuk aroma terbaik', 'Penjepit ikan', 'Kuas bumbu', 'Ulekan atau blender'],
            ingredients: ['<strong>Bahan Utama:</strong>', '1 ekor ikan laut segar ukuran besar (sekitar 800 gr), seperti kakap, baronang, atau kerapu', '1 buah jeruk nipis', '2 sdm minyak kelapa', '<strong>Bumbu Oles (haluskan):</strong>', '8 siung bawang merah', '4 siung bawang putih', '5 buah cabai merah besar', '2 cm kunyit, bakar', '1 sdt terasi bakar', '3 sdm kecap manis', '1 sdm saus tiram', 'Garam dan gula secukupnya', '<strong>Sambal Matah (iris halus):</strong>', '10 siung bawang merah', '5 batang serai (ambil bagian putihnya saja)', '10 buah cabai rawit merah', '3 lembar daun jeruk', 'Minyak kelapa panas, garam, dan perasan jeruk limau.'],
            steps: ['<strong>Persiapan Ikan:</strong> Siangi ikan, bersihkan, lalu kerat kedua sisinya. Lumuri dengan air perasan jeruk nipis dan sedikit garam untuk menghilangkan bau amis. Diamkan selama 15-20 menit.', '<strong>Membuat Bumbu Oles:</strong> Tumis bumbu yang sudah dihaluskan hingga harum. Tambahkan kecap manis, saus tiram, garam, dan gula. Masak hingga bumbu matang dan mengental. Angkat dan dinginkan.', '<strong>Membakar Ikan:</strong> Olesi seluruh permukaan ikan dengan bumbu secara merata, termasuk bagian dalam dan keratan. Siapkan bara api. Bakar ikan sambil terus diolesi sisa bumbu hingga kedua sisi matang sempurna.', '<strong>Membuat Sambal Matah:</strong> Campurkan semua bahan irisan sambal matah dalam sebuah mangkuk. Siram dengan minyak kelapa panas, aduk rata, lalu beri perasan jeruk limau.', '<strong>Penyajian:</strong> Sajikan ikan bakar panas-panas bersama nasi putih dan sambal matah segar.']
        },
        {
            id: 7,
            name: 'Nasi Goreng Spesial',
            desc: 'Nasi goreng legendaris Indonesia, dimasak dengan bumbu otentik dan disajikan lengkap dengan lauk pauk.',
            image: 'images/nasi-goreng-speisial.jpeg',
            rating: 5,
            history: 'Nasi goreng adalah solusi cerdas masyarakat Indonesia untuk mengolah nasi sisa. Dari hidangan rumahan yang sederhana, nasi goreng telah bertransformasi menjadi hidangan nasional yang fleksibel, dapat dinikmati kapan saja, dari sarapan hingga makan malam, dan seringkali menjadi menu incaran di restoran bintang lima sekalipun.',
            tools: ['Wajan cekung (wok) untuk distribusi panas terbaik', 'Spatula masak (sodet)', 'Ulekan atau cobek'],
            ingredients: ['<strong>Bahan Utama:</strong>', '2 piring nasi putih dingin (nasi pera lebih baik)', '100 gr daging ayam, potong dadu', '5 buah bakso, iris', '2 butir telur, kocok lepas', '<strong>Bumbu Halus:</strong>', '5 siung bawang merah', '3 siung bawang putih', '3 buah cabai merah keriting', '1 sdt terasi', '<strong>Bumbu Lain:</strong>', '3 sdm kecap manis', '1 sdm saus tiram', 'Garam dan merica secukupnya', '<strong>Pelengkap:</strong>', 'Telur mata sapi, acar timun wortel, kerupuk, dan taburan bawang goreng.'],
            steps: ['<strong>Menyiapkan Bumbu:</strong> Ulek atau blender semua bahan bumbu halus hingga tercampur rata.', '<strong>Memasak Lauk:</strong> Panaskan sedikit minyak di wajan, masukkan telur kocok dan buat orak-arik. Angkat dan sisihkan. Tumis potongan ayam dan bakso hingga matang, sisihkan.', '<strong>Menumis Bumbu:</strong> Panaskan kembali sedikit minyak, tumis bumbu halus hingga harum dan matang.', '<strong>Memasak Nasi Goreng:</strong> Masukkan nasi putih ke dalam wajan, aduk cepat dengan bumbu hingga tidak ada nasi yang menggumpal. Besarkan api. Masukkan ayam, bakso, dan telur orak-arik.', '<strong>Finishing:</strong> Bumbui dengan kecap manis, saus tiram, garam, dan merica. Aduk terus dengan cepat di atas api besar hingga semua tercampur rata dan muncul aroma smoky. Koreksi rasa.', '<strong>Penyajian:</strong> Sajikan nasi goreng spesial selagi hangat dengan pelengkap telur mata sapi, acar, dan kerupuk.']
        },
        {
            id: 8,
            name: 'Mie Ayam Gerobakan',
            desc: 'Semangkuk mie kenyal dengan topping ayam kecap gurih, sawi, dan pangsit renyah ala abang-abang gerobak.',
            image: 'images/Mei-ayam.jpg',
            rating: 4,
            history: 'Sama seperti bakso, mie ayam adalah hasil adaptasi kuliner Tionghoa yang telah menyatu dengan lidah Indonesia. Setiap penjual mie ayam gerobakan seringkali memiliki resep rahasia untuk minyak ayam dan toppingnya, menciptakan keragaman rasa yang kaya di seluruh penjuru negeri.',
            tools: ['Panci untuk merebus mie', 'Wajan untuk topping ayam', 'Saringan mie', 'Mangkuk saji'],
            ingredients: ['<strong>Bahan Utama:</strong>', '200 gr mie telur segar atau kering', '1 ikat sawi hijau, potong-potong', '<strong>Topping Ayam:</strong>', '250 gr daging paha ayam, potong dadu kecil', '4 siung bawang putih, cincang halus', '1 sdm saus tiram', '4 sdm kecap manis', '1 sdt minyak wijen', 'Garam, merica, dan sedikit air', '<strong>Bumbu di Mangkuk (per porsi):</strong>', '1 sdt kecap asin', '1/2 sdt minyak wijen', '1 sdm minyak ayam (dibuat dari kulit ayam yang digoreng)', '<strong>Pelengkap:</strong>', 'Pangsit goreng, bakso, saus sambal, daun bawang iris.'],
            steps: ['<strong>Membuat Topping Ayam:</strong> Tumis bawang putih hingga harum. Masukkan potongan ayam, masak hingga berubah warna. Tambahkan saus tiram, kecap manis, garam, dan merica. Tuang sedikit air dan masak hingga bumbu meresap dan mengental.', '<strong>Persiapan Mangkuk:</strong> Dalam mangkuk saji, campurkan semua bahan \'Bumbu di Mangkuk\'. Aduk rata.', '<strong>Merebus Mie:</strong> Didihkan air, rebus mie hingga tingkat kematangan yang diinginkan. Sesaat sebelum mie diangkat, masukkan sawi hijau. Angkat dan tiriskan mie serta sawi.', '<strong>Mencampur Mie:</strong> Masukkan mie dan sawi panas ke dalam mangkuk yang sudah berisi bumbu. Aduk cepat hingga semua bumbu melumuri mie secara merata.', '<strong>Penyajian:</strong> Beri topping ayam di atas mie. Taburi dengan irisan daun bawang. Sajikan segera dengan pangsit goreng, bakso, dan saus sambal sesuai selera.']
        },
        {
            id: 9,
            name: 'Sop Buntut Sapi',
            desc: 'Potongan buntut sapi empuk yang lumer di mulut, berpadu dengan kuah kaldu bening kaya rempah yang segar.',
            image: 'images/sop-buntut-sapi.jpg',
            rating: 5,
            history: 'Sop buntut adalah salah satu hidangan sup paling mewah dalam kuliner Indonesia, seringkali dianggap sebagai warisan dari zaman kolonial Belanda. Penggunaan rempah-rempah seperti pala dan cengkih menunjukkan pengaruh Eropa, namun cita rasanya telah disesuaikan secara sempurna untuk lidah Indonesia, menjadikannya hidangan favorit di berbagai restoran ternama.',
            tools: ['Panci presto untuk menghemat waktu, atau panci besar biasa', 'Wajan kecil untuk menumis', 'Saringan kaldu (fine mesh sieve)'],
            ingredients: ['<strong>Bahan Utama:</strong>', '1 kg buntut sapi, potong sesuai ruas', '2.5 liter air', '2 buah wortel impor, potong tebal', '2 buah kentang, potong dadu besar', '<strong>Bumbu Tumis:</strong>', '7 siung bawang putih, memarkan', '1/2 butir pala, memarkan', '4 butir cengkih', '3 cm kayu manis', '<strong>Pelengkap:</strong>', '2 batang seledri, ikat simpul', '2 batang daun bawang, potong-potong', 'Tomat merah, potong-potong', 'Bawang goreng, emping, sambal rawit, dan jeruk limau.'],
            steps: ['<strong>Merebus Buntut (Tahap 1):</strong> Didihkan air dalam panci, masukkan buntut sapi. Rebus selama 10-15 menit untuk membuang kotoran dan darah (proses blansir). Buang air rebusan pertama ini.', '<strong>Merebus Buntut (Tahap 2):</strong> Masukkan kembali buntut ke dalam panci bersih, tuang 2.5 liter air baru. Rebus dengan api kecil selama 2-3 jam (atau 45 menit dengan panci presto) hingga buntut benar-benar empuk.', '<strong>Menyiapkan Bumbu:</strong> Panaskan sedikit minyak atau margarin, tumis bawang putih hingga harum. Masukkan pala, cengkih, dan kayu manis, tumis sebentar hingga aroma rempah keluar.', '<strong>Memasak Kuah:</strong> Masukkan tumisan bumbu ke dalam panci rebusan buntut. Tambahkan wortel dan kentang, masak hingga sayuran cukup empuk. Bumbui dengan garam, gula, dan merica. Koreksi rasa.', '<strong>Penyajian:</strong> Sesaat sebelum diangkat, masukkan potongan tomat, daun bawang, dan seledri. Sajikan sop buntut dalam keadaan panas, taburi dengan bawang goreng melimpah dan sajikan bersama emping, sambal, dan perasan jeruk limau.']
        },
        {
            id: 10,
            name: 'Gado-Gado',
            desc: 'Salad sayuran segar khas Indonesia dengan siraman saus kacang yang legit dan sedikit pedas.',
            image: 'images/gado-gado.jpg',
            rating: 4,
            history: 'Gado-gado adalah representasi sempurna dari semboyan \'Bhinneka Tunggal Ika\' dalam bentuk kuliner. Menggabungkan berbagai macam sayuran rebus dan mentah, lontong, tahu, dan telur, semuanya disatukan oleh saus kacang yang kaya rasa. Hidangan ini sangat populer sebagai pilihan makanan sehat dan mengenyangkan.',
            tools: ['Panci untuk merebus sayuran dan telur', 'Wajan untuk menggoreng tahu/tempe', 'Ulekan dan cobek atau blender untuk saus kacang', 'Piring saji besar'],
            ingredients: ['<strong>Sayuran (rebus dan tiriskan):</strong>', '1 ikat kangkung', '100 gr tauge, seduh air panas', '1 buah kentang ukuran sedang', '1 buah labu siam ukuran kecil', '<strong>Bahan Lain:</strong>', '1 buah lontong, potong-potong', '1 kotak tahu putih, goreng', '1 papan tempe, goreng', '2 butir telur, rebus', '1 buah timun, iris tipis', 'Daun selada secukupnya', '<strong>Saus Kacang:</strong>', '200 gr kacang tanah, goreng', '3 siung bawang putih', '2 buah cabai merah keriting (sesuai selera)', '50 gr gula merah', '1 sdt terasi bakar', '1 sdm air asam jawa', 'Santan atau air matang secukupnya', 'Garam secukupnya', '<strong>Pelengkap:</strong>', 'Kerupuk dan bawang goreng.'],
            steps: ['<strong>Persiapan Bahan:</strong> Siangi dan cuci bersih semua sayuran. Rebus satu per satu hingga matang namun tetap renyah, angkat dan tiriskan. Goreng tahu dan tempe hingga keemasan. Rebus telur hingga matang sempurna.', '<strong>Membuat Saus Kacang:</strong> Haluskan kacang tanah, bawang putih, cabai, gula merah, dan terasi. Pindahkan ke dalam mangkuk, tambahkan air asam jawa dan garam. Tuang santan atau air sedikit demi sedikit sambil diaduk hingga mencapai kekentalan yang diinginkan. Koreksi rasa.', '<strong>Penyusunan (Plating):</strong> Tata potongan lontong, daun selada, dan semua sayuran rebus di atas piring saji. Tambahkan irisan tahu, tempe, dan telur rebus.', '<strong>Penyajian:</strong> Siram dengan saus kacang secara merata. Taburi dengan bawang goreng dan sajikan segera dengan kerupuk.']
        },
        {
            id: 11,
            name: 'Nasi Uduk Betawi',
            desc: 'Nasi gurih yang dimasak dengan santan dan rempah, disajikan dengan aneka lauk pauk khas Betawi.',
            image: 'images/nasi-uduk-betawi.jpg',
            rating: 5,
            history: 'Nasi uduk adalah ikon sarapan masyarakat Betawi, Jakarta. Nama \'uduk\' diyakini berarti \'susah\' atau \'bercampur\', merujuk pada proses memasaknya yang lebih kaya bumbu dibandingkan nasi biasa. Aroma khasnya berasal dari penggunaan santan, serai, daun salam, dan terkadang sedikit cengkih atau kayu manis.',
            tools: ['Panci atau rice cooker', 'Wajan untuk lauk', 'Spatula'],
            ingredients: ['<strong>Nasi Uduk:</strong>', '500 gr beras, cuci bersih', '600 ml santan dari 1 butir kelapa', '2 lembar daun salam', '2 batang serai, memarkan', '1 lembar daun pandan, simpulkan', '1 sdt garam', '<strong>Lauk Pelengkap:</strong>', 'Ayam goreng lengkuas', 'Telur dadar rawis', 'Tempe orek kering', 'Bihun goreng', 'Sambal kacang atau sambal terasi', 'Bawang goreng untuk taburan', 'Kerupuk.'],
            steps: ['<strong>Memasak Nasi Uduk:</strong> Masukkan beras, santan, daun salam, serai, daun pandan, dan garam ke dalam panci atau rice cooker. Aduk rata. Masak hingga matang seperti memasak nasi biasa.', '<strong>Menyiapkan Lauk:</strong> Selagi nasi dimasak, siapkan semua lauk pelengkap. Goreng ayam, buat telur dadar tipis lalu iris (rawis), masak tempe orek, dan tumis bihun goreng.', '<strong>Membuat Sambal:</strong> Siapkan sambal kacang atau sambal terasi sesuai selera.', '<strong>Penyajian:</strong> Ambil nasi uduk yang sudah matang menggunakan centong. Tata di atas piring. Letakkan aneka lauk pelengkap di sekeliling nasi. Taburi dengan bawang goreng melimpah dan sajikan bersama kerupuk dan sambal.']
        },
        {
            id: 12,
            name: 'Ayam Bakar Taliwang',
            desc: 'Ayam bakar super pedas khas Lombok dengan bumbu cabai, kencur, dan terasi yang meresap hingga ke tulang.',
            image: 'images/ayam-bakar.jpg',
            rating: 5,
            history: 'Ayam Taliwang adalah hidangan pedas kebanggaan masyarakat Lombok, Nusa Tenggara Barat. Resep ini diciptakan oleh masyarakat Karang Taliwang dan secara tradisional menggunakan ayam kampung muda (usia 3-4 bulan) yang dibakar utuh. Tingkat kepedasannya yang menantang menjadi daya tarik utama dari hidangan ini.',
            tools: ['Panggangan arang (sangat direkomendasikan)', 'Ulekan atau blender', 'Wajan untuk mengungkep'],
            ingredients: ['<strong>Bahan Utama:</strong>', '1 ekor ayam kampung muda, belah tengah tidak putus', '1 buah jeruk limau', '<strong>Bumbu Halus:</strong>', '10 buah cabai merah keriting', '15 buah cabai rawit merah (atau sesuai selera)', '8 siung bawang merah', '4 siung bawang putih', '3 cm kencur', '1 sdt terasi bakar', 'Garam dan gula merah secukupnya', '<strong>Bumbu Lain:</strong>', '100 ml air atau santan', 'Minyak untuk menumis', '<strong>Pelengkap:</strong>', 'Plecing kangkung dan nasi putih.'],
            steps: ['<strong>Persiapan Ayam:</strong> Lumuri ayam dengan air jeruk limau dan garam. Diamkan selama 30 menit.', '<strong>Memasak Bumbu (Ungkep):</strong> Tumis bumbu halus hingga benar-benar harum dan matang. Masukkan ayam, aduk hingga terbalut bumbu. Tuang air atau santan, bumbui dengan garam dan gula merah. Masak (ungkep) dengan api kecil hingga bumbu meresap dan ayam setengah matang.', '<strong>Proses Membakar:</strong> Angkat ayam dari bumbu ungkep. Siapkan panggangan. Bakar ayam sambil terus diolesi dengan sisa bumbu ungkep hingga matang sempurna dan permukaannya sedikit gosong untuk aroma smoky.', '<strong>Penyajian:</strong> Sajikan ayam bakar Taliwang segera selagi panas dengan nasi putih dan plecing kangkung sebagai lalapan wajib.']
        }
    ];

    let allRecipes = [];

    const initializeRecipes = () => {
        const storedRecipes = JSON.parse(localStorage.getItem('recipes'));
        if (storedRecipes && storedRecipes.length > 0) {
            allRecipes = storedRecipes;
        }
        else {
            allRecipes = defaultRecipes;
            saveRecipes(); // Save default recipes if localStorage was empty
        }
        displayRecipes(allRecipes);
    };

    const saveRecipes = () => {
        localStorage.setItem('recipes', JSON.stringify(allRecipes));
    };

    const deleteRecipe = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus resep ini?')) {
            allRecipes = allRecipes.filter(recipe => recipe.id != id);
            saveRecipes();
            displayRecipes(allRecipes);
        }
    };

    const displayRecipes = (recipes) => {
        recipeGrid.innerHTML = '';
        if (!recipes || recipes.length === 0) {
            recipeGrid.innerHTML = '<p>Tidak ada resep yang ditemukan.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';
            recipeCard.innerHTML = `
                <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image">
                <div class="recipe-card-content">
                    <h3>${recipe.name}</h3>
                    <p>${recipe.desc}</p>
                    <div class="rating">
                        ${'★'.repeat(recipe.rating)}${'☆'.repeat(5 - recipe.rating)}
                    </div>
                    <div class="card-actions">
                        <button class="btn-edit" data-id="${recipe.id}">Edit</button>
                        <button class="btn-delete" data-id="${recipe.id}">Hapus</button>
                    </div>
                </div>
            `;

            // Klik pada gambar atau judul untuk ke halaman detail
            recipeCard.querySelector('.recipe-image').addEventListener('click', () => {
                window.location.href = `resep-detail.html?id=${recipe.id}`;
            });
            recipeCard.querySelector('h3').addEventListener('click', () => {
                window.location.href = `resep-detail.html?id=${recipe.id}`;
            });

            // Event listener untuk tombol edit dan hapus
            recipeCard.querySelector('.btn-edit').addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah klik trigger ke halaman detail
                window.location.href = `upload.html?id=${recipe.id}`;
            });

            recipeCard.querySelector('.btn-delete').addEventListener('click', (e) => {
                e.stopPropagation(); // Mencegah klik trigger ke halaman detail
                deleteRecipe(recipe.id);
            });

            recipeGrid.appendChild(recipeCard);
        });
    };

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredRecipes = allRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.desc.toLowerCase().includes(searchTerm)
        );
        displayRecipes(filteredRecipes);
    });

    initializeRecipes();
});