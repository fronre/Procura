import { Ayah, Reciter, SurahMeta } from '../types';

export const RECITERS: Reciter[] = [
  { id: 'Alafasy_128kbps', nameAr: 'الشيخ مشاري راشد العفاسي', nameEn: 'Mishary Rashid Alafasy', serverUrl: 'Alafasy_128kbps' },
  { id: 'Abdul_Basit_Murattal_192kbps', nameAr: 'الشيخ عبد الباسط عبد الصمد', nameEn: 'Abdul Basit Murattal', serverUrl: 'Abdul_Basit_Murattal_192kbps' },
  { id: 'Ghamadi_40kbps', nameAr: 'الشيخ سعد الغامدي', nameEn: 'Saad Al-Ghamdi', serverUrl: 'Ghamadi_40kbps' },
  { id: 'Abu_Bakr_Ash-Shaatree_128kbps', nameAr: 'الشيخ أبو بكر الشاطري', nameEn: 'Abu Bakr Al-Shatri', serverUrl: 'Abu_Bakr_Ash-Shaatree_128kbps' },
];

export const SURAH_LIST: SurahMeta[] = [
  { number: 1, nameAr: 'الفاتحة', nameEn: 'Al-Fatihah', englishMeaning: 'The Opening', totalVerses: 7, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 1 },
  { number: 2, nameAr: 'البقرة', nameEn: 'Al-Baqarah', englishMeaning: 'The Cow', totalVerses: 286, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 1 },
  { number: 3, nameAr: 'آل عمران', nameEn: 'Ali \'Imran', englishMeaning: 'Family of Imran', totalVerses: 200, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 3 },
  { number: 4, nameAr: 'النساء', nameEn: 'An-Nisa', englishMeaning: 'The Women', totalVerses: 176, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 4 },
  { number: 5, nameAr: 'المائدة', nameEn: 'Al-Ma\'idah', englishMeaning: 'The Table Spread', totalVerses: 120, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 6 },
  { number: 6, nameAr: 'الأنعام', nameEn: 'Al-An\'am', englishMeaning: 'The Cattle', totalVerses: 165, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 7 },
  { number: 7, nameAr: 'الأعراف', nameEn: 'Al-A\'raf', englishMeaning: 'The Heights', totalVerses: 206, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 8 },
  { number: 8, nameAr: 'الأنفال', nameEn: 'Al-Anfal', englishMeaning: 'The Spoils of War', totalVerses: 75, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 9 },
  { number: 9, nameAr: 'التوبة', nameEn: 'At-Tawbah', englishMeaning: 'The Repentance', totalVerses: 129, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 10 },
  { number: 10, nameAr: 'يونس', nameEn: 'Yunus', englishMeaning: 'Jonah', totalVerses: 109, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 11 },
  { number: 11, nameAr: 'هود', nameEn: 'Hud', englishMeaning: 'Hud', totalVerses: 123, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 11 },
  { number: 12, nameAr: 'يوسف', nameEn: 'Yusuf', englishMeaning: 'Joseph', totalVerses: 111, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 12 },
  { number: 13, nameAr: 'الرعد', nameEn: 'Ar-Ra\'d', englishMeaning: 'The Thunder', totalVerses: 43, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 13 },
  { number: 14, nameAr: 'إبراهيم', nameEn: 'Ibrahim', englishMeaning: 'Abraham', totalVerses: 52, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 13 },
  { number: 15, nameAr: 'الحجر', nameEn: 'Al-Hijr', englishMeaning: 'The Rocky Tract', totalVerses: 99, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 14 },
  { number: 16, nameAr: 'النحل', nameEn: 'An-Nahl', englishMeaning: 'The Bee', totalVerses: 128, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 14 },
  { number: 17, nameAr: 'الإسراء', nameEn: 'Al-Isra', englishMeaning: 'The Night Journey', totalVerses: 111, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 15 },
  { number: 18, nameAr: 'الكهف', nameEn: 'Al-Kahf', englishMeaning: 'The Cave', totalVerses: 110, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 15 },
  { number: 19, nameAr: 'مريم', nameEn: 'Maryam', englishMeaning: 'Mary', totalVerses: 98, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 16 },
  { number: 20, nameAr: 'طه', nameEn: 'Ta-Ha', englishMeaning: 'Ta-Ha', totalVerses: 135, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 16 },
  { number: 21, nameAr: 'الأنبياء', nameEn: 'Al-Anbiya', englishMeaning: 'The Prophets', totalVerses: 112, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 17 },
  { number: 22, nameAr: 'الحج', nameEn: 'Al-Hajj', englishMeaning: 'The Pilgrimage', totalVerses: 78, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 17 },
  { number: 23, nameAr: 'المؤمنون', nameEn: 'Al-Mu\'minun', englishMeaning: 'The Believers', totalVerses: 118, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 18 },
  { number: 24, nameAr: 'النور', nameEn: 'An-Nur', englishMeaning: 'The Light', totalVerses: 64, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 18 },
  { number: 25, nameAr: 'الفرقان', nameEn: 'Al-Furqan', englishMeaning: 'The Criterion', totalVerses: 77, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 18 },
  { number: 26, nameAr: 'الشعراء', nameEn: 'Ash-Shu\'ara', englishMeaning: 'The Poets', totalVerses: 227, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 19 },
  { number: 27, nameAr: 'النمل', nameEn: 'An-Naml', englishMeaning: 'The Ant', totalVerses: 93, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 19 },
  { number: 28, nameAr: 'القصص', nameEn: 'Al-Qasas', englishMeaning: 'The Stories', totalVerses: 88, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 20 },
  { number: 29, nameAr: 'العنكبوت', nameEn: 'Al-\'Ankabut', englishMeaning: 'The Spider', totalVerses: 69, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 20 },
  { number: 30, nameAr: 'الروم', nameEn: 'Ar-Rum', englishMeaning: 'The Romans', totalVerses: 60, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 21 },
  { number: 31, nameAr: 'لقمان', nameEn: 'Luqman', englishMeaning: 'Luqman', totalVerses: 34, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 21 },
  { number: 32, nameAr: 'السجدة', nameEn: 'As-Sajdah', englishMeaning: 'The Prostration', totalVerses: 30, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 21 },
  { number: 33, nameAr: 'الأحزاب', nameEn: 'Al-Ahzab', englishMeaning: 'The Combined Forces', totalVerses: 73, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 21 },
  { number: 34, nameAr: 'سبأ', nameEn: 'Saba', englishMeaning: 'Sheba', totalVerses: 54, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 22 },
  { number: 35, nameAr: 'فاطر', nameEn: 'Fatir', englishMeaning: 'Originator', totalVerses: 45, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 22 },
  { number: 36, nameAr: 'يس', nameEn: 'Ya-Sin', englishMeaning: 'Ya Sin', totalVerses: 83, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 22 },
  { number: 37, nameAr: 'الصافات', nameEn: 'As-Saffat', englishMeaning: 'Those who set the Ranks', totalVerses: 182, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 23 },
  { number: 38, nameAr: 'ص', nameEn: 'Sad', englishMeaning: 'The Letter "Saad"', totalVerses: 88, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 23 },
  { number: 39, nameAr: 'الزمر', nameEn: 'Az-Zumar', englishMeaning: 'The Troops', totalVerses: 75, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 23 },
  { number: 40, nameAr: 'غافر', nameEn: 'Ghafir', englishMeaning: 'The Forgiver', totalVerses: 85, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 24 },
  { number: 55, nameAr: 'الرحمن', nameEn: 'Ar-Rahman', englishMeaning: 'The Beneficent', totalVerses: 78, revelationType: 'Medinan', revelationTypeAr: 'مدنية', juz: 27 },
  { number: 56, nameAr: 'الواقعة', nameEn: 'Al-Waqi\'ah', englishMeaning: 'The Inevitable', totalVerses: 96, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 27 },
  { number: 67, nameAr: 'الملك', nameEn: 'Al-Mulk', englishMeaning: 'The Sovereignty', totalVerses: 30, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 29 },
  { number: 97, nameAr: 'القدر', nameEn: 'Al-Qadr', englishMeaning: 'The Night of Decree', totalVerses: 5, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 30 },
  { number: 108, nameAr: 'الكوثر', nameEn: 'Al-Kawthar', englishMeaning: 'The Abundance', totalVerses: 3, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 30 },
  { number: 112, nameAr: 'الإخلاص', nameEn: 'Al-Ikhlas', englishMeaning: 'The Sincerity', totalVerses: 4, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 30 },
  { number: 113, nameAr: 'الفلق', nameEn: 'Al-Falaq', englishMeaning: 'The Daybreak', totalVerses: 5, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 30 },
  { number: 114, nameAr: 'الناس', nameEn: 'An-Nas', englishMeaning: 'Mankind', totalVerses: 6, revelationType: 'Meccan', revelationTypeAr: 'مكية', juz: 30 },
];

