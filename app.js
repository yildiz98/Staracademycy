const demo = {
  student:{name:'Ali Yıldız', grade:'9. Sınıf', goal:'Lefkoşa Fen Lisesi Hedefi', tests:128, correct:892, wrong:356, empty:64, time:'18sa 45dk', net:'66.00'},
  subjects:[['Türkçe',80,'#35b86f'],['Matematik',48,'#f59e0b'],['Fen Bilimleri',72,'#2563eb'],['Sosyal Bilgiler',65,'#7657df'],['İngilizce',75,'#10bfc6']],
  tasks:[['Matematik','20 Soru Çöz',true],['Fen Bilimleri','15 Soru Çöz',true],['Türkçe','Paragraf Çalış',false],['İngilizce','Kelime Çalış',true]],
  tests:[['2026 Fen Lisesi Deneme - 1','Tüm Dersler',72,18,'66.00','18.05.2026'],['Matematik - Oran Orantı Testi','Matematik',8,2,'7.25','17.05.2026'],['Türkçe - Paragraf Testi','Türkçe',9,1,'8.75','17.05.2026'],['Fen Bilimleri - Canlılar Testi','Fen Bilimleri',7,3,'6.25','16.05.2026'],['İngilizce - Kelime Testi','İngilizce',10,0,'10.00','16.05.2026']],
  weak:[['Matematik - Oran Orantı',35,'#ef4444'],['Matematik - Cebirsel İfadeler',42,'#f59e0b'],['Fen Bilimleri - Kimyasal Tepkimeler',45,'#f59e0b'],['Türkçe - Paragraf',50,'#f59e0b'],['Sosyal Bilgiler - Harita Bilgisi',65,'#22c55e']],
  questions:[
    {lesson:'Matematik', q:'Bir sayının %25’i 18 ise bu sayı kaçtır?', o:['36','54','72','90'], a:2, exp:'18 sayısı dörtte biri ise 18 x 4 = 72.'},
    {lesson:'Türkçe', q:'“Kitap okumayı çok severim.” cümlesinde yüklem hangisidir?', o:['Kitap','Okumayı','Çok','Severim'], a:3, exp:'Cümlede işi bildiren kelime “severim”dir.'},
    {lesson:'Fen Bilimleri', q:'Fotosentez için aşağıdakilerden hangisi gereklidir?', o:['Işık','Tuz','Kum','Ses'], a:0, exp:'Bitkiler fotosentez için ışığa ihtiyaç duyar.'}
  ]
};
let state={role:'student', screen:'home', activeQ:0, selected:null};
const app=document.getElementById('app');

function login(){
  app.innerHTML=`<div class="login-page">
    <section class="login-left">
      <div class="brand big"><span class="logo-star">★</span><div>STAR ACADEMY<br><small>CYPRUS</small></div></div>
      <div class="login-copy">
        <span class="badge">KKTC Fen Lisesi & BEAL Hazırlık</span>
        <h1>Hedefe giden dijital dershane sistemi</h1>
        <p>Çıkmış sorular, mini konu anlatımları, hızlı testler, deneme sınavları ve veli takip portalı tek ekranda.</p>
        <div class="login-features">
          <div><b>15.000+</b><span>Soru Havuzu</span></div>
          <div><b>3</b><span>Giriş Portalı</span></div>
          <div><b>7/24</b><span>Mobil Uyum</span></div>
        </div>
      </div>
      <div class="floating-card fc1">📚 Günlük görevler</div>
      <div class="floating-card fc2">🎯 Başarı analizi</div>
      <div class="floating-card fc3">👨‍👩‍👦 Veli takibi</div>
      <p class="copyright">© 2026 Star Academy Cyprus</p>
    </section>
    <section class="login-right">
      <div class="login-card">
        <div class="brand mini"><span class="logo-star">★</span><div>STAR ACADEMY<br><small>CYPRUS</small></div></div>
        <h2>Giriş Yap</h2>
        <p class="muted">Rolünü seçerek demo sisteme giriş yapabilirsin.</p>
        <div class="role-grid">${roleBtn('student','👨‍🎓 Öğrenci')} ${roleBtn('parent','👨‍👩‍👦 Veli')} ${roleBtn('admin','⚙️ Admin')}</div>
        <label>Kullanıcı adı</label><input id="u" value="${state.role==='student'?'ogrenci':state.role==='parent'?'veli':'admin'}">
        <label>Şifre</label><input id="p" type="password" value="1234">
        <button class="primary" onclick="enter()">Sisteme Gir</button>
        <div class="hint"><b>Demo:</b> ogrenci / veli / admin &nbsp; Şifre: <b>1234</b></div>
      </div>
    </section>
  </div>`;
}
function roleBtn(r,t){return `<button class="role ${state.role===r?'active':''}" onclick="state.role='${r}';login()">${t}</button>`}
function enter(){state.screen='home'; render()}

