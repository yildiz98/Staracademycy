
const $ = (s, r=document) => r.querySelector(s);
const state = { role: localStorage.getItem('sac_role') || 'student', screen:'home', q:0, selected:null, filter:'Tümü', query:'' };
const users = {
  student:{username:'ogrenci', password:'1234', name:'Ali Yıldız', subtitle:'9. Sınıf • Lefkoşa Fen Lisesi Hedefi'},
  parent:{username:'veli', password:'1234', name:'Ayşe Yıldız', subtitle:'Ali Yıldız velisi'},
  teacher:{username:'ogretmen', password:'1234', name:'Matematik Öğretmeni', subtitle:'Öğretmen Paneli'},
  admin:{username:'admin', password:'1234', name:'Hüseyin Yıldız', subtitle:'Sistem Yöneticisi'}
};
const student = {name:'Ali Yıldız', grade:'9. Sınıf', goal:'Lefkoşa Fen Lisesi', tests:128, correct:892, wrong:356, empty:64, time:'18sa 45dk', net:'66.00', success:68};
const subjects=[['Türkçe',80,'#31b76a'],['Matematik',48,'#ffad20'],['Fen Bilimleri',72,'#1f6df2'],['Sosyal Bilgiler',65,'#7c4dff'],['İngilizce',75,'#20c5c8']];
const tasks=[['Matematik','20 Soru Çöz','Tamamlandı',100],['Fen Bilimleri','15 Soru Çöz','Tamamlandı',100],['Türkçe','Paragraf Çalış','Devam Ediyor',55],['İngilizce','Kelime Çalış','Tamamlandı',100]];
const tests=[['2026 Fen Lisesi Deneme - 1','Tüm Dersler',72,18,'66.00','18.05.2026'],['Matematik - Oran Orantı Testi','Matematik',8,2,'7.25','17.05.2026'],['Türkçe - Paragraf Testi','Türkçe',9,1,'8.75','17.05.2026'],['Fen Bilimleri - Canlılar Testi','Fen Bilimleri',7,3,'6.25','16.05.2026'],['İngilizce - Kelime Testi','İngilizce',10,0,'10.00','16.05.2026']];
const weak=[['Matematik - Oran Orantı',35],['Matematik - Cebirsel İfadeler',42],['Fen Bilimleri - Kimyasal Tepkimeler',45],['Türkçe - Paragraf',50],['Sosyal Bilgiler - Harita Bilgisi',65]];
const questions = (typeof INTERACTIVE_QUESTIONS !== 'undefined' && INTERACTIVE_QUESTIONS.length) ? INTERACTIVE_QUESTIONS : [];
const app = document.getElementById('app');
function saveRole(r){ state.role=r; localStorage.setItem('sac_role', r); renderLogin(); }
function renderLogin(){
  const r = users[state.role];
  app.innerHTML = `<div class="loginPage webOnly">
    <section class="loginHero premiumHero">
      <div class="brand big heroLogo"><span class="logoStar">★</span><div>STAR ACADEMY<br><small>CYPRUS</small></div></div>
      <div class="heroDecor"><span></span><span></span><span></span><span></span><span></span></div>
      <div class="heroCopy premiumCopy">
        <h1>Hayaline ulaşmanın<br><strong>en doğru yolu!</strong></h1>
        <p>Planlı çalış, düzenli tekrar yap ve hedefini gerçekleştir.</p>
        <i class="goldLine"></i>
      </div>
      <div class="heroStage" aria-hidden="true">
        <div class="blueGlow"></div>
        <svg class="heroSvg" viewBox="0 0 760 420" role="img">
          <defs>
            <linearGradient id="bookBlue" x1="0" x2="1"><stop offset="0" stop-color="#061a3d"/><stop offset="1" stop-color="#174caa"/></linearGradient>
            <linearGradient id="page" x1="0" x2="1"><stop offset="0" stop-color="#fff8ea"/><stop offset="1" stop-color="#dbe7ff"/></linearGradient>
            <linearGradient id="gold" x1="0" x2="1"><stop offset="0" stop-color="#ffb323"/><stop offset="1" stop-color="#ffd86f"/></linearGradient>
            <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#000" flood-opacity=".38"/></filter>
            <filter id="goldGlow"><feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#ffc238" flood-opacity=".88"/></filter>
          </defs>
          <path d="M40 270 C110 220 140 300 210 240 S320 250 390 190 470 220 520 165 610 170 700 105" fill="none" stroke="#1270ff" stroke-width="6" stroke-linecap="round" opacity=".78"/>
          <path d="M682 108 l32-18 -9 36" fill="none" stroke="#1270ff" stroke-width="6" stroke-linecap="round"/>
          <g opacity=".95">
            <rect x="105" y="128" width="88" height="88" rx="18" fill="#103a82" stroke="#327cff" opacity=".72"/>
            <path d="M128 181v-26h12v26m13 0v-43h12v43m13 0v-58h12v58" stroke="#8fc3ff" stroke-width="8"/>
            <rect x="548" y="72" width="88" height="88" rx="18" fill="#103a82" stroke="#327cff" opacity=".72"/>
            <circle cx="592" cy="116" r="25" fill="none" stroke="#8fc3ff" stroke-width="8"/><path d="M592 91v28l19 10" stroke="#8fc3ff" stroke-width="8" stroke-linecap="round"/>
            <rect x="642" y="174" width="88" height="88" rx="18" fill="#103a82" stroke="#327cff" opacity=".72"/>
            <circle cx="686" cy="218" r="24" fill="none" stroke="#8fc3ff" stroke-width="8"/><path d="M686 218l38-38m-17 0h17v17" stroke="#ffb323" stroke-width="7" stroke-linecap="round"/>
          </g>
          <g filter="url(#softShadow)">
            <ellipse cx="350" cy="352" rx="260" ry="26" fill="#00122b" opacity=".45"/>
            <path d="M108 288c94-20 226-20 320 0v44c-94 20-226 20-320 0z" fill="#0b2c68"/>
            <path d="M108 288c94 24 226 24 320 0 13 8 20 19 0 29-94 24-226 24-320 0-18-8-14-21 0-29z" fill="url(#bookBlue)"/>
            <path d="M141 248c96-20 230-20 326 0v44c-96 20-230 20-326 0z" fill="#09234f"/>
            <path d="M141 248c96 24 230 24 326 0 13 8 20 19 0 29-96 24-230 24-326 0-18-8-14-21 0-29z" fill="url(#bookBlue)"/>
            <path d="M174 205c108-58 220-58 335 0l-168 54z" fill="#061a3d" stroke="#315d9a"/>
            <path d="M250 230h188v36c-48 28-120 28-188 0z" fill="#061a3d"/>
            <path d="M342 258v50" stroke="#ffb323" stroke-width="5"/><circle cx="342" cy="313" r="8" fill="#ffb323"/>
            <path d="M460 296c82-45 176-42 260 0v66c-82-35-176-35-260 0z" fill="url(#page)" stroke="#c9d6ef"/>
            <path d="M590 296v66" stroke="#bec9df"/><path d="M500 322h80m30 0h70M495 342h83m36 0h70" stroke="#b7c4dc" stroke-width="2" opacity=".7"/>
            <path d="M617 337l92-23" stroke="#07163a" stroke-width="7" stroke-linecap="round"/><path d="M706 314l20-5" stroke="#ffb323" stroke-width="7" stroke-linecap="round"/>
            <g filter="url(#goldGlow)">
              <path d="M498 80l31 66 72 9-53 49 14 71-64-36-63 36 14-71-53-49 72-9z" fill="url(#gold)" stroke="#ffefaa" stroke-width="3"/>
              <path d="M448 284h104v38H448z" fill="#6c4412"/><path d="M428 322h144v34H428z" fill="#4b2f0f"/>
            </g>
          </g>
        </svg>
      </div>
      <div class="featureCards">
        ${feature('📖','Zengin İçerik','Binlerce soru ve konu anlatımı')}
        ${feature('🎯','Akıllı Takip','Gelişimini takip et, eksiklerini gör')}
        ${feature('📊','Detaylı Analiz','Başarı grafikleri ve performans analizi')}
        ${feature('🏅','Hedefe Ulaş','Planlı çalış, başarını katla')}
      </div>
      <div class="heroCopyright">© 2026 Star Academy Cyprus. Tüm hakları saklıdır.</div>
    </section>
    <section class="loginSide premiumSide"><div class="loginCard premiumLogin">
      <div class="brand center"><span class="logoStar">★</span><div>STAR ACADEMY<br><small>CYPRUS</small></div></div>
      <h2>Giriş Yap</h2><p class="muted">Hesabınıza giriş yaparak devam edin.</p>
      <div class="roleGrid">${Object.keys(users).map(k=>`<button class="role ${state.role===k?'active':''}" onclick="saveRole('${k}')">${roleIcon(k)}<span>${roleLabel(k)}</span></button>`).join('')}</div>
      <label>Kullanıcı Adı</label><div class="inputWrap">👤<input id="username" value="${r.username}" placeholder="Kullanıcı adınızı giriniz"></div>
      <label>Şifre</label><div class="inputWrap">🔒<input id="password" type="password" value="${r.password}" placeholder="Şifrenizi giriniz"><em>◉</em></div>
      <div class="loginTools"><label class="check"><input type="checkbox" checked> Beni Hatırla</label><a>Şifremi Unuttum?</a></div>
      <button class="primary full premiumButton" onclick="enterApp()">Giriş Yap <span>→</span></button>
      <div class="registerLine">Hesabınız yok mu? <a>Kayıt Ol</a></div>
    </div>
    <div class="trustRow"><div>🛡<b>Güvenli Platform</b><span>Verileriniz korunur</span></div><div>☁<b>Her Yerden Erişim</b><span>İstediğin zaman, istediğin yerden</span></div><div>💻<b>Web Odaklı</b><span>Bilgisayar ekranı için optimize</span></div></div>
    </section>
  </div>`;
}
function feature(icon,title,text){return `<article><div>${icon}</div><b>${title}</b><p>${text}</p></article>`}
function roleIcon(r){return {student:'🎓', parent:'👪', teacher:'👨‍🏫', admin:'🛡'}[r];}
function roleLabel(r){ return {student:'Öğrenci', parent:'Veli', teacher:'Öğretmen', admin:'Admin'}[r]; }
function enterApp(){ state.screen='home'; app.classList.remove('loginMode'); render(); }
function logout(){ localStorage.removeItem('sac_role'); renderLogin(); }
function nav(){
  if(state.role==='parent') return [['home','Ana Sayfa','⌂'],['child','Çocuğumun Durumu','▣'],['report','Başarı Raporu','▤'],['tests','Test Sonuçları','▥'],['analysis','Derslere Göre Analiz','◴'],['exams','Deneme Sınavları','✎'],['tasks','Ödev ve Görevler','✓'],['messages','Notlar / Öğretmen Mesajları','✉'],['settings','Ayarlar','⚙']];
  if(state.role==='admin') return [['home','Admin Panel','⚙'],['bank','Soru Havuzu','▦'],['questions','Soru Yönetimi','＋'],['lessons','Konu Yönetimi','📘'],['students','Öğrenciler','👥'],['parents','Veliler','👪'],['reports','Raporlar','📊'],['settings','Ayarlar','⚙']];
  if(state.role==='teacher') return [['home','Öğretmen Paneli','⌂'],['students','Öğrenciler','👥'],['assign','Ödev Gönder','✓'],['messages','Veli Mesajları','✉'],['reports','Sınıf Raporu','📊'],['bank','Soru Havuzu','▦']];
  return [['home','Ana Sayfa','⌂'],['lessons','Konu Anlatımları','📘'],['solve','Soru Çöz','☑'],['mini','Mini Testler','⚡'],['exams','Deneme Sınavları','✎'],['bank','Çıkmış Sorular','▦'],['tasks','Günlük Görevler','✓'],['stats','İstatistikler','📊'],['wrong','Yanlışlarım','✕'],['notes','Notlarım','✧']];
}
function shell(content, title, subtitle='Fen Lisesi ve BEAL hazırlık sistemi'){
  const u=users[state.role];
  app.innerHTML = `<div class="layout"><aside class="sidebar"><div class="brand"><span class="logoStar">★</span><div>STAR ACADEMY<br><small>CYPRUS</small></div></div><div class="portalName">${roleLabel(state.role).toUpperCase()} PORTALI</div><nav>${nav().map(n=>`<button class="nav ${state.screen===n[0]?'active':''}" onclick="state.screen='${n[0]}';render()"><span>${n[2]}</span>${n[1]}</button>`).join('')}</nav><div class="sideInfo"><b>${u.name}</b><small>${u.subtitle}</small><button onclick="logout()">Çıkış Yap</button></div></aside><main class="content"><header class="topbar"><div><h1>${title}</h1><p>${subtitle}</p></div><div class="topActions"><button class="bell">🔔<sup>3</sup></button><div class="profileMini"><b>${u.name}</b><small>${u.subtitle}</small></div></div></header>${content}<footer>© 2026 Star Academy Cyprus • Gizlilik Politikası • Kullanım Şartları • İletişim</footer></main></div>`;
}
function metric(icon,title,value,sub,color='blue'){ return `<div class="metric ${color}"><div class="mIcon">${icon}</div><div><span>${title}</span><b>${value}</b><small>${sub}</small></div></div>`; }
function cards(){return `<section class="metrics">${metric('📄','Çözdüğü Test Sayısı',student.tests,'Bu ay')}${metric('✓','Doğru Sayısı',student.correct,'Bu ay','green')}${metric('✕','Yanlış Sayısı',student.wrong,'Bu ay','red')}${metric('⏱','Çalışma Süresi',student.time,'Bu ay','orange')}</section>`}
function studentProfile(){return `<section class="studentStrip"><div class="avatar">👦</div><div><h2>${student.name} <span>Aktif Öğrenci</span></h2><p>${student.grade} • ${student.goal} Hedefi</p><a>Profil Bilgileri ›</a></div></section>`}
function subjectChart(){return `<div class="panel"><div class="panelHead"><h2>Derslere Göre Başarı Oranı</h2><a>Detaylı Rapor ›</a></div><div class="bars">${subjects.map(s=>`<div><b>%${s[1]}</b><span style="height:${s[1]*1.55}px;background:${s[2]}"></span><small>${s[0]}</small></div>`).join('')}</div></div>`}
function successDonut(){return `<div class="panel"><div class="panelHead"><h2>Genel Başarı Durumu</h2><select><option>Son 30 Gün</option></select></div><div class="donutWrap"><div class="donut" style="--p:${student.success}"><b>%${student.success}</b><small>Genel Başarı</small></div><div class="legend"><p><i class="g"></i> Doğru <b>%68 (${student.correct})</b></p><p><i class="r"></i> Yanlış <b>%27 (${student.wrong})</b></p><p><i></i> Boş <b>%5 (${student.empty})</b></p></div></div><p class="trend">↑ Geçen aya göre %8 artış gösterdi.</p></div>`}
function weakPanel(){return `<div class="panel"><div class="panelHead"><h2>En Zayıf Olduğu Konular</h2><a>Tümü ›</a></div>${weak.map(w=>`<div class="weakRow"><span>📄</span><b>${w[0]}</b><div class="progress"><i style="width:${w[1]}%"></i></div><small>%${w[1]}</small></div>`).join('')}</div>`}
function recent(){return `<div class="panel wide"><div class="panelHead"><h2>Son Çözdüğü Testler</h2><a>Tümü ›</a></div><table><thead><tr><th>Test Adı</th><th>Ders</th><th>Doğru</th><th>Yanlış</th><th>Net</th><th>Tarih</th><th>İşlem</th></tr></thead><tbody>${tests.map(t=>`<tr>${t.map(v=>`<td>${v}</td>`).join('')}<td><button class="tiny">Detay</button></td></tr>`).join('')}</tbody></table></div>`}
function daily(){return `<div class="panel"><div class="panelHead"><h2>Günlük Çalışma Özeti</h2><a>Tümü ›</a></div>${tasks.map(t=>`<div class="task"><span>${t[3]===100?'✓':'⏱'}</span><b>${t[0]} - ${t[1]}</b><em>${t[2]}</em></div>`).join('')}</div>`}
function week(){return `<div class="panel"><div class="panelHead"><h2>Haftalık Çalışma Özeti</h2><a>Tümü ›</a></div><div class="weekGrid"><div>📅<b>6</b><small>Gün Giriş</small></div><div>📗<b>42</b><small>Test Çözüldü</small></div><div>❔<b>312</b><small>Soru Çözüldü</small></div><div>⏱<b>14sa 25dk</b><small>Toplam Süre</small></div></div></div>`}
function teacherNote(){return `<div class="panel note"><h2>Öğretmen Notu</h2><blockquote>Ali bu hafta özellikle matematikte güzel bir ilerleme kaydetti. Oran orantı konusuna daha fazla çalışması faydalı olacaktır.</blockquote><p>— Matematik Öğretmeni ⭐</p></div>`}
function studentHome(){return `<section class="metrics topMetrics">${metric('📚','Toplam Test','1.248','Çözülen test sayısı')}${metric('✓','Doğru','892','%71.5 Başarı','green')}${metric('✕','Yanlış','356','%28.5 Hata','red')}${metric('⏱','Çalışma Süresi','78sa 40dk','Toplam süre','orange')}${metric('📊','Genel Net','+536.75','Net ortalaman','purple')}</section><section class="studentGrid"><div class="heroPanel"><h2>Hayaline ulaşmanın<br>en doğru yolu!</h2><p>Planlı çalış, düzenli tekrar yap ve hedefini gerçekleştir.</p><button onclick="state.screen='solve';render()">Hemen Çalışmaya Başla →</button></div><div class="panel"><h2>Günlük Görevlerin</h2>${tasks.map(t=>`<div class="goal"><b>${t[0]}</b><span>${t[1]}</span><div class="progress"><i style="width:${t[3]}%"></i></div></div>`).join('')}</div></section><section class="three">${subjectCards()}<div class="panel quick"><h2>Hızlı İşlemler</h2><button onclick="state.screen='mini';render()">⚡<span>Mini Test</span></button><button onclick="state.screen='exams';render()">📄<span>Deneme Sınavı</span></button><button onclick="state.screen='wrong';render()">✕<span>Yanlışlarım</span></button><button onclick="state.screen='bank';render()">📁<span>Çıkmış Sorular</span></button></div></section>${recent()}<section class="three miniRow"><div></div>${teacherNote()}</section>`}
function subjectCards(){return `<div class="panel subjectPanel"><div class="panelHead"><h2>Derslere Göre Başarı Durumun</h2><a>Tümünü Gör ›</a></div><div class="subjects">${subjects.map(s=>`<div><div class="miniDonut" style="--c:${s[2]}">%${s[1]}</div><b>${s[0]}</b><small>${s[1]>75?'Çok iyi':s[1]>55?'İyi':'Orta'}</small></div>`).join('')}</div></div>`}
function parentHome(){return `<section class="parentHeader">${studentProfile()}${cards()}</section><section class="dashboardGrid">${successDonut()}${subjectChart()}${weakPanel()}</section><section class="twoCols">${recent()}<div class="panel examBox"><div class="panelHead"><h2>Deneme Sınavı Sonuçları</h2><a>Tümü ›</a></div><div class="examCard"><div><small>Son Deneme Sınavı</small><b>2026 Fen Lisesi<br>1. Deneme Sınavı</b><span>18 Mayıs 2026</span></div><div><small>Net</small><b>66.00</b><small>Başarı</small><b>%66</b><a>Detaylı Sonuç Raporu ›</a></div></div></div></section><section class="three">${daily()}${week()}${teacherNote()}</section>`}
function bankPage(){
  const years=['Tümü',...Array.from(new Set(QUESTION_BANK.map(x=>x.year))).sort().reverse()];
  const lessons=['Tümü',...Array.from(new Set(questions.map(x=>x.lesson)))];
  let list=QUESTION_BANK.filter(x=>(state.filter==='Tümü'||x.year===state.filter) && (!state.query || x.title.toLowerCase().includes(state.query.toLowerCase()) || x.lessons.join(' ').toLowerCase().includes(state.query.toLowerCase())));
  let qList=questions.filter(x=>(state.filter==='Tümü'||String(x.year)===String(state.filter)) && (!state.query || x.q.toLowerCase().includes(state.query.toLowerCase()) || x.lesson.toLowerCase().includes(state.query.toLowerCase()) || x.topic.toLowerCase().includes(state.query.toLowerCase())));
  return `<div class="panel"><div class="panelHead"><div><h2>Soru Havuzu</h2><p>Arşiv dosyası sisteme eklendi. Ayrıca ${questions.length} adet çözülebilir soru havuzu uygulama içine bağlandı.</p></div><a href="assets/lise-deneme-programi-soru-havuzu.rar" download>Orijinal arşivi indir</a></div><div class="bankSummary"><div><b>${QUESTION_BANK.length}</b><span>PDF / Cevap Anahtarı</span></div><div><b>${questions.length}</b><span>Çözülebilir Soru</span></div><div><b>${lessons.length-1}</b><span>Ders</span></div><div><b>${years.length-1}</b><span>Yıl Arşivi</span></div></div><div class="filters"><input placeholder="Soru, konu, ders veya yıl ara..." value="${state.query}" oninput="state.query=this.value;render()"><select onchange="state.filter=this.value;render()">${years.map(y=>`<option ${state.filter===y?'selected':''}>${y}</option>`).join('')}</select></div><h3>Çözülebilir Sorular</h3><div class="questionList">${qList.slice(0,18).map((x,i)=>`<article><span>${x.lesson}</span><b>${x.topic}</b><p>${x.q}</p><small>${x.year} • ${x.difficulty}</small><button class="tiny" onclick="state.q=${questions.indexOf(x)};state.screen='solve';state.selected=null;render()">Çöz</button></article>`).join('')}</div><h3>PDF Arşivi</h3><div class="bankGrid">${list.map(x=>`<article class="bankCard"><span>${x.year}</span><h3>${x.title}</h3><p>${x.session} • ${x.type}</p><div>${x.lessons.map(l=>`<em>${l}</em>`).join('')}</div><small>${(x.size/1024/1024).toFixed(2)} MB</small></article>`).join('')}</div></div>`
}
function solvePage(){let q=questions[state.q]||questions[0];return `<div class="solveWrap"><div class="panel questionPanel"><div class="panelHead"><span>${q.lesson} • ${q.topic}</span><b>Soru ${state.q+1}/${questions.length}</b></div><h2>${q.q}</h2>${q.o.map((o,i)=>`<button class="option ${state.selected===i?(i===q.a?'ok':'bad'):''}" onclick="state.selected=${i};render()"><b>${String.fromCharCode(65+i)}</b>${o}</button>`).join('')}${state.selected!==null?`<div class="answer"><b>Açıklama:</b> ${q.exp}</div><button class="primary" onclick="state.q=(state.q+1)%questions.length;state.selected=null;render()">Sonraki Soru</button>`:''}</div><div class="panel"><h2>Akıllı Çalışma</h2><p>Yanlış yaptığın konular otomatik olarak “Konu Eksikleri” listesine eklenir.</p>${weakPanel()}</div></div>`}
function lessonsPage(){return `<div class="lessonGrid">${subjects.map(s=>`<div class="panel lesson"><span style="background:${s[2]}">📘</span><h2>${s[0]}</h2><p>Mini konu anlatımları, hızlı tekrar kartları ve konu testleri.</p><button class="tiny">Konuya Git</button></div>`).join('')}</div><div class="panel"><h2>Örnek Mini Konu: Oran Orantı</h2><p>İki çokluğun birbirine bölünerek karşılaştırılmasına oran denir. Oranların eşitliğine orantı denir. Sınavlarda yaş, hız, yüzde ve problem sorularında sık kullanılır.</p></div>`}
function adminHome(){return `<section class="metrics">${metric('👥','Öğrenci','248','Aktif kayıt')}${metric('👪','Veli','196','Bağlı hesap','green')}${metric('▦','PDF Arşiv',QUESTION_BANK.length,'Soru kitapçığı')}${metric('❓','Aktif Soru',questions.length,'Çözülebilir soru','purple')}${metric('📝','Deneme','28','Planlanan','orange')}</section><section class="twoCols"><div class="panel"><h2>Sistem Yönetimi</h2><div class="adminActions"><button>Yeni Soru Ekle</button><button>Konu Anlatımı Ekle</button><button>Deneme Sınavı Oluştur</button><button>Öğrenci / Veli Bağla</button></div></div><div class="panel"><h2>Soru Havuzu Durumu</h2><p>Yüklenen RAR arşivi sisteme dahil edildi. Bir sonraki aşamada PDF içindeki sorular tek tek veritabanına ayrıştırılabilir.</p><a class="primary link" href="assets/lise-deneme-programi-soru-havuzu.rar" download>Orijinal Soru Havuzunu İndir</a></div></section>${bankPage()}`}
function teacherHome(){return `<section class="metrics">${metric('👥','Öğrenci','84','Takip edilen')}${metric('✓','Tamamlanan Görev','312','Bu hafta','green')}${metric('✉','Veli Mesajı','18','Bekleyen')}${metric('📊','Sınıf Ortalaması','%68','Genel başarı','orange')}</section><section class="twoCols"><div class="panel"><h2>Öğrenci Takip Listesi</h2>${recent()}</div>${teacherNote()}</section>`}
function generic(title){return `<div class="panel"><h2>${title}</h2><p>Bu bölüm profesyonel arayüz tasarımına dahil edildi. Gerçek veri bağlantısı Firebase veya başka bir veritabanı ile eklendiğinde kayıtlar canlı çalışır.</p></div>${state.role==='parent'?parentHome():subjectCards()}`}
function render(){
 let title = state.role==='parent'?'Hoş geldiniz, Ayşe Yıldız 👋':state.role==='admin'?'Star Academy Yönetim Paneli':state.role==='teacher'?'Öğretmen Paneli':'Hoş geldin, Ahmet! 👋';
 let content='';
 if(state.role==='parent') content = ({home:parentHome, child:parentHome, report:parentHome, tests:recent, analysis:()=>`<section class="dashboardGrid">${successDonut()}${subjectChart()}${weakPanel()}</section>`, exams:()=>`${recent()}${week()}`, tasks:daily, messages:teacherNote}[state.screen]||parentHome)();
 else if(state.role==='admin') content = ({home:adminHome, bank:bankPage, questions:solvePage, lessons:lessonsPage, students:()=>generic('Öğrenci Yönetimi'), parents:()=>generic('Veli Yönetimi'), reports:()=>generic('Raporlar')}[state.screen]||adminHome)();
 else if(state.role==='teacher') content = ({home:teacherHome, students:()=>generic('Öğrenciler'), assign:daily, messages:teacherNote, reports:()=>generic('Sınıf Raporu'), bank:bankPage}[state.screen]||teacherHome)();
 else content = ({home:studentHome, lessons:lessonsPage, solve:solvePage, mini:solvePage, exams:()=>`${recent()}${bankPage()}`, bank:bankPage, tasks:daily, stats:()=>`<section class="dashboardGrid">${successDonut()}${subjectChart()}${weakPanel()}</section>`, wrong:solvePage, notes:teacherNote}[state.screen]||studentHome)();
 shell(content,title);
}
renderLogin();
if('serviceWorker' in navigator){ navigator.serviceWorker.register('./service-worker.js').catch(()=>{}); }
