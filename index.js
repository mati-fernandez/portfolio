const d = document;
//Establecer todo el js después de la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  //Selectores de uso global
  const $header = d.querySelector('header'),
    $cajaCentral = d.querySelector('#caja-central'),
    $cajaCara = d.querySelector('#caja-cara'),
    $cajaPresentacion = d.querySelector('#caja-presentacion'),
    $audioEffect1 = d.querySelector('#toggle-btn-sound'),
    $audioToggleBtn = d.querySelector('#audio-toggle'),
    $seccionAptitudes = d.querySelector('#seccion-aptitudes'),
    $seccionTecnologias = d.querySelector('#seccion-tecnologias'),
    $seccionCpe = d.querySelector('#seccion-cpe'),
    $footer = d.querySelector('footer'),
    $suggestiveFinger1 = d.querySelector('#suggestive-finger1'),
    $suggestiveFinger2 = d.querySelector('#suggestive-finger2'),
    $profileAudio = d.querySelector('#profile-audio'),
    $thunderAudio = d.querySelector('#thunder'),
    $rainAudio = d.querySelector('#rain'),
    $suggestiveFinger3 = d.querySelector('#suggestive-finger3-wrapper'),
    $cajaFondo = d.querySelector('#caja-fondo'),
    $imgProfPic = d.querySelector('#profile-pic'),
    $changeButton = d.querySelector('#change-button'),
    $quoteModeGif = d.querySelector('#quote-mode'),
    $cajaFdoMobile = d.querySelector('#caja-fondo-mobile'),
    $qModeBkgIntro = d.querySelector('#quote-mode-bkg-intro'),
    $mobileQModeBkgIntro = d.querySelector('#mobile-quote-mode-bkg-intro'),
    $matrixProfPic = d.querySelector('#matrix'),
    pic1 = d.querySelector('#profile-pic').src,
    pic1h = d.querySelector('#matrix').src,
    pic2 = 'prof-pic.png',
    pic2h = 'prof-pic-hover.png',
    $quoteText = d.querySelector('#presentacion'),
    $typing = d.querySelector('#typing'),
    $musicToggle = d.querySelector('#music-toggle'),
    $languageToggle = d.querySelector('#language-toggle'),
    $understood = d.querySelector('#understood'),
    $exitQuoteModeBtn = d.querySelector('#exit-quote-mode-wrapper'),
    $matrixBg = d.getElementById('matrix-bg'),
    $matrix2Bg = d.querySelector('#matrix2-bg'),
    $phoneRing = d.querySelector('#phone-ring'),
    $pills = d.querySelectorAll('.pill'),
    $nextSong = d.querySelector('#next-song'),
    $whiteRabbit = d.querySelector('#white-rabbit'),
    $disclaimer = d.querySelector('#disclaimer'),
    $musicGif = d.querySelector('#music-gif'),
    $musicBtnAppearance = d.querySelector('#music-btn-appearance-audio');

  //Establecer volumenes (en hmtl no los toma al menos en chrome)
  $profileAudio.volume = 0;
  $typing.volume = 0.3;
  $phoneRing.volume = 0.4;
  $musicBtnAppearance.volume = 0.4;

  //Variables y constantes de uso global:
  const textoPresentacion = $cajaPresentacion.querySelector('p').textContent;
  let timerMsje = null;
  let fadeInterval = 0;
  let autoImginterval = 0;
  console.log('Auto Image interval INITIALIZED!!!');
  let quoteModeIsOn = false;
  let quoteModeFirstLoad = true;
  let imgPosition = 0;
  let quotePosition = 0;
  let typed = null;
  let language = 'EN';
  // Version inicial, raíz, en inglés...
  const quotesEng = [
    'Uijt!jt!zpvs!mbtu!dibodf/!Bgufs!uijt-!uifsf!jt!op!uvsojoh!cbdl/!Zpv!ublf!uif!cmvf!qjmm!.!uif!tupsz!foet-!zpv!xblf!vq!jo!zpvs!cfe!boe!cfmjfwf!xibufwfs!zpv!xbou!up!cfmjfwf/!Zpv!ublf!uif!sfe!qjmm!.!zpv!tubz!jo!Xpoefsmboe!boe!J!tipx!zpv!ipx!effq!uif!sbccju!ipmf!hpft/',
    'Zpv!ibwf!up!mfu!ju!bmm!hp/!Gfbs-!epvcu-!boe!ejtcfmjfg/!Gsff!zpvs!njoe/',
    'Ibwf!zpv!fwfs!ibe!b!esfbn-!Uibu!zpv!xfsf!tp!tvsf!xbt!sfbm@!Xibu!jg!zpv!xfsf!vobcmf!up!xblf!gspn!uibu!esfbn@!Ipx!xpvme!zpv!lopx!uif!ejggfsfodf!cfuxffo!uif!esfbn!xpsme!boe!uif!sfbm!xpsme@',
    'Jg!Zpv!Dbo!Tufbm!Bo!Jefb-!Xiz!Dbo(u!Zpv!Qmbou!Pof!Uifsf!Jotufbe@',
    'Podf!Bo!Jefb!Ibt!Ublfo!Ipme!Pg!Uif!Csbjo-!Ju(t!Bmnptu!Jnqpttjcmf!Up!Fsbejdbuf/',
    'Epxoxbse!Jt!Uif!Pomz!Xbz!Gpsxbse/',
    'Uif!npsf!zpv!dibohf!uijoht-!uif!qspkfdujpo!cfhjot!up!dpowfshf!po!zpv/!Uifz!tfotf!uif!bmjfo!obuvsf!pg!uif!esfbnfs-!uifz!buubdl!mjlf!xijuf!cmppe!dfmmt!gjhiujoh!bo!jogfdujpo/',
    'Esfbnt!Gffm!Sfbm!Xijmf!Xf(sf!Jo!Uifn/!Ju(t!Pomz!Xifo!Xf!Xblf!Vq!Uibu!Xf!Sfbmj{f!Tpnfuijoh!Xbt!Bduvbmmz!Tusbohf/',
    '!Nboz!Esfbnt!Xjuijo!Esfbnt!Jt!Upp!Votubcmf/',
    'Ibwf!zpv!fwfs!gfmu!uibu!uifsf!jt!b!tdsjqu!xsjuufo!cz!tpnfuijoh!hsfbufs!uibo!vt@',
    'Jo!uijt!hbnf-!uif!cbuumf!jt!gps!zpvs!tpvm/!Boe!uif!cbuumf!gjfme!jt!zpvs!njoe',
    'Bhfou!Tnjui!dpvme!cf!bozxifsf/!Epo(u!mfu!ijn!jo/',
    'Sftqfdu!uif!tjnvmbujpo/',
    'Xibu!jt!sfbm@!Ipx!ep!zpv!efgjof!(sfbm(@!Jg!zpv(sf!ubmljoh!bcpvu!xibu!zpv!dbo!gffm-!xibu!zpv!dbo!tnfmm-!xibu!zpv!dbo!ubtuf!boe!tff-!uifo!(sfbm(!jt!tjnqmz!fmfdusjdbm!tjhobmt!joufsqsfufe!cz!zpvs!csbjo/',
    'J(n!uszjoh!up!gsff!zpvs!njoe/!Cvu!J!dbo!pomz!tipx!zpv!uif!epps/!Zpv(sf!uif!pof!uibu!ibt!up!xbml!uispvhi!ju/',
    'Uif!esfbn!ibt!cfdpnf!uifjs!sfbmjuz/!Xip!bsf!zpv!up!tbz!puifsxjtf@',
    'Xibu!jt!uif!nptu!sftjmjfou!qbsbtjuf@!Cbdufsjb@!B!wjsvt@!Bo!jouftujobm!xpsn@!Bo!jefb/!Sftjmjfou///!ijhimz!dpoubhjpvt/!Podf!bo!jefb!ibt!ublfo!ipme!pg!uif!csbjo!ju(t!bmnptu!jnqpttjcmf!up!fsbejdbuf/!Bo!jefb!uibu!jt!gvmmz!gpsnfe!.!gvmmz!voefstuppe!.!uibu!tujdlt<!sjhiu!jo!uifsf!tpnfxifsf/',
    'Ofwfs!sfdsfbuf!gspn!zpvs!nfnpsz/!Bmxbzt!jnbhjof!ofx!qmbdft"',
    '!Zpv!lffq!ufmmjoh!zpvstfmg!xibu!zpv!lopx/!Cvu!xibu!ep!zpv!cfmjfwf@!Xibu!ep!zpv!gffm@',
    'J(n!Tujmm!Esfbnjoh/',
    'Benju!Ju;!Zpv!Epo(u!Cfmjfwf!Jo!Pof!Sfbmjuz!Boznpsf/',
    'Jo!Uif!Esfbn!Tubuf-!Zpvs!Dpotdjpvt!Efgfotft!Bsf!Mpxfsfe!Boe!Ju!Nblft!Zpvs!Uipvhiut!Wvmofsbcmf!Up!Uifgu/',
    'OQDt!bsf!qsphsbnnfe!up!buubdl!xibu!uifz!epo(u!voefstuboe/!Boe!up!voefstuboe!uif!xpsme!jo!xbzt!uibu!cfofgjut!uif!Hbnf!Nbtufs-!Bsdijufdu!ps!tpnf!puifs!Tvqfsjps!Foujujft/',
    'Gjwf!njovuft!jo!uif!#sfbm!xpsme#!hjwft!zpv!bo!ipvs!jo!esfbnt/',
    'Dsfbujoh!b!esfbn!gspn!zpvs!nfnpsz!jt!uif!cftu!xbz!up!mptf!tjhiu!pg!xibu!jt!sfbm!boe!xibu!jt!b!esfbn/',
    'OQDt!xjmm!dpmmbcpsbuf!xjui!uif!bsdijufdu!fwfo!jg!uifz!epo(u!lopx!xibu!uifz(sf!epjoh',
    'Jg!uif!hbnf!xbt!tjohmf!qmbzfs@!Tujmm-!zpv!tipvmeo(u!mptf!ipqf/!OQDt!bsf!opu!ofdfttbsjmz!bmxbzt!ublfo!cz!Bhfou!Tnjui!boe!uvsofe!bhbjotu!zpv/!Uifz!dpvme!bmtp!gvodujpo!bt!bmmjft/!Xibu!jg!zpv!dbo!bxblfo!uifn!boe!dpoofdu!uifn!xjui!uifjs!ijhifs!tfmg@!Qfsibqt!uifz!xpvme!op!mpohfs!cf!qspof!up!cfjoh!vtfe!bhbjotu!zpv/!Cvu!ipx!mpoh!xpvme!uijt!fggfdu!mbtu@!Xibu!epft!ju!efqfoe!po!opu!cfjoh!bo!OQD!bhbjo@!Tvsfmz!J!dbo!cf!pof!bhbjo!upp/',
    'Xifo!tpnf!tbje!uibu!Nbusjy!jt!b!epdvnfoubsz-!ju!tffnfe!fybhhfsbufe!boe!gbodjgvm!up!nf/!Opx!J!lopx!ju(t!sfbm/!Cvu!xibu!hppe!jt!ju!jg!nz!jo.hbnf!fyqfsjfodf!epfto(u!jnqspwf@!Ipx!ep!J!vtf!ju!up!nz!bewboubhf@',
    'Jg!uif!tztufn!upme!uif!OQD!ipx!tpnfuijoh!xpslt-!op!nbuufs!ipx!nvdi!zpv!usz!up!dibohf!uibu!dpodfqu!jo!uifjs!njoe-!ju!xjmm!cf!mjlf!ubmljoh!up!b!xbmm/!!Jo!uif!cftu!pg!dbtft-!jg!if!mjtufot!up!zpv-!if!xjmm!cfmjfwf!uibu!zpv!bsf!uif!dsb{z!pof/',
    'Epo(u!ublf!OQD!buubdlt!qfstpobmmz/!!Ju(t!kvtu!uif!dpxbsemz!Nbusjy!ijejoh!cfijoe!jut!dibsbdufst!up!lffq!tufbmjoh!zpvs!fofshz/!!Up!dpoujovf!vtjoh!zpv!bt!b!cbuufsz/',
    'Uif!Nbusjy!xjmm!bmxbzt!usz!up!bhjubuf!zpv!fnpujpobmmz/!!Uijt!jt!ipx!ju!hfut!zpvs!fofshz/!!Zpvs!fnpujpobm!cmppe!BLB!mppti/',
    'Evbmjuz-!xijdi!svmft!uijt!xpsme-!jt!b!Nbusjy!tusbufhz!up!ibswftu!pvs!fofshz/!Fwfsz!ujnf!ju!nbobhft!up!dpogspou!vt!fbdi!puifs!ju!hfut!jut!gvfm/!Ps!fwfsz!ujnf!uifsf!jt!ufotjpo!pg!boz!ljoe!cfuxffo!cfjoht/',
    'Xjui!uif!nbojqvmbujpo!pg!mbohvbhf!uifz!nbobhf!uif!nbttft/!Tfmmjoh!zpvs!tpvm!jt!opu!ofdfttbsjmz!uibu/!Ju!nfbot!tfmmjoh!zpvs!bwbubs-!uifz!qbsujbmmz!ps!upubmmz!mjnju!uif!dpoofdujpo!xjui!zpvs!tfmg!pvutjef!uif!tjnvmbujpo!boe!uifsfgpsf!ibwf!npsf!dpouspm!pwfs!ju!uibo!zpv/',
    'Sfmjhjpot!bsf!pof!pg!uif!nboz!tupsjft!uibu!bsf!jnqptfe!po!vt!gspn!dijmeippe!up!nbojqvmbuf!vt/!Uifz!ublf!bewboubhf!pg!uif!ivnbo!offe!up!cfmjfwf!jo!tpnfuijoh!ijhifs!ps-!qfsibqt-!uif!tvtqjdjpo!uibu!tpnfuijoh!ijhifs!fyjtut/!Cvu!ju!jt!ofdfttbsz!uibu!zpv!ep!opu!lopx!xibu!uif!usvf!obuvsf!pg!uijt!xpsme!jt-!uibu!zpv!dpoujovf!up!cfmjfwf!jo!uif!hbnf-!uibu!zpv!sfnbjo!jnnfstfe/',
    'Uif!Nbusjy!xjmm!bmxbzt!usz!up!usbq!zpvs!njoe!boe!eftubcjmj{f!zpv!bxbz!gspn!uif!usvui/!Tubz!nfoubmmz!gpdvtfe-!epo(u!mfu!ju!tiblf!zpvs!cfjoh!boe!ibswftu!zpvs!fofshz/!Fbdi!joejwjevbm!xip!dpnft!dmptf!up!uif!usvui!jt!b!uisfbu!up!uif!xpsme!uibu!dpoubjot!ijn/!Bu!tpnf!qpjou!zpv!xjmm!opujdf!wfsz!tusbohf!tjuvbujpot!cfdbvtf!zpv!xjmm!op!mpohfs!gbmm!joup!dpnnpo!usbqt-!boe!ju!xjmm!nbobhf!up!tufbm!zpvs!fofshz!jo!wfsz!tusbohf!xbzt!)uijt!dbo!ifmq!zpv!sfbmj{f!jo!tpnf!pg!uifn!uibu!uijt!dpnft!gspn!bcpwf-!ps!sbuifs-!gspn!pvutjef!uif!mjnjut!pg!zpvs!qfsdfqujpo*/',
    'Fwfszuijoh!jo!qsjodjqmf!jt!njoe/!Jg!buubdlt!ep!opu!qbtt!uif!njoe(t!gjmufs-!zpvs!qiztjdbm!boe0ps!fnpujpobm!cpez!jt!mftt!mjlfmz!up!cf!bggfdufe/!Epo(u!mfu!uif!Nbusjy!vtf!zpv!up!dsfbuf!sfbmjujft!uibu!epo(u!tvju!zpv/',
    'Uif!dijmesfo(t!npwjf!pg!uif!npotufst!uibu!ibswftu!fofshz!jo!uijt!qmbof!jt!bmtp!ofhbujwf!qsjnjoh/',
    'Uif!jttvf!xjui!ofhbujwf!qsjnjoh!jt!voefstuboejoh!uibu!uifz!njy!usvui!xjui!mjft!boe!lopxjoh!xibu!up!tujdl!xjui/',
    'Epo(u!mfu!zpvs!efgfotft!bdujwbuf!cfdbvtf!zpv!cfmjfwf!J(n!b!gmbu!fbsuifs-!epo(u!cf!bo!OQD-!J!ofwfs!ubmlfe!bcpvu!gmbu!fbsuijoh/!J!uijol!ju!jt!pof!npsf!jttvf!uibu!uifz!jnqptf!up!ejwjef!boe!ejtusbdu!vt/',
    'J(n!opu!joufsftufe!jo!zpv!bhsffjoh!xjui!nf/!J!kvtu!usz!up!voefstuboe!b!mjuumf!npsf!fwfsz!ebz/!Epo(u!xf!bmm!xbou!uif!tbnf!uijoh@!Cf!b!mjuumf!cfuufs!fwfsz!ebz@',
    'Xifo!zpv!opujdf!bo!fowjsponfou!uibu!jt!upp!qfbdfgvm-!ju!jt!mjlfmz!uif!qsfmvef!up!tpnf!dpogmjdu/!Bu!mfbtu!uibu(t!xibu!ibqqfofe!up!nf!tfwfsbm!ujnft/!Evbmjuz!epjoh!jut!xpsl/!Fwfszuijoh!uibu!hpft!vq!nvtu!dpnf!epxo/',
    'Jo!uif!foe!fwfszuijoh!J!tbje!xbt!jo!wbjo/!Cfdbvtf!fwfsz!ujnf!xf!uispx!bo!jefb!joup!uif!vojwfstf-!ju!sfjowfout!jutfmg!tp!uibu!xf!ibwf!npsf!up!fyqfsjfodf!boe!ofwfs!bssjwf!bu!bo!bctpmvuf!usvui/',
    'Uiptf!xip!ijef!cfijoe!uif!tp.dbmmfe!Hpe!boe!sfmjhjpo!xijmf!qsbdujdjoh!fwjm!bsf!uif!xpstu!jo!uijt!xpsme/!Bt!uifz!bmtp!ijef!cfijoe!tp!nboz!puifs!tvqqptfe!opcmf!dbvtft/!Cvu!uif!cmbnf!bmtp!gbmmt!po!uiptf!xip!cfmjfwf!uifn-!uifz!bsf!uif!poft!xip!hjwf!uifn!qpxfs/',
    'Jo!uif!44se!njovuf!pg!nboz!gjmnt!ju!jt!sfgfssfe!up!uibu!uijt!xpsme!jt!jmmvtpsz/',
    'Jo!uif!44se!tfdpoe!pg!uif!jousp!pg!uif!3133!Xpsme!Dvq!uifz!tipx!vt!xip!xpvme!xjo!boe!xip!xpvme!cf!b!gjobmjtu/',
  ];
  const quotesEsp = [
    'Ftub!ft!uv!ûmujnb!pqpsuvojebe/!Eftqvêt!ef!ftup-!op!ibz!wvfmub!busât/!Upnbt!mb!qbtujmmb!b{vm;!mb!ijtupsjb!ufsnjob-!uf!eftqjfsubt!fo!uv!dbnb!z!dsfft!mp!rvf!rvjfsbt!dsffs/!Tj!upnbt!mb!qbtujmmb!spkb-!uf!rvfebsât!fo!fm!Qbît!ef!mbt!Nbsbwjmmbt!z!uf!nptusbsê!ibtub!rvê!qvoup!mmfhb!mb!nbesjhvfsb!efm!dpofkp/',
    'Ujfoft!rvf!efkbs!js!upep/!Njfep-!eveb!f!jodsfevmjebe/!Mjcfsb!uv!nfouf/',
    'ÀBmhvob!wf{!ibt!ufojep!vo!tvfòp!rvf!ftubcbt!ubo!tfhvsp!ef!rvf!fsb!sfbm@!ÀRvê!qbtbsîb!tj!op!qvejfsbt!eftqfsubs!ef!ftf!tvfòp@!ÀDônp!tbcsîbt!mb!ejgfsfodjb!fousf!fm!nvoep!ef!mpt!tvfòpt!z!fm!nvoep!sfbm@',
    'Tj!qvfeft!spcbs!vob!jefb-!Àqps!rvê!op!qvfeft!qmboubsmb!biî@',
    'Vob!wf{!rvf!vob!jefb!tf!ib!bqpefsbep!efm!dfsfcsp-!ft!dbtj!jnqptjcmf!fssbejdbsmb/',
    'Ibdjb!bcbkp!ft!fm!ûojdp!dbnjop!b!tfhvjs/',
    'Njfousbt!nbt!dbncjbt!mbt!dptbt-!mb!qspzfddjôo!fnqjf{b!b!dpowfshfs!fo!uj/!Tjfoufo!mb!obuvsbmf{b!bkfob!efm!tpòbeps-!bubdbo!dpnp!hmôcvmpt!cmbodpt!dpncbujfoep!vob!jogfddjôo',
    'Mpt!tvfòpt!tf!tjfoufo!sfbmft!njfousbt!ftubnpt!fo!fmmpt/!Tômp!dvboep!eftqfsubnpt!opt!ebnpt!dvfoub!ef!rvf!bmhp!fsb!sfbmnfouf!fyusbòp/',
    'Nvdipt!tvfòpt!efousp!ef!mpt!tvfòpt!tpo!efnbtjbep!joftubcmft/',
    'ÀBmhvob!wf{!ibt!tfoujep!rvf!ibz!vo!hvjôo!ftdsjup!qps!bmhp!nât!hsboef!rvf!optpuspt@',
    'Fo!ftuf!kvfhp-!mb!cbubmmb!ft!qps!uv!bmnb/!Z!fm!dbnqp!ef!cbubmmb!ft!uv!nfouf/',
    'Fm!Bhfouf!Tnjui!qpesîb!ftubs!fo!dvbmrvjfs!mvhbs/!Op!mp!efkfo!fousbs/',
    'Sftqfub!mb!tjnvmbdjôo/',
    'ÀRvê!ft!sfbm@!ÀDônp!efgjoft!mp!sfbm@!Tj!ftuât!ibcmboep!ef!mp!rvf!qvfeft!tfoujs-!mp!rvf!qvfeft!pmfs-!mp!rvf!qvfeft!tbcpsfbs!z!wfs-!foupodft!mp!sfbm!tpo!tjnqmfnfouf!tfòbmft!fmêdusjdbt!joufsqsfubebt!qps!uv!dfsfcsp/',
    'Ftupz!usbuboep!ef!mjcfsbs!uv!nfouf/!Qfsp!tômp!qvfep!nptusbsuf!mb!qvfsub/!Uû!fsft!rvjfo!ujfof!rvf!busbwftbsmb/',
    'Fm!tvfòp!tf!ib!dpowfsujep!fo!tv!sfbmjebe/!ÀRvjêo!fsft!uû!qbsb!efdjs!mp!dpousbsjp@',
    'ÀDvâm!ft!fm!qbsâtjup!nât!sftjtufouf@!ÀMbt!cbdufsjbt@!ÀVo!wjsvt@!ÀVo!hvtbop!jouftujobm@!Vob!jefb/!Sftjtufouf///!bmubnfouf!dpoubhjptb/!Vob!wf{!rvf!vob!jefb!tf!ib!bqpefsbep!efm!dfsfcsp!ft!dbtj!jnqptjcmf!ef!fssbejdbs/!Vob!jefb!rvf!ftuâ!dpnqmfubnfouf!gpsnbeb-!dpnqmfubnfouf!foufoejeb!.!ftp!tf!rvfeb<!kvtup!biî!fo!bmhvob!qbsuf/',
    'Ovodb!sfdsfft!b!qbsujs!ef!uv!nfnpsjb/!¢Jnbhîobuf!tjfnqsf!mvhbsft!ovfwpt"',
    'Tjhvft!ejdjêoepuf!b!uj!njtnp!mp!rvf!tbcft/!ÀQfsp!rvê!dsfft@!ÀRvê!tjfouft@',
    'Upebwîb!ftupz!tpòboep/',
    'Benîufmp;!zb!op!dsfft!fo!vob!tpmb!sfbmjebe/',
    'Fo!fm!ftubep!ef!tvfòp-!uvt!efgfotbt!dpotdjfouft!ejtnjovzfo!z!uvt!qfotbnjfoupt!tf!wvfmwfo!wvmofsbcmft!bm!spcp/',
    'Mpt!OQD!ftuâo!qsphsbnbept!qbsb!bubdbs!mp!rvf!op!foujfoefo/!Z!dpnqsfoefs!fm!nvoep!ef!nbofsb!rvf!cfofgjdjf!bm!Hbnf!Nbtufs-!bm!Bsrvjufdup!p!b!bmhvobt!pusbt!Foujebeft!Tvqfsjpsft/',
    'Djodp!njovupt!fo!fm!#nvoep!sfbm#!uf!eb!vob!ipsb!fo!tvfòpt/',
    'Bsnbs!vo!tvfòp!ef!uv!nfnpsjb!ft!mb!nfkps!nbofsb!ef!qfsefs!ef!wjtub!rvf!ft!sfbm!z!rvê!ft!vo!tvfòp/',
    'Mpt!OQD!dpmbcpsbsâo!dpo!fm!bsrvjufdup!jodmvtp!tj!op!tbcfo!mp!rvf!ftuâo!ibdjfoep/',
    'ÀTj!fm!kvfhp!gvfsb!qbsb!vo!tpmp!kvhbeps@!Bûo!btî-!op!efcft!qfsefs!mb!ftqfsbo{b/!Mpt!OQD!op!ofdftbsjbnfouf!tjfnqsf!tpo!upnbept!qps!fm!Bhfouf!Tnjui!z!tf!wvfmwfo!fo!uv!dpousb/!Ubncjêo!qpesîbo!gvodjpobs!dpnp!bmjbept/!ÀRvê!qbtbsîb!tj!qvejfsbt!eftqfsubsmpt!z!dpofdubsmpt!dpo!tv!zp!tvqfsjps@!Rvj{ât!zb!op!tfbo!qspqfotpt!b!tfs!vujmj{bept!fo!uv!dpousb/!ÀQfsp!dvâoup!ujfnqp!evsbsîb!ftuf!fgfdup@!ÀEf!rvê!efqfoef!op!wpmwfs!b!tfs!OQD@!Tfhvsbnfouf!zp!ubncjêo!qvfep!wpmwfs!b!tfsmp/',
    'Dvboep!bmhvopt!efdîbo!rvf!Nbusjy!ft!vo!epdvnfoubm-!nf!qbsfdîb!fybhfsbep!z!gboubtjptp/!Bipsb!tê!rvf!ft!sfbm/!Qfsp!Àef!rvê!tjswf!tj!nj!fyqfsjfodjb!fo!fm!kvfhp!op!nfkpsb@!ÀDônp!mp!vtp!b!nj!gbwps@',
    'Tj!fm!tjtufnb!mf!ejkp!bm!OQD!dônp!gvodjpob!bmhp-!op!jnqpsub!dvâoup!joufouft!dbncjbs!ftf!dpodfqup!fo!tv!nfouf-!tfsâ!dpnp!ibcmbs!b!vob!qbsfe/!Fo!fm!nfkps!ef!mpt!dbtpt-!tj!uf!ftdvdib-!dsffsâ!rvf!fm!mpdp!tpt!wpt/',
    'Op!uf!upnft!mpt!bubrvft!ef!mpt!OQDt!ef!gpsnb!qfstpobm/!Ft!tpmp!mb!Nbusjy!dpcbsef!ftdpoejêoeptf!efusât!ef!tvt!qfstpobkft!qbsb!tfhvjs!spcâoepuf!fofshîb/!Qbsb!tfhvjs!vtâoepuf!dpnp!qjmb/',
    'Nbusjy!tjfnqsf!joufoubsâ!bhjubsuf!fnpdjpobmnfouf/!Ft!btî!dônp!pcujfof!uv!fofshîb/!Uv!tbohsf!fnpdjpobm!ubncjêo!dpopdjeb!dpnp!mppti/',
    'Mb!evbmjebe-!rvf!sjhf!ftuf!nvoep-!ft!vob!ftusbufhjb!ef!Nbusjy!qbsb!dptfdibs!ovftusb!fofshîb/!Dbeb!wf{!rvf!mphsb!fogsfoubsopt!pcujfof!tv!dpncvtujcmf/!P!dbeb!wf{!rvf!mphsb!ufotjôo!ef!dvbmrvjfs!ujqp!fousf!tfsft/',
    'Dpo!mb!nbojqvmbdjôo!efm!mfohvbkf!nbofkbo!b!mbt!nbtbt/!Wfoefs!uv!bmnb!op!ft!ofdftbsjbnfouf!ftp/!Tjhojgjdb!wfoefs!uv!bwbubs-!mjnjubo!qbsdjbm!p!upubmnfouf!mb!dpofyjôo!dpoujhp!njtnp!gvfsb!ef!mb!tjnvmbdjôo!z!qps!uboup!ujfofo!nât!dpouspm!tpcsf!êm!rvf!uû/',
    'Mbt!sfmjhjpoft!tpo!vop!ef!mpt!uboupt!dvfoupt!rvf!opt!jnqpofo!eftef!qfrvfòpt!qbsb!nbojqvmbsopt/!Tf!bqspwfdibo!ef!mb!ofdftjebe!efm!tfs!ivnbop!ef!dsffs!fo!bmhp!tvqfsjps!p-!rvj{bt!fo!mb!tptqfdib!ef!rvf!ibz!bmhp!tvqfsjps/!Qfsp!ofdftjub!rvf!op!tfqbt!dvbm!ft!mb!wfsebefsb!obuvsbmf{b!ef!ftuf!nvoep-!rvf!tjhbt!dsfzfoep!fo!fm!kvfhp-!rvf!uf!nboufohbt!jonfstp/',
    'Nbusjy!tjfnqsf!joufoubsâ!busbqbs!uv!nfouf!z!eftftubcjmj{bsuf!qbsb!bmfkbsuf!ef!mb!wfsebe/!Nboufouf!nfoubmnfouf!fogpdbep-!op!efkft!rvf!ftp!tbdveb!uv!tfs!z!dptfdif!uv!fofshîb/!Dbeb!joejwjevp!rvf!tf!bdfsdb!b!mb!wfsebe!ft!vob!bnfob{b!qbsb!fm!nvoep!rvf!mp!dpoujfof/!Fo!bmhûo!npnfoup!opubsât!tjuvbdjpoft!nvz!fyusbòbt!qpsrvf!zb!op!dbfsât!fo!usbnqbt!dpnvoft-!z!mphsbsâ!spcbsuf!uv!fofshîb!ef!nbofsbt!nvz!fyusbòbt!)ftup!qvfef!bzvebsuf!b!ebsuf!dvfoub!fo!bmhvobt!ef!fmmbt!rvf!ftup!wjfof!ef!bssjcb-!p!nfkps!ejdip-!eftef!gvfsb!ef!mpt!mînjuft!ef!uv!qfsdfqdjôo*/',
    'Upep!fo!qsjodjqjp!ft!nfouf/!Tj!mpt!bubrvft!op!qbtbo!fm!gjmusp!ef!mb!nfouf-!ft!nfopt!qspcbcmf!rvf!uv!dvfsqp!gîtjdp!z0p!fnpdjpobm!tf!wfb!bgfdubep/!Op!efkft!rvf!Nbusjy!uf!vujmjdf!qbsb!dsfbs!sfbmjebeft!rvf!op!uf!dpowjfofo/',
    'Mb!qfmîdvmb!jogboujm!tpcsf!mpt!npotusvpt!rvf!sfdpmfdubo!fofshîb!fo!ftuf!qmbop!ubncjêo!ft!qsjnbep!ofhbujwp/',
    'Fm!ufnb!efm!qsjnbep!ofhbujwp!ft!foufoefs!rvf!nf{dmbo!wfsebe!dpo!nfoujsb!z!tbcfs!dpo!rvê!rvfebstf',
    'Rvf!op!tf!uf!bdujwfo!uvt!efgfotbt!qps!dsffs!rvf!tpz!ufssbqmbojtub-!op!tfbt!OQD-!zp!ovodb!ibcmê!ef!ufssbqmbojtnp/!Dsfp!rvf!ft!vo!ufnb!nbt!rvf!jnqpofo!qbsb!ejwjejsopt!z!ejtusbfsopt/',
    'Op!nf!joufsftb!rvf!nf!eft!mb!sb{ôo/!Tpmp!usbup!ef!foufoefs!dbeb!eîb!vo!qpdp!nât/!Bdbtp!op!rvfsfnpt!upept!mp!njtnp@!Ftubs!dbeb!eîb!vo!qpdp!nfkps@',
    'Dvboep!opuft!vo!bncjfouf!efnbtjbep!qbdjgjdp-!ft!qspcbcmf!rvf!tfb!mb!bouftbmb!ef!bmhûo!dpogmjdup/!Bm!nfopt!btj!nf!qbtô!wbsjbt!wfdft/!Mb!evbmjebe!ibdjfoep!tv!usbcbkp/!Upep!mp!rvf!tvcf-!cbkb/',
    'Bm!gjobm!upep!mp!rvf!ejkf!ft!bm!qfep/!Qpsrvf!dbeb!wf{!rvf!ujsbnpt!vob!jefb!bm!vojwfstp-!êm!tf!sfjowfoub!qbsb!rvf!ufohbnpt!nât!qbsb!fyqfsjnfoubs!z!ovodb!mmfhvfnpt!b!vob!wfsebe!bctpmvub/',
    'Brvfmmpt!rvf!tf!ftdpoefo!efusât!efm!tvqvftup!Ejpt!z!mb!sfmjhjôo!njfousbt!qsbdujdbo!fm!nbm!tpo!mpt!qfpsft!ef!ftuf!nvoep/!Dpnp!ubncjfo!tf!ftdpoefo!efusbt!ef!uboubt!pusbt!tvqvftubt!dbvtbt!opcmft/!Qfsp!mb!dvmqb!ubncjfo!sfdbf!fo!rvjfo!mft!dsffo-!tpo!rvjfoft!mft!ebo!qpefs/',
    'Fo!fm!njovup!44!ef!nvdibt!qfmîdvmbt!tf!ibdf!sfgfsfodjb!b!rvf!ftuf!nvoep!ft!jmvtpsjp/',
    'Fo!fm!tfhvoep!44!ef!mb!jousp!efm!nvoejbm!3133!opt!nvftusbo!rvjfo!hbobsîb!z!rvjêo!tfsîb!gjobmjtub/',
  ];
  let quotes = [...quotesEng]; //Copio el array con spread operator
  let quote = quotes[quotePosition];
  const images = [
    'quote-mode-pic1.png',
    'quote-mode-pic2.png',
    'quote-mode-pic3.png',
  ];
  let quoteImg = images[imgPosition];
  let $quoteSong = null;
  let soundIsOn = false;
  const songsArray = [
    'simulando-realidad.mp3',
    'mat-y-las-cuerdas-codificadas-1.mp3',
    'mat-rockea-el-cyber-espacio.mp3',
    'nueva-realidad.mp3',
    'desarrollando-webs.mp3',
    'mat-y-las-cuerdas-codificadas-2.mp3',
    'charla-con-la-muerte.mp3',
    'mi-dulce-matias.mp3',
    'en-la-oscuridad.mp3',
    'toldo-etereo-4.mp3',
    'nueva-realidad-2.mp3',
    'deep-resonance.mp3',
    'simula-el-fuego.mp3',
    'frecuencia-perdida.mp3',
    'toldo-etereo-2.mp3',
  ];
  let songPosition = 0;
  let firstSoundOn = true;
  const disclaimer = [
    $disclaimer.textContent,
    'Este contenido es puramente ficticio y tiene únicamente fines de entretenimiento. No asumimos responsabilidad por la exactitud o confiabilidad de la información presentada aquí.',
  ];

  /************************* FUNCIONES ******************************/

  // Función para reiniciar el GIF
  function resetGif(gifImg) {
    // Guarda el valor del atributo src actual
    const srcActual = gifImg.src;

    // Asigna un valor temporal al atributo src
    gifImg.src = '';

    // Vuelve a asignar el valor original del atributo src después de un pequeño retraso
    setTimeout(function () {
      gifImg.src = srcActual;
    }, 10);
  }

  function nextSong() {
    if (songPosition < songsArray.length - 1) {
      $quoteSong.src = songsArray[songPosition + 1];
      songPosition += 1;
    } else {
      $quoteSong.src = songsArray[0];
      songPosition = 0;
    }
    $quoteSong.play();
    $musicToggle.style.color = 'red';
  }

  function startQuoteMode() {
    //Si no estabas en quote mode
    if (!quoteModeIsOn) {
      quoteModeIsOn = true;
      //Solo en primera carga del quote mode
      if (quoteModeFirstLoad) {
        loadSounds();
        quoteModeFirstLoad = false;
        $suggestiveFinger2.style.display = 'none';
      }
      //Fin de solo primera carga

      //////Siempre que entra al quote mode///////

      //Manejo del sonido
      if (soundIsOn) {
        $profileAudio.pause();
        $rainAudio.volume = 0.2;
        $thunderAudio.volume = 0.3;
        $thunderAudio.play();
        $rainAudio.play();
      }
      //Fin manejo sonido

      $disclaimer.style.display = 'inline-block';
      $changeButton.style.pointerEvents = 'none';
      matrix2Bg(true);
      $header.style.transition = 'none'; //FALTA: Al volver devolver estilo
      clearInterval(autoImginterval);
      console.log('auto img interval CLEARED!');
      $imgProfPic.style.opacity = 0;
      //   $msjeCondicional.style.display = 'none';
      $cajaCentral.style.opacity = 0;
      $quoteModeGif.style.display = 'block';

      //Media query para el fondo de transicion
      if (window.innerWidth > 630) {
        $qModeBkgIntro.style.display = 'block';
      } else {
        $mobileQModeBkgIntro.style.display = 'block';
      }

      setTimeout(() => {
        $understood.style.display = 'block';
        $quoteText.textContent = dQ(quotes[0]);
        $quoteText.style.textShadow =
          '2px 2px 2px #b00000, -2px -2px 2px #b00000';
        $musicToggle.style.color = '#fff';
        $cajaPresentacion.style.textAlign = 'left';
        $cajaPresentacion.style.textWrap = 'wrap';
        $languageToggle.style.display = 'block';
        $matrixProfPic.src = quoteImg;
        $cajaCentral.style.opacity = 100;
        $quoteModeGif.style.display = 'none';
        resetGif($quoteModeGif);
        if (window.innerWidth > 630) {
          $qModeBkgIntro.style.display = 'none';
        } else {
          $mobileQModeBkgIntro.style.display = 'none';
        }
        //Music BTN Appearence
        setTimeout(() => {
          if (soundIsOn) $musicBtnAppearance.play();
        }, 500);
        setTimeout(() => {
          $musicGif.style.display = 'block';
          setTimeout(() => {
            $musicToggle.style.display = 'block';
            $musicGif.style.display = 'none';
            resetGif($musicGif);
          }, 2400);
        }, 2000);
      }, 3700);
    } else {
      console.log(
        'Por ahora no pasa nada en quote mode si haces click derecho a profile pic'
      );
    }
  }

  //Intersection observer API
  function handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('El footer está en el viewport');
        if (quoteModeFirstLoad) $whiteRabbit.style.display = 'block';
      } else {
        console.log('El footer no está en el viewport');
      }
    });
  }
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };
  const observer = new IntersectionObserver(
    handleIntersection,
    observerOptions
  );
  //Observar aparición del footer (para white rabbit)
  observer.observe($footer);

  //Cargar canciones y sonidos
  const loadSounds = () => {
    //Canciones del quote mode (a partir de la uno se cargan al tocar next song)
    $quoteSong = d.createElement('audio');
    $quoteSong.src = songsArray[0];
    d.body.insertAdjacentElement('beforeend', $quoteSong);
    // $quoteSong.setAttribute('controls', 'true');
    // $quoteSong.style.display = 'block';
    // $quoteSong.style.position = 'absolute';
    // $quoteSong.style.zIndex = 55;
    // $quoteSong.style.top = '550px';

    //Sonido de ingreso de pills
    $pillsSound = d.createElement('audio');
    $pillsSound.src = 'pills-intro.mp3';
    d.body.insertAdjacentElement('beforeend', $pillsSound);
    //Sonido de fusion de pills
    $pillsMerge = d.createElement('audio');
    $pillsMerge.src = 'pills-merge.mp3';
    $pillsMerge.volume = 0.2;
    d.body.insertAdjacentElement('beforeend', $pillsMerge);
  };

  //Funcion de cambio de fondo cuando hover en profile-pic
  function matrixBg(hover) {
    if (hover) {
      $header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
      $cajaPresentacion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $seccionAptitudes.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $seccionTecnologias.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      $seccionCpe.style.backgroundColor = 'rgba(0,0,0,0)';
      $footer.style.backgroundColor = 'rgba(0,0,0,0)';
      $cajaFondo.style.opacity = 0;
      $cajaFdoMobile.style.opacity = 0;
      $imgProfPic.style.opacity = 0;
      $matrixBg.style.opacity = 100;
    } else if (!quoteModeIsOn) {
      $matrixBg.style.opacity = 0;
      $header.style.backgroundColor = 'var(--color1)';
      $cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0.368)';
      $seccionAptitudes.style.backgroundColor = 'var(--color2)';
      $seccionTecnologias.style.backgroundColor = 'var(--color1)';
      $seccionCpe.style.backgroundColor = 'var(--color2)';
      $footer.style.backgroundColor = 'var(--color1)';
      $cajaFondo.style.opacity = 100;
      $cajaFdoMobile.style.opacity = 100;
      $imgProfPic.style.opacity = 100;
      if (window.innerWidth > 630)
        $cajaFondo.style.backgroundColor = 'var(--color1)';
    }
  }

  //Funcion de cambio de fondo al entrar a quote mode
  function matrix2Bg() {
    $header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    $cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
    $cajaPresentacion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    $seccionAptitudes.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    $seccionTecnologias.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    $seccionCpe.style.backgroundColor = 'rgba(0,0,0,0)';
    $footer.style.backgroundColor = 'rgba(0,0,0,0)';
    $matrix2Bg.style.opacity = 100;
    $cajaFondo.style.opacity = 0; //Por si viene desde el conejo
    $cajaFdoMobile.style.opacity = 0; //Por si viene desde el conejo
  }

  //Resetear estilos de pills
  function resetPills() {
    $pills.forEach((pill) => {
      pill.style.opacity = 1;
      pill.style.width = '80px';
      pill.style.height = '80px';
      pill.style.scale = 2;
    });
  }

  //Funcion de salida del quote mode
  const exitQuoteMode = () => {
    quoteModeIsOn = false;
    $disclaimer.style.display = 'none';
    $cajaCara.style.pointerEvents = 'none';
    if (typed) {
      typed.destroy();
    }
    if (soundIsOn) $phoneRing.play();
    matrixBg(false);
    // bgExitEffect(); El de mis 3 caras en secuencia
    resetPills();
    $musicToggle.classList.add('fa-beat-fade');
    $nextSong.classList.add('fa-beat-fade');
    $nextSong.style.display = 'none';
    $matrix2Bg.style.opacity = 0;
    $changeButton.classList.remove('fa-shake');
    $quoteText.style.opacity = 0;
    $rainAudio.pause();
    $thunderAudio.pause();
    $thunderAudio.currentTime = 0;
    $quoteSong.pause();
    $quoteSong.currentTime = 0;
    $typing.pause();
    $musicToggle.style.display = 'none';
    $exitQuoteModeBtn.style.display = 'none';
    $languageToggle.style.display = 'none';
    $suggestiveFinger1.style.opacity = 0;
    $changeButton.classList.remove('fa-shake');
    $changeButton.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
    $understood.style.display = 'none';
    if (window.innerWidth > 630)
      $cajaPresentacion.style.backgroundColor = 'var(--color1)';
    setTimeout(() => {
      $quoteText.style.opacity = 100;
      $quoteText.textContent = textoPresentacion;
      $quoteText.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      $quoteText.style.textAlign = 'center';
      $exitQuoteModeBtn.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      $exitQuoteModeBtn.style.pointerEvents = 'none';
    }, 2000);
    setTimeout(() => {
      $cajaCara.style.pointerEvents = 'auto';
    }, 5000);
  };

  //Efecto fade in para audio (con ayuda de copilot quedó pero se puede "hackear")
  function fadeInOut(audio) {
    if (!soundIsOn) return;
    if (fadeInterval) {
      // Limpiar intervalo existente si hay uno
      clearInterval(fadeInterval);
    }

    // Determinar si el audio se está desvaneciendo o no
    const isFadingOut = audio.volume > 0.1;

    fadeInterval = setInterval(() => {
      console.log('Fade interval ID', fadeInterval);
      if (isFadingOut) {
        // Desvanecer el audio
        if (audio.volume > 0.1) {
          console.log(audio.volume);
          audio.volume -= 0.1;
        } else {
          clearInterval(fadeInterval);
          audio.pause();
          fadeInterval = null; // Restablecer el intervalo para el próximo fadeIn
        }
      } else if (!quoteModeIsOn) {
        // Aumentar el volumen del audio
        audio.play();
        if (audio.volume < 0.9) {
          console.log(audio.volume);
          audio.volume += 0.1;
        } else {
          clearInterval(fadeInterval);
          fadeInterval = null; // Restablecer el intervalo para el próximo fadeOut
        }
      } else {
        clearInterval(fadeInterval); //para no seguir ejecuntando el intervalo en quoteModeIsOn
      }
    }, 222);
  }

  //Pills animation
  const animatePills = () => {
    //Red pill tl
    let tl = gsap.timeline();
    tl.set('#red-pill', { display: 'block' });
    tl.from('#red-pill', { duration: 4, y: -150 });
    tl.from(
      '#red-pill',
      {
        duration: 5,
        opacity: 0,
        ease: 'slow',
      },
      '-=4'
    );
    tl.to('#red-pill', {
      duration: 1,
      opacity: 0,
      scale: 0.5,
      ease: 'slow',
    });
    tl.add(() => {
      if (soundIsOn) $pillsMerge.play();
    }, '-=1');
    tl.to(
      '#change-button',
      {
        duration: 2,
        textShadow: '2px 2px 2px #ff0000, -2px -2px 2px #ff0000',
      },
      '-=2'
    );
    tl.set('#red-pill', { display: 'none' });

    //Blue pill tl
    let tl2 = gsap.timeline();
    tl2.set('#blue-pill', { display: 'block' });
    tl2.set('#exit-quote-mode-wrapper', { display: 'block' });
    tl2.from('#blue-pill', { duration: 4, y: -850 });
    tl2.from(
      '#blue-pill',
      {
        duration: 5,
        opacity: 0,
        ease: 'slow',
      },
      '-=4'
    );
    tl2.to('#blue-pill', {
      duration: 1,
      opacity: 0,
      scale: 0.5,
      ease: 'slow',
    });
    tl2.to('#exit-quote-mode-wrapper', { duration: 2, opacity: 1 }, '-=5');
    tl2.to(
      '#exit-quote-mode-wrapper',
      { duration: 2, textShadow: '3px 3px 2px #0000ff, -3px -3px 2px #0000ff' },
      '-=2'
    );
    tl2.set('#blue-pill', { display: 'none' });

    //Instrucciones al finalizar la timeline tl
    tl.eventCallback('onComplete', function () {
      $changeButton.style.pointerEvents = 'auto';
      $changeButton.style.textShadow =
        '2px 2px 2px #ff0000, -2px -2px 2px #ff0000';
      $suggestiveFinger1.style.opacity = 100;
      $changeButton.classList.add('fa-shake');
      $musicToggle.style.display = 'block';
      $exitQuoteModeBtn.style.pointerEvents = 'auto';
    });
  };

  //Funciones asignadas al changeButton
  const handleChange = () => {
    if (!quoteModeIsOn) {
      if ($imgProfPic.src.includes(pic1)) {
        $imgProfPic.src = pic2;
        $matrixProfPic.src = pic2h;
      } else {
        $imgProfPic.src = pic1;
        $matrixProfPic.src = pic1h;
      }
    } else {
      //Iteracion imagenes
      if (imgPosition < images.length - 1) {
        quoteImg = images[imgPosition + 1];
        imgPosition += 1;
        console.log('position', imgPosition);
        console.log('img', quoteImg);
      } else {
        quoteImg = images[0];
        imgPosition = 0;
        console.log('position', imgPosition);
        console.log('img', quoteImg);
      }
      $matrixProfPic.src = quoteImg;
      //Iteracion quotes
      console.log('Quote number', quotePosition + 2);
      if (quotePosition < quotes.length - 1) {
        quote = dQ(quotes[quotePosition + 1]);
        quotePosition += 1;
        $quoteText.textContent = quote;
      } else {
        quote = quotes[0];
        quotePosition = 0;
        exitQuoteMode();
        return;
      }
      //Typed.js
      if (typed) {
        typed.destroy();
      }
      let options = {
        showCursor: false,
        strings: [quote],
        typeSpeed: 50,
        loop: false,
        smartBackspace: false,
        backDelay: 50000, //ms
        preStringTyped: (arrayPos, self) => {
          if (soundIsOn) $typing.play();
        },
        onComplete: (self) => {
          $typing.pause();
          $typing.currentTime = 0;
        },
      };
      typed = new Typed('#presentacion', options);
    }
  };

  //Reemplazo de prof-pic por tiempo
  const imgInterval = (mode) => {
    clearInterval(autoImginterval);
    console.log('auto change img Interval cleared');
    autoImginterval = setInterval(() => {
      handleChange();
      console.log('auto change img interval ID', autoImginterval);
    }, 33000);
    console.log('auto change img Interval CREATED!');
  };

  //Llamar a la func de cambio de pic auto al entrar por primera vez a la web
  imgInterval('Create');

  //Funcion de efecto en toggleImg
  const imgToggleEffect = () => {
    if (soundIsOn) {
      $audioEffect1.play();
    }
    if (window.innerWidth > 630) {
      $cajaCentral.style.transition = 'box-shadow 100ms ease-in-out';
      quoteModeIsOn
        ? ($cajaCentral.style.boxShadow = '0 0 50px 1px red')
        : ($cajaCentral.style.boxShadow = '0 0 50px 1px white');
      const timeout = setTimeout(() => {
        $cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0.368)';
      }, 200);
    } else {
      $cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
      quoteModeIsOn
        ? ($cajaCara.style.boxShadow = '0 0 50px 1px red')
        : ($cajaCara.style.boxShadow = '0 0 50px 1px white');
      const timeout = setTimeout(() => {
        $cajaCara.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
      }, 200);
    }
  };

  function dQ(q) {
    let decQ = '';
    for (let char of q) {
      const decChar = String.fromCharCode(char.charCodeAt(0) - 1);
      decQ += decChar;
    }
    return decQ;
  }

  //Manejo de eventos click
  d.addEventListener('click', (e) => {
    //Manejo del botón de sonido
    if (e.target.matches('#audio-toggle')) {
      $suggestiveFinger3.style.display =
        $suggestiveFinger3.style.display === 'none' ? 'block' : 'none';
      $audioToggleBtn.classList.toggle('fa-volume-high');
      $audioToggleBtn.classList.toggle('fa-volume-xmark');
      soundIsOn ? (soundIsOn = false) : (soundIsOn = true);
      console.log(soundIsOn);
      if (soundIsOn && quoteModeIsOn) {
        $rainAudio.volume = 0.2;
        $thunderAudio.volume = 0.3;
        $rainAudio.play();
        $thunderAudio.play();
      } else {
        $rainAudio.pause();
        $thunderAudio.pause();
        $thunderAudio.currentTime = 0;
        $typing.pause();
        $typing.currentTime = 0;
      }
      if (soundIsOn && firstSoundOn && !quoteModeIsOn) {
        $suggestiveFinger2.style.display = 'block';
        firstSoundOn = false;
      }
    }
    //Manejo del boton change
    if (e.target.matches('#change-button')) {
      if (!quoteModeIsOn) imgInterval('Create');
      handleChange();
      imgToggleEffect();
      $suggestiveFinger1.style.opacity = 0;
    }
    //Manejo de los botones flecha animadas para deslizar pagina
    if (e.target.matches('#first-page')) {
      d.querySelector('#seccion-aptitudes').scrollIntoView();
    }
    if (e.target.matches('#second-page')) {
      d.querySelector('#seccion-tecnologias').scrollIntoView();
    }
    //Boton de musica
    if (e.target.matches('#music-toggle')) {
      $musicToggle.classList.remove('fa-beat-fade');
      $nextSong.style.display = 'block';
      if ($musicToggle.style.color == 'rgb(255, 255, 255)') {
        $quoteSong.play();
        $musicToggle.style.color = '#ff0000';
        //Finalizacion de una cancion
        $quoteSong.addEventListener('ended', () => {
          nextSong();
        });
      } else {
        $quoteSong.pause();
        $musicToggle.style.color = '#fff';
      }
    }
    //Boton siguiente cancion
    if (e.target.matches('#next-song')) {
      $nextSong.classList.remove('fa-beat-fade');
      nextSong();
    }
    //Boton "Understood!"
    if (e.target.matches('#understood')) {
      $understood.style.display = 'none';
      if (soundIsOn) $pillsSound.play();
      animatePills();
    }
    //Botón de lenguaje
    if (e.target.matches('#language-toggle')) {
      $languageToggle.classList.remove('fa-beat-fade');
      if (typed) {
        typed.destroy();
        $typing.pause();
      }
      if (language == 'EN') {
        language = 'ES';
        quotes = [...quotesEsp];
        $quoteText.textContent = dQ(quotes[quotePosition]);
        $understood.textContent = '¡Entendido!';
        $disclaimer.textContent = disclaimer[1];
      } else {
        language = 'EN';
        quotes = [...quotesEng];
        $quoteText.textContent = dQ(quotes[quotePosition]);
        $understood.textContent = 'Understood!';
        $disclaimer.textContent = disclaimer[0];
      }
    }
    //Botón de salida de quote mode
    if (e.target.matches('#exit-quote-mode')) {
      exitQuoteMode();
    }
    //Agujero del conejo
    if (e.target.matches('area')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
      setTimeout(() => {
        startQuoteMode();
      }, 500);
    }
    //Scroll to top del #a-ver
    if (e.target.matches('#a-ver')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
    //Scroll to top general
    if (e.target.matches('#scroll-to-top')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  });

  //Manejo de eventos hover
  d.addEventListener('mouseover', (e) => {
    //Manejo del hover en profile-pic
    if (e.target.matches('img#profile-pic') && !quoteModeIsOn) {
      console.log('Mouseover detectado');
      $profileAudio.volume = 0;
      fadeInOut($profileAudio);
      imgInterval('Create');
      matrixBg(true);
      timerMsje = setTimeout(() => {
        $suggestiveFinger2.style.display = 'none';
      }, 1500);
    }
  });

  //Manejo de eventos mouseout
  d.addEventListener('mouseout', (e) => {
    //Manejo del mouseout en profile pic
    if (e.target.matches('img#profile-pic') && !quoteModeIsOn) {
      $profileAudio.volume = 0.5;
      fadeInOut($profileAudio);
      matrixBg(false);
      clearTimeout(timerMsje);
    }
  });

  //Long press en mobile, click derecho en pc
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    //Click derecho en profile pic
    if (event.target.matches('img#profile-pic')) {
      startQuoteMode();
    }
  });
});
