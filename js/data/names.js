/**
 * The 99 Beautiful Names of Allah (al-Asma' al-Husna).
 *
 * The set of names is the well-known list narrated in Jami' at-Tirmidhi 3507
 * (the hadith "Allah has ninety-nine names" itself is in Sahih al-Bukhari
 * 2736 / 7392 and Sahih Muslim 2677). Entries are stored in the ORIGINAL
 * order the project started with; `num` is that original position.
 *
 * Fields
 *   id      stable key used for saved progress — never change it
 *   num     position in the original order (1–99)
 *   ar      Arabic, Indo-Pak ("Indian") vowel-marking: plain alif for the
 *           article, sukun on long و / ي, khari zabar (ٰ) where used
 *   tr      Latin transliteration (ā ī ū = long vowel, ʿ = ʿayn, ’ = hamza)
 *   bnPron  Bangla pronunciation (see the guide in README / About page:
 *           ‘ = ع, ’ = ء, ক্ব = ق, দ্ব = ض, য = ز / ذ / ظ, ছ = ث)
 *   bn      meaning in Bangla
 *   en      meaning in English
 *   root    three-letter Arabic root (used to show "same-root" names)
 */
export const NAMES = [
  { id: "rahman", num: 1, ar: "اَلرَّحْمٰنُ", tr: "Ar-Rahmān", bnPron: "আর-রাহমান", bn: "পরম দয়াময় — যাঁর দয়া সমগ্র সৃষ্টিকে ঘিরে আছে", en: "The Most Gracious, whose mercy embraces all creation", root: "ر ح م" },
  { id: "rahim", num: 2, ar: "اَلرَّحِيْمُ", tr: "Ar-Rahīm", bnPron: "আর-রাহীম", bn: "পরম দয়ালু — মুমিনদের প্রতি বিশেষ করুণাকারী", en: "The Most Merciful, especially to the believers", root: "ر ح م" },
  { id: "malik", num: 3, ar: "اَلْمَلِكُ", tr: "Al-Malik", bnPron: "আল-মালিক", bn: "অধিপতি, প্রকৃত বাদশাহ", en: "The King, the Sovereign", root: "م ل ك" },
  { id: "malikulmulk", num: 4, ar: "مَالِكُ الْمُلْكِ", tr: "Mālik-ul-Mulk", bnPron: "মালিকুল-মুলক", bn: "সমগ্র রাজত্বের মালিক", en: "Owner of All Sovereignty", root: "م ل ك" },
  { id: "dhuljalal", num: 5, ar: "ذُو الْجَلَالِ وَالْاِكْرَامِ", tr: "Dhul-Jalāli wal-Ikrām", bnPron: "যুল-জালালি ওয়াল-ইকরাম", bn: "মহিমা ও মহানুভবতার অধিকারী", en: "Lord of Majesty and Generosity", root: "ج ل ل" },
  { id: "quddus", num: 6, ar: "اَلْقُدُّوْسُ", tr: "Al-Quddūs", bnPron: "আল-কুদ্দূস", bn: "মহাপবিত্র — সকল দোষ-ত্রুটি থেকে মুক্ত", en: "The Most Holy, the Pure", root: "ق د س" },
  { id: "salam", num: 7, ar: "اَلسَّلَامُ", tr: "As-Salām", bnPron: "আস-সালাম", bn: "শান্তিময় ও শান্তিদাতা — সকল ত্রুটিমুক্ত", en: "The Source of Peace, free of every flaw", root: "س ل م" },
  { id: "mumin", num: 8, ar: "اَلْمُؤْمِنُ", tr: "Al-Mu’min", bnPron: "আল-মু’মিন", bn: "নিরাপত্তাদাতা, ঈমানদাতা ও সত্যায়নকারী", en: "The Giver of Security, the Affirmer of Truth", root: "ء م ن" },
  { id: "muhaymin", num: 9, ar: "اَلْمُهَيْمِنُ", tr: "Al-Muhaymin", bnPron: "আল-মুহাইমিন", bn: "রক্ষক ও তত্ত্বাবধায়ক — সবকিছুর উপর পূর্ণ কর্তৃত্বশীল", en: "The Guardian, the Overseer of all", root: "ه ي م ن" },
  { id: "aziz", num: 10, ar: "اَلْعَزِيْزُ", tr: "Al-ʿAzīz", bnPron: "আল-‘আযীয", bn: "মহাপরাক্রমশালী, অপরাজেয়", en: "The Almighty, the Invincible", root: "ع ز ز" },
  { id: "jabbar", num: 11, ar: "اَلْجَبَّارُ", tr: "Al-Jabbār", bnPron: "আল-জাব্বার", bn: "মহাপ্রতাপশালী; ভাঙাকে জোড়া দেন", en: "The Compeller, the Restorer of what is broken", root: "ج ب ر" },
  { id: "mutakabbir", num: 12, ar: "اَلْمُتَكَبِّرُ", tr: "Al-Mutakabbir", bnPron: "আল-মুতাকাব্বির", bn: "মহাগৌরবান্বিত — বড়ত্ব কেবল তাঁরই শোভা পায়", en: "The Supreme in Greatness", root: "ك ب ر" },
  { id: "khaliq", num: 13, ar: "اَلْخَالِقُ", tr: "Al-Khāliq", bnPron: "আল-খালিক্ব", bn: "সৃষ্টিকর্তা — পরিমাপ নির্ধারণ করে সৃষ্টি করেন", en: "The Creator", root: "خ ل ق" },
  { id: "bari", num: 14, ar: "اَلْبَارِئُ", tr: "Al-Bāri’", bnPron: "আল-বারি’", bn: "উদ্ভাবনকর্তা — অস্তিত্বহীন থেকে অস্তিত্বে আনেন", en: "The Originator, who brings into being", root: "ب ر ء" },
  { id: "musawwir", num: 15, ar: "اَلْمُصَوِّرُ", tr: "Al-Musawwir", bnPron: "আল-মুসাওয়্যির", bn: "রূপদাতা, আকৃতিদানকারী", en: "The Fashioner of Forms", root: "ص و ر" },
  { id: "hakim", num: 16, ar: "اَلْحَكِيْمُ", tr: "Al-Hakīm", bnPron: "আল-হাকীম", bn: "প্রজ্ঞাময়", en: "The All-Wise", root: "ح ك م" },
  { id: "hamid", num: 17, ar: "اَلْحَمِيْدُ", tr: "Al-Hamīd", bnPron: "আল-হামীদ", bn: "প্রশংসিত — সকল প্রশংসার যোগ্য", en: "The Praiseworthy", root: "ح م د" },
  { id: "hakam", num: 18, ar: "اَلْحَكَمُ", tr: "Al-Hakam", bnPron: "আল-হাকাম", bn: "মহাবিচারক, চূড়ান্ত ফয়সালাকারী", en: "The Judge, the Arbiter", root: "ح ك م" },
  { id: "adl", num: 19, ar: "اَلْعَدْلُ", tr: "Al-ʿAdl", bnPron: "আল-‘আদল", bn: "পূর্ণ ন্যায়পরায়ণ", en: "The Utterly Just", root: "ع د ل" },
  { id: "halim", num: 20, ar: "اَلْحَلِيْمُ", tr: "Al-Halīm", bnPron: "আল-হালীম", bn: "পরম সহনশীল — শাস্তিতে তাড়াহুড়া করেন না", en: "The Forbearing", root: "ح ل م" },
  { id: "alim", num: 21, ar: "اَلْعَلِيْمُ", tr: "Al-ʿAlīm", bnPron: "আল-‘আলীম", bn: "সর্বজ্ঞ", en: "The All-Knowing", root: "ع ل م" },
  { id: "aliyy", num: 22, ar: "اَلْعَلِيُّ", tr: "Al-ʿAliyy", bnPron: "আল-‘আলিয়্য", bn: "সর্বোচ্চ, সুউচ্চ", en: "The Most High", root: "ع ل و" },
  { id: "mutaali", num: 23, ar: "اَلْمُتَعَالِيْ", tr: "Al-Mutaʿālī", bnPron: "আল-মুতা‘আলী", bn: "সুমহান — সবকিছুর ঊর্ধ্বে", en: "The Supremely Exalted", root: "ع ل و" },
  { id: "azim", num: 24, ar: "اَلْعَظِيْمُ", tr: "Al-ʿAzīm", bnPron: "আল-‘আযীম", bn: "মহামহিম, মহান", en: "The Magnificent", root: "ع ظ م" },
  { id: "ahad", num: 25, ar: "اَلْاَحَدُ", tr: "Al-Ahad", bnPron: "আল-আহাদ", bn: "অদ্বিতীয় — যাঁর সমতুল্য কেউ নেই", en: "The Unique, the Incomparable One", root: "و ح د" },
  { id: "samad", num: 26, ar: "اَلصَّمَدُ", tr: "As-Samad", bnPron: "আস-সামাদ", bn: "অমুখাপেক্ষী — সবাই যাঁর মুখাপেক্ষী", en: "The Eternal Refuge, on whom all depend", root: "ص م د" },
  { id: "wahid", num: 27, ar: "اَلْوَاحِدُ", tr: "Al-Wāhid", bnPron: "আল-ওয়াহিদ", bn: "এক — যাঁর কোনো শরিক নেই", en: "The One, without partner", root: "و ح د" },
  { id: "wajid", num: 28, ar: "اَلْوَاجِدُ", tr: "Al-Wājid", bnPron: "আল-ওয়াজিদ", bn: "প্রাপক — যাঁর কোনো কিছুর অভাব নেই", en: "The Finder, who lacks nothing", root: "و ج د" },
  { id: "waliyy", num: 29, ar: "اَلْوَلِيُّ", tr: "Al-Waliyy", bnPron: "আল-ওয়ালিয়্য", bn: "অভিভাবক ও বন্ধু", en: "The Protecting Friend", root: "و ل ي" },
  { id: "wali", num: 30, ar: "اَلْوَالِيْ", tr: "Al-Wālī", bnPron: "আল-ওয়ালী", bn: "সর্বময় কর্তা — সবকিছুর পরিচালক", en: "The Governor of all affairs", root: "و ل ي" },
  { id: "wasi", num: 31, ar: "اَلْوَاسِعُ", tr: "Al-Wāsiʿ", bnPron: "আল-ওয়াসি‘", bn: "সর্বব্যাপী — জ্ঞানে ও দানে সীমাহীন", en: "The All-Encompassing, the Boundless", root: "و س ع" },
  { id: "warith", num: 32, ar: "اَلْوَارِثُ", tr: "Al-Wārith", bnPron: "আল-ওয়ারিছ", bn: "উত্তরাধিকারী — সব বিলীন হলেও যিনি থাকবেন", en: "The Inheritor of All", root: "و ر ث" },
  { id: "wakil", num: 33, ar: "اَلْوَكِيْلُ", tr: "Al-Wakīl", bnPron: "আল-ওয়াকীল", bn: "কর্মবিধায়ক — পরম ভরসাস্থল", en: "The Trustee, the Disposer of Affairs", root: "و ك ل" },
  { id: "awwal", num: 34, ar: "اَلْاَوَّلُ", tr: "Al-Awwal", bnPron: "আল-আওওয়াল", bn: "আদি — যাঁর পূর্বে কিছু নেই", en: "The First — nothing is before Him", root: "ء و ل" },
  { id: "akhir", num: 35, ar: "اَلْاٰخِرُ", tr: "Al-Ākhir", bnPron: "আল-আখির", bn: "অন্ত — যাঁর পরে কিছু নেই", en: "The Last — nothing is after Him", root: "ء خ ر" },
  { id: "muakhkhir", num: 36, ar: "اَلْمُؤَخِّرُ", tr: "Al-Mu’akhkhir", bnPron: "আল-মু’আখ্খির", bn: "বিলম্বকারী — যাকে ইচ্ছা পিছিয়ে দেন", en: "The Delayer", root: "ء خ ر" },
  { id: "muqaddim", num: 37, ar: "اَلْمُقَدِّمُ", tr: "Al-Muqaddim", bnPron: "আল-মুক্বাদ্দিম", bn: "অগ্রসরকারী — যাকে ইচ্ছা এগিয়ে দেন", en: "The Expediter, who brings forward", root: "ق د م" },
  { id: "qadir", num: 38, ar: "اَلْقَادِرُ", tr: "Al-Qādir", bnPron: "আল-ক্বাদির", bn: "সর্বশক্তিমান, ক্ষমতাবান", en: "The All-Able", root: "ق د ر" },
  { id: "muqtadir", num: 39, ar: "اَلْمُقْتَدِرُ", tr: "Al-Muqtadir", bnPron: "আল-মুক্বতাদির", bn: "পূর্ণ ক্ষমতাধর — নিরঙ্কুশ কর্তৃত্বশালী", en: "The All-Powerful, the Omnipotent", root: "ق د ر" },
  { id: "qawiyy", num: 40, ar: "اَلْقَوِيُّ", tr: "Al-Qawiyy", bnPron: "আল-ক্বাওয়িয়্য", bn: "মহাশক্তিমান", en: "The All-Strong", root: "ق و ي" },
  { id: "wahhab", num: 41, ar: "اَلْوَهَّابُ", tr: "Al-Wahhāb", bnPron: "আল-ওয়াহ্হাব", bn: "মহাদাতা — বিনিময় ছাড়াই অবিরাম দান করেন", en: "The Bestower, who gives freely", root: "و ه ب" },
  { id: "wadud", num: 42, ar: "اَلْوَدُوْدُ", tr: "Al-Wadūd", bnPron: "আল-ওয়াদূদ", bn: "প্রেমময় — যিনি ভালোবাসেন ও ভালোবাসার যোগ্য", en: "The Most Loving", root: "و د د" },
  { id: "razzaq", num: 43, ar: "اَلرَّزَّاقُ", tr: "Ar-Razzāq", bnPron: "আর-রায্যাক্ব", bn: "রিযিকদাতা", en: "The Provider", root: "ر ز ق" },
  { id: "fattah", num: 44, ar: "اَلْفَتَّاحُ", tr: "Al-Fattāh", bnPron: "আল-ফাত্তাহ", bn: "উন্মোচনকারী, মীমাংসাকারী ও বিজয়দাতা", en: "The Opener, the Judge", root: "ف ت ح" },
  { id: "latif", num: 45, ar: "اَللَّطِيْفُ", tr: "Al-Latīf", bnPron: "আল-লাতীফ", bn: "সূক্ষ্মদর্শী ও অতি কোমল", en: "The Subtle, the Most Gentle", root: "ل ط ف" },
  { id: "ghafur", num: 46, ar: "اَلْغَفُوْرُ", tr: "Al-Ghafūr", bnPron: "আল-গাফূর", bn: "পরম ক্ষমাশীল", en: "The All-Forgiving", root: "غ ف ر" },
  { id: "ghaffar", num: 47, ar: "اَلْغَفَّارُ", tr: "Al-Ghaffār", bnPron: "আল-গাফ্ফার", bn: "বারবার ক্ষমাকারী", en: "The Ever-Forgiving", root: "غ ف ر" },
  { id: "qahhar", num: 48, ar: "اَلْقَهَّارُ", tr: "Al-Qahhār", bnPron: "আল-ক্বাহ্হার", bn: "প্রবল পরাক্রমশালী — সবকিছু যাঁর অধীন", en: "The All-Subduer, the Irresistible", root: "ق ه ر" },
  { id: "afuww", num: 49, ar: "اَلْعَفُوُّ", tr: "Al-ʿAfuww", bnPron: "আল-‘আফুওউ", bn: "মার্জনাকারী — গুনাহ মুছে দেন", en: "The Pardoner, who erases sins", root: "ع ف و" },
  { id: "rauf", num: 50, ar: "اَلرَّءُوْفُ", tr: "Ar-Ra’ūf", bnPron: "আর-রা’ঊফ", bn: "অতি স্নেহশীল, পরম কোমল", en: "The Most Kind, the Most Compassionate", root: "ر ء ف" },
  { id: "tawwab", num: 51, ar: "اَلتَّوَّابُ", tr: "At-Tawwāb", bnPron: "আত-তাওওয়াব", bn: "তাওবা কবুলকারী — বারবার তাওবার সুযোগ দেন", en: "The Acceptor of Repentance", root: "ت و ب" },
  { id: "barr", num: 52, ar: "اَلْبَرُّ", tr: "Al-Barr", bnPron: "আল-বার্র", bn: "কল্যাণময়, পরম সদাচারী", en: "The Source of All Goodness", root: "ب ر ر" },
  { id: "mujib", num: 53, ar: "اَلْمُجِيْبُ", tr: "Al-Mujīb", bnPron: "আল-মুজীব", bn: "দোয়া কবুলকারী", en: "The Responsive, the Answerer of Prayers", root: "ج و ب" },
  { id: "sabur", num: 54, ar: "اَلصَّبُوْرُ", tr: "As-Sabūr", bnPron: "আস-সাবূর", bn: "পরম ধৈর্যশীল", en: "The Most Patient", root: "ص ب ر" },
  { id: "shakur", num: 55, ar: "اَلشَّكُوْرُ", tr: "Ash-Shakūr", bnPron: "আশ-শাকূর", bn: "গুণগ্রাহী — অল্প আমলেও বেশি প্রতিদান দেন", en: "The Most Appreciative", root: "ش ك ر" },
  { id: "raqib", num: 56, ar: "اَلرَّقِيْبُ", tr: "Ar-Raqīb", bnPron: "আর-রাক্বীব", bn: "সদা পর্যবেক্ষক, তত্ত্বাবধায়ক", en: "The Ever-Watchful", root: "ر ق ب" },
  { id: "kabir", num: 57, ar: "اَلْكَبِيْرُ", tr: "Al-Kabīr", bnPron: "আল-কাবীর", bn: "সুমহান, সর্বশ্রেষ্ঠ", en: "The Most Great", root: "ك ب ر" },
  { id: "jami", num: 58, ar: "اَلْجَامِعُ", tr: "Al-Jāmiʿ", bnPron: "আল-জামি‘", bn: "একত্রকারী — কিয়ামতে সবাইকে সমবেত করবেন", en: "The Gatherer", root: "ج م ع" },
  { id: "sami", num: 59, ar: "اَلسَّمِيْعُ", tr: "As-Samīʿ", bnPron: "আস-সামী‘", bn: "সর্বশ্রোতা", en: "The All-Hearing", root: "س م ع" },
  { id: "basir", num: 60, ar: "اَلْبَصِيْرُ", tr: "Al-Basīr", bnPron: "আল-বাসীর", bn: "সর্বদ্রষ্টা", en: "The All-Seeing", root: "ب ص ر" },
  { id: "qabid", num: 61, ar: "اَلْقَابِضُ", tr: "Al-Qābid", bnPron: "আল-ক্বাবিদ্ব", bn: "সংকোচনকারী — (রিযিক ইত্যাদি) সংকুচিত করেন", en: "The Constrictor, the Withholder", root: "ق ب ض" },
  { id: "basit", num: 62, ar: "اَلْبَاسِطُ", tr: "Al-Bāsit", bnPron: "আল-বাসিত", bn: "প্রসারণকারী — (রিযিক ইত্যাদি) প্রশস্ত করেন", en: "The Expander", root: "ب س ط" },
  { id: "khafid", num: 63, ar: "اَلْخَافِضُ", tr: "Al-Khāfid", bnPron: "আল-খাফিদ্ব", bn: "অবনতকারী — যাকে ইচ্ছা নিচু করেন", en: "The Abaser", root: "خ ف ض" },
  { id: "rafi", num: 64, ar: "اَلرَّافِعُ", tr: "Ar-Rāfiʿ", bnPron: "আর-রাফি‘", bn: "উন্নতকারী — যাকে ইচ্ছা উঁচু করেন", en: "The Exalter", root: "ر ف ع" },
  { id: "muizz", num: 65, ar: "اَلْمُعِزُّ", tr: "Al-Muʿizz", bnPron: "আল-মু‘ইয্য", bn: "সম্মানদাতা", en: "The Giver of Honour", root: "ع ز ز" },
  { id: "mudhill", num: 66, ar: "اَلْمُذِلُّ", tr: "Al-Mudhill", bnPron: "আল-মুযিল্ল", bn: "অপমানদাতা — যাকে ইচ্ছা লাঞ্ছিত করেন", en: "The Giver of Humiliation", root: "ذ ل ل" },
  { id: "majid", num: 67, ar: "اَلْمَجِيْدُ", tr: "Al-Majīd", bnPron: "আল-মাজীদ", bn: "মহাগৌরবময়", en: "The Most Glorious", root: "م ج د" },
  { id: "maajid", num: 68, ar: "اَلْمَاجِدُ", tr: "Al-Mājid", bnPron: "আল-মাজিদ", bn: "মহিমান্বিত ও মহানুভব", en: "The Noble, the Illustrious", root: "م ج د" },
  { id: "hasib", num: 69, ar: "اَلْحَسِيْبُ", tr: "Al-Hasīb", bnPron: "আল-হাসীব", bn: "হিসাব গ্রহণকারী ও যথেষ্ট", en: "The Reckoner, the All-Sufficient", root: "ح س ب" },
  { id: "hafiz", num: 70, ar: "اَلْحَفِيْظُ", tr: "Al-Hafīz", bnPron: "আল-হাফীয", bn: "সংরক্ষণকারী, হেফাজতকারী", en: "The Preserver, the Guardian", root: "ح ف ظ" },
  { id: "nur", num: 71, ar: "اَلنُّوْرُ", tr: "An-Nūr", bnPron: "আন-নূর", bn: "আলো — আসমান ও জমিনের নূর", en: "The Light", root: "ن و ر" },
  { id: "hayy", num: 72, ar: "اَلْحَيُّ", tr: "Al-Hayy", bnPron: "আল-হাইয়্য", bn: "চিরঞ্জীব", en: "The Ever-Living", root: "ح ي ي" },
  { id: "qayyum", num: 73, ar: "اَلْقَيُّوْمُ", tr: "Al-Qayyūm", bnPron: "আল-ক্বাইয়্যূম", bn: "চিরস্থায়ী ধারক — নিজে প্রতিষ্ঠিত, সবকিছুর ধারক", en: "The Self-Subsisting Sustainer of All", root: "ق و م" },
  { id: "karim", num: 74, ar: "اَلْكَرِيْمُ", tr: "Al-Karīm", bnPron: "আল-কারীম", bn: "মহানুভব, পরম দাতা ও সম্মানিত", en: "The Most Generous, the Noble", root: "ك ر م" },
  { id: "jalil", num: 75, ar: "اَلْجَلِيْلُ", tr: "Al-Jalīl", bnPron: "আল-জালীল", bn: "মহামর্যাদাবান, প্রতাপশালী", en: "The Majestic", root: "ج ل ل" },
  { id: "nafi", num: 76, ar: "اَلنَّافِعُ", tr: "An-Nāfiʿ", bnPron: "আন-নাফি‘", bn: "উপকারকারী, কল্যাণদাতা", en: "The Giver of Benefit", root: "ن ف ع" },
  { id: "darr", num: 77, ar: "اَلضَّارُّ", tr: "Ad-Dārr", bnPron: "আদ-দ্বার্র", bn: "ক্ষতির নিয়ন্ত্রক — তাঁর অনুমতি ছাড়া কোনো ক্ষতি হয় না", en: "The Distresser — no harm occurs except by His decree", root: "ض ر ر" },
  { id: "baqi", num: 78, ar: "اَلْبَاقِيْ", tr: "Al-Bāqī", bnPron: "আল-বাক্বী", bn: "চিরস্থায়ী, অবিনশ্বর", en: "The Everlasting", root: "ب ق ي" },
  { id: "badi", num: 79, ar: "اَلْبَدِيْعُ", tr: "Al-Badīʿ", bnPron: "আল-বাদী‘", bn: "অনুপম স্রষ্টা — নমুনা ছাড়াই সৃষ্টি করেন", en: "The Incomparable Originator", root: "ب د ع" },
  { id: "hadi", num: 80, ar: "اَلْهَادِيْ", tr: "Al-Hādī", bnPron: "আল-হাদী", bn: "পথপ্রদর্শক, হিদায়াতদাতা", en: "The Guide", root: "ه د ي" },
  { id: "rashid", num: 81, ar: "اَلرَّشِيْدُ", tr: "Ar-Rashīd", bnPron: "আর-রাশীদ", bn: "সঠিক পথের দিশারী, সুবিবেচক", en: "The Guide to the Right Path", root: "ر ش د" },
  { id: "muqit", num: 82, ar: "اَلْمُقِيْتُ", tr: "Al-Muqīt", bnPron: "আল-মুক্বীত", bn: "খাদ্য-জীবিকাদাতা ও সবকিছুর রক্ষণাবেক্ষণকারী", en: "The Nourisher, the Maintainer", root: "ق و ت" },
  { id: "muqsit", num: 83, ar: "اَلْمُقْسِطُ", tr: "Al-Muqsit", bnPron: "আল-মুক্বসিত", bn: "ইনসাফকারী — ন্যায় প্রতিষ্ঠা করেন", en: "The Equitable, the Establisher of Justice", root: "ق س ط" },
  { id: "muntaqim", num: 84, ar: "اَلْمُنْتَقِمُ", tr: "Al-Muntaqim", bnPron: "আল-মুনতাক্বিম", bn: "অপরাধীদের থেকে প্রতিশোধ গ্রহণকারী", en: "The Avenger of the wrongdoers", root: "ن ق م" },
  { id: "mubdi", num: 85, ar: "اَلْمُبْدِئُ", tr: "Al-Mubdi’", bnPron: "আল-মুবদি’", bn: "প্রথমবার সৃষ্টিকারী, সূচনাকারী", en: "The Initiator, who begins creation", root: "ب د ء" },
  { id: "muid", num: 86, ar: "اَلْمُعِيْدُ", tr: "Al-Muʿīd", bnPron: "আল-মু‘ঈদ", bn: "পুনরায় সৃষ্টিকারী", en: "The Restorer, who brings back", root: "ع و د" },
  { id: "muhyi", num: 87, ar: "اَلْمُحْيِيْ", tr: "Al-Muhyī", bnPron: "আল-মুহ্ইয়ী", bn: "জীবনদাতা", en: "The Giver of Life", root: "ح ي ي" },
  { id: "mumit", num: 88, ar: "اَلْمُمِيْتُ", tr: "Al-Mumīt", bnPron: "আল-মুমীত", bn: "মৃত্যুদাতা", en: "The Bringer of Death", root: "م و ت" },
  { id: "muhsi", num: 89, ar: "اَلْمُحْصِيْ", tr: "Al-Muhsī", bnPron: "আল-মুহসী", bn: "সবকিছুর গণনাকারী", en: "The All-Enumerating", root: "ح ص ي" },
  { id: "khabir", num: 90, ar: "اَلْخَبِيْرُ", tr: "Al-Khabīr", bnPron: "আল-খাবীর", bn: "সম্যক অবহিত — ভেতরের খবরও জানেন", en: "The All-Aware", root: "خ ب ر" },
  { id: "zahir", num: 91, ar: "اَلظَّاهِرُ", tr: "Az-Zāhir", bnPron: "আয-যাহির", bn: "প্রকাশ্য — যাঁর ঊর্ধ্বে কিছু নেই", en: "The Manifest — nothing is above Him", root: "ظ ه ر" },
  { id: "batin", num: 92, ar: "اَلْبَاطِنُ", tr: "Al-Bātin", bnPron: "আল-বাতিন", bn: "গোপন — যাঁর চেয়ে নিকটে কিছু নেই", en: "The Hidden — nothing is nearer than Him", root: "ب ط ن" },
  { id: "matin", num: 93, ar: "اَلْمَتِيْنُ", tr: "Al-Matīn", bnPron: "আল-মাতীন", bn: "সুদৃঢ়, অটল শক্তির অধিকারী", en: "The Firm, the Steadfast", root: "م ت ن" },
  { id: "mughni", num: 94, ar: "اَلْمُغْنِيْ", tr: "Al-Mughnī", bnPron: "আল-মুগনী", bn: "অভাবমোচনকারী, সমৃদ্ধিদাতা", en: "The Enricher", root: "غ ن ي" },
  { id: "mani", num: 95, ar: "اَلْمَانِعُ", tr: "Al-Māniʿ", bnPron: "আল-মানি‘", bn: "প্রতিরোধকারী — যা ইচ্ছা আটকে রাখেন", en: "The Withholder, the Preventer", root: "م ن ع" },
  { id: "ghani", num: 96, ar: "اَلْغَنِيُّ", tr: "Al-Ghaniyy", bnPron: "আল-গানিয়্য", bn: "অভাবমুক্ত, অমুখাপেক্ষী", en: "The Self-Sufficient, the Rich", root: "غ ن ي" },
  { id: "baith", num: 97, ar: "اَلْبَاعِثُ", tr: "Al-Bāʿith", bnPron: "আল-বা‘ইছ", bn: "পুনরুত্থানকারী", en: "The Resurrector", root: "ب ع ث" },
  { id: "shahid", num: 98, ar: "اَلشَّهِيْدُ", tr: "Ash-Shahīd", bnPron: "আশ-শাহীদ", bn: "সর্বদর্শী সাক্ষী", en: "The Witness", root: "ش ه د" },
  { id: "haqq", num: 99, ar: "اَلْحَقُّ", tr: "Al-Haqq", bnPron: "আল-হাক্ক্ব", bn: "পরম সত্য", en: "The Truth, the Real", root: "ح ق ق" },
];

/** Lookup by id. */
export const NAME_BY_ID = Object.fromEntries(NAMES.map((n) => [n.id, n]));
