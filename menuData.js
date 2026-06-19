const menuData = [
  {
    id: 1,
    category: "appetizers",
    name: "كارباتشيو لحم العجل بالترفيل",
    description: "شرائح رقيقة من لحم العجل الفاخر المغذى على الحبوب، تعلوها رغوة الترفيل الأسود، زيت زيتون البكر الممتاز معتق، ورقائق بارميزان ريجانوا 24 شهر.",
    price: 145,
    prepTime: "12 دقيقة",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 2,
    category: "appetizers",
    name: "الكافيار الذهبي الإمبراطوري",
    description: "حبيبات الكافيار الفاخرة مصحوبة برقائق الذهب القابلة للأكل عيار 24، تقدم مع خبز البريوش الدافئ المحمص والزبدة المملحة المستوردة.",
    price: 450,
    prepTime: "10 دقائق",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    popular: false,
    chefRecommended: true
  },
  {
    id: 3,
    category: "appetizers",
    name: "فطائر فوا جرا المكرملة",
    description: "كبد الإوز الفاخر المحمر ببطء، يقدم مع مربى التين البري ولمسة من بلسمك معتق لمدة 12 سنة.",
    price: 195,
    prepTime: "15 دقيقة",
    image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: false
  },
  {
    id: 4,
    category: "salads",
    name: "سلطة البوراتا والتمور الفاخرة",
    description: "جبن البوراتا الإيطالي الكريمي الطازج، يقدم مع مزيج من التمور السعودية الفاخرة، ريحان بري، صنوبر محمص، وصلصة الخل البلسمي بالترفل.",
    price: 95,
    prepTime: "10 دقائق",
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 5,
    category: "salads",
    name: "سلطة الشمندر المشوي والماعز الجبلي",
    description: "مكعبات الشمندر العضوي المشوي على الحطب، مغطاة بجبن الماعز الفرنسي الدافئ، الجوز المكرمل، وخل الليمون والزعتر البري.",
    price: 85,
    prepTime: "10 دقائق",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    popular: false,
    chefRecommended: false
  },
  {
    id: 6,
    category: "mains",
    name: "ستيك واغيو ريب آي A5",
    description: "شريحة لحم واغيو يابانية أصلية بدرجة تعريق A5 المشهورة عالمياً، مشوية ببطء على لهب الفحم الطبيعي، تقدم مع صلصة الترفيل الأسود وملح البحر الخشن.",
    price: 650,
    prepTime: "25 دقيقة",
    image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 7,
    category: "mains",
    name: "ريزوتو الترفيل الأسود البري",
    description: "أرز الأربوريو الإيطالي المطهو بمرق الفطر الغني، الزبدة الفرنسية، مع رقائق سخية من الترفيل الأسود الطازج وجبن البارميزان المعتق.",
    price: 185,
    prepTime: "20 دقيقة",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: false
  },
  {
    id: 8,
    category: "mains",
    name: "كتف الخروف المطهو ببطء 24 ساعة",
    description: "لحم خروف محلي مطهو ببطء تحت حرارة منخفضة لمدة 24 ساعة مع الأعشاب البرية العطرية والتوابل الشرقية، يقدم على وسادة من الأرز المزعفر.",
    price: 260,
    prepTime: "20 دقيقة",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 9,
    category: "grills",
    name: "ريش الغنم الأسترالية الفاخرة",
    description: "ريش لحم الضأن المتبلة بالروزماري والثوم البري، مشوية بدقة متناهية على الفحم، تقدم مع البطاطس المهروسة الغنية بالزبدة.",
    price: 210,
    prepTime: "20 دقيقة",
    image: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: false
  },
  {
    id: 10,
    category: "grills",
    name: "مشكل المشويات الملكي",
    description: "مزيج فاخر من أسياخ كباب لحم الواغيو، أوصال لحم العجل الطرية، وشيش طاووق الدجاج المتبل بالزعفران، يقدم مع خبز التنور الطازج.",
    price: 295,
    prepTime: "22 دقيقة",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 11,
    category: "seafood",
    name: "سمك القاروص التشيلي المخبوز",
    description: "فيليه سمك القاروص التشيلي الفاخر، مطبوخ في الفرن مع صلصة الليمون والزنجبيل البري والكزبرة الطازجة، يقدم مع الهليون المشوي.",
    price: 245,
    prepTime: "18 دقيقة",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 12,
    category: "seafood",
    name: "جمبري جامبو بصلصة الثوم والليمون",
    description: "جمبري جامبو بحري طازج مشوي بصلصة الزبدة الفرنسية، الليمون العضوي، الثوم والأعشاب الطازجة.",
    price: 185,
    prepTime: "15 دقيقة",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80",
    popular: false,
    chefRecommended: false
  },
  {
    id: 13,
    category: "pizza",
    name: "بيتزا الترفيل والبوراتا الإيطالية",
    description: "عجينة نابولي المخمرة لمدة 48 ساعة، تعلوها صلصة البيضاء الكريمية، جبن البوراتا الطازج، زيت الترفيل ورقائق الترفيل الأسود.",
    price: 130,
    prepTime: "10 دقائق",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 14,
    category: "pizza",
    name: "بيتزا بروسيتو دي بارما",
    description: "صلصة الطماطم العضوية، جبن الموزاريلا الطازج، لحم البروسيتو المجفف، الجرجير البري، ولمسة من بلسمك معتق وجبن البارميزان.",
    price: 125,
    prepTime: "10 دقائق",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
    popular: false,
    chefRecommended: false
  },
  {
    id: 15,
    category: "burgers",
    name: "برجر واغيو الترفيل الملكي",
    description: "قرص من لحم واغيو الفاخر 200 جرام، مغطى بجبن الغرويير السويسري الذائب، بصل مكرمل ببطء، صلصة مايونيز الترفيل المصنوعة منزلياً في خبز البريوش الذهبي.",
    price: 110,
    prepTime: "15 دقيقة",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 16,
    category: "burgers",
    name: "برجر كريسبي تشيكن بالذهب",
    description: "صدر دجاج مقرمش متبل بالأعشاب، مغطى بصوص الجبن الساخن، شرائح هالبينو، تعلوه قطعة من رقائق الذهب القابلة للأكل.",
    price: 85,
    prepTime: "12 دقيقة",
    image: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80",
    popular: false,
    chefRecommended: false
  },
  {
    id: 17,
    category: "desserts",
    name: "كعكة الزعفران والذهب الفاخرة",
    description: "كيك الحليب الإسفنجي الغني بنكهة الزعفران الإيراني الأصيل، مغطى بطبقة من الكريمة المخفوقة وأوراق الذهب عيار 24.",
    price: 80,
    prepTime: "8 دقائق",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 18,
    category: "desserts",
    name: "سوفليه الشوكولاتة الداكنة 70%",
    description: "سوفليه دافئ ومخبوز طازجاً بشوكولاتة فالرونا البلجيكية 70%، يقدم مع آيس كريم الفانيليا الطبيعي من مدغشقر.",
    price: 75,
    prepTime: "12 دقيقة",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: false
  },
  {
    id: 19,
    category: "desserts",
    name: "بقلاوة الفستق الحلبي مع الآيس كريم",
    description: "طبقات مقرمشة من رقائق الفيلو، محشوة بالفستق الحلبي الفاخر المطحون، تسقى بالقطر المعطر بماء الورد، وتقدم مع الآيس كريم التركي التقليدي.",
    price: 65,
    prepTime: "8 دقائق",
    image: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80",
    popular: false,
    chefRecommended: true
  },
  {
    id: 20,
    category: "hot_drinks",
    name: "دلة القهوة السعودية الملكية",
    description: "قهوة سعودية شقراء فاخرة محضرة من حبوب البن الخولاني الممتازة، ممزوجة بالهيل الفاخر والزعفران الأصيل، تقدم مع تمر خلاص الفاخر.",
    price: 55,
    prepTime: "10 دقائق",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 21,
    category: "hot_drinks",
    name: "إسبريسو ماكياتو بلمسة برونزية",
    description: "شوت مزدوج من إسبريسو حبوب أرابيكا 100% المحمصة محلياً، مع رغوة حليب مخملية ولمسة من بودرة الذهب البرونزية.",
    price: 35,
    prepTime: "5 دقائق",
    image: "https://images.unsplash.com/photo-151097252790b-a481d6d7a042?auto=format&fit=crop&w=800&q=80",
    popular: false,
    chefRecommended: false
  },
  {
    id: 22,
    category: "cold_drinks",
    name: "عصير الرمان البري والورد المبرد",
    description: "عصير الرمان الطازج البارد الممزوج بماء الورد الطبيعي المقطر، حبوب الرمان الطازجة ورقاقات النعناع.",
    price: 45,
    prepTime: "5 دقائق",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80",
    popular: true,
    chefRecommended: true
  },
  {
    id: 23,
    category: "cold_drinks",
    name: "موكتيل اللافندر والأناناس الفوار",
    description: "مزيج منعش من شراب اللافندر الطبيعي، عصير الأناناس الطازج، المياه الفوارة وشرائح الليمون الأخضر.",
    price: 40,
    prepTime: "5 دقائق",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    popular: false,
    chefRecommended: false
  }
];

// Export to window if not standard ES Module environment
if (typeof window !== "undefined") {
  window.menuData = menuData;
}