function navItems(){
  if(state.role==='parent') return [['home','Ana Sayfa','⌂'],['child','Çocuğumun Durumu','▣'],['report','Başarı Raporu','▤'],['tests','Test Sonuçları','▥'],['analysis','Derslere Göre Analiz','▧'],['exam','Deneme Sınavları','✎'],['daily','Günlük Çalışmalar','✓'],['missing','Konu Eksikleri','◷'],['messages','Notlar / Öğretmen Mesajları','✉'],['settings','Ayarlar','⚙'],['help','Yardım','?']];
  if(state.role==='admin') return [['home','Admin Panel','⚙'],['questions','Soru Yönetimi','＋'],['lessons','Konu Yönetimi','▣'],['students','Öğrenciler','👥'],['parents','Veliler','👨‍👩‍👦'],['reports','Raporlar','▤'],['settings','Ayarlar','⚙']];
  return [['home','Ana Sayfa','⌂'],['lessons','Konu Anlatımları','▣'],['solve','Soru Çöz','☑'],['quiz','Mini Testler','⚡'],['exam','Deneme Sınavları','✎'],['past','Çıkmış Sorular','▤'],['daily','Günlük Görevler','✓'],['stats','İstatistikler','▥'],['wrong','Yanlışlarım','×'],['notes','Notlarım','✎'],['badges','Rozetler','◎'],['ranking','Sıralamalar','▥'],['ann','Duyurular','✉'],['help','Yardım','?'],['settings','Ayarlar','⚙']];
}
function shell(content,title,sub){
  const sideTitle=state.role==='parent'?'VELİ PORTALI':state.role==='admin'?'ADMIN PANEL':'ÖĞRENCİ PANELİ';
  app.innerHTML=`<div class="dashboard">
    <aside class="sidebar">
      <div class="brand"><span class="logo-star">★</span><div>STAR ACADEMY<br><small>CYPRUS</small></div></div>
      <div class="portal-title">${sideTitle}</div>
      <nav>${navItems().map(n=>`<button class="nav ${state.screen===n[0]?'active':''}" onclick="state.screen='${n[0]}';render()"><span>${n[2]}</span>${n[1]}</button>`).join('')}</nav>
      ${state.role==='parent'?parentSideBox():userSideBox()}
    </aside>
    <main class="content">
      <header class="topbar">
        <div><h1>${title}</h1><p>${sub||'Hedefine bir adım daha yaklaşmak için devam et!'}</p></div>
        <div class="top-actions"><button class="bell">🔔<em>3</em></button>${state.role==='student'?'<input class="search" placeholder="Arama yap...">':''}<button class="profile-mini">${state.role==='parent'?'Ali Yıldız<br><small>9. Sınıf • Lefkoşa Fen Lisesi</small>':state.role==='admin'?'Hüseyin Yıldız':'Ahmet Yıldız'}⌄</button></div>
      </header>
      ${content}
      <footer>© 2026 Star Academy Cyprus - Fen Lisesi & BEAL Hazırlık Platformu</footer>
    </main>
  </div>`;
}
function userSideBox(){return `<div class="side-user"><div class="avatar small">${state.role==='admin'?'HY':'AY'}</div><div><span>Merhaba,</span><b>${state.role==='admin'?'Hüseyin Yıldız':'Ahmet Yıldız'}</b><small>${state.role==='admin'?'Sistem Yöneticisi':'9. Sınıf'}</small></div><button onclick="login()">Çıkış</button></div>`}
function parentSideBox(){return `<div class="parent-info"><h3>Veli Bilgilendirme</h3><p>Bu portal üzerinden çocuğunuzun tüm akademik çalışmalarını takip edebilirsiniz.</p><div class="parent-illustration">👩‍💻 👦</div><button onclick="login()">Çıkış Yap</button></div>`}
function stat(icon,title,value,note,cls=''){return `<div class="stat-card ${cls}"><div class="stat-icon">${icon}</div><div><span>${title}</span><b>${value}</b><small>${note||''}</small></div></div>`}
function statRow(){return `<div class="stat-row">${stat('📘','Toplam Test','1.248','Çözülen test sayısı','blue')}${stat('✓','Doğru','892','%71.5 Başarı','green')}${stat('×','Yanlış','356','%28.5 Hata','red')}${stat('⏱','Çalışma Süresi','78sa 40dk','Toplam süre','orange')}${stat('▥','Genel Net','+536.75','Net ortalaman','purple')}</div>`}
function studentHome(){return `${statRow()}<div class="home-grid"><section class="hero-card"><div><h2>Fen Lisesi & BEAL<br>Hayaline ulaşmanın<br>en doğru yolu!</h2><p>Planlı çalış, düzenli tekrar yap ve hedefini gerçekleştir!</p><button class="primary" onclick="state.screen='quiz';render()">Hemen Çalışmaya Başla →</button></div><div class="rocket">🚀</div></section>${dailyCard()}</div>${subjectCards()}<div class="two-col"><div>${recentTests()}</div><div>${quickActions()}${motivation()}</div></div>`}
function dailyCard(){return `<section class="panel"><div class="panel-head"><h2>Günlük Görevlerin</h2><span>📅 20 Mayıs 2026</span></div>${[['Matematik','10 soru çöz',70,'#2563eb'],['Türkçe','10 soru çöz',30,'#20c997'],['Fen Bilimleri','5 soru çöz',0,'#f59e0b'],['İngilizce','5 soru çöz',40,'#7657df']].map(x=>`<div class="task"><b style="color:${x[3]}">${x[0]}</b><span>${x[1]}</span><div class="progress"><i style="width:${x[2]}%;background:${x[3]}"></i></div><small>${Math.round(x[2]/10)}/${x[1].split(' ')[0]}</small></div>`).join('')}<button class="soft-btn">Tüm Görevleri Gör</button></section>`}
function subjectCards(){return `<section class="panel wide"><div class="panel-head"><h2>Derslere Göre Başarı Durumun</h2><span>Tümünü Gör ›</span></div><div class="subject-row">${demo.subjects.map(s=>`<div class="subject-card"><div class="ring" style="--p:${s[1]*3.6}deg;--c:${s[2]}"><b>%${s[1]}</b></div><strong>${s[0]}</strong><small>${s[1]>75?'Çok iyi':s[1]>55?'İyi':'Orta'}</small></div>`).join('')}</div></section>`}
function recentTests(){return `<section class="panel"><div class="panel-head"><h2>Son Çözdüğün Testler</h2><span>Tüm Sonuçlar ›</span></div><table><tr><th>Test Adı</th><th>Ders</th><th>Doğru</th><th>Yanlış</th><th>Net</th><th>Tarih</th><th></th></tr>${demo.tests.slice(0,4).map(t=>`<tr><td>${t[0]}</td><td>${t[1]}</td><td>${t[2]}</td><td>${t[3]}</td><td>${t[4]}</td><td>${t[5]}</td><td><button class="tiny">Sonuçları Gör</button></td></tr>`).join('')}</table></section>`}
function quickActions(){return `<section class="panel"><h2>Hızlı İşlemler</h2><div class="quick-grid"><button onclick="state.screen='quiz';render()">⚡<span>Mini Test</span></button><button onclick="state.screen='exam';render()">📄<span>Deneme Sınavı</span></button><button onclick="state.screen='wrong';render()">×<span>Yanlışlarım</span></button><button onclick="state.screen='past';render()">📁<span>Çıkmış Sorular</span></button></div></section>`}
function motivation(){return `<section class="panel quote"><h2>Motivasyon Köşesi</h2><p>“Bugün yaptığın küçük bir çalışma, yarın büyük bir başarının başlangıcıdır.”</p><span>— Star Academy ⭐</span></section>`}
function parentHome(){return `<div class="parent-summary"><section class="student-card"><div class="photo">👦</div><div><h2>Ali Yıldız <span class="status">Aktif Öğrenci</span></h2><p>9. Sınıf • Lefkoşa Fen Lisesi Hedefi</p><a>Profil Bilgileri ›</a></div></section>${stat('📄','Çözdüğü Test Sayısı','128','Bu ay','blue')}${stat('✓','Doğru Sayısı','892','Bu ay','green')}${stat('×','Yanlış Sayısı','356','Bu ay','red')}${stat('⏱','Çalışma Süresi','18sa 45dk','Bu ay','orange')}</div><div class="parent-grid"><section class="panel"><div class="panel-head"><h2>Genel Başarı Durumu</h2><span>Son 30 Gün⌄</span></div><div class="success-box"><div class="big-ring">%68<small>Genel Başarı</small></div><ul><li><b class="dot green-dot"></b>Doğru <span>892 (%68)</span></li><li><b class="dot red-dot"></b>Yanlış <span>356 (%27)</span></li><li><b class="dot grey-dot"></b>Boş <span>64 (%5)</span></li></ul></div><p class="good">↗ Geçen aya göre %8 artış gösterdi.</p></section><section class="panel"><div class="panel-head"><h2>Derslere Göre Başarı Oranı</h2><span>Detaylı Rapor ›</span></div>${barChart()}</section><section class="panel weak"><div class="panel-head"><h2>En Zayıf Olduğu Konular</h2><span>Tümü ›</span></div>${demo.weak.map(w=>`<div class="weak-item"><b>${w[0]}</b><div class="progress"><i style="width:${w[1]}%;background:${w[2]}"></i></div><span>%${w[1]}</span></div>`).join('')}</section></div><div class="two-col parent"><div>${recentTests()}</div><div>${examResult()}</div></div><div class="parent-bottom"><section class="panel">${dailySummary()}</section><section class="panel">${weeklySummary()}</section><section class="panel quote"><h2>Öğretmen Notu</h2><p>Ali bu hafta özellikle matematikte güzel bir ilerleme kaydetti. Oran orantı konusuna daha fazla çalışması faydalı olacaktır.</p><span>— Matematik Öğretmeni ⭐</span></section></div>`}
function barChart(){return `<div class="bars">${demo.subjects.map(s=>`<div><b>%${s[1]}</b><i style="height:${s[1]*1.8}px;background:${s[2]}"></i><span>${s[0].replace(' Bilimleri','')}</span></div>`).join('')}</div>`}
function examResult(){return `<section class="panel"><div class="panel-head"><h2>Deneme Sınavı Sonuçları</h2><span>Tümü ›</span></div><div class="exam-card"><div><small>Son Deneme Sınavı</small><h3>2026 Fen Lisesi<br>1. Deneme Sınavı</h3><p>18 Mayıs 2026</p></div><div><span>Net</span><b>66.00</b><span>Başarı</span><b>%66</b><a>Detaylı Sonuç Raporu ›</a></div></div></section>`}
function dailySummary(){return `<div class="panel-head"><h2>Günlük Çalışma Özeti</h2><span>Tümü ›</span></div>${demo.tasks.map(t=>`<div class="done"><b>${t[0]} - ${t[1]}</b><span class="${t[2]?'good':'warn'}">${t[2]?'✓ Tamamlandı':'Devam Ediyor'}</span></div>`).join('')}`}
function weeklySummary(){return `<div class="panel-head"><h2>Haftalık Çalışma Özeti</h2><span>Tümü ›</span></div><div class="week-stats"><div>📅<b>6</b><span>Gün Giriş Yapıldı</span></div><div>📗<b>42</b><span>Test Çözüldü</span></div><div>?</div><div>⏱<b>14sa 25dk</b><span>Toplam Süre</span></div></div>`}
function adminHome(){return `<div class="stat-row admin-stats">${stat('👥','Öğrenci','248','Kayıtlı')}${stat('👨‍👩‍👦','Veli','196','Bağlı hesap')}${stat('❓','Soru','1.420','Havuz')}${stat('📝','Deneme','28','Aktif')}</div><div class="two-col"><section class="panel"><h2>Soru Yönetimi</h2><div class="form"><input placeholder="Ders"><input placeholder="Konu"><input placeholder="Doğru Cevap"><input placeholder="Zorluk"><textarea placeholder="Soru metni / açıklama"></textarea><button class="primary">Soruyu Kaydet</button></div></section><section class="panel"><h2>Sistem Özeti</h2><p>Öğrenci, veli ve admin panelleri görsel tasarıma uygun şekilde hazırlandı. İkinci aşamada Firebase ile gerçek kayıt ve soru havuzu bağlanabilir.</p><button class="soft-btn">PDF Soru Havuzu Aktar</button></section></div>${recentTests()}`}
function lessonPage(){return `<div class="lesson-grid">${['Matematik','Türkçe','Fen Bilimleri','Sosyal Bilgiler','İngilizce'].map((x,i)=>`<section class="panel lesson"><h2>${['➗','📖','🔬','🌍','🇬🇧'][i]} ${x}</h2><p>Mini konu anlatımı, hızlı tekrar ve konu testi.</p><button class="soft-btn">Konuya Gir</button></section>`).join('')}</div><section class="panel wide"><h2>Matematik - Oran Orantı</h2><p>İki çokluğun birbirine bölünerek karşılaştırılmasına oran denir. Oranların eşitliğine orantı denir. Sınavlarda yaş, hız, yüzde ve karışım problemlerinde sık görülür.</p></section>`}
function quizPage(){let q=demo.questions[state.activeQ];return `<section class="panel quiz-panel"><span class="badge">${q.lesson}</span><h2>${q.q}</h2>${q.o.map((o,i)=>`<button class="option ${state.selected===i?(i===q.a?'correct':'wrong'):''}" onclick="state.selected=${i};render()">${String.fromCharCode(65+i)}) ${o}</button>`).join('')}${state.selected!==null?`<p><b>Açıklama:</b> ${q.exp}</p><button class="primary" onclick="state.activeQ=(state.activeQ+1)%demo.questions.length;state.selected=null;render()">Sonraki Soru</button>`:''}</section>`}
function generic(title){return `<section class="panel"><h2>${title}</h2><p>Bu bölüm demo tasarım olarak hazırlandı. Gerçek veriler bağlandığında içerikler otomatik listelenecek.</p></section>${subjectCards()}`}
function render(){
  if(state.role==='student'){
    const map={home:studentHome,lessons:lessonPage,solve:quizPage,quiz:quizPage,exam:()=>generic('Deneme Sınavları'),past:()=>generic('Çıkmış Sorular'),daily:studentHome,stats:()=>generic('İstatistikler'),wrong:()=>generic('Yanlışlarım'),notes:()=>generic('Notlarım'),badges:()=>generic('Rozetler'),ranking:()=>generic('Sıralamalar'),ann:()=>generic('Duyurular'),help:()=>generic('Yardım'),settings:()=>generic('Ayarlar')};
    shell((map[state.screen]||studentHome)(),'Hoş geldin, Ahmet!','Hedefine bir adım daha yaklaşmak için devam et!');
  } else if(state.role==='parent'){
    const map={home:parentHome,child:parentHome,report:parentHome,tests:parentHome,analysis:parentHome,exam:parentHome,daily:parentHome,missing:parentHome,messages:parentHome,settings:()=>generic('Ayarlar'),help:()=>generic('Yardım')};
    shell((map[state.screen]||parentHome)(),'Hoş geldiniz, Ayşe Yıldız 👋','Çocuğunuzun eğitim sürecini buradan takip edebilirsiniz.');
  } else {
    const map={home:adminHome,questions:adminHome,lessons:lessonPage,students:()=>generic('Öğrenciler'),parents:()=>generic('Veliler'),reports:()=>generic('Raporlar'),settings:()=>generic('Ayarlar')};
    shell((map[state.screen]||adminHome)(),'Admin Panel','Soru havuzu, öğrenciler, veliler ve raporlar burada yönetilir.');
  }
}
login();
if('serviceWorker' in navigator){navigator.serviceWorker.register('./service-worker.js').catch(()=>{})}