export const SURAH_AYAHS: Record<number, Ayah[]> = {
  // Surah Al-Fatihah
  1: [
    { numberInSurah: 1, textAr: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', textEn: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.', tafsir: 'البسملة: استعانة بالله تبارك وتعالى وتبرك باسمه العظيم.' },
    { numberInSurah: 2, textAr: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', textEn: '[All] praise is [due] to Allah, Lord of the worlds -', tafsir: 'الثناء الكامل المطلق لله تعالى لصفاته الجليلة ونعمه الجزيلة.' },
    { numberInSurah: 3, textAr: 'الرَّحْمَٰنِ الرَّحِيمِ', textEn: 'The Entirely Merciful, the Especially Merciful,', tafsir: 'صفتان لله تدلان على سعة رحمته بجميع خلقه وخصوصيتها بالمؤمنين.' },
    { numberInSurah: 4, textAr: 'مَالِكِ يَوْمِ الدِّينِ', textEn: 'Sovereign of the Day of Recompense.', tafsir: 'يوم الجزاء والحساب يوم القيامة.' },
    { numberInSurah: 5, textAr: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', textEn: 'It is You we worship and You we ask for help.', tafsir: 'نخصك وحدك بالعبادة ونستعين بك وحدك في سائر أمورنا.' },
    { numberInSurah: 6, textAr: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', textEn: 'Guide us to the straight path -', tafsir: 'ثبتنا وسددنا ووفقنا إلى الطريق الواضح وهو الإسلام.' },
    { numberInSurah: 7, textAr: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', textEn: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.', tafsir: 'طريق النبيين والصديقين والشهداء والصالحين، غير طريق اليهود والنصارى.' },
  ],

  // Surah Al-Ikhlas
  112: [
    { numberInSurah: 1, textAr: 'قُلْ هُوَ اللَّهُ أَحَدٌ', textEn: 'Say, "He is Allah, [who is] One,', tafsir: 'قل يا محمد: هو الله المنفرد بالألوهية والربوبية والأسماء والصفات.' },
    { numberInSurah: 2, textAr: 'اللَّهُ الصَّمَدُ', textEn: 'Allah, the Eternal Refuge.', tafsir: 'الذي تصمد إليه الخلائق في حوائجها ورغائبها لكرمه وقدرته.' },
    { numberInSurah: 3, textAr: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', textEn: 'He neither begets nor is born,', tafsir: 'منزه عن الولد والوالد لغناه المطلق وكماله الذاتي.' },
    { numberInSurah: 4, textAr: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', textEn: 'Nor is there to Him any equivalent."', tafsir: 'ليس له مثيل ولا شبيه ولا نظير من خلقه تبارك وتعالى.' },
  ],

  // Surah Al-Falaq
  113: [
    { numberInSurah: 1, textAr: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', textEn: 'Say, "I seek refuge in the Lord of daybreak', tafsir: 'ألتجئ وأعتصم برب الصبح وفالق الحب والنوى.' },
    { numberInSurah: 2, textAr: 'مِن شَرِّ مَا خَلَقَ', textEn: 'From the evil of that which He created', tafsir: 'من شر كل مخلوق فيه شر من إنس وجن وحيوان وجماد.' },
    { numberInSurah: 3, textAr: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', textEn: 'And from the evil of darkness when it settles', tafsir: 'من شر الليل إذا أظلم ودخل لانتشار أهل الشر فيه.' },
    { numberInSurah: 4, textAr: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ', textEn: 'And from the evil of the blowers in knots', tafsir: 'من شر السواحر اللاتي يعقدن العقد وينفثن فيها.' },
    { numberInSurah: 5, textAr: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', textEn: 'And from the evil of an envier when he envies."', tafsir: 'من شر من يتمنى زوال النعمة عن غيره ويسعى في إضراره.' },
  ],

  // Surah An-Nas
  114: [
    { numberInSurah: 1, textAr: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', textEn: 'Say, "I seek refuge in the Lord of mankind,', tafsir: 'أعتصم بخالق الناس ومربيهم ومدبر أمورهم.' },
    { numberInSurah: 2, textAr: 'مَلِكِ النَّاسِ', textEn: 'The Sovereign of mankind.', tafsir: 'المتصرف فيهم بما يشاء لا رب لهم سواه.' },
    { numberInSurah: 3, textAr: 'إِلَٰهِ النَّاسِ', textEn: 'The God of mankind,', tafsir: 'معبودهم الحق الذي لا معبود سواه بحق.' },
    { numberInSurah: 4, textAr: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', textEn: 'From the evil of the retreating whisperer -', tafsir: 'الشيطان الذي يلقي الوسوسة في القلب فإذا ذكر الله خنس واختفى.' },
    { numberInSurah: 5, textAr: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', textEn: 'Who whispers [evil] into the breasts of mankind -', tafsir: 'الذي يلقي الشبه والشهوات في قلوب بني آدم.' },
    { numberInSurah: 6, textAr: 'مِنَ الْجِنَّةِ وَالنَّاسِ', textEn: 'From among the jinn and mankind."', tafsir: 'وساوس الشياطين من شياطين الجن وشياطين الإنس.' },
  ],

  // Surah Al-Kahf (Selection of Key Opening Verses)
  18: [
    { numberInSurah: 1, textAr: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا', textEn: '[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.', tafsir: 'الحمد لله على نعمة إنزال القرآن المستقيم الهادي إلى صراط العزيز الحميد.' },
    { numberInSurah: 2, textAr: 'قَيِّمًا لِّيُنذِرَ بَأْسًا شَدِيدًا مِّن لَّدُنْهُ وَيُبَشِّرَ الْمُؤْمِنِينَ الَّذِينَ يَعْمَلُونَ الصَّالِحَاتِ أَنَّ لَهُمْ أَجْرًا حَسَنًا', textEn: '[He has made it] straight, to warn of severe punishment from Him and to give good tidings to the believers who do righteous deeds that they will have a good reward', tafsir: 'كتاباً مستقيماً لا تناقض فيه، لينذر الكافرين ويبشر الصالحين بالجنة.' },
    { numberInSurah: 3, textAr: 'مَّاكِثِينَ فِيهِ أَبَدًا', textEn: 'In which they will remain forever', tafsir: 'خالدين في نعيم الجنة أبداً لا يزول.' },
    { numberInSurah: 4, textAr: 'وَيُنذِرَ الَّذِينَ قَالُوا اتَّخَذَ اللَّهُ وَلَدًا', textEn: 'And to warn those who say, "Allah has taken a son."', tafsir: 'إنذار خاص للمشركين واليهود والنصارى الذين نسبوا الولد لله.' },
    { numberInSurah: 5, textAr: 'مَّا لَهُم بِهِ مِنْ عِلْمٍ وَلَا لِآبَائِهِمْ ۚ كَبُرَتْ كَلِمَةً تَخْرُجُ مِنْ أَفْوَاهِهِمْ ۚ إِن يَقُولُونَ إِلَّا كَذِبًا', textEn: 'They have no knowledge of it, nor had their fathers. Grave is the word that comes out of their mouths; they speak not except a lie.', tafsir: 'قول شنيع عظيم الإثم كاذب بلا برهان.' },
    { numberInSurah: 10, textAr: 'إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا', textEn: '[Mention] when the youths retreated to the cave and said, "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance."', tafsir: 'دعاء فتية الكهف الصالحين بالرحمة والثبات على الإيمان والهداية.' },
  ],

  // Surah Al-Mulk
  67: [
    { numberInSurah: 1, textAr: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', textEn: 'Blessed is He in whose hand is dominion, and He is over all things competent -', tafsir: 'تعاظم وتكاثر خير الله الذي بيده ملك السماوات والأرض والدنيا والآخرة.' },
    { numberInSurah: 2, textAr: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ', textEn: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -', tafsir: 'ليختبركم أيكم أخلص العمل وأصوبه لربه.' },
    { numberInSurah: 3, textAr: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ', textEn: '[And] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return [your] vision; do you see any breaks?', tafsir: 'خلق متقن عظيم ليس فيه خلل ولا نقص.' },
    { numberInSurah: 4, textAr: 'ثُمَّ ارْجِعِ الْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ الْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ', textEn: 'Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued.', tafsir: 'يرجع بصرك كليلاً عاجزاً عن إدراك أي عيب في خلق الله.' },
    { numberInSurah: 5, textAr: 'وَلَقَدْ زَيَّنَّا السَّمَاءَ الدُّنْيَا بِمَصَابِيحَ وَجَعَلْنَاهَا رُجُومًا لِّلشَّيَاطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ السَّعِيرِ', textEn: 'And We have certainly beautified the nearest heaven with stars and have made [from] them what is thrown at the devils and have prepared for them the punishment of the Blaze.', tafsir: 'الكواكب والنجوم زينة للسماء ورجوماً للشياطين المسترقين للسمع.' },
  ],

  // Surah Ya-Sin
  36: [
    { numberInSurah: 1, textAr: 'يس', textEn: 'Ya, Seen.', tafsir: 'حروف مقطعة للإعجاز والتحدي ببيان القرآن الكريم.' },
    { numberInSurah: 2, textAr: 'وَالْقُرْآنِ الْحَكِيمِ', textEn: 'By the wise Qur\'an.', tafsir: 'قسم بالقرآن المحكم في نظمه وأحكامه وأخباره.' },
    { numberInSurah: 3, textAr: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ', textEn: 'Indeed you, [O Muhammad], are from among the messengers,', tafsir: 'تأكيد لرسالة النبي صلى الله عليه وسلم ونبوته.' },
    { numberInSurah: 4, textAr: 'عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ', textEn: 'On a straight path.', tafsir: 'على منهج قويم لا اعوجاج فيه وهو دين الإسلام.' },
    { numberInSurah: 5, textAr: 'تَنزِيلَ الْعَزِيزِ الرَّحِيمِ', textEn: '[This is] a revelation of the Exalted in Might, the Merciful,', tafsir: 'منزل من الله القوي القاهر ذي الرحمة الواسعة.' },
  ],

  // Ayat al-Kursi (from Surah Al-Baqarah 2:255)
  2: [
    { numberInSurah: 255, textAr: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ', textEn: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is [presently] before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.', tafsir: 'أعظم آية في كتاب الله تبارك وتعالى، تضمنت توحيد الألوهية والربوبية والأسماء والصفات وكمال القيومية.' },
    { numberInSurah: 285, textAr: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّن رُّسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ', textEn: 'The Messenger has believed in what was revealed to him from his Lord, and [so have] the believers. All of them have believed in Allah and His angels and His books and His messengers, [saying], "We make no distinction between any of His messengers." And they say, "We hear and we obey. [We seek] Your forgiveness, our Lord, and to You is the final destination."', tafsir: 'خواتيم سورة البقرة، من قرأ بهما في ليلة كفتاه.' },
    { numberInSurah: 286, textAr: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ', textEn: 'Allah does not charge a soul except [with that within] its capacity. It will have [the consequence of] what [good] it gained, and it will bear [the consequence of] what [evil] it earned. "Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid upon those before us. Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people."', tafsir: 'رحمة الله بعباده وتيسيره عليهم وعدم تكليفهم بما لا يطيقون مع الدعاء المستجاب.' },
  ],

  // Surah Ar-Rahman
  55: [
    { numberInSurah: 1, textAr: 'الرَّحْمَٰنُ', textEn: 'The Most Merciful', tafsir: 'اسم من أسماء الله الحسنى دال على سعة رحمته.' },
    { numberInSurah: 2, textAr: 'عَلَّمَ الْقُرْآنَ', textEn: 'Taught the Qur\'an,', tafsir: 'علم عباده القرآن ويسره للتلاوة والحفظ والتدبر.' },
    { numberInSurah: 3, textAr: 'خَلَقَ الْإِنسَانَ', textEn: 'Created man,', tafsir: 'خلق آدم وذريته في أحسن تقويم.' },
    { numberInSurah: 4, textAr: 'عَلَّمَهُ الْبَيَانَ', textEn: '[And] taught him eloquence.', tafsir: 'أقدره على التعبير والإبانة عما في ضميره بالنطق والكتابة.' },
    { numberInSurah: 5, textAr: 'الشَّمْسُ وَالْقَمَرُ بِحُسْبَانٍ', textEn: 'The sun and the moon [move] by precise calculation,', tafsir: 'يجريان بحساب مقدر متقن لتقدير الأوقات ومصالح العباد.' },
    { numberInSurah: 13, textAr: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ', textEn: 'So which of the favors of your Lord would you deny?', tafsir: 'خطاب للإنس والجن: بأي نعم ربكم الجليلة تكذبون؟' },
  ],
};
