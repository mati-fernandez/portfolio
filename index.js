import * as s from './selectors.js';
const d = document;
//Establecer todo el js después de la carga del dom:
d.addEventListener('DOMContentLoaded', (e) => {
  // Realiza una solicitud para wake up al backend al cargar la página
  fetch('https://tu-api-en-render.com/wake-up')
    .then((response) => response.json())
    .then((data) => {
      console.log('Wake up response:', data);
    })
    .catch((error) => {
      console.error('Error waking up backend:', error);
    });

  //Establecer volumenes (en hmtl no los toma al menos en chrome)
  s.$profileAudio.volume = 0;
  s.$typing.volume = 0.3;
  s.$phoneRing.volume = 0.4;
  s.$musicBtnAppearance.volume = 0.4;

  //Variables y constantes de uso global:
  let lastClickTime = 0;
  let bunnyHandlerUniqueCall = false;
  let count = 6;
  let fastClicksInit = false;
  const textoHeader = s.$header.querySelector('h3').textContent;
  const textoPresentacion = s.$cajaPresentacion.querySelector('p').textContent;
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
    'Uif!ebsloftt!ibt!wfsz!ejsuz!tusbufhjft!up!ejwjef!vt/!Jut!nbjo!gvodujpo!jt!up!nblf!vt!cfmjfwf!uibu!uif!puifs!jt!uif!fofnz/!Voujm!nboz!ujnft!ju!nbobhft!up!nblf!ju!b!sfbmjuz/',
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
    'Brvfmmpt!rvf!tf!ftdpoefo!efusât!efm!tvqvftup!Ejpt!z!mb!sfmjhjôo!njfousbt!qsbdujdbo!fm!nbm!tpo!mpt!qfpsft!ef!ftuf!nvoep/!Dpnp!ubncjfo!tf!ftdpoefo!efusbt!ef!uboubt!pusbt!tvqvftubt!dbvtbt!opcmft/!Qfsp!mb!dvmqb!ubncjfo!sfdbf!fo!rvjfoft!mft!dsffo-!tpo!rvjfoft!mft!ebo!qpefs/',
    'Fo!fm!njovup!44!ef!nvdibt!qfmîdvmbt!tf!ibdf!sfgfsfodjb!b!rvf!ftuf!nvoep!ft!jmvtpsjp/',
    'Fo!fm!tfhvoep!44!ef!mb!jousp!efm!nvoejbm!3133!opt!nvftusbo!rvjfo!hbobsîb!z!rvjêo!tfsîb!gjobmjtub/',
    'Mb!ptdvsjebe!ujfof!ftusbufhjbt!nvz!tvdjbt!qbsb!ejwjejsopt/!Tv!qsjodjqbm!gvodjôo!ft!ibdfsopt!dsffs!rvf!fm!pusp!ft!fm!fofnjhp/!Ibtub!rvf!nvdibt!wfdft!mphsb!dpowfsujsmp!fo!sfbmjebe/',
  ];
  let quotes = [...quotesEng]; //Copio el array con spread operator
  let quote = quotes[quotePosition];
  const images = [
    'quote-mode-pic1.png',
    'quote-mode-pic2.png',
    'quote-mode-pic3.png',
  ];
  let quoteImg = images[imgPosition];
  let quoteSong = null;
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
    'gotas-de-esperanza.mp3',
  ];
  let songPosition = 0;
  let firstSoundOn = true;
  const disclaimer = [
    s.$disclaimer.textContent,
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
      quoteSong.src = songsArray[songPosition + 1];
      songPosition += 1;
    } else {
      quoteSong.src = songsArray[0];
      songPosition = 0;
    }
    quoteSong.play();
    s.$musicToggle.style.color = 'red';
  }

  function startQuoteMode() {
    //Si no estabas en quote mode
    if (!quoteModeIsOn) {
      quoteModeIsOn = true;
      //Solo en primera carga del quote mode
      if (quoteModeFirstLoad) {
        loadSounds();
        quoteModeFirstLoad = false;
      }
      //Fin de solo primera carga

      //////Siempre que entra al quote mode///////

      //Manejo del sonido
      if (soundIsOn) {
        s.$profileAudio.pause();
        s.$rainAudio.volume = 0.2;
        s.$thunderAudio.volume = 0.3;
        s.$thunderAudio.play();
        s.$rainAudio.play();
      }
      //Fin manejo sonido

      s.$imgProfPic.style.cursor = 'auto';
      s.$firstPage.style.opacity = 0;
      s.$disclaimer.style.display = 'inline-block';
      s.$changeButton.style.pointerEvents = 'none';
      matrix2Bg(true);
      s.$header.style.transition = 'none'; //FALTA: Al volver devolver estilo
      clearInterval(autoImginterval);
      console.log('auto img interval CLEARED!');
      s.$imgProfPic.style.opacity = 0;
      //   s.$msjeCondicional.style.display = 'none';
      s.$cajaCentral.style.opacity = 0;
      s.$quoteModeGif.style.display = 'block';

      //Media query para el fondo de transicion
      if (window.innerWidth > 630) {
        s.$qModeBkgIntro.style.display = 'block';
      } else {
        s.$mobileQModeBkgIntro.style.display = 'block';
      }

      setTimeout(() => {
        s.$firstPage.style.display = 'none';
        s.$understood.style.display = 'block';
        s.$quoteText.textContent = dQ(quotes[0]);
        s.$quoteText.style.textShadow =
          '2px 2px 2px #b00000, -2px -2px 2px #b00000';
        s.$musicToggle.style.color = '#fff';
        s.$cajaPresentacion.style.textAlign = 'left';
        s.$cajaPresentacion.style.textWrap = 'wrap';
        s.$languageToggle.style.display = 'block';
        s.$matrixProfPic.src = quoteImg;
        s.$cajaCentral.style.opacity = 100;
        s.$quoteModeGif.style.display = 'none';
        resetGif(s.$quoteModeGif);
        if (window.innerWidth > 630) {
          s.$qModeBkgIntro.style.display = 'none';
        } else {
          s.$mobileQModeBkgIntro.style.display = 'none';
        }
        //Music BTN Appearence
        setTimeout(() => {
          if (soundIsOn) s.$musicBtnAppearance.play();
        }, 500);
        setTimeout(() => {
          s.$musicGif.style.display = 'block';
          setTimeout(() => {
            s.$musicToggle.style.display = 'block';
            s.$musicGif.style.display = 'none';
            resetGif(s.$musicGif);
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
        if (quoteModeFirstLoad) s.$whiteRabbit.style.display = 'block';
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

  //Manejo de la visibilidad del conejo
  function bunnyHandler() {
    s.$imgProfPic.style.cursor = 'auto';
    s.$cajaPresentacion.querySelector('p').textContent = 'F T W R';
    bunnyHandlerUniqueCall = true;
    console.log('bunnyHandler llamada');
    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );
    //Observar aparición del footer (para white rabbit)
    observer.observe(s.$footer);
  }

  //Cargar canciones y sonidos
  const loadSounds = () => {
    //Canciones del quote mode (a partir de la uno se cargan al tocar next song)
    quoteSong = d.createElement('audio');
    quoteSong.src = songsArray[0];
    d.body.insertAdjacentElement('beforeend', quoteSong);
    // quoteSong.setAttribute('controls', 'true');
    // quoteSong.style.display = 'block';
    // quoteSong.style.position = 'absolute';
    // quoteSong.style.zIndex = 55;
    // quoteSong.style.top = '550px';

    //Sonido de ingreso de pills
    s.$pillsSound = d.createElement('audio');
    s.$pillsSound.src = 'pills-intro.mp3';
    d.body.insertAdjacentElement('beforeend', s.$pillsSound);
    //Sonido de fusion de pills
    s.$pillsMerge = d.createElement('audio');
    s.$pillsMerge.src = 'pills-merge.mp3';
    s.$pillsMerge.volume = 0.2;
    d.body.insertAdjacentElement('beforeend', s.$pillsMerge);
  };

  //Funcion de cambio de fondo cuando hover en profile-pic
  function matrixBg(hover) {
    if (hover) {
      s.$header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      s.$cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
      s.$cajaPresentacion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      s.$seccionAptitudes.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      s.$seccionTecnologias.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      s.$seccionCpe.style.backgroundColor = 'rgba(0,0,0,0)';
      s.$footer.style.backgroundColor = 'rgba(0,0,0,0)';
      s.$cajaFondo.style.opacity = 0;
      s.$cajaFdoMobile.style.opacity = 0;
      s.$imgProfPic.style.opacity = 0;
      s.$matrixBg.style.opacity = 100;
    } else if (!quoteModeIsOn) {
      s.$matrixBg.style.opacity = 0;
      s.$header.style.backgroundColor = 'var(--color1)';
      s.$cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0.368)';
      s.$seccionAptitudes.style.backgroundColor = 'var(--color2)';
      s.$seccionTecnologias.style.backgroundColor = 'var(--color1)';
      s.$seccionCpe.style.backgroundColor = 'var(--color2)';
      s.$footer.style.backgroundColor = 'var(--color1)';
      s.$cajaFondo.style.opacity = 100;
      s.$cajaFdoMobile.style.opacity = 100;
      s.$imgProfPic.style.opacity = 100;
      if (window.innerWidth > 630)
        s.$cajaFondo.style.backgroundColor = 'var(--color1)';
    }
  }

  //Funcion de cambio de fondo al entrar a quote mode
  function matrix2Bg() {
    s.$header.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    s.$cajaCentral.style.boxShadow = '0 0 0 0 rgba(0, 0, 0, 0)';
    s.$cajaPresentacion.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    s.$seccionAptitudes.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    s.$seccionTecnologias.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    s.$seccionCpe.style.backgroundColor = 'rgba(0,0,0,0)';
    s.$footer.style.backgroundColor = 'rgba(0,0,0,0)';
    s.$matrix2Bg.style.opacity = 100;
    s.$cajaFondo.style.opacity = 0; //Por si viene desde el conejo
    s.$cajaFdoMobile.style.opacity = 0; //Por si viene desde el conejo
  }

  // Función para obtener la siguiente frase descifrada
  async function getNextPhrase(quotePosition) {
    const response = await fetch(
      `https://tu-api-en-render.com/api/next-phrase?index=s.${quotePosition}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.nextIndex !== 0) {
        // Manejar la frase descifrada recibida
        console.log('Frase descifrada:', data.quote);
        quotePosition += 1;
        s.$quoteText.textContent = quote;
        // Obtener la siguiente frase descifrada
        getNextPhrase(data.nextIndex);
      } else {
        // Realizar acciones adicionales cuando no hay más frases disponibles
        console.log('No hay más frases disponibles');
        // Por ejemplo, ejecutar otra función
        // executeAnotherFunction();
        quote = quotes[0];
        quotePosition = 0;
        exitQuoteMode();
        return;
      }
    } else {
      console.error('Error al obtener la siguiente frase');
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
        if (soundIsOn) s.$typing.play();
      },
      onComplete: (self) => {
        s.$typing.pause();
        s.$typing.currentTime = 0;
      },
    };
    typed = new Typed('#presentacion', options);
  }

  //Resetear estilos de pills
  function resetPills() {
    s.$pills.forEach((pill) => {
      pill.style.opacity = 1;
      pill.style.width = '80px';
      pill.style.height = '80px';
      pill.style.scale = 2;
    });
  }

  //Funcion de salida del quote mode
  const exitQuoteMode = () => {
    quoteModeIsOn = false;
    s.$firstPage.style.display = 'block';
    s.$firstPage.style.opacity = 1;
    s.$header.style.transition = 'var(--matrixBgTransition)';
    s.$disclaimer.style.display = 'none';
    s.$cajaCara.style.pointerEvents = 'none';
    if (typed) {
      typed.destroy();
    }
    if (soundIsOn) s.$phoneRing.play();
    matrixBg(false);
    // bgExitEffect(); El de mis 3 caras en secuencia
    resetPills();
    s.$musicToggle.classList.add('fa-beat-fade');
    s.$nextSong.classList.add('fa-beat-fade');
    s.$nextSong.style.display = 'none';
    s.$matrix2Bg.style.opacity = 0;
    s.$changeButton.classList.remove('fa-shake');
    s.$quoteText.style.opacity = 0;
    s.$rainAudio.pause();
    s.$thunderAudio.pause();
    s.$thunderAudio.currentTime = 0;
    quoteSong.pause();
    quoteSong.currentTime = 0;
    s.$typing.pause();
    s.$musicToggle.style.display = 'none';
    s.$exitQuoteModeBtn.style.display = 'none';
    s.$languageToggle.style.display = 'none';
    s.$suggestiveFinger1.style.opacity = 0;
    s.$changeButton.classList.remove('fa-shake');
    s.$changeButton.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
    s.$understood.style.display = 'none';
    if (window.innerWidth > 630)
      s.$cajaPresentacion.style.backgroundColor = 'var(--color1)';
    setTimeout(() => {
      s.$quoteText.style.opacity = 100;
      s.$quoteText.textContent = textoPresentacion;
      s.$quoteText.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      s.$quoteText.style.textAlign = 'center';
      s.$exitQuoteModeBtn.style.textShadow = '0 0 0 #000000, 0 0 0 #000000';
      s.$exitQuoteModeBtn.style.pointerEvents = 'none';
    }, 2000);
    setTimeout(() => {
      s.$cajaCara.style.pointerEvents = 'auto';
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
      if (soundIsOn) s.$pillsMerge.play();
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
      s.$changeButton.style.pointerEvents = 'auto';
      s.$changeButton.style.textShadow =
        '2px 2px 2px #ff0000, -2px -2px 2px #ff0000';
      s.$suggestiveFinger1.style.opacity = 100;
      s.$changeButton.classList.add('fa-shake');
      s.$musicToggle.style.display = 'block';
      s.$exitQuoteModeBtn.style.pointerEvents = 'auto';
    });
  };

  //Funciones asignadas al changeButton
  const handleChange = () => {
    if (!quoteModeIsOn) {
      if (s.$imgProfPic.src.includes(pic1)) {
        s.$imgProfPic.src = pic2;
        s.$matrixProfPic.src = pic2h;
      } else {
        s.$imgProfPic.src = pic1;
        s.$matrixProfPic.src = pic1h;
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
      s.$matrixProfPic.src = quoteImg;
      //Iteracion quotes
      console.log('Quote number', quotePosition + 2);

      //Quotes de la API
      getNextPhrase(quotePosition);
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
      s.$audioEffect1.play();
    }
    if (window.innerWidth > 630) {
      s.$cajaCentral.style.transition = 'box-shadow 100ms ease-in-out';
      quoteModeIsOn
        ? (s.$cajaCentral.style.boxShadow = '0 0 50px 1px red')
        : (s.$cajaCentral.style.boxShadow = '0 0 50px 1px white');
      const timeout = setTimeout(() => {
        s.$cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0.368)';
      }, 200);
    } else {
      s.$cajaCentral.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
      quoteModeIsOn
        ? (s.$cajaCara.style.boxShadow = '0 0 50px 1px red')
        : (s.$cajaCara.style.boxShadow = '0 0 50px 1px white');
      const timeout = setTimeout(() => {
        s.$cajaCara.style.boxShadow = '0 0 20px 10px rgba(0, 0, 0, 0)';
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
    //Manejo del click en prof pic
    if (e.target.matches('img#profile-pic')) {
      const currentTime = new Date().getTime();
      if (currentTime - lastClickTime > 550) {
        lastClickTime = currentTime;
        if (!bunnyHandlerUniqueCall) {
          count--;
          s.$header.querySelector('h3').textContent = count;
          if (soundIsOn) {
            switch (count) {
              case 5:
                s.$get.play();
                break;
              case 4:
                s.$ready.play();
                break;
              case 3:
                s.$for.play();
                break;
              case 2:
                s.$the.play();
                break;
              case 1:
                s.$great.play();
                break;
              case 0:
                s.$awakening.play();
                break;
            }
          }
          if (!fastClicksInit) {
            fastClicksInit = true;
            setTimeout(() => {
              fastClicksInit = false;
              count = 6;
            }, 4500);
          }
          if (count === 0) {
            bunnyHandler();
            setTimeout(() => {
              s.$header.textContent = textoHeader;
              s.$cajaPresentacion.querySelector('p').textContent =
                textoPresentacion;
            }, 4000);
          }
          console.log(count);
        }
      } else {
        count = 6;
      }
    }
    //Manejo del botón de sonido
    if (e.target.matches('#audio-toggle')) {
      s.$suggestiveFinger3.style.display =
        s.$suggestiveFinger3.style.display === 'none' ? 'block' : 'none';
      s.$audioToggleBtn.classList.toggle('fa-volume-high');
      s.$audioToggleBtn.classList.toggle('fa-volume-xmark');
      soundIsOn ? (soundIsOn = false) : (soundIsOn = true);
      console.log('soundIsOn', soundIsOn);
      if (soundIsOn && quoteModeIsOn) {
        s.$rainAudio.volume = 0.2;
        s.$thunderAudio.volume = 0.3;
        s.$rainAudio.play();
        s.$thunderAudio.play();
      } else {
        s.$rainAudio.pause();
        s.$thunderAudio.pause();
        s.$thunderAudio.currentTime = 0;
        s.$typing.pause();
        s.$typing.currentTime = 0;
      }
      if (firstSoundOn && !quoteModeIsOn && !bunnyHandlerUniqueCall) {
        s.$firstSoundOn.play();
        s.$imgProfPic.style.filter =
          'drop-shadow(16px 0px 35px rgb(255, 255, 255, 50)) invert(0%)';
        setTimeout(() => {
          s.$imgProfPic.style.filter = 'none';
        }, 200);
        firstSoundOn = false;
      }
    }
    //Manejo del boton change
    if (e.target.matches('#change-button')) {
      if (!quoteModeIsOn) imgInterval('Create');
      handleChange();
      imgToggleEffect();
      s.$suggestiveFinger1.style.opacity = 0;
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
      s.$musicToggle.classList.remove('fa-beat-fade');
      s.$nextSong.style.display = 'block';
      if (s.$musicToggle.style.color == 'rgb(255, 255, 255)') {
        quoteSong.play();
        s.$musicToggle.style.color = '#ff0000';
        //Finalizacion de una cancion
        quoteSong.addEventListener('ended', () => {
          nextSong();
        });
      } else {
        quoteSong.pause();
        s.$musicToggle.style.color = '#fff';
      }
    }
    //Boton siguiente cancion
    if (e.target.matches('#next-song')) {
      s.$nextSong.classList.remove('fa-beat-fade');
      nextSong();
    }
    //Boton "Understood!"
    if (e.target.matches('#understood')) {
      s.$understood.style.display = 'none';
      if (soundIsOn) s.$pillsSound.play();
      animatePills();
    }
    //Botón de lenguaje
    if (e.target.matches('#language-toggle')) {
      s.$languageToggle.classList.remove('fa-beat-fade');
      if (typed) {
        typed.destroy();
        s.$typing.pause();
      }
      if (language == 'EN') {
        language = 'ES';
        quotes = [...quotesEsp];
        s.$quoteText.textContent = dQ(quotes[quotePosition]);
        s.$understood.textContent = '¡Entendido!';
        s.$disclaimer.textContent = disclaimer[1];
      } else {
        language = 'EN';
        quotes = [...quotesEng];
        s.$quoteText.textContent = dQ(quotes[quotePosition]);
        s.$understood.textContent = 'Understood!';
        s.$disclaimer.textContent = disclaimer[0];
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
    //Scroll to top general
    if (e.target.matches('#scroll-to-top')) {
      if (soundIsOn) s.$goToTop.play();
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      });
    }
  });

  d.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.altKey && (e.key === 'q' || e.key === 'Q'))
      startQuoteMode();
    if (e.ctrlKey && e.shiftKey && e.altKey && (e.key === 'l' || e.key === 'L'))
      exitQuoteMode();
  });

  //Manejo de eventos hover
  d.addEventListener('mouseover', (e) => {
    //Manejo del hover en profile-pic
    if (e.target.matches('img#profile-pic') && !quoteModeIsOn) {
      console.log('Mouseover detectado');
      s.$profileAudio.volume = 0;
      if (!quoteModeFirstLoad) fadeInOut(s.$profileAudio);
      imgInterval('Create');
      matrixBg(true);
    }
  });

  //Manejo de eventos mouseout
  d.addEventListener('mouseout', (e) => {
    //Manejo del mouseout en profile pic
    if (e.target.matches('img#profile-pic') && !quoteModeIsOn) {
      s.$profileAudio.volume = 0.5;
      if (!quoteModeFirstLoad) fadeInOut(s.$profileAudio);
      matrixBg(false);
    }
  });

  //Long press en mobile, click derecho en pc
  d.addEventListener('contextmenu', function (event) {
    event.preventDefault();
    //Click derecho en profile pic
    if (event.target.matches('img#profile-pic')) {
      //   startQuoteMode();
      // Agregar algun efecto quizas
    }
  });
});
